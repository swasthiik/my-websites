document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Update for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body; // Reference to the body element

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

            // Toggle classes on the menu button for the 'X' animation
            menuButton.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the visibility of the nav menu
            // We use aria-hidden for accessibility and CSS `[aria-hidden="false"]` selector
            navMenu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
            
            // Toggle body scroll lock and overlay
            body.classList.toggle('menu-open');
        });

        // Close mobile menu when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is open before trying to close
                if (menuButton.getAttribute('aria-expanded') === 'true') {
                    menuButton.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                    body.classList.remove('menu-open');
                }
            });
        });

        // Optional: Close menu if window is resized past mobile breakpoint
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 992 && menuButton.getAttribute('aria-expanded') === 'true') {
                    menuButton.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                    body.classList.remove('menu-open');
                }
            }, 200); // Debounce resize event
        });
    }
});