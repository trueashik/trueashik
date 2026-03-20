/**
 * PROJECTS DATA & RENDERING ENGINE
 * 
 * Projects are sorted by:
 * 1. Explicit priority (lower number = higher priority)
 * 2. Then by date (newest first) for projects without priority
 * 
 * To add/edit projects, modify the PROJECTS array below.
 * Set `priority: 1` (or any number) to pin a project to the top.
 * Leave priority undefined to auto-sort by date.
 */

const PROJECTS = [
    {
        id: 'sih-project',
        name: 'SIH 2025 — Grand Finalist Project',
        description: 'A comprehensive platform built for the Smart India Hackathon 2025 Grand Finals. Designed and shipped an end-to-end system tackling a real national-level problem statement with scalable architecture and AI integration.',
        tags: ['System Design', 'AI', 'Full Platform', 'Python', 'Automation'],
        icon: '🏆',
        priority: 1,
        date: '2025-01-15',
        repoUrl: '#',
        liveUrl: '',
        readme: `# SIH 2025 — Grand Finalist Project

## Overview
Built for the Smart India Hackathon 2025 Grand Finals. This project addressed a critical national-level problem statement, demonstrating full system design, rapid development, and AI-powered automation.

## Key Highlights
- **End-to-end platform** designed and shipped within the hackathon timeline
- **Scalable architecture** with microservice-inspired modularity
- **AI Integration** for intelligent data processing and decision-making
- **Real-world impact** solving a genuine problem statement

## Tech Stack
- Python, JavaScript
- AI/ML for intelligent automation
- Custom system design with clear separation of concerns

## Architecture
The system was designed with scalability in mind:
1. Data ingestion layer
2. Processing engine with AI-powered analysis
3. User-facing dashboard for insights
4. Automated alert and reporting system

## Results
- Reached the **Grand Finals** of SIH 2025
- Successfully demonstrated the working prototype to judges
- Validated the feasibility of the approach at national scale`
    },
    {
        id: 'hackathon-winner-1',
        name: 'Hackathon Winning Platform #1',
        description: 'A full-stack platform that won a major hackathon. Built a complete MVP from scratch within 24-36 hours — from system design to deployment. Showcased rapid prototyping and product thinking.',
        tags: ['Full Stack', 'MVP', 'Product', 'Rapid Build'],
        icon: '🥇',
        priority: 2,
        date: '2024-11-20',
        repoUrl: '#',
        liveUrl: '',
        readme: `# Hackathon Winning Platform

## The Challenge
Built a fully functional platform from scratch within the tight hackathon timeline of 24-36 hours.

## Approach
My approach to hackathons is systematic:
1. **Understand the problem** — Spend the first hour deeply analyzing the problem
2. **Design the system** — Architecture diagram, data flow, tech choices
3. **Build the MVP** — Focus on core functionality, skip the fluff
4. **Polish & Present** — Make it look and feel like a real product

## What Made It Win
- Clean system design that judges could immediately understand
- Working demo with real functionality (not just slides)
- Production-quality UI despite the time constraint
- Clear articulation of the business value

## Key Takeaway
> A well-designed system with focused execution beats large teams.`
    },
    {
        id: 'hackathon-winner-2',
        name: 'Hackathon Winning Platform #2',
        description: 'Second hackathon victory. Another full product built from 0 to 1 in record time, proving that consistent system design skills and execution speed are a winning formula.',
        tags: ['Product Dev', 'System Design', 'C++', 'Automation'],
        icon: '🥇',
        priority: 3,
        date: '2024-09-12',
        repoUrl: '#',
        liveUrl: '',
        readme: `# Second Hackathon Win

## Overview
Winning my second hackathon reinforced the importance of systematic execution. This project combined low-level C++ performance with high-level product thinking.

## Technical Approach
- Leveraged C++ for performance-critical components
- Built automation pipelines for data processing
- Designed a clean, intuitive user interface
- Implemented robust error handling and edge cases

## Lessons Learned
- Speed comes from preparation and pattern recognition
- System design is the competitive advantage
- Solo execution requires choosing the right abstractions
- MVP doesn't mean "minimum viable pile of code"`
    },
    {
        id: 'automation-platform',
        name: 'n8n Automation Platform',
        description: 'A custom automation platform built with n8n that connects multiple APIs, processes data, and automates complex workflows. Built as a startup idea to validate the market for no-code automation solutions.',
        tags: ['n8n', 'Automation', 'APIs', 'Workflow', 'Startup'],
        icon: '⚡',
        date: '2025-01-28',
        repoUrl: '#',
        liveUrl: '',
        readme: `# n8n Automation Platform

## Overview
Built a comprehensive automation platform using n8n to demonstrate the power of workflow automation. This started as a startup idea validation exercise.

## Features
- **Multi-API orchestration** — Connects 10+ APIs seamlessly
- **Data transformation pipelines** — ETL workflows for various data formats
- **Scheduled automation** — Cron-based triggers for recurring tasks
- **Error handling & alerting** — Robust failure recovery and notifications

## Startup Validation
This project was built to validate a startup hypothesis:
> "Small businesses need simple automation tools that don't require coding."

### Validation Process
1. Built the MVP product
2. Onboarded 5 beta users
3. Collected feedback
4. Iterated on the core value proposition

## Architecture
\`\`\`
Trigger → n8n Workflow → API Calls → Transform → Output
                ↓
        Error Handler → Alert System
\`\`\``
    },
    {
        id: 'ai-project-builder',
        name: 'AI-Coordinated Project Builder',
        description: 'A meta-tool that coordinates AI capabilities with system design patterns to rapidly scaffold and build complete projects. Demonstrates my workflow of AI + human design thinking.',
        tags: ['AI', 'Automation', 'System Design', 'Meta-Tool'],
        icon: '🤖',
        date: '2025-02-10',
        repoUrl: '#',
        liveUrl: '',
        readme: `# AI-Coordinated Project Builder

## Concept
This tool embodies my philosophy: **AI for execution, humans for design**.

I coordinate AI capabilities with my system design skills to rapidly build complete projects. This tool is the systematization of that workflow.

## How It Works
1. **System Design Phase** — I create the architecture and specifications
2. **AI Coordination** — AI assists with code generation based on my specs
3. **Integration & Testing** — I integrate, test, and validate the output
4. **Shipping** — Final polish and deployment

## Key Principles
- AI is a tool, not a replacement for thinking
- System design is the blueprint that makes AI useful
- Human judgment is essential for product quality
- Speed comes from clear specifications, not shortcuts

## Results
- 3x faster project delivery
- Consistent code quality across projects
- Repeatable process for any domain`
    },
    {
        id: 'startup-validator',
        name: 'Startup Idea Validator',
        description: 'A product I built to systematize my startup validation process. Rather than just pitching ideas, I build the product first and then validate. This tool helps track and measure that process.',
        tags: ['Product Dev', 'Startup', 'Full Stack', 'MVP'],
        icon: '🚀',
        date: '2024-12-05',
        repoUrl: '#',
        liveUrl: '',
        readme: `# Startup Idea Validator

## Philosophy
> "Don't pitch it, build it. Then validate."

Instead of spending weeks on pitch decks and business plans, I build the product first. If the product works and people want it, the idea is validated.

## Features
- **Idea tracking dashboard** — Log and categorize startup ideas
- **Build sprint planner** — Plan 48-72 hour build sprints
- **Validation metrics** — Track user signups, engagement, and feedback
- **Decision framework** — Data-driven go/no-go decisions

## The Process
1. **Idea** → Log the concept and core hypothesis
2. **Build** → Ship an MVP in 48-72 hours
3. **Launch** → Put it in front of real users
4. **Measure** → Track key metrics
5. **Decide** → Continue, pivot, or kill

## Built With
- Full-stack JavaScript
- Database for persistent tracking
- Analytics integration
- Clean, functional UI`
    },
    {
        id: 'system-design-playground',
        name: 'System Design Playground',
        description: 'An interactive tool for visualizing and experimenting with system design patterns. Built to sharpen my own skills and help others learn the art of designing scalable systems.',
        tags: ['System Design', 'Education', 'Interactive', 'JavaScript'],
        icon: '🏗️',
        date: '2024-08-15',
        repoUrl: '#',
        liveUrl: '',
        readme: `# System Design Playground

## Overview
An interactive platform for learning and experimenting with system design patterns. Includes visual representations of common architectures and real-time modification capabilities.

## Features
- **Interactive architecture diagrams** — Drag-and-drop system components
- **Pattern library** — Collection of common design patterns
- **Load simulation** — Simulate traffic to understand bottlenecks
- **Trade-off analysis** — Compare different architectural decisions

## Patterns Included
- Load Balancer configurations
- Database sharding strategies
- Caching layers (Redis, CDN)
- Message queue architectures
- Microservice vs Monolith trade-offs

## Tech Stack
- Vanilla JavaScript with Canvas API
- Custom SVG rendering engine
- Local storage for saving designs
- Responsive design for all devices`
    },
    {
        id: 'embedded-iot',
        name: 'IoT Monitoring Dashboard',
        description: 'A real-time IoT monitoring system combining embedded C/C++ firmware with a web dashboard. Bridge between my ECE knowledge and software skills.',
        tags: ['C/C++', 'IoT', 'Embedded', 'Dashboard', 'Real-time'],
        icon: '📡',
        date: '2024-07-20',
        repoUrl: '#',
        liveUrl: '',
        readme: `# IoT Monitoring Dashboard

## Overview
A complete IoT monitoring solution bridging embedded systems with web technology. This project showcases my unique position as an ECE student who can work across the full stack — from firmware to frontend.

## Architecture
\`\`\`
Sensor → MCU (C/C++) → MQTT → Backend → WebSocket → Dashboard
\`\`\`

## Components
### Firmware (C/C++)
- Sensor data acquisition
- Local processing and filtering
- MQTT publishing with QoS
- OTA update capability

### Web Dashboard
- Real-time data visualization
- Historical data charts
- Alert configuration
- Device management

## Tech Stack
- **Firmware**: C/C++, Arduino framework
- **Communication**: MQTT protocol
- **Backend**: Python
- **Frontend**: JavaScript, Chart.js
- **Deployment**: Docker containers`
    }
];

