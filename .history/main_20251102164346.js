// main.js

// This single event listener waits for the entire page to be ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic Year Update for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const contactYearSpan = document.getElementById('current-year-contact');
    if (contactYearSpan) {
        contactYearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Mobile Navigation Toggle (IMPROVED LOGIC) ---
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuButton && navMenu) {
        // Set the initial state for accessibility
        navMenu.setAttribute('aria-hidden', 'true');

        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            
            // Toggle the attributes to show/hide the menu
            menuButton.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
            
            // Toggle a class on the body to prevent scrolling and animate the button
            body.classList.toggle('menu-open');
        });

        // --- START: UPDATED LINK-CLICKING LOGIC ---
        // This new logic correctly handles different types of links.
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                const linkHref = link.getAttribute('href');

                // ONLY run the "close menu" script for same-page anchor links
                if (linkHref && linkHref.startsWith('#')) {
                    // Check if the menu is open before trying to close it
                    if (menuButton.getAttribute('aria-expanded') === 'true') {
                        menuButton.setAttribute('aria-expanded', 'false');
                        navMenu.setAttribute('aria-hidden', 'true');
                        body.classList.remove('menu-open');
                    }
                }
                // For all other links (like 'about.html'), do nothing. 
                // The browser will navigate to the new page automatically.
            });
        });
        // --- END: UPDATED LINK-CLICKING LOGIC ---
    }

    // --- 3. Interactive Map (from contact.html) ---
    // This part of the script will only run if it finds the map buttons on the current page
    const clinicBtn = document.getElementById('show-clinic-map');
    const residenceBtn = document.getElementById('show-residence-map');
    const mapIframe = document.getElementById('google-map-iframe');

    if (clinicBtn && residenceBtn && mapIframe) {
        const clinicMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6720849303!2d73.1539158752945!3d22.3283282796677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc631a2c13d41%3A0x26422526431f7956!2sSamanvay%20North%20park!5e0!3m2!1sen!2sin!4v1730452296541!5m2!1sen!2sin";
        const residenceMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5587843651156!2d73.16113887529348!3d22.294627979688536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5c2560de8a9%3A0x231459a85a85055b!2sNavrachana%20School%2C%20Sama!5e0!3m2!1sen!2sin!4v1730452414343!5m2!1sen!2sin";

        clinicBtn.addEventListener('click', () => {
            mapIframe.src = clinicMapSrc;
            clinicBtn.classList.add('active');
            residenceBtn.classList.remove('active');
        });

        residenceBtn.addEventListener('click', () => {
            mapIframe.src = residenceMapSrc;
            residenceBtn.classList.add('active');
            clinicBtn.classList.remove('active');
        });
    }
});