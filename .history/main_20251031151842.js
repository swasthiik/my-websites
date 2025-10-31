document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Update for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // Also update the contact page footer year if it exists
    const contactYearSpan = document.getElementById('current-year-contact');
    if (contactYearSpan) {
        contactYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuButton && navMenu) {
        navMenu.setAttribute('aria-hidden', 'true');
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
            body.classList.toggle('menu-open');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuButton.getAttribute('aria-expanded') === 'true') {
                    menuButton.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                    body.classList.remove('menu-open');
                }
            });
        });
    }

    // ⭐ IMPORTANT: The old map switching script has been REMOVED from here.
    // No additional code is needed.
});