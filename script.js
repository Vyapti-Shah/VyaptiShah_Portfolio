// Navigation and section switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hireBtn = document.querySelector('.hire-btn');

    // Function to show specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Map nav link hrefs to section IDs
        const navMapping = {
            '#home': 'home',
            '#about': 'about', 
            '#services': 'services',
            '#work': 'work',
            '#pricing': 'pricing',
            '#testimonial': 'testimonial'
        };

        // Add active class to corresponding nav link
        let correspondingLink = null;
        Object.entries(navMapping).forEach(([href, id]) => {
            if (id === sectionId) {
                correspondingLink = document.querySelector(`[href="${href}"]`);
            }
        });

        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }

        // Scroll to top when switching sections
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            // Map navigation hrefs to section IDs
            const sectionMapping = {
                '#home': 'home',
                '#about': 'about',
                '#skills': 'skills', 
                '#education': 'education',
                '#project': 'project',
                '#contact': 'contact'
            };

            const targetId = sectionMapping[href];
            if (targetId) {
                showSection(targetId);
            }
        });
    });

    // Add click event listener to hire button
    hireBtn.addEventListener('click', function() {
        showSection('contact');
    });

    // Make showSection function globally available
    window.showSection = showSection;

    // Resume download function
    window.downloadResume = function() {
  fetch('resume_pdf\Vyapti_AIML_DA_DS_Resume.pdf')
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Vyapti_AIML_DA_DS_Resume.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
      showNotification('Resume downloaded successfully!', 'success');
    })
    .catch(err => {
      showNotification('Download failed. Please check file path.', 'error');
      console.error('Download error:', err);
    });
}

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (name && email && message) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Navbar scroll effect (enhanced for dark mode)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.classList.remove('scrolled');
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

    // Button click animations with ripple effect
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Typing animation for hero title (only on home section)
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = 'Hey! I am <span class="highlight">Vyapti Shah</span>';
            heroTitle.innerHTML = '';

            let i = 0;
            let isInTag = false;
            let currentTag = '';

            function typeWriter() {
                if (i < originalText.length) {
                    const char = originalText.charAt(i);

                    if (char === '<') {
                        isInTag = true;
                        currentTag = char;
                    } else if (char === '>' && isInTag) {
                        isInTag = false;
                        currentTag += char;
                        heroTitle.innerHTML += currentTag;
                        currentTag = '';
                    } else if (isInTag) {
                        currentTag += char;
                    } else {
                        heroTitle.innerHTML += char;
                    }

                    i++;
                    setTimeout(typeWriter, isInTag ? 10 : 80);
                }
            }

            // Start typing animation after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Initialize typing animation on load
    initTypingAnimation();

    // Parallax effect for decorative elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-element');

        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Interactive hover effects for cards
    const cards = document.querySelectorAll('.skill-card, .education-card, .project-card, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Intersection Observer for animations on scroll
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

    // Observe cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Mobile menu functionality
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const existingBtn = document.querySelector('.mobile-menu-btn');

        if (!existingBtn) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '☰';

            mobileMenuBtn.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('show');
            });

            navContainer.appendChild(mobileMenuBtn);
        }
    }

    // Initialize mobile menu if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            if (mobileBtn) {
                mobileBtn.remove();
            }
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        }
    });

    // Contact card interactive effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;

            // Copy to clipboard if it's email or phone
            if (text.includes('@') || text.includes('+91')) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Could not copy to clipboard', 'error');
                });
            }
        });
    });

    // Skills animation on hover
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Project GitHub links - open repo on click
const projectCards = document.querySelectorAll('.project-card');
const projectLinks = {
  'captcha-system': 'https://github.com/Vyapti-Shah/QR-based-Multi-level-CAPTCHA-System',
  'num-plate': 'https://github.com/Vyapti-Shah/fastapi_for_number_plate_ocr_model-', 
  'deepfake-detect': 'https://github.com/Vyapti-Shah/Deepfake-Detection'
};

projectCards.forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', function() {
    const projectId = this.getAttribute('onclick')?.match(/openProjectModal\(['"]([^'"]+)['"]\)/)?.[1];
    const githubUrl = projectLinks[projectId];
    
    if (githubUrl) {
      window.open(githubUrl, '_blank');
      showNotification('Opening GitHub repo...', 'info');
    } else {
      showNotification('GitHub link not available', 'error');
    }
  });
});

    // Initialize home section as active
    showSection('home');
});

// Dark/Light Mode Toggle (script.js)
function createDarkModeToggle() {
    // Create toggle button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '🌙';
    darkModeBtn.className = 'dark-mode-toggle';
    darkModeBtn.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 20px;
        background: #424242;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(darkModeBtn);
    
    // Load saved theme (default dark)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '☀️';
    }
    
    // Toggle handler
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeBtn.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', createDarkModeToggle);

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    // Notification styles
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10001';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.maxWidth = '300px';
    notification.style.wordWrap = 'break-word';

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Export functions for global use
window.portfolioFunctions = {
    scrollToTop,
    showNotification,
    showSection: window.showSection,
    downloadResume: window.downloadResume
};


// Add this new function
function scrollToProjects() {
  showSection('projects');
  document.getElementById('projects').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
}