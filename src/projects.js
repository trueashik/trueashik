/**
 * PROJECTS RENDERING ENGINE
 *
 * Renders two types of project cards:
 *   1. Featured projects — manually defined in PORTFOLIO_CONFIG.featuredProjects
 *      These are your real products/experiments with rich descriptions and status badges.
 *   2. GitHub repos — fetched live from the GitHub API, filtered and sorted by config.
 *
 * DSA section is now static HTML in index.html, so this module no longer renders it.
 */

const GITHUB_API_URL = `https://api.github.com/users/${PORTFOLIO_CONFIG.username}/repos?per_page=100&sort=updated`;

/** Language → icon emoji mapping */
const LANG_ICONS = {
    'C++': '⚡', 'JavaScript': '🟨', 'TypeScript': '🔷',
    'Python': '🐍', 'HTML': '🌐', 'CSS': '🎨',
    'Java': '☕', 'Rust': '🦀', 'Go': '🐹',
    'C': '⚙️', 'Shell': '🐚', 'default': '📦'
};

/** Language → color */
const LANG_COLORS = {
    'C++': '#f34b7d', 'JavaScript': '#f1e05a', 'TypeScript': '#3178c6',
    'Python': '#3572A5', 'HTML': '#e34c26', 'CSS': '#563d7c',
    'default': '#8b949e'
};

/** Status badge color mapping */
const STATUS_COLORS = {
    'BUILDING': '#10b981',
    'RESEARCH': '#7c3aed',
    'PRODUCT': '#00d4ff',
    'REPOSITORY': '#9898b0',
    'HACKATHON': '#f5a623',
    'EXPERIMENT': '#f472b6',
};

/**
 * Fetch public repos from GitHub
 */
async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repos = await response.json();

        return repos
            .filter(r => !r.fork && !r.private && r.name !== '.github')
            .map(r => ({
                id: r.name,
                name: formatRepoName(r.name),
                description: r.description || `A ${r.language || 'code'} project by ${PORTFOLIO_CONFIG.username}`,
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

function formatRepoName(name) {
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Fetch README.md from GitHub for a repo
 */
async function fetchReadme(repoName) {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${PORTFOLIO_CONFIG.username}/${repoName}/readme`,
            { headers: { 'Accept': 'application/vnd.github.v3.raw' } }
        );
        if (!response.ok) return null;
        return await response.text();
    } catch { return null; }
}

/**
 * Sort projects: priority order first (fixed), then by update date
 */
function sortByPriority(projects) {
    const order = PORTFOLIO_CONFIG.priorityOrder;
    return [...projects].sort((a, b) => {
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
}

/**
 * Partition repos using config
 */
function partitionRepos(allRepos) {
    const ignored = new Set(PORTFOLIO_CONFIG.ignoredRepos);
    const dsaSet = new Set(PORTFOLIO_CONFIG.dsaRepos);
    const featuredIds = new Set(PORTFOLIO_CONFIG.featuredProjects.map(p => p.id));

    const projects = [];

    for (const repo of allRepos) {
        if (ignored.has(repo.id)) continue;
        if (dsaSet.has(repo.id)) continue;
        if (featuredIds.has(repo.id.toLowerCase())) continue;
        projects.push(repo);
    }

    return { projects: sortByPriority(projects) };
}

/**
 * Simple Markdown → HTML
 */
function renderMarkdown(md) {
    let html = md
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0;">')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-primary);">$1</a>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/^(?!<[hulo1-9bprcli])((?!<).+)$/gm, '<p>$1</p>');
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
    return html;
}

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    const w = Math.floor(diffDays / 7);
    if (diffDays < 30) return `${w} ${w === 1 ? 'week' : 'weeks'} ago`;
    const m = Math.floor(diffDays / 30);
    if (diffDays < 365) return `${m} ${m === 1 ? 'month' : 'months'} ago`;
    const y = Math.floor(diffDays / 365);
    return `${y} ${y === 1 ? 'year' : 'years'} ago`;
}

/**
 * Create a FEATURED project card (manually defined)
 */
function createFeaturedProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card project-card-featured animate-on-scroll';
    card.setAttribute('data-project-type', 'featured');

    const statusColor = project.statusColor || STATUS_COLORS[project.status] || '#9898b0';

    const tagsHtml = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');

    let actionsHtml = '';

    if (project.website) {
        actionsHtml += `
        <a href="${project.website}" target="_blank" class="project-action-btn btn-live">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Visit
        </a>`;
    }

    if (project.repoUrl) {
        actionsHtml += `
        <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Source
        </a>`;
    }

    card.innerHTML = `
        <div class="project-card-image">
            <span class="project-icon">${project.icon}</span>
            <div class="project-status-badge" style="background: ${statusColor};">${project.status}</div>
        </div>
        <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-tagline">${project.tagline}</p>
            <p class="project-card-desc">${project.description}</p>
            <div class="project-card-tags">${tagsHtml}</div>
            <div class="project-card-actions">${actionsHtml}</div>
        </div>`;

    return card;
}

/**
 * Create a GitHub repo card
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.setAttribute('data-lang', project.language);
    card.setAttribute('data-repo', project.id);

    const langColor = LANG_COLORS[project.language] || LANG_COLORS['default'];
    const isFeatured = PORTFOLIO_CONFIG.featuredRepos.includes(project.id);

    const statsHtml = `
        <div class="project-stats">
            ${project.stars > 0 ? `<span class="project-stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${project.stars}</span>` : ''}
            ${project.forks > 0 ? `<span class="project-stat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg> ${project.forks}</span>` : ''}
            <span class="project-stat project-stat-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${timeAgo(project.updatedAt)}
            </span>
        </div>`;

    let actionsHtml = `
        <button class="project-action-btn btn-readme" data-project-id="${project.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            README
        </button>
        <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Source
        </a>`;

    if (project.liveUrl) {
        actionsHtml += `
        <a href="${project.liveUrl}" target="_blank" class="project-action-btn btn-live">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live
        </a>`;
    }

    card.innerHTML = `
        <div class="project-card-image">
            <span class="project-icon">${project.icon}</span>
            <div class="project-lang-badge" style="background: ${langColor};">${project.language}</div>
            ${isFeatured ? '<div class="project-featured-badge">★ Featured</div>' : ''}
        </div>
        <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-desc">${project.description}</p>
            ${statsHtml}
            <div class="project-card-actions">${actionsHtml}</div>
        </div>`;

    return card;
}

/**
 * Modal: open project README
 */
async function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalHeader = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');
    const langColor = LANG_COLORS[project.language] || LANG_COLORS['default'];

    modalHeader.innerHTML = `
        <h2>${project.name}</h2>
        <div class="modal-header-tags">
            <span class="project-tag" style="border-color:${langColor};color:${langColor};">${project.language}</span>
            ${project.license ? `<span class="project-tag">${project.license}</span>` : ''}
            ${project.stars > 0 ? `<span class="project-tag">⭐ ${project.stars}</span>` : ''}
        </div>
        <div class="modal-header-links">
            <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
            </a>
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-action-btn btn-live">Live Demo</a>` : ''}
        </div>`;

    modalBody.innerHTML = `
        <div class="readme-loading">
            <div class="readme-loading-spinner"></div>
            <p>Fetching README from GitHub...</p>
        </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const readmeContent = await fetchReadme(project.id);
    if (readmeContent) {
        const fixedReadme = readmeContent.replace(
            /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
            `![$1](https://raw.githubusercontent.com/${PORTFOLIO_CONFIG.username}/${project.id}/${project.defaultBranch}/$2)`
        );
        modalBody.innerHTML = renderMarkdown(fixedReadme);
    } else {
        modalBody.innerHTML = `
            <div class="readme-empty">
                <p>📄 No README found for this repository.</p>
                <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo" style="margin-top:16px;display:inline-flex;">View on GitHub →</a>
            </div>`;
    }
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Skeleton loading
 */
function showSkeletonLoading(container, count = 3) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'project-card project-skeleton';
        el.innerHTML = `
            <div class="project-card-image skeleton-shimmer"></div>
            <div class="project-card-body">
                <div class="skeleton-line skeleton-shimmer" style="width:70%;height:20px;margin-bottom:12px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:100%;height:14px;margin-bottom:8px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:85%;height:14px;margin-bottom:20px;"></div>
                <div class="skeleton-line skeleton-shimmer" style="width:40%;height:30px;"></div>
            </div>`;
        container.appendChild(el);
    }
}

/**
 * Initialize everything
 */
async function initProjects() {
    const gridContainer = document.getElementById('projects-grid');

    // 1. Render featured projects FIRST (no network needed)
    PORTFOLIO_CONFIG.featuredProjects.forEach(p => {
        gridContainer.appendChild(createFeaturedProjectCard(p));
    });

    // 2. Add a separator label before GitHub repos
    const separator = document.createElement('div');
    separator.className = 'projects-separator animate-on-scroll';
    separator.innerHTML = `<span class="separator-line"></span><span class="separator-text">More from GitHub</span><span class="separator-line"></span>`;
    gridContainer.appendChild(separator);

    // 3. Show skeleton placeholders for GitHub repos
    showSkeletonLoading(gridContainer, 3);

    // 4. Fetch GitHub repos
    let allRepos = await fetchGitHubRepos();

    // Remove skeletons
    gridContainer.querySelectorAll('.project-skeleton').forEach(el => el.remove());

    if (!allRepos || allRepos.length === 0) {
        const errorEl = document.createElement('div');
        errorEl.className = 'projects-error';
        errorEl.innerHTML = `
            <p>⚠️ Could not load projects from GitHub.</p>
            <p>Visit <a href="https://github.com/${PORTFOLIO_CONFIG.username}" target="_blank" style="color:var(--accent-primary);">github.com/${PORTFOLIO_CONFIG.username}</a></p>`;
        gridContainer.appendChild(errorEl);
    } else {
        // Partition using config (excludes DSA repos and featured project IDs)
        const { projects } = partitionRepos(allRepos);

        // Render GitHub repo cards
        projects.forEach(p => gridContainer.appendChild(createProjectCard(p)));
    }

    // Re-observe scroll animations
    if (typeof initScrollAnimations === 'function') initScrollAnimations();

    // README clicks (works for GitHub repo cards)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-readme');
        if (!btn) return;
        e.stopPropagation();
        const pid = btn.dataset.projectId;
        if (allRepos) {
            const project = allRepos.find(p => p.id === pid);
            if (project) openProjectModal(project);
        }
    });

    // Close modal
    document.getElementById('modal-close').addEventListener('click', closeProjectModal);
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
}

// Inject fadeInUp animation
const _style = document.createElement('style');
_style.textContent = `@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(_style);
