// ===== GLOBAL VARIABLES =====
let currentImageIndex = 0;
const portfolioImages = [
    {
        src: 'images/a_piece_of_avant-garde_furniture_design_the_exoskeleton_armchair_an_intricate_3d-printed_bronze_exo_79bb6z825bmnalvna8nl_2.png',
        title: 'Exoskeleton Armchair',
        description: 'Авангардный дизайн мебели с 3D-печатным бронзовым экзоскелетом'
    },
    {
        src: 'images/a_hyperrealistic_product_design_photograph_of_a_futuristic_lounge_chair_named_singularity_the_chair_f3zx6886sjn21na7lqok_10.png',
        title: 'Singularity Chair',
        description: 'Футуристическое кресло с гиперреалистичным дизайном'
    },
    {
        src: 'images/a_piece_of_avant-garde_furniture_design_the_exoskeleton_armchair_an_intricate_3d-printed_bronze_exo_80stnvxvq2ynzitpjyn0_0.png',
        title: 'Bronze Exoskeleton',
        description: 'Интрикатный дизайн с бронзовой структурой'
    },
    {
        src: 'images/architectural_photography_by_fernando_guerra_a_modern_villa_seamlessly_integrated_into_a_rocky_clif_3o68lsan87gua4i9p4ml_0.png',
        title: 'Cliff Villa',
        description: 'Современная вилла, интегрированная в скалистый утес'
    },
    {
        src: 'images/hotorealistic_interior_of_a_private_villa_suite_in_a_desert_resort_a_wall_of_glass_retracts_complet_ydjre6eh92rs2dcszl8t_3.png',
        title: 'Desert Resort Suite',
        description: 'Интерьер частной виллы в пустынном курорте'
    },
    {
        src: 'images/hyper-detailed_photo_of_a_minimalist_luxury_bedroom_a_low_platform_bed_with_a_beige_leather_headboa_22b2ws5ra35u8a9t3hme_1.png',
        title: 'Minimalist Bedroom',
        description: 'Минималистичная роскошная спальня'
    },
    {
        src: 'images/hyperrealistic_interior_photo_of_a_minimalist_living_room_large_white_marble_slabs_with_subtle_grey_o3802pvx7j7gigzgp7xf_1.png',
        title: 'Marble Living Room',
        description: 'Минималистичная гостиная с мраморными плитами'
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initPreloader();
    initNavigation();
    initParallax();
    initAnimations();
    initPortfolio();
    initModal();
    initSmoothScroll();
    initLazyLoading();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
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
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollTop * speed;
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                              // Trigger counter animation if it's a stat number
                // if (entry.target.classList.contains(\'stat-number\')) {
                //     animateCounter(entry.target);
                // }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .text-block, .stat-item, .portfolio-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== PORTFOLIO =====
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    portfolioImages.forEach((image, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="portfolio-image" loading="lazy">
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            </div>
        `;
        
        portfolioItem.addEventListener('click', function() {
            openModal(index);
        });
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// ===== MODAL =====
function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalCounter = document.getElementById('modalCounter');

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation events
    modalPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
        updateModalImage();
    });

    modalNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
        updateModalImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (e.key === 'ArrowRight') {
                modalNext.click();
            }
        }
    });

    function updateModalImage() {
        const image = portfolioImages[currentImageIndex];
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
    }
}

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const modalImage = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');
    const image = portfolioImages[currentImageIndex];
    
    modalImage.src = image.src;
    modalImage.alt = image.title;
    modalCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
    
    // Add fade-in animation
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.style.opacity = '1';
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'visible';
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
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

// Apply throttling to scroll events
const throttledParallax = throttle(initParallax, 16);
window.addEventListener('scroll', throttledParallax);

// ===== ACCESSIBILITY =====
// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

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

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== TOUCH GESTURES FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'block') {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next image
            document.querySelector('.modal-next').click();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous image
            document.querySelector('.modal-prev').click();
        }
    }
}

// ===== CONTACT FORM ENHANCEMENT =====
function initContactForm() {
    const contactButton = document.querySelector('.contact-cta .btn-primary');
    
    contactButton.addEventListener('click', function() {
        // Create a simple contact modal or redirect to Telegram
        const whatsappUrl = 'http://wa.me/353874835929';
        window.open(whatsappUrl, '_blank');
    });
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', initScrollProgress);

// ===== ENHANCED ANIMATIONS =====
function addAdvancedAnimations() {
    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', addAdvancedAnimations);

