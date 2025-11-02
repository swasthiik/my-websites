document.addEventListener('DOMContentLoaded', function() {
    // Set the current year for the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle Logic ---
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // Check if the menu button and navigation menu elements exist
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation menu
            navMenu.classList.toggle('active');

            // Toggle the 'menu-open' class on the body (for overlay and 'X' button animation)
            body.classList.toggle('menu-open');

            // Update ARIA expanded state for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded);

            // Optional: Scroll to top of the menu if it opens (useful for very long menus)
            if (isExpanded) {
                navMenu.scrollTo(0, 0);
            }
        });

        // Close menu when a navigation link is clicked (for smoother mobile experience)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close if the menu is actually open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Smooth Scrolling for internal anchor links (like #services on index.html) ---
    // This part ensures that when you click a link like <a href="#services">Services</a>
    // on the *same page*, it scrolls smoothly rather than jumping.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Check if the target exists on the *current* page and we are on index.html
            // The `window.location.pathname.endsWith('index.html')` is important
            // to prevent smooth scrolling logic from interfering with cross-page hash links.
            if (targetElement && (window.location.pathname === '/' || window.location.pathname.endsWith('index.html'))) {
                 e.preventDefault(); // Prevent default jump
                 targetElement.scrollIntoView({
                     behavior: 'smooth'
                 });
            }
        });
    });

    // --- Handle hash links when navigating from another page ---
    // If a user navigates from about.html to index.html#services, the browser
    // loads index.html, but might not scroll to #services immediately.
    // This ensures it scrolls correctly after a small delay.
    const hash = window.location.hash;
    if (hash) {
        // Scroll to top first to prevent weird jumps if content re-renders
        window.scrollTo(0, 0);
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }, 100); // A small delay to ensure the page has rendered
    }
});