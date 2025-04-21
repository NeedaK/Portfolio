document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link'); // Get all nav links

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- Close Menu When a Link is Clicked ---
    // Useful for Single Page Applications (SPA) like this one
    if(navLinks.length > 0 && hamburger && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is open before closing
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Add active class to nav link on scroll ---
    // This is a bit more complex and might require intersection observer
    // for better performance. Here's a simple scroll-based version:

    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

    function setActiveLink() {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Offset for header height + a little extra
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active from all links
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active'); // Add active to the matching link
            }
        });
         // If no section is active (e.g., at the very top or bottom),
         // you might want to highlight the first link or none.
         // This example doesn't explicitly handle that edge case.
    }

    // Add scroll listener only if there are sections and links to track
    if (sections.length > 0 && navLinks.length > 0) {
         window.addEventListener('scroll', setActiveLink);
         setActiveLink(); // Call once on load to set initial state
    }


    // --- Optional: Simple Fade-in effect on scroll ---
    const fadeElements = document.querySelectorAll('.project-card, .skill-category, #about .container, #contact .container'); // Elements to fade in

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    };

    const fadeInObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        // Initial state (hidden)
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Start observing
        fadeInObserver.observe(el);
    });


}); // End DOMContentLoaded