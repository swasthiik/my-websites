if (menuButton && navMenu) {
        // Change this line:
        // menuButton.addEventListener('click', () => {

        // To this (add 'touchstart'):
        menuButton.addEventListener('click', (e) => { // Keep click for wider compatibility
            e.stopPropagation(); // Prevent event bubbling that might interfere with document click listener
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        menuButton.addEventListener('touchstart', (e) => { // Add touchstart for mobile
            e.stopPropagation(); // Prevent event bubbling
            e.preventDefault(); // Prevent default touch behavior (e.g., potential scroll/zoom)
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });


        // Close menu when a link is clicked (keep as is)
        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            });
            // Also add touchstart for nav links for consistency if needed, but click usually suffice
            item.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent default touch for link to ensure custom action
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                // Manually navigate after a short delay if it's an external link
                const href = e.target.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    setTimeout(() => { window.location.href = href; }, 100); 
                }
            });
        });

        // Close menu if user clicks outside of it
        // This 'click' listener might be catching touches from the button itself.
        // Let's modify it to specifically ignore clicks/touches on the button.
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
        // Add a touchstart listener for closing the menu too
        document.addEventListener('touchstart', (event) => {
             if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }