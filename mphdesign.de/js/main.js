/**
 * mphdesign - Main JavaScript
 * Ultra-slow, smooth animations with GSAP
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active section detection
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   GSAP Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Set defaults for ultra-smooth animations
    gsap.defaults({
        ease: 'power2.out',
        duration: 2
    });

    // Reveal animations (fade up)
    gsap.utils.toArray('.reveal').forEach((element, i) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: -80
            },
            {
                opacity: 1,
                x: 0,
                duration: 2.5,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal from right
    gsap.utils.toArray('.reveal-right').forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                x: 80
            },
            {
                opacity: 1,
                x: 0,
                duration: 2.5,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Scale reveal for portfolio items
    gsap.utils.toArray('.reveal-scale').forEach((element, i) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Service cards stagger animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        gsap.fromTo(serviceCards,
            {
                opacity: 0,
                y: 80
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Blog cards stagger animation
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
        gsap.fromTo(blogCards,
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.8,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: '.blog-grid',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Philosophy values stagger
    const philosophyValues = document.querySelectorAll('.philosophy-value');
    if (philosophyValues.length > 0) {
        gsap.fromTo(philosophyValues,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: '.philosophy-values',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                opacity: 0,
                y: 30,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 2,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Gold line animation for section titles
    gsap.utils.toArray('.section-title::after').forEach(line => {
        gsap.fromTo(line,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.5,
                delay: 0.5,
                scrollTrigger: {
                    trigger: line,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Parallax effect on hero
    gsap.to('.hero-logo', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Portfolio items hover enhancement
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');
        const img = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(img, {
                scale: 1.08,
                duration: 1.5,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(img, {
                scale: 1,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    });
}

/* --------------------------------------------------------------------------
   Smooth Scroll
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed nav
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                // Use GSAP for ultra-smooth scroll
                gsap.to(window, {
                    duration: 2,
                    scrollTo: {
                        y: targetPosition,
                        autoKill: false
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Contact Form
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        // Add focus animations to inputs
        const inputs = form.querySelectorAll('.form-input, .form-textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    borderColor: '#C9A227',
                    duration: 0.3
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(input, {
                        borderColor: '#222222',
                        duration: 0.3
                    });
                }
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;

            // Animate button
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            gsap.to(submitBtn, {
                opacity: 0.7,
                duration: 0.3
            });

            // Simulate form submission (replace with actual backend)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success state
            submitBtn.textContent = 'Message Sent!';
            gsap.to(submitBtn, {
                background: '#C9A227',
                color: '#000000',
                opacity: 1,
                duration: 0.5
            });

            // Reset after delay
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                gsap.to(submitBtn, {
                    background: 'transparent',
                    color: '#C9A227',
                    duration: 0.5
                });
            }, 3000);
        });
    }
}

/* --------------------------------------------------------------------------
   Logo Hover Animation
   -------------------------------------------------------------------------- */
const navLogo = document.querySelector('.nav-logo img');
if (navLogo) {
    navLogo.addEventListener('mouseenter', () => {
        gsap.to(navLogo, {
            rotation: 180,
            duration: 1.2,
            ease: 'power2.inOut'
        });
    });

    navLogo.addEventListener('mouseleave', () => {
        gsap.to(navLogo, {
            rotation: 360,
            duration: 1.2,
            ease: 'power2.inOut'
        });
    });
}

/* --------------------------------------------------------------------------
   Cursor Trail Effect (optional enhancement)
   -------------------------------------------------------------------------- */
// Uncomment to enable custom cursor
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.8,
    ease: 'power2.out'
  });
});
*/

/* --------------------------------------------------------------------------
   Performance: Lazy load images
   -------------------------------------------------------------------------- */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✨ mphdesign - Website loaded successfully');
