// ===================================
// جافا سكريبت لموقع استشارات ESG للموارد البشرية
// ===================================

// الإعدادات
const CONFIG = {
    FORM_SUBMIT_DELAY: 1500, // مللي ثانية لمحاكاة إرسال النموذج
    TOOLTIP_INIT_DELAY: 1000, // تأخير قبل تهيئة التلميحات
    OBSERVER_DELAYS: [1000, 2000] // تأخيرات لإعادة مراقبة العناصر
};

// انتظر تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function () {
    // alert('مرحبًا بك في استشارات ESG للموارد البشرية! استكشف خدماتنا وتواصل معنا للحصول على مزيد من المعلومات.');
    // تحميل محتوى القسم بشكل ديناميكي
    loadSectionContent();

    // تهيئة الرسوم المتحركة عند التمرير
    initScrollAnimations();

    // تهيئة التمرير السلس لروابط التنقل
    initSmoothScroll();

    // تهيئة تأثير التمرير في شريط التنقل
    initNavbarScroll();

    // تهيئة نموذج الاتصال
    initContactForm();

    // تهيئة الرسوم المتحركة للعداد
    initCounterAnimations();
});

// تحميل محتوى القسم من ملفات HTML منفصلة
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
                    // إعادة تهيئة نموذج الاتصال بعد تحميل قسم الاتصال
                    if (section.id === 'contact-content') {
                        initContactForm();
                    }
                    // إضافة فئات الرسوم المتحركة للتمرير إلى المحتوى المحمّل حديثًا
                    addScrollAnimationClasses(element);
                }
            })
            .catch(error => console.error('خطأ في تحميل القسم:', error));
    });
}

// إضافة فئات الرسوم المتحركة للتمرير إلى العناصر
function addScrollAnimationClasses(container) {
    const elements = container.querySelectorAll('.service-card, .testimonial-card, .value-card, .feature-card');
    elements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// تهيئة الرسوم المتحركة عند التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // مراقبة جميع العناصر بفئة scroll-animate
    function observeElements() {
        const animateElements = document.querySelectorAll('.scroll-animate');
        animateElements.forEach(element => observer.observe(element));
    }

    // المراقبة الأولية
    observeElements();

    // إعادة المراقبة بعد تأخير للقبض على المحتوى المحمّل ديناميكيًا
    CONFIG.OBSERVER_DELAYS.forEach(delay => {
        setTimeout(observeElements, delay);
    });
}

// تهيئة التمرير السلس
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

                // تحديث رابط التنقل النشط
                updateActiveNavLink(this);
            }
        });
    });
}

// تحديث رابط التنقل النشط
function updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// تهيئة تأثير التمرير في شريط التنقل
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // إضافة ظل عند التمرير
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;

        // تحديث القسم النشط في التنقل
        updateActiveSection();
    });
}

// تحديث القسم النشط بناءً على موضع التمرير
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

// تهيئة نموذج الاتصال
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // الحصول على بيانات النموذج
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // عرض حالة التحميل
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.disabled = true;

        // محاكاة إرسال النموذج (استبدل بمكالمة API فعلية)
        setTimeout(function () {
            // عرض رسالة النجاح
            showFormMessage('success', 'شكرًا لرسالتك! سنتواصل معك قريبًا.');

            // إعادة تعيين النموذج
            form.reset();

            // إعادة تعيين الزر
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // تسجيل بيانات النموذج (للتطوير)
            console.log('تم إرسال النموذج:', data);
        }, CONFIG.FORM_SUBMIT_DELAY);
    });
}

// عرض رسالة النموذج
function showFormMessage(type, message) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;

    messageDiv.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(function () {
        messageDiv.style.display = 'none';
    }, 5000);
}

// تهيئة الرسوم المتحركة للعداد
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    // إعادة مراقبة العدادات بشكل دوري للقبض على المحتوى المحمّل ديناميكيًا
    function observeCounters() {
        const counterElements = document.querySelectorAll('.counter');
        counterElements.forEach(counter => observer.observe(counter));
    }

    observeCounters();
    CONFIG.OBSERVER_DELAYS.forEach(delay => {
        setTimeout(observeCounters, delay);
    });
}

// تحريك العداد
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// إضافة تأثيرات التمرير على البطاقات
document.addEventListener('mouseover', function (e) {
    if (e.target.closest('.service-card, .testimonial-card, .feature-card, .value-card')) {
        const card = e.target.closest('.service-card, .testimonial-card, .feature-card, .value-card');
        card.style.transition = 'all 0.3s ease';
    }
});

// تهيئة التلميحات إذا كانت تلميحات Bootstrap مطلوبة
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// استدعاء تهيئة التلميحات
setTimeout(initTooltips, CONFIG.TOOLTIP_INIT_DELAY);

// إضافة تأثير التوازي إلى القسم الرئيسي
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// تحسين الأداء: تقليل أحداث التمرير
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

// تطبيق التقليل على الوظائف المكثفة للتمرير
const debouncedScroll = debounce(function () {
    updateActiveSection();
}, 100);

window.addEventListener('scroll', debouncedScroll);