/**
 * Sort projects: priority-defined first (ascending), then by date (newest first)
 */
function sortProjects(projects) {
    return [...projects].sort((a, b) => {
        const hasPriorityA = a.priority !== undefined && a.priority !== null;
        const hasPriorityB = b.priority !== undefined && b.priority !== null;

        if (hasPriorityA && hasPriorityB) {
            return a.priority - b.priority;
        }
        if (hasPriorityA) return -1;
        if (hasPriorityB) return 1;

        // Both without priority: sort by date descending
        return new Date(b.date) - new Date(a.date);
    });
}

/**
 * Get all unique tags across projects
 */
function getAllTags(projects) {
    const tagSet = new Set();
    projects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
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
        .replace(/^(?!<[hulo1-9bprcl])((?!<).+)$/gm, '<p>$1</p>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

    return html;
}

/**
 * Create a single project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.setAttribute('data-tags', JSON.stringify(project.tags));

    const priorityBadge = project.priority
        ? `<span class="project-priority-badge">Featured</span>`
        : '';

    const tagsHtml = project.tags
        .map(t => `<span class="project-tag">${t}</span>`)
        .join('');

    let actionsHtml = `
        <button class="project-action-btn btn-readme" data-project-id="${project.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            README
        </button>
    `;

    if (project.repoUrl && project.repoUrl !== '#') {
        actionsHtml += `
            <a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
            </a>
        `;
    }

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
            ${priorityBadge}
        </div>
        <div class="project-card-body">
            <h3 class="project-card-title">${project.name}</h3>
            <p class="project-card-desc">${project.description}</p>
            <div class="project-card-tags">${tagsHtml}</div>
            <div class="project-card-actions">${actionsHtml}</div>
        </div>
    `;

    return card;
}

/**
 * Open project README modal
 */
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalHeader = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');

    const tagsHtml = project.tags
        .map(t => `<span class="project-tag">${t}</span>`)
        .join('');

    let linksHtml = '';
    if (project.repoUrl && project.repoUrl !== '#') {
        linksHtml += `<a href="${project.repoUrl}" target="_blank" class="project-action-btn btn-repo">GitHub</a>`;
    }
    if (project.liveUrl) {
        linksHtml += `<a href="${project.liveUrl}" target="_blank" class="project-action-btn btn-live">Live Demo</a>`;
    }

    modalHeader.innerHTML = `
        <h2>${project.name}</h2>
        <div class="modal-header-tags">${tagsHtml}</div>
        ${linksHtml ? `<div class="modal-header-links">${linksHtml}</div>` : ''}
    `;

    modalBody.innerHTML = renderMarkdown(project.readme);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
 * Initialize projects section
 */
function initProjects() {
    const sorted = sortProjects(PROJECTS);
    const tags = getAllTags(sorted);
    const filterContainer = document.getElementById('projects-filter');
    const gridContainer = document.getElementById('projects-grid');

    // Render filter buttons
    filterContainer.innerHTML = tags
        .map((tag, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${tag}">${tag}</button>`)
        .join('');

    // Render project cards
    sorted.forEach(project => {
        gridContainer.appendChild(createProjectCard(project));
    });

    // Filter functionality
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.dataset.filter;
        const cards = gridContainer.querySelectorAll('.project-card');

        cards.forEach(card => {
            const cardTags = JSON.parse(card.dataset.tags);
            if (filter === 'All' || cardTags.includes(filter)) {
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
        const project = PROJECTS.find(p => p.id === projectId);
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
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
