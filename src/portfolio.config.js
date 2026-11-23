/**
 * PORTFOLIO CONFIGURATION
 * 
 * Edit this file to control which repos are shown, hidden,
 * and in what order they appear on your portfolio.
 * 
 * This is YOUR control panel — like a .gitignore for your portfolio.
 */

const PORTFOLIO_CONFIG = {

    /** GitHub username */
    username: 'trueashik',

    /** LeetCode username */
    leetcodeUsername: 'trueashik',

    /**
     * IGNORED REPOS — these will NOT appear anywhere on the portfolio.
     * Add repo names (exact, case-sensitive) one per line.
     * Works like .gitignore — if it's listed here, it's invisible.
     */
    ignoredRepos: [
        'trueashik',          // GitHub profile README repo
        // Add more repos to hide:
        // 'some-private-test',
        // 'old-experiment',
    ],

    /**
     * DSA / COMPETITIVE PROGRAMMING REPOS
     * These repos are separated into their own "DSA & Problem Solving" section
     * instead of showing alongside projects.
     */
    dsaRepos: [
        'DSA-Journey',
    ],

    /**
     * FEATURED PROJECTS — manually defined projects that appear FIRST
     * in the projects section. These are your real products/experiments,
     * not just GitHub repos. They render as rich cards with status badges.
     * 
     * GitHub repos NOT listed here appear after, sorted by last updated date.
     */
    featuredProjects: [
        {
            id: 'rewardly',
            name: 'Rewardly',
            tagline: 'Consumer Technology · Shopping Rewards · Affiliate Infrastructure',
            description: 'Building a shopping rewards platform designed to help users discover cashback opportunities, deals, and rewards from online shopping. Focus: merchant integrations, affiliate tracking, shopping workflows, cashback systems, and automation.',
            status: 'BUILDING',
            statusColor: '#10b981',
            icon: '🛍️',
            website: 'https://rewardly.cash',
            tags: ['Consumer Tech', 'Rewards', 'Affiliate', 'Automation'],
        },
        {
            id: 'zeni',
            name: 'ZENI',
            tagline: 'Quantitative Systems · FinTech · Algorithmic Trading',
            description: 'An experimental quantitative trading engine focused on systematic market analysis, strategy research, backtesting, paper trading, risk management, and automated execution. Exploring the engineering behind data-driven trading systems and adaptive strategy evaluation.',
            status: 'RESEARCH',
            statusColor: '#7c3aed',
            icon: '📊',
            website: 'https://zeni.akaza.in',
            tags: ['FinTech', 'Quant', 'Trading', 'Data-Driven'],
        },
        {
            id: 'xcurse',
            name: 'Xcurse',
            tagline: 'Developer Tools · APIs · Automation',
            description: 'A developer-focused platform providing trending short-form audio discovery capabilities for applications, creator tools, and automated workflows. Built around API-driven integrations and automation-first product experiences.',
            status: 'PRODUCT',
            statusColor: '#00d4ff',
            icon: '🎵',
            website: 'https://xcurse.com',
            tags: ['Developer Tools', 'APIs', 'Audio', 'Automation'],
        },
        {
            id: 'zero',
            name: 'ZERO',
            tagline: 'AI · CareerTech · Job Discovery',
            description: 'An AI-assisted job discovery and alert system designed to help candidates identify relevant opportunities using their profile, skills, and preferences. Explored automated job discovery, opportunity matching, and Telegram-based delivery workflows.',
            status: 'REPOSITORY',
            statusColor: '#9898b0',
            icon: '🔍',
            website: '',
            repoUrl: '',
            tags: ['AI', 'CareerTech', 'Automation', 'Telegram'],
        },
        {
            id: 'curebot',
            name: 'CureBot — Workforce Intelligence',
            tagline: 'Enterprise AI · HRTech · Smart India Hackathon',
            description: 'An AI-powered workforce development system focused on employee skill-gap analysis and personalized development planning. Built as part of Smart India Hackathon 2025, with validation from PowerGrid HR.',
            status: 'HACKATHON',
            statusColor: '#f5a623',
            icon: '🏥',
            website: '',
            tags: ['Enterprise AI', 'HRTech', 'SIH 2025', 'Grand Finalist'],
        },
        {
            id: 'akaza',
            name: 'Akaza',
            tagline: 'AI Products · Content Automation',
            description: 'Exploring AI-powered content generation and digital workflow automation through practical product development and integrations.',
            status: 'EXPERIMENT',
            statusColor: '#f472b6',
            icon: '🧪',
            website: '',
            tags: ['AI', 'Content', 'Automation', 'Experiment'],
        },
    ],

    /**
     * PRIORITY ORDER — for GitHub repos that also appear after featured projects.
     * Repos listed here appear first among the GitHub repos, in this exact order.
     */
    priorityOrder: [
        'ClaimNova',
        'crash-copilot',
        'ClassPing',
        'munim',
    ],

    /**
     * FEATURED REPOS — these get a special "Featured" badge on the card.
     * Use this to highlight your best work for recruiters.
     */
    featuredRepos: [
        'ClaimNova',
        'crash-copilot',
        'ClassPing',
    ],
};
