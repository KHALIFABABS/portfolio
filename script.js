// Main JavaScript File for Khalifa Sane Portfolio

// Configuration
const CONFIG = {
    API_URL: 'https://api.khalifasane.dev',
    ANIMATION_DURATION: 300,
    REFRESH_STATS: 30000,
    DEFAULT_LANG: 'fr'
};

// État global
let currentLang = localStorage.getItem('language') || CONFIG.DEFAULT_LANG;
let audioEnabled = false;
let presentationMode = false;

window.addEventListener('portfolio:languagechange', event => {
    currentLang = event.detail.language;
});

// Traductions COMPLÈTES pour toutes les pages
const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.projects': 'Projets',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        
        // Hero section
        'hero.greeting': 'Je suis',
        'hero.description': 'Je crée des expériences numériques exceptionnelles avec les technologies web modernes et des solutions de design créatives.',
        'hero.cta.projects': 'Voir mes projets',
        'hero.cta.contact': 'Me contacter',
        
        // About page
        'about.title': 'À propos de moi',
        'about.who': 'Qui suis-je ?',
        'about.para1': 'Je m\'appelle Ababacar Souleymane Sane , un passionné en ingénieur logiciel  basé à Dakar, Sénégal. Avec plus de 3 ans d\'expérience dans le développement web, je crée des solutions numériques innovantes qui allient performance et esthétique.',
        'about.para2': 'Mon parcours m\'a permis de travailler sur une variété de projets, des sites vitrines aux applications e-commerce complexes. Je suis constamment à l\'affût des nouvelles technologies pour offrir le meilleur à mes clients.',
        'about.para3': 'Au-delà du code, je suis passionné par le partage de connaissances et l\'innovation technologique.',
        
        // Projects page
        'projects.title': 'Mes réalisations',
        'projects.filter.all': 'Tous',
        'projects.filter.web': 'Sites web',
        'projects.filter.ecommerce': 'E-commerce',
        'projects.filter.app': 'Applications',
        'projects.filter.design': 'UI/UX Design',
        
        // Services page
        'services.title': 'Mes services',
        'services.dev': 'Développement Web',
        'services.ecom': 'E-commerce',
        'services.landing': 'Landing Pages',
        'services.uiux': 'UI/UX Design',
        'services.optim': 'Optimisation',
        
        // Contact page
        'contact.title': 'Contactez-moi',
        'contact.name': 'Nom complet',
        'contact.email': 'Email',
        'contact.phone': 'Téléphone',
        'contact.subject': 'Sujet',
        'contact.message': 'Votre message',
        'contact.send': 'Envoyer',
        
        // Footer
        'footer.rights': 'Tous droits réservés',
        'footer.quick': 'Liens rapides',
        'footer.services': 'Services',
        'footer.follow': 'Suivez-moi',
        'footer.newsletter': 'Newsletter'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.services': 'Services',
        'nav.contact': 'Contact',
        
        // Hero section
        'hero.greeting': "I'm",
        'hero.description': 'I create exceptional digital experiences with modern web technologies and creative design solutions.',
        'hero.cta.projects': 'View my projects',
        'hero.cta.contact': 'Contact me',
        
        // About page
        'about.title': 'About me',
        'about.who': 'Who am I?',
        'about.para1': "My name isAbabacar Souleymane Sane , a passionate software engineer based in Dakar, Senegal. With over 3 years of experience in web development, I create innovative digital solutions that combine performance and aesthetics.",
        'about.para2': 'My journey has allowed me to work on a variety of projects, from showcase websites to complex e-commerce applications. I constantly keep up with new technologies to offer the best to my clients.',
        'about.para3': 'Beyond code, I am passionate about knowledge sharing and technological innovation.',
        
        // Projects page
        'projects.title': 'My projects',
        'projects.filter.all': 'All',
        'projects.filter.web': 'Websites',
        'projects.filter.ecommerce': 'E-commerce',
        'projects.filter.app': 'Applications',
        'projects.filter.design': 'UI/UX Design',
        
        // Services page
        'services.title': 'My services',
        'services.dev': 'Web Development',
        'services.ecom': 'E-commerce',
        'services.landing': 'Landing Pages',
        'services.uiux': 'UI/UX Design',
        'services.optim': 'Optimization',
        
        // Contact page
        'contact.title': 'Contact me',
        'contact.name': 'Full name',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.subject': 'Subject',
        'contact.message': 'Your message',
        'contact.send': 'Send',
        
        // Footer
        'footer.rights': 'All rights reserved',
        'footer.quick': 'Quick links',
        'footer.services': 'Services',
        'footer.follow': 'Follow me',
        'footer.newsletter': 'Newsletter'
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du portfolio...');
    
    // Ensure body is visible
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Initialize all components
    initParticles();
    initNavigation();
    initTypingEffect();
    initCounters();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initCustomCursor();
    init3DCards();
    initBlogCards();
    initToast();
    initErrorHandling();
    initImageFallback();
    initLiveStats();
    initPresentationMode();
    
    // Initialize GSAP after everything else - AVEC GESTION D'ERREURS
    setTimeout(() => {
        try {
            initGSAPAnimations();
        } catch (error) {
            console.warn('GSAP animations skipped:', error);
        }
    }, 200);
    
    // Show all content
    showAllContent();
    
    // Auto-save form
    initAutoSave();
    
    // Ambient sound
    initAmbientSound();
    
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            if (!filter) return;

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;
                filterButton.classList.toggle('active', isActive);
                filterButton.classList.toggle('bg-blue-600', isActive);
                filterButton.classList.toggle('bg-gray-800', !isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            projectCards.forEach(card => {
                card.hidden = filter !== 'all' && card.dataset.category !== filter;
            });
        });
    });
}

// Afficher tout le contenu
function showAllContent() {
    const allElements = document.querySelectorAll('section, div, nav, footer, h1, h2, h3, p, a, button, span');
    allElements.forEach(el => {
        if (el.classList.contains('hidden')) return;
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.display = el.style.display === 'none' ? '' : el.style.display;
    });
    
    // Forcer l'affichage de la section "Qui suis-je"
    const aboutIntro = document.getElementById('about-intro');
    if (aboutIntro) {
        aboutIntro.style.opacity = '1';
        aboutIntro.style.visibility = 'visible';
        aboutIntro.style.display = 'block';
    }
}

// Language Switcher CORRIGÉ
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Définir le bouton actif selon la langue sauvegardée
    langBtns.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active', 'bg-blue-600');
        } else {
            btn.classList.remove('active', 'bg-blue-600');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update active state
            langBtns.forEach(b => b.classList.remove('active', 'bg-blue-600'));
            btn.classList.add('active', 'bg-blue-600');
            
            // Update content
            updateContentLanguage();
            
            // Afficher une notification
            if (window.showToast) {
                showToast(lang === 'fr' ? 'Langue changée en français' : 'Language switched to English');
            }
        });
    });
}

// Mise à jour du contenu linguistique CORRIGÉE
function updateContentLanguage() {
    console.log('Changement de langue vers:', currentLang);
    
    // Mettre à jour les attributs data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang] && translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[currentLang][key];
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
    
    // Mise à jour spécifique pour la page about
    const aboutTitle = document.querySelector('h1 span.bg-gradient-to-r');
    if (aboutTitle && aboutTitle.textContent.includes('À propos')) {
        aboutTitle.textContent = currentLang === 'fr' ? 'À propos' : 'About';
    }
    
    // Mise à jour des textes statiques par ID
    const aboutIntro = document.querySelector('#about-intro h2');
    if (aboutIntro) {
        aboutIntro.innerHTML = `<i class="fas fa-user-circle text-blue-500 mr-3"></i> ${
            currentLang === 'fr' ? 'Qui suis-je ?' : 'Who am I?'
        }`;
    }
    
    // Mise à jour des badges
    const badges = document.querySelectorAll('.badge-text');
    // ... etc
}

