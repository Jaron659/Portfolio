// =====================================================
// GLOBAL VARIABLES
// =====================================================

let lastScrollY = window.scrollY;

const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');
const progressBar = document.getElementById('scrollProgress');

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

const revealElements = document.querySelectorAll('.reveal-element');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// =====================================================
// HERO CURSOR SPOTLIGHT
// =====================================================

const hero = document.getElementById('hero');

if (hero && window.matchMedia('(pointer: fine)').matches) {

    let ticking = false;

    hero.addEventListener('mousemove', (e) => {

        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {

            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--mx', `${x}%`);
            hero.style.setProperty('--my', `${y}%`);

            ticking = false;

        });

    });

}

// =====================================================
// SKILL BAR FILL ANIMATION
// =====================================================

const skillBars = document.querySelectorAll('.skill-bar-fill');

skillBars.forEach(bar => {
    const target = bar.style.width || '0%';
    bar.style.setProperty('--fill', target);
    bar.style.width = '';
});


// =====================================================
// PRELOADER
// =====================================================

const preloader = document.getElementById('preloader');

const hidePreloader = () => {
    if (!preloader || preloader.dataset.hidden === 'true') return;

    preloader.style.opacity = '0';
    preloader.dataset.hidden = 'true';

    setTimeout(() => {
        preloader.style.display = 'none';
    }, 400);
};

document.addEventListener('DOMContentLoaded', hidePreloader);
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 3000);

// =====================================================
// SCROLL EVENTS
// =====================================================

window.addEventListener('scroll', () => {

    const currentScrollY = window.scrollY;

    // Navbar Background

    if (navbar) {

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

    }

    // Progress Bar

    if (progressBar) {

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled =
            (currentScrollY / scrollHeight) * 100;

        progressBar.style.width = `${scrolled}%`;

    }

    // Back To Top Button

    if (backToTop) {

        if (currentScrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

    }

    // Scroll Direction Animation

    revealElements.forEach(el => {

        if (!el.classList.contains('visible')) {

            if (currentScrollY > lastScrollY) {

                el.classList.remove('scroll-up-active');
                el.classList.add('scroll-down-active');

            } else {

                el.classList.remove('scroll-down-active');
                el.classList.add('scroll-up-active');

            }

        }

    });

    lastScrollY = currentScrollY;

});

// =====================================================
// BACK TO TOP
// =====================================================

if (backToTop) {

    backToTop.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

}

// =====================================================
// MOBILE MENU
// =====================================================

if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener('click', () => {

        navMenu.classList.toggle('active');

        const icon =
            mobileMenuBtn.querySelector('i');

        if (icon) {

            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');

        }

    });

}

// Close Mobile Menu

navItems.forEach(link => {

    link.addEventListener('click', () => {

        if (navMenu) {
            navMenu.classList.remove('active');
        }

        const icon =
            mobileMenuBtn?.querySelector('i');

        if (icon) {

            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');

        }

    });

});

// =====================================================
// PROJECT FILTERS
// =====================================================

filterButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        filterButtons.forEach(button =>
            button.classList.remove('active')
        );

        btn.classList.add('active');

        const filterValue =
            btn.getAttribute('data-filter');

        projectCards.forEach(card => {

            const category =
                card.getAttribute('data-category');

            if (
                filterValue === 'all' ||
                category === filterValue
            ) {

                card.style.display = 'flex';

                setTimeout(() => {

                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';

                }, 50);

            } else {

                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {

                    card.style.display = 'none';

                }, 300);

            }

        });

    });

});

// =====================================================
// INTERSECTION OBSERVER
// =====================================================

const observerOptions = {

    root: null,
    threshold: 0.12,
    rootMargin: "0px"

};

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');


                entry.target
                    .querySelectorAll('.skill-bar-fill')
                    .forEach(bar => bar.classList.add('filled'));


                if (
                    entry.target.tagName === 'SECTION'
                ) {

                    const id =
                        entry.target.getAttribute('id');

                    navItems.forEach(item => {

                        item.classList.remove('active');

                        if (
                            item.getAttribute('href')
                            === `#${id}`
                        ) {

                            item.classList.add('active');

                        }

                    });

                }

            }

        });

    },

    observerOptions

);

// Observe Sections

sections.forEach(section => {

    observer.observe(section);

});

// Observe Reveal Elements

revealElements.forEach(el => {

    el.classList.add('scroll-down-active');

    observer.observe(el);

});

// =====================================================
// EMAILJS
// =====================================================

let emailJsLoaded = false;
const emailJsScript = document.createElement('script');

emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
emailJsScript.defer = true;
emailJsScript.onload = () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('WU9YrLHXnfyEbtEyR');
        emailJsLoaded = true;
    }
};
emailJsScript.onerror = () => {
    console.warn('EmailJS failed to load. Contact form will be disabled.');
};
document.head.appendChild(emailJsScript);

// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        function (e) {

            e.preventDefault();

            const submitBtn =
                this.querySelector('button');

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                'Sending...';

            if (!emailJsLoaded || typeof emailjs === 'undefined') {
                alert('Contact service is unavailable right now. Please try again later.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                return;
            }

            emailjs.send(
                'service_4ghpr7b',
                'template_3fp5c3g',
                {
                    name:
                        document.getElementById('name').value,

                    email:
                        document.getElementById('email').value,

                    message:
                        document.getElementById('message').value
                }
            )

                .then(() => {

                    alert(
                        'Message sent successfully!'
                    );

                    contactForm.reset();

                    submitBtn.disabled = false;

                    submitBtn.innerHTML =
                        'Send Message <i class="fa-solid fa-paper-plane"></i>';

                })

                .catch((error) => {

                    console.error(error);

                    alert(
                        'Failed to send message. Please try again.'
                    );

                    submitBtn.disabled = false;

                    submitBtn.innerHTML =
                        'Send Message <i class="fa-solid fa-paper-plane"></i>';

                });

        }
    );

}