document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu if user clicks outside of it
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth Scrolling for all internal #links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height if it's sticky to offset scroll position
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10, // -10 for a little extra padding
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                history.pushState(null, '', targetId);
            }
        });
    });

    // Handle "active" class for navigation links
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPath = linkHref.split('/').pop().split('#')[0]; // Get file name without hash

        // Handle direct page links (e.g., about.html, feedback.html)
        if (linkPath === currentPath) {
            link.classList.add('active');
        } 
        // Handle index.html as home page
        else if (currentPath === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
        // Handle links back to index.html sections when on other pages
        // If current page is NOT index.html, and this link points to index.html with a hash
        else if (currentPath !== 'index.html' && linkPath === 'index.html' && linkHref.includes('#')) {
             // For example, if on about.html and link is index.html#services, we don't set active here
             // Active class is primarily for the current page itself.
        }

        // Specifically for index.html links with hash
        if (currentPath === 'index.html' || currentPath === '') {
            if (linkHref.startsWith('#')) {
                // Active class for sections will be handled by Intersection Observer or manual check
                // For now, only activate the 'Home' link if on the home page without a hash,
                // or the specific section if scrolled to.
            }
        }
    });


    // Optional: Intersection Observer for active class on scroll for index.html sections
    if (currentPath === 'index.html' || currentPath === '') {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active')); // Remove all active
                    const matchingLink = document.querySelector(.nav-menu a[href="#${entry.target.id}"]);
                    if (matchingLink) {
                        matchingLink.classList.add('active');
                    } else if (entry.target.id === 'hero' && document.querySelector(.nav-menu a[href="index.html"])) {
                        document.querySelector(.nav-menu a[href="index.html"]).classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Set initial active link based on current URL hash if any
        if (window.location.hash) {
            navLinks.forEach(link => link.classList.remove('active'));
            const initialHashLink = document.querySelector(.nav-menu a[href="${window.location.hash}"]);
            if (initialHashLink) {
                initialHashLink.classList.add('active');
                // Scroll to the section if page loaded with a hash
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 10,
                        behavior: 'smooth'
                    });
                }
            }
        } else {
             // If no hash, activate 'Home' if on index.html
             if (currentPath === 'index.html' || currentPath === '') {
                const homeLink = document.querySelector('.nav-menu a[href="index.html"]');
                if (homeLink) homeLink.classList.add('active');
             }
        }
    }
});