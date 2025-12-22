// ===================================
// JavaScript for ESG HR Consulting Website
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Load section content dynamically
    loadSectionContent();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize counter animations
    initCounterAnimations();
});

// Load section content from separate HTML files
function loadSectionContent() {
    const sections = [
        { id: 'company-info-content', file: 'sections/company_info.html' },
        { id: 'services-content', file: 'sections/services.html' },
        { id: 'customers-content', file: 'sections/old_customers.html' },
        { id: 'contact-content', file: 'sections/contact_us.html' }
    ];
    
    sections.forEach(section => {
        fetch(section.file)
            .then(response => response.text())
            .then(html => {
                const element = document.getElementById(section.id);
                if (element) {
                    element.innerHTML = html;
                    // Reinitialize contact form after loading contact section
                    if (section.id === 'contact-content') {
                        initContactForm();
                    }
                    // Add scroll animation classes to newly loaded content
                    addScrollAnimationClasses(element);
                }
            })
            .catch(error => console.error('Error loading section:', error));
    });
}

// Add scroll animation classes to elements
function addScrollAnimationClasses(container) {
    const elements = container.querySelectorAll('.service-card, .testimonial-card, .value-card, .feature-card');
    elements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-animate class
    function observeElements() {
        const animateElements = document.querySelectorAll('.scroll-animate');
        animateElements.forEach(element => observer.observe(element));
    }
    
    // Initial observation
    observeElements();
    
    // Re-observe after a delay to catch dynamically loaded content
    setTimeout(observeElements, 1000);
    setTimeout(observeElements, 2000);
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Initialize navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
        
        // Update active section in navigation
        updateActiveSection();
    });
}

// Update active section based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Show success message
            showFormMessage('success', 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Log form data (for development)
            console.log('Form submitted:', data);
        }, 1500);
    });
}

// Show form message
function showFormMessage(type, message) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Initialize counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    // Re-observe counters periodically to catch dynamically loaded content
    function observeCounters() {
        const counterElements = document.querySelectorAll('.counter');
        counterElements.forEach(counter => observer.observe(counter));
    }
    
    observeCounters();
    setTimeout(observeCounters, 1000);
    setTimeout(observeCounters, 2000);
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add hover effects to cards
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.service-card, .testimonial-card, .feature-card, .value-card')) {
        const card = e.target.closest('.service-card, .testimonial-card, .feature-card, .value-card');
        card.style.transition = 'all 0.3s ease';
    }
});

// Initialize tooltips if Bootstrap tooltips are needed
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Call tooltip initialization
setTimeout(initTooltips, 1000);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(function() {
    updateActiveSection();
}, 100);

window.addEventListener('scroll', debouncedScroll);

console.log('ESG HR Consulting website initialized successfully!');
