/**
 * MAIN ENTRY POINT
 * Initializes all modules when DOM is ready
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initProjects();
    initAnimations();
    initNavigation();

    // Preloader fade-out (if needed in the future)
    document.body.classList.add('loaded');
});
