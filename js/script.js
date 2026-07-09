// Page Loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.bankio-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 150);
    }
});

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        once: true,
        mirror: false,
        offset: 0,
    });
}

// Main Nav Toggle (Mobile Header)
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        if (navToggle.innerText === '☰' || navToggle.innerText === '✕') {
            navToggle.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
        }
    });
}

// Global Interaction: Close menus when clicking outside
document.addEventListener('click', (e) => {
    // Main Header Nav (Synchronized with 768px CSS breakpoint)
    if (window.innerWidth <= 768) {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if (navToggle.innerText === '✕') navToggle.innerText = '☰';
        }
    }
    
    // Dashboard Sidebar Toggle (if applicable)
    const dashboardSidebar = document.getElementById('sidebar');
    const dashboardMenuToggle = document.getElementById('menuToggle');
    if (window.innerWidth <= 991) {
        if (dashboardSidebar && dashboardSidebar.classList.contains('active') && !dashboardSidebar.contains(e.target) && !dashboardMenuToggle.contains(e.target)) {
            dashboardSidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
});

// Counter Animation for Tactical Stats
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const startingCount = +counter.innerText;
    const increment = target / speed;

    if (startingCount < target) {
        counter.innerText = Math.ceil(startingCount + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));



// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}


// Dynamic Profile Population (Immediate Execution)
(function populateProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get('email');
    let roleText = urlParams.get('role');
    
    try {
        if (!email || !roleText) {
            email = localStorage.getItem('bankio_email');
            roleText = localStorage.getItem('bankio_role_text');
        } else {
            localStorage.setItem('bankio_email', email);
            localStorage.setItem('bankio_role_text', roleText);
        }
    } catch (e) {
        console.warn('localStorage is blocked, relying solely on URL params');
    }
    
    if (email && roleText) {
        document.querySelectorAll('.user-dynamic-email').forEach(el => el.textContent = email);
        document.querySelectorAll('.user-dynamic-role').forEach(el => el.textContent = roleText);
        const initial = email.charAt(0).toUpperCase();
        document.querySelectorAll('.user-dynamic-avatar').forEach(el => el.textContent = initial);
    }
})();





// Initialize Testimonial Swiper
if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}
