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
     * PRIORITY ORDER — repos listed here appear FIRST, in this exact order.
     * Repos NOT listed here appear after, sorted by last updated date.
     * 
     * This is YOUR fixed ordering. It is NOT changed by drag-and-drop.
     * Only you (the developer) can change this by editing this file.
     */
    priorityOrder: [
        'ClaimNova',
        'crash-copilot',
        'ClassPing',
        'munim',
        // remaining repos appear after these, sorted by update date
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