// Counters Animation CORRIGÉE
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || 0;
                let count = 0;
                const duration = 2000;
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                
                // S'assurer que le compteur est visible
                counter.style.opacity = '1';
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target + (counter.id.includes('years') ? '' : '+');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count) + (counter.id.includes('years') ? '' : '+');
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Skill Bars Animation CORRIGÉE
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if (!skillBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0';
                
                // Animation progressive
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.opacity = '1';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        // Initialiser à 0
        bar.style.width = '0%';
        bar.style.opacity = '1';
        observer.observe(bar);
    });
}

// GSAP Animations avec fallback
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP non chargé - utilisation des animations CSS de fallback');
        return;
    }
    
    try {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animations simples sans effets complexes
        gsap.utils.toArray('.glass-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=50',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1
            });
        });
        
    } catch (error) {
        console.warn('GSAP animation error:', error);
    }
}

// Particles.js avec fallback
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 40, density: { enable: true, value_area: 800 } },
                    color: { value: '#3b82f6' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true },
                    size: { value: 2, random: true },
                    line_linked: { enable: true, distance: 150, color: '#8b5cf6', opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 1, direction: 'none', random: true, straight: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.warn('Particles error:', error);
        }
    }
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu) {
            mobileMenu.classList.add('hidden');
            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active', 'text-white');
            link.classList.remove('text-gray-300');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Typing Effect
function initTypingEffect() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const words = currentLang === 'fr' 
        ? ['Ingénieur Logiciel', 'Développeur Web', 'UI/UX Designer', 'Résolveur de problèmes']
        : ['Software Engineer', 'Web Developer', 'UI/UX Designer', 'Problem Solver'];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !follower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform += ' scale(0.8)';
        follower.style.transform += ' scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
        follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
    });
}

// 3D Cards
function init3DCards() {
    document.querySelectorAll('.project-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Blog Cards
function initBlogCards() {
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', () => {
            trackEvent('Blog', 'click', card.querySelector('h3')?.textContent || '');
        });
    });
}

// Live Statistics
function initLiveStats() {
    const updateStats = () => {
        const visitors = Math.floor(Math.random() * 50) + 10;
        const views = Math.floor(Math.random() * 1000) + 500;
        
        document.querySelectorAll('.live-visitors').forEach(el => {
            el.textContent = visitors;
        });
        
        document.querySelectorAll('.total-views').forEach(el => {
            el.textContent = views.toLocaleString();
        });
    };
    
    updateStats();
    setInterval(updateStats, CONFIG.REFRESH_STATS);
}

