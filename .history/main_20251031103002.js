document.addEventListener('DOMContentLoaded', function() {
    // Correctly reference the elements using their IDs from index.html
    const menuButton = document.getElementById('menu-button'); // Matches HTML: <button id="menu-button">
    const navMenu = document.getElementById('nav-menu');       // Matches HTML: <nav id="nav-menu">

    if (menuButton && navMenu) {
        // Function to toggle menu state (open/close)
        const toggleMenu = (event) => {
            // Stop propagation for the button click/touchstart itself
            // to prevent the document listener from immediately closing the menu
            event.stopPropagation();
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active'); // This class should control the visibility/position of your menu
        };

        // Add event listeners for both 'click' and 'touchstart' on the menu button
        menuButton.addEventListener('click', toggleMenu);
        menuButton.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior (e.g., potential scroll/zoom interference)
            toggleMenu(e); // Call the toggle function
        }, { passive: false }); // Important for `preventDefault()` to work on touch events

        // Close menu when a navigation link is clicked or touched
        navMenu.querySelectorAll('a').forEach(item => {
            const closeMenuAndNavigate = (event) => {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');

                // Handle navigation for hash links or external links
                const href = event.currentTarget.getAttribute('href'); // Use currentTarget
                if (href) {
                    // Small delay to ensure menu visually closes before navigation occurs
                    setTimeout(() => {
                        // For internal anchors, let the browser handle the scroll
                        // For other links, perform regular navigation
                        window.location.href = href;
                    }, 100);
                }
            };

            item.addEventListener('click', closeMenuAndNavigate);
            item.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent default touch for link to ensure custom action
                closeMenuAndNavigate(e); // Call the close and navigate function
            }, { passive: false }); // Important for `preventDefault()` to work
        });

        // Close menu if user clicks or touches outside of it
        const closeMenuIfOutside = (event) => {
            // If the menu is open AND the click/touch target is neither the nav menu nor the menu button
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(event.target) &&
                !menuButton.contains(event.target))
            {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        };

        document.addEventListener('click', closeMenuIfOutside);
        document.addEventListener('touchstart', closeMenuIfOutside);

        // Close menu if window is resized past mobile breakpoint (e.g., desktop view)
        window.addEventListener('resize', function() {
            // Adjust '992' to your CSS breakpoint for mobile menu
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});