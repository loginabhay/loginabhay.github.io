// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Add staggered animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Add staggered animation for skill categories
                if (entry.target.classList.contains('skill-category')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Add staggered animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .project-card, .stat, .education-card, .award-card'
    );
    
    animateElements.forEach(el => observer.observe(el));

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('_replyto');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation for hero title (optional)
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing animation
        // typeWriter(heroTitle, originalText, 150);
    }

    // Scroll to top functionality
    function createScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createScrollToTop();

    // Lazy loading for images (if any images are added later)
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Theme switcher (optional feature)
    function createThemeSwitcher() {
        const themeButton = document.createElement('button');
        themeButton.innerHTML = '<i class="fas fa-moon"></i>';
        themeButton.className = 'theme-switcher';
        themeButton.style.cssText = `
            position: fixed;
            top: 50%;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--background-secondary);
            color: var(--text-primary);
            border: 2px solid var(--border-color);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            transform: translateY(-50%);
        `;
        
        // Uncomment to add theme switcher
        // document.body.appendChild(themeButton);
        
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeButton.querySelector('i').className = 'fas fa-sun';
        }
    }

    // Skills animation on scroll
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.5 });

    skillTags.forEach(tag => skillObserver.observe(tag));

    // Stats counter animation
    function animateCounters() {
        const stats = document.querySelectorAll('.stat h3');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseFloat(text);
                    
                    if (!isNaN(number)) {
                        animateCounter(target, 0, number, 2000, text.includes('%') || text.includes('+'));
                    }
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => counterObserver.observe(stat));
    }

    function animateCounter(element, start, end, duration, hasSymbol) {
        const startTime = performance.now();
        const suffix = element.textContent.match(/[^\d.]/g)?.join('') || '';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            
            element.textContent = Math.floor(current) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    animateCounters();

    // Parallax effect for hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('Portfolio website loaded successfully! 🚀');
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

// Enhanced scroll performance
const optimizedScroll = throttle(function() {
    // Scroll-dependent operations
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
        */
    });
}