// Toast Notifications
function initToast() {
    window.showToast = (message, type = 'info') => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.remove('translate-y-full');
        
        toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 z-50 ${
            type === 'error' ? 'bg-red-600' :
            type === 'success' ? 'bg-green-600' :
            'bg-blue-600'
        } text-white`;
        
        setTimeout(() => {
            toast.classList.add('translate-y-full');
        }, 3000);
    };
}

// Error Handling
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Erreur capturée:', e.error);
        if (window.showToast) {
            showToast('Une erreur est survenue', 'error');
        }
    });
}

// Image Fallback
function initImageFallback() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'images/placeholder.jpg';
            img.alt = 'Image non disponible';
        });
    });
}

// Form Auto-save
function initAutoSave() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            localStorage.setItem('contactFormDraft', JSON.stringify(data));
        });
    });
    
    const draft = localStorage.getItem('contactFormDraft');
    if (draft) {
        try {
            const data = JSON.parse(draft);
            Object.keys(data).forEach(key => {
                const field = contactForm.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                    const formGroup = field.closest('.form-group');
                    if (formGroup && data[key]) {
                        formGroup.classList.add('focused');
                    }
                }
            });
        } catch (e) {
            console.error('Erreur de restauration:', e);
        }
    }
}

// Presentation Mode
function initPresentationMode() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            presentationMode = !presentationMode;
            
            if (presentationMode) {
                document.body.classList.add('presentation-mode');
                startSlideshow();
                if (window.showToast) showToast('Mode présentation activé', 'success');
            } else {
                document.body.classList.remove('presentation-mode');
                stopSlideshow();
                if (window.showToast) showToast('Mode présentation désactivé', 'info');
            }
        }
    });
}

let slideshowInterval;
function startSlideshow() {
    const sections = document.querySelectorAll('section');
    let currentSection = 0;
    
    slideshowInterval = setInterval(() => {
        currentSection = (currentSection + 1) % sections.length;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }, 5000);
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

// Ambient Sound
function initAmbientSound() {
    const audio = document.getElementById('ambient-sound');
    if (!audio) return;
    
    document.addEventListener('click', () => {
        if (!audioEnabled) {
            audio.play().catch(() => {});
            audioEnabled = true;
        }
    }, { once: true });
}

// Analytics Tracking
function trackEvent(category, action, label) {
    console.log('📊 Track:', { category, action, label });
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    const events = JSON.parse(localStorage.getItem('analytics') || '[]');
    events.push({ category, action, label, timestamp: Date.now() });
    localStorage.setItem('analytics', JSON.stringify(events));
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const validateField = (field) => {
        const value = field.value.trim();
        const type = field.type;
        const formGroup = field.closest('.form-group');
        
        let isValid = true;
        let errorMessage = '';
        
        switch (type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorMessage = 'Email invalide';
                break;
            case 'text':
                if (field.id === 'name') {
                    isValid = value.length >= 2;
                    errorMessage = 'Minimum 2 caractères';
                }
                break;
        }
        
        if (field.tagName === 'TEXTAREA' && field.id === 'message') {
            isValid = value.length >= 10;
            errorMessage = 'Minimum 10 caractères';
        }
        
        field.classList.toggle('border-red-500', !isValid && value);
        field.classList.toggle('border-green-500', isValid && value);
        
        if (formGroup) {
            let errorEl = formGroup.querySelector('.error-message');
            if (!isValid && value) {
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'error-message text-red-500 text-sm mt-1';
                    formGroup.appendChild(errorEl);
                }
                errorEl.textContent = errorMessage;
                errorEl.classList.remove('hidden');
            } else if (errorEl) {
                errorEl.classList.add('hidden');
            }
        }
        
        return isValid;
    };
    
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        this.querySelectorAll('input, textarea').forEach(field => {
            if (field.required && !validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            if (window.showToast) showToast('Veuillez corriger les erreurs', 'error');
            return;
        }
        
        const successMessage = document.getElementById('successMessage');
        const overlay = document.getElementById('overlay');
        
        if (successMessage && overlay) {
            successMessage.classList.remove('hidden');
            overlay.classList.remove('hidden');
            
            trackEvent('Form', 'submit', 'Contact');
            
            this.reset();
            localStorage.removeItem('contactFormDraft');
        }
    });
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker erreur:', err);
        });
    });
}

// Handle page load
window.addEventListener('load', function() {
    console.log('✅ Page complètement chargée');
    document.body.classList.add('loaded');
    
    showAllContent();
    
    // Forcer l'affichage des compteurs et barres de compétences
    setTimeout(() => {
        initCounters();
        initSkillBars();
    }, 500);
    
    trackEvent('Page', 'view', window.location.pathname);
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        showAllContent();
    }
});

// Online/Offline detection
window.addEventListener('online', () => {
    if (window.showToast) showToast('Vous êtes de nouveau en ligne', 'success');
});

window.addEventListener('offline', () => {
    if (window.showToast) showToast('Mode hors ligne activé', 'info');
});

// Export functions
window.trackEvent = trackEvent;
window.showToast = window.showToast;

// Ajouter ces fonctions dans script.js

// Configuration WhatsApp
const WHATSAPP_CONFIG = {
    phoneNumber: '221771234567', // Numéro avec indicatif sans +
    messageTemplate: (data) => {
        return `*Nouveau message depuis le portfolio*%0A%0A` +
               `*Nom:* ${data.name}%0A` +
               `*Email:* ${data.email}%0A` +
               `*Téléphone:* ${data.phone || 'Non renseigné'}%0A` +
               `*Sujet:* ${data.subject}%0A` +
               `*Budget:* ${data.budget || 'Non spécifié'}%0A%0A` +
               `*Message:*%0A${data.message}%0A%0A` +
               `*Date:* ${new Date().toLocaleString('fr-FR')}`;
    }
};

// Initialisation newsletter
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        const consent = document.getElementById('newsletterConsent').checked;
        
        if (!consent) {
            showToast('Veuillez accepter la politique de confidentialité', 'error');
            return;
        }
        
        // Validation email
        if (!isValidEmail(email)) {
            showToast('Email invalide', 'error');
            return;
        }
        
        // Sauvegarde dans localStorage
        saveNewsletterSubscriber(email);
        
        // Envoi vers WhatsApp (optionnel - pour notifier l'admin)
        sendNewsletterNotification(email);
        
        // Afficher confirmation
        const messageEl = document.getElementById('newsletterMessage');
        messageEl.classList.remove('hidden');
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Disparaître après 5 secondes
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 5000);
        
        // Tracker
        trackEvent('Newsletter', 'subscribe', email);
        showToast('Inscription réussie !', 'success');
    });
    
    // Validation en temps réel
    const emailInput = document.getElementById('newsletterEmail');
    emailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (isValidEmail(this.value)) {
                this.classList.remove('border-red-500');
                this.classList.add('border-green-500');
            } else {
                this.classList.remove('border-green-500');
                this.classList.add('border-red-500');
            }
        } else {
            this.classList.remove('border-red-500', 'border-green-500');
        }
    });
}

// Validation email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sauvegarde newsletter
function saveNewsletterSubscriber(email) {
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    
    // Vérifier si déjà inscrit
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        
        // Mettre à jour le compteur
        updateSubscriberCount();
    } else {
        showToast('Cet email est déjà inscrit', 'info');
    }
}

// Mettre à jour le compteur d'abonnés
function updateSubscriberCount() {
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    const countEl = document.querySelector('.newsletter-count');
    if (countEl) {
        countEl.textContent = subscribers.length;
    }
}

// Envoi notification newsletter vers WhatsApp (admin)
function sendNewsletterNotification(email) {
    const message = `📧 *Nouvel abonné Newsletter*%0A%0A` +
                    `*Email:* ${email}%0A` +
                    `*Date:* ${new Date().toLocaleString('fr-FR')}%0A` +
                    `*Total abonnés:* ${JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]').length}`;
    
    // Optionnel - ouvrir WhatsApp discrètement
    // window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`, '_blank');
}

