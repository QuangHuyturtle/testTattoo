// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
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

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        // If contact section doesn't exist on current page, redirect to contact page
        window.location.href = 'pages/contact.html';
    }
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.gallery-item, .value-item, .team-member, .stat-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation and submission
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(field.value.replace(/[^0-9]/g, ''))) {
                isValid = false;
                field.classList.add('error');
            }
        }
    });

    return isValid;
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background img');
    const heroContent = document.querySelector('.hero-content');

    if (heroBackground && heroContent) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Loading animation removal
window.addEventListener('load', function() {
    // Remove any loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll to top functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: 2px solid #d4af37;
        background: transparent;
        color: #d4af37;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        border-radius: 50%;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    }, 200));

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    createScrollToTopButton();
});

// Additional CSS styles for dynamic elements
const additionalStyles = `
    .error {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 5px rgba(255, 107, 107, 0.3) !important;
    }

    .scroll-to-top:hover {
        background: #d4af37 !important;
        color: #000 !important;
        transform: translateY(-5px) !important;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    /* Additional styles for gallery lightbox */
    .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        cursor: pointer;
    }

    .lightbox-content {
        max-width: 90%;
        max-height: 80%;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .close-lightbox {
        position: absolute;
        top: 20px;
        right: 35px;
        color: #d4af37;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
        cursor: pointer;
    }

    .close-lightbox:hover {
        color: #fff;
    }

    .lightbox-info {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #fff;
    }

    .lightbox-info h3 {
        font-family: 'Oswald', sans-serif;
        font-size: 24px;
        margin-bottom: 10px;
    }

    /* Contact form styles */
    .contact-form {
        background: rgba(51, 51, 51, 0.1);
        padding: 30px;
        border-radius: 10px;
        border: 1px solid #333;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #ccc;
        font-family: 'Oswald', sans-serif;
        font-size: 14px;
        letter-spacing: 1px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        background: rgba(26, 26, 26, 0.8);
        border: 1px solid #333;
        color: #ccc;
        border-radius: 5px;
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #d4af37;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
    }

    .checkbox-label input {
        margin-right: 10px;
        width: auto;
    }

    .submit-btn {
        background: transparent;
        color: #fff;
        border: 2px solid #d4af37;
        padding: 15px 40px;
        font-family: 'Oswald', sans-serif;
        font-size: 16px;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        width: 100%;
    }

    .submit-btn:hover {
        background: #d4af37;
        color: #000;
    }
`;

// Append additional styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);