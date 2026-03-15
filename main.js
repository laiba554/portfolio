/* ========================================================================= 
   Jawad Business Systems - Main JS Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Animated Counters --- */
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;
    const statsSection = document.getElementById('clients');

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + (target > 500 ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCounter();
        });
    };

    // Trigger stats animation when scrolled into view
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimatedStats) {
                animateCounters();
                hasAnimatedStats = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    /* --- Form Submission (Prevent Default for demo) --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                btn.style.background = '#10b981';
                btn.style.borderColor = '#10b981';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'all';
                }, 3000);
            }, 1500);
        });
    }

    /* --- Active Link Highlighting on Scroll --- */
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links .nav-link:not(.btn-contact)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