// Modification de la fonction initContactForm pour WhatsApp
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Validation des champs
    const validateField = (field) => {
        const value = field.value.trim();
        const type = field.type;
        const formGroup = field.closest('.form-group');
        
        let isValid = true;
        let errorMessage = '';
        
        switch (type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorMessage = 'Email invalide';
                break;
            case 'text':
                if (field.id === 'name') {
                    isValid = value.length >= 2;
                    errorMessage = 'Minimum 2 caractères';
                }
                break;
        }
        
        if (field.tagName === 'TEXTAREA' && field.id === 'message') {
            isValid = value.length >= 10;
            errorMessage = 'Minimum 10 caractères';
        }
        
        field.classList.toggle('border-red-500', !isValid && value);
        field.classList.toggle('border-green-500', isValid && value);
        
        if (formGroup) {
            let errorEl = formGroup.querySelector('.error-message');
            if (!isValid && value) {
                if (!errorEl) {
                    errorEl = document.createElement('p');
                    errorEl.className = 'error-message text-red-500 text-sm mt-1';
                    formGroup.appendChild(errorEl);
                }
                errorEl.textContent = errorMessage;
                errorEl.classList.remove('hidden');
            } else if (errorEl) {
                errorEl.classList.add('hidden');
            }
        }
        
        return isValid;
    };
    
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
    });
    
    // Nouvelle soumission vers WhatsApp
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifier le captcha
        const captchaInput = document.getElementById('captcha').value;
        if (parseInt(captchaInput) !== window.captchaResult) {
            showToast('Captcha incorrect', 'error');
            generateCaptcha();
            return;
        }
        
        // Valider le consentement
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showToast('Veuillez accepter les conditions', 'error');
            return;
        }
        
        // Valider tous les champs requis
        let isValid = true;
        this.querySelectorAll('[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showToast('Veuillez corriger les erreurs', 'error');
            return;
        }
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone')?.value || 'Non renseigné',
            subject: document.getElementById('subject').value,
            budget: document.querySelector('input[name="budget"]:checked')?.value || 'Non spécifié',
            message: document.getElementById('message').value
        };
        
        // Sauvegarder dans l'historique local
        saveContactHistory(formData);
        
        // Générer le message WhatsApp
        const whatsappMessage = WHATSAPP_CONFIG.messageTemplate(formData);
        
        // Ouvrir WhatsApp avec le message pré-rempli
        const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${whatsappMessage}`;
        
        // Afficher le message de succès
        showSuccessMessage();
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappUrl, '_blank');
        
        // Tracker l'événement
        trackEvent('Contact', 'whatsapp_submit', formData.subject);
        
        // Réinitialiser le formulaire
        this.reset();
        localStorage.removeItem('contactFormDraft');
        generateCaptcha();
        updateFormProgress();
        
        // Animation de succès
        animateSubmitButton();
    });
    
    // Gestion du sujet pour afficher le budget
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            const budgetSection = document.querySelector('.budget-section');
            if (this.value === 'project' || this.value === 'Demande de devis pour un projet') {
                budgetSection.classList.remove('hidden');
            } else {
                budgetSection.classList.add('hidden');
            }
        });
    }
    
    // Form input animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
}

// Sauvegarder l'historique des contacts
function saveContactHistory(data) {
    let history = JSON.parse(localStorage.getItem('contact_history') || '[]');
    history.push({
        ...data,
        timestamp: new Date().toISOString(),
        type: 'whatsapp'
    });
    // Garder seulement les 50 derniers
    if (history.length > 50) history = history.slice(-50);
    localStorage.setItem('contact_history', JSON.stringify(history));
}

// Afficher le message de succès
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const overlay = document.getElementById('overlay');
    
    if (successMessage && overlay) {
        successMessage.classList.remove('hidden');
        overlay.classList.remove('hidden');
        
        // Fermer après 5 secondes
        setTimeout(() => {
            successMessage.classList.add('hidden');
            overlay.classList.add('hidden');
        }, 5000);
    }
}

// Animation du bouton de soumission
function animateSubmitButton() {
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span class="relative z-10 flex items-center justify-center gap-2"><i class="fas fa-check"></i> Message prêt !</span>';
    
    setTimeout(() => {
        btn.innerHTML = '<span class="relative z-10 flex items-center justify-center gap-2"><i class="fab fa-whatsapp text-xl"></i> Envoyer sur WhatsApp</span>';
    }, 2000);
}

// Générer le captcha
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num1El = document.getElementById('captchaNum1');
    const num2El = document.getElementById('captchaNum2');
    
    if (num1El) num1El.textContent = num1;
    if (num2El) num2El.textContent = num2;
    window.captchaResult = num1 + num2;
}

// Mise à jour de la progression du formulaire
function updateFormProgress() {
    const fields = ['name', 'email', 'subject', 'message'];
    let filled = 0;
    
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.value && el.value.trim() !== '') {
            filled++;
        }
    });
    
    const progress = Math.round((filled / fields.length) * 100);
    const progressEl = document.getElementById('formProgress');
    const progressBar = document.getElementById('progressBar');
    
    if (progressEl) progressEl.textContent = progress + '%';
    if (progressBar) progressBar.style.width = progress + '%';
}

// Dans la fonction d'initialisation DOMContentLoaded, AJOUTER :
document.addEventListener('DOMContentLoaded', function() {
    // ... code existant ...
    
    // Initialiser la newsletter
    initNewsletter();
    
    // Initialiser le compteur d'abonnés
    updateSubscriberCount();
    
    // Générer le captcha
    generateCaptcha();
    
    // ... reste du code ...
});

// Fonction pour copier le message dans le presse-papier
function copyToClipboard() {
    const lastMessage = localStorage.getItem('lastWhatsAppMessage');
    if (lastMessage) {
        navigator.clipboard.writeText(decodeURIComponent(lastMessage)).then(() => {
            showToast('Message copié !', 'success');
        });
    }
}