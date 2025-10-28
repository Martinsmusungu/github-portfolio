// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Initialize animated counters
    initCounters();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize image loading
    initImageLoading();
});

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });
    
    // Initial call to set active link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
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

function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        
        // Check if hero section is in viewport
        if (heroRect.bottom >= 0 && heroRect.top <= window.innerHeight) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50; // Animation duration control
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on initial load
}

// Project Filtering - Fixed and Enhanced
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Ensure all project cards are visible initially
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with improved animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    // Show the card
                    card.style.display = 'block';
                    // Small delay for staggered animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    // Hide the card
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    // Hide after animation completes
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
    
    // Add CSS transition for smooth filtering
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Image Loading Enhancement
function initImageLoading() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        // Add loading animation
        img.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        // Remove loading animation when loaded
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.style.opacity = '1';
        });
        
        // Handle loading errors with better fallbacks
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            console.warn('Failed to load project image:', this.src);
            
            // Create fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'project-placeholder';
            
            // Determine category from parent card
            const card = this.closest('.project-card');
            const category = card ? card.getAttribute('data-category') : 'default';
            placeholder.classList.add(category);
            
            // Add appropriate icon based on category
            const icons = {
                'water': '💧',
                'infrastructure': '📡',
                'research': '🔬',
                'environmental': '🌍',
                'innovation': '🤖',
                'agriculture': '🌾'
            };
            
            placeholder.innerHTML = `<span>${icons[category] || '📊'}</span>`;
            
            // Apply placeholder styling
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '3rem';
            placeholder.style.color = 'white';
            
            // Replace image with placeholder
            this.parentNode.replaceChild(placeholder, this);
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-out';
        
        // If image is already cached and loaded
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'message'];
            const missingFields = requiredFields.filter(field => !formObject[field] || formObject[field].trim() === '');
            
            if (missingFields.length > 0) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual submission logic)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message status status--${type}`;
    messageDiv.textContent = message;
    messageDiv.style.marginTop = 'var(--space-16)';
    
    const contactForm = document.getElementById('contact-form');
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.value-card, .achievement-item, .timeline-item, .project-card, .skill-category, .innovation-card, .cert-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const rect = skillsSection.getBoundingClientRect();
        
        // Check if skills section is in viewport
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            skillsAnimated = true;
            
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100 + (index * 50)); // Stagger animation
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on initial load
}

// Utility Functions
function throttle(func, wait) {
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

// Enhanced scroll performance
const throttledScroll = throttle(() => {
    updateActiveNavLink();
    updateNavbarBackground();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));

// Add click outside functionality for mobile menu
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navbar.contains(event.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    const navMenu = document.getElementById('nav-menu');
    
    // Close mobile menu with Escape key
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        const hamburger = document.getElementById('hamburger');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (!firstFocusableElement) return;
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    trapFocus(navMenu);
}

// Enhanced error handling for failed resource loads
window.addEventListener('error', (event) => {
    if (event.target.tagName === 'IMG') {
        // Handle image load errors
        const img = event.target;
        const placeholder = img.parentNode;
        
        if (placeholder && placeholder.classList.contains('project-image')) {
            console.warn('Failed to load image:', img.src);
            
            // Hide the broken image
            img.style.display = 'none';
            
            // Create fallback if not already exists
            if (!placeholder.querySelector('.fallback-icon')) {
                const fallbackIcon = document.createElement('div');
                fallbackIcon.className = 'fallback-icon';
                fallbackIcon.style.fontSize = '3rem';
                fallbackIcon.style.opacity = '0.5';
                fallbackIcon.style.display = 'flex';
                fallbackIcon.style.alignItems = 'center';
                fallbackIcon.style.justifyContent = 'center';
                fallbackIcon.style.height = '100%';
                fallbackIcon.textContent = '🖼️';
                
                placeholder.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)';
                placeholder.appendChild(fallbackIcon);
            }
        }
    }
}, true);

// Image lazy loading enhancement
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Progressive enhancement for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver support
    const fallbackElements = document.querySelectorAll('.fade-in-up');
    fallbackElements.forEach(element => {
        element.classList.add('fade-in-up');
    });
}

// Performance optimization - pause animations when not visible
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
});

// Observe all major sections for performance optimization
document.querySelectorAll('section').forEach(section => {
    performanceObserver.observe(section);
});

// Add print optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-mode');
});

console.log('Portfolio website loaded successfully! 🚀');
console.log('Enhanced project filtering and image loading implemented.');
