/**
 * PROJECTS DATA & RENDERING ENGINE
 * 
 * Fetches real projects from GitHub API (trueashik)
 * - Shows actual README from each repo
 * - Links to the original GitHub repository
 * - Supports drag-and-drop priority reordering (persisted in localStorage)
 * - No fake/placeholder data
 */

const GITHUB_USERNAME = 'trueashik';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

/** Language → icon emoji mapping */
const LANG_ICONS = {
    'C++': '⚡',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'Python': '🐍',
    'HTML': '🌐',
    'CSS': '🎨',
    'Java': '☕',
    'Rust': '🦀',
    'Go': '🐹',
    'C': '⚙️',
    'Shell': '🐚',
    'default': '📦'
};

/** Language → tag color class */
const LANG_COLORS = {
    'C++': '#f34b7d',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'default': '#8b949e'
};

/**
 * Repos to exclude (e.g., profile README repo)
 */
const EXCLUDED_REPOS = ['trueashik'];

/**
 * Get saved priority order from localStorage
 */
function getSavedOrder() {
    try {
        const saved = localStorage.getItem('portfolio-project-order');
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

/**
 * Save priority order to localStorage
 */
function saveOrder(repoNames) {
    try {
        localStorage.setItem('portfolio-project-order', JSON.stringify(repoNames));
    } catch { /* silent */ }
}

/**
 * Fetch public repos from GitHub API
 */
async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repos = await response.json();

        // Filter out excluded repos, forks, and the .github repo
        return repos
            .filter(r => !r.fork && !r.private && !EXCLUDED_REPOS.includes(r.name) && r.name !== '.github')
            .map(r => ({
                id: r.name,
                name: formatRepoName(r.name),
                description: r.description || `A ${r.language || 'code'} project by ${GITHUB_USERNAME}`,
                language: r.language || 'Unknown',
                stars: r.stargazers_count,
                forks: r.forks_count,
                icon: LANG_ICONS[r.language] || LANG_ICONS['default'],
                repoUrl: r.html_url,
                liveUrl: r.homepage || '',
                updatedAt: r.updated_at,
                createdAt: r.created_at,
                license: r.license ? r.license.spdx_id : null,
                topics: r.topics || [],
                defaultBranch: r.default_branch || 'main',
            }));
    } catch (err) {
        console.error('Failed to fetch GitHub repos:', err);
        return null;
    }
}

/**
 * Format repo name into readable title
 * e.g. "crash-copilot" → "Crash Copilot", "DSA-Journey" → "DSA Journey"
 */
function formatRepoName(name) {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Fetch README from GitHub for a specific repo
 */
async function fetchReadme(repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
            headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });
        if (!response.ok) return null;
        return await response.text();
    } catch {
        return null;
    }
}

/**
 * Sort projects by saved order, then by update date
 */
function sortProjects(projects) {
    const savedOrder = getSavedOrder();
    if (!savedOrder) return projects;

    return [...projects].sort((a, b) => {
        const idxA = savedOrder.indexOf(a.id);
        const idxB = savedOrder.indexOf(b.id);

        // Both in saved order
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        // Only one in saved order
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        // Neither: sort by updated date
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

/**
 * Get all unique languages across projects for filters
 */
function getAllLanguages(projects) {
    const langSet = new Set();
    projects.forEach(p => {
        if (p.language && p.language !== 'Unknown') langSet.add(p.language);
    });
    return ['All', ...Array.from(langSet)];
}

/**
 * Simple markdown-to-HTML converter for README content
 */
function renderMarkdown(md) {
    let html = md
        // Code blocks
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0;">')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-primary);">$1</a>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        // Unordered lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // Paragraphs (lines that aren't already wrapped)
        .replace(/^(?!<[hulo1-9bprcli])((?!<).+)$/gm, '<p>$1</p>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    return html;
}

/**
 * Format time ago string
 */
function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    const weeks = Math.floor(diffDays / 7);
    if (diffDays < 30) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    const months = Math.floor(diffDays / 30);
    if (diffDays < 365) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

/**
 * Create a single project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.setAttribute('data-lang', project.language);
    card.setAttribute('data-repo', project.id);
    card.setAttribute('draggable', 'true');

    const langColor = LANG_COLORS[project.language] || LANG_COLORS['default'];

    const statsHtml = `
        <div class="project-stats">
            ${project.stars > 0 ? `<span class="project-stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${project.stars}</span>` : ''}
            ${project.forks > 0 ? `<span class="project-stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg> ${project.forks}</span>` : ''}
            <span class="project-stat project-stat-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${timeAgo(project.updatedAt)}
            </span>
        </div>
    `;

    let actionsHtml = `
        <button class="project-action-btn btn-readme" data-project-id="${project.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            README
        </button>
        <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
        </a>
    `;

    if (project.liveUrl) {
        actionsHtml += `
            <a href="${project.liveUrl}" target="_blank" class="project-action-btn btn-live">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live
            </a>
        `;
    }

    card.innerHTML = `
        <div class="project-card-image">
            <span class="project-icon">${project.icon}</span>
            <div class="project-lang-badge" style="background: ${langColor};">${project.language}</div>
            <div class="project-drag-handle" title="Drag to reorder">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
            </div>
        </div>
        <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-desc">${project.description}</p>
            ${statsHtml}
            <div class="project-card-actions">${actionsHtml}</div>
        </div>
    `;

    return card;
}

/**
 * Open project README modal — fetches real README from GitHub
 */
async function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalHeader = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');

    const langColor = LANG_COLORS[project.language] || LANG_COLORS['default'];

    modalHeader.innerHTML = `
        <h2>${project.name}</h2>
        <div class="modal-header-tags">
            <span class="project-tag" style="border-color: ${langColor}; color: ${langColor};">${project.language}</span>
            ${project.license ? `<span class="project-tag">${project.license}</span>` : ''}
            ${project.stars > 0 ? `<span class="project-tag">⭐ ${project.stars}</span>` : ''}
        </div>
        <div class="modal-header-links">
            <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
            </a>
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-action-btn btn-live">Live Demo</a>` : ''}
        </div>
    `;

    // Show loading state
    modalBody.innerHTML = `
        <div class="readme-loading">
            <div class="readme-loading-spinner"></div>
            <p>Fetching README from GitHub...</p>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Fetch real README
    const readmeContent = await fetchReadme(project.id);
    if (readmeContent) {
        // Fix relative image URLs to point to GitHub raw
        const fixedReadme = readmeContent.replace(
            /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
            `![$1](https://raw.githubusercontent.com/${GITHUB_USERNAME}/${project.id}/${project.defaultBranch}/$2)`
        );
        modalBody.innerHTML = renderMarkdown(fixedReadme);
    } else {
        modalBody.innerHTML = `
            <div class="readme-empty">
                <p>📄 No README found for this repository.</p>
                <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo" style="margin-top: 16px; display: inline-flex;">View on GitHub →</a>
            </div>
        `;
    }
}

/**
 * Close modal
 */
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Drag and drop reordering
 */
function initDragAndDrop(gridContainer) {
    let draggedCard = null;

    gridContainer.addEventListener('dragstart', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        draggedCard = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    gridContainer.addEventListener('dragend', (e) => {
        const card = e.target.closest('.project-card');
        if (card) card.classList.remove('dragging');
        draggedCard = null;

        // Save new order
        const cards = gridContainer.querySelectorAll('.project-card');
        const newOrder = Array.from(cards).map(c => c.dataset.repo);
        saveOrder(newOrder);
    });

    gridContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const afterElement = getDragAfterElement(gridContainer, e.clientY);
        if (afterElement == null) {
            gridContainer.appendChild(draggedCard);
        } else {
            gridContainer.insertBefore(draggedCard, afterElement);
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.project-card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/**
 * Show skeleton loading cards
 */
function showSkeletonLoading(container, count = 6) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'project-card project-skeleton';
        skeleton.innerHTML = `
            <div class="project-card-image skeleton-shimmer"></div>
            <div class="project-card-body">
                <div class="skeleton-line skeleton-shimmer" style="width:70%;height:20px;margin-bottom:12px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:100%;height:14px;margin-bottom:8px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:85%;height:14px;margin-bottom:20px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:40%;height:30px;"></div>
            </div>
        `;
        container.appendChild(skeleton);
    }
}

/**
 * Initialize projects section
 */
async function initProjects() {
    const filterContainer = document.getElementById('projects-filter');
    const gridContainer = document.getElementById('projects-grid');

    // Show loading skeletons
    showSkeletonLoading(gridContainer);

    // Fetch repos from GitHub
    let projects = await fetchGitHubRepos();

    if (!projects || projects.length === 0) {
        gridContainer.innerHTML = `
            <div class="projects-error">
                <p>⚠️ Could not load projects from GitHub.</p>
                <p>Visit <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color:var(--accent-primary);">github.com/${GITHUB_USERNAME}</a> to see all projects.</p>
            </div>
        `;
        return;
    }

    // Sort by saved priority or update date
    projects = sortProjects(projects);

    // Get unique languages for filter
    const languages = getAllLanguages(projects);

    // Render filter buttons
    filterContainer.innerHTML = languages
        .map((lang, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${lang}">${lang}</button>`)
        .join('');

    // Clear skeletons and render real cards
    gridContainer.innerHTML = '';
    projects.forEach(project => {
        gridContainer.appendChild(createProjectCard(project));
    });

    // Re-observe new cards for scroll animation
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }

    // Filter functionality
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.dataset.filter;
        const cards = gridContainer.querySelectorAll('.project-card');

        cards.forEach(card => {
            const cardLang = card.dataset.lang;
            if (filter === 'All' || cardLang === filter) {
                card.style.display = '';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // README button clicks
    gridContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-readme');
        if (!btn) return;
        e.stopPropagation();
        const projectId = btn.dataset.projectId;
        const project = projects.find(p => p.id === projectId);
        if (project) openProjectModal(project);
    });

    // Close modal
    document.getElementById('modal-close').addEventListener('click', closeProjectModal);
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    // Initialize drag and drop for reordering
    initDragAndDrop(gridContainer);
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
