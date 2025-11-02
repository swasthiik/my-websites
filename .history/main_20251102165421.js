// main.js - CORRECTED AND FINAL VERSION

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

    // --- 2. Mobile Navigation Toggle ---
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuButton && navMenu) {
        navMenu.setAttribute('aria-hidden', 'true');

        // Function to close the menu
        const closeMenu = () => {
            menuButton.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            body.classList.remove('menu-open');
        };

        // Function to open the menu
        const openMenu = () => {
            menuButton.setAttribute('aria-expanded', 'true');
            navMenu.setAttribute('aria-hidden', 'false');
            body.classList.add('menu-open');
        };

        // Toggle menu when the button is clicked
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Add functionality to close the menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                const linkHref = link.getAttribute('href');

                // If it's a same-page link, close the menu and let smooth scrolling work
                if (linkHref && linkHref.startsWith('#')) {
                    closeMenu();
                }
                // For external links (like about.html), the browser will navigate automatically.
                // The new page will load with the menu closed by default.
            });
        });
    }

    // --- 3. Interactive Map (from contact.html) ---
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