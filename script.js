// =====================
// MENU BURGER MOBILE
// =====================
const nav = document.querySelector('nav');
const onglets = document.querySelector('.onglets');

// Créer le bouton burger si on est en mobile
function createBurgerMenu() {
    if (window.innerWidth <= 768 && !document.querySelector('.burger-btn')) {
        const burgerBtn = document.createElement('button');
        burgerBtn.className = 'burger-btn';
        burgerBtn.innerHTML = '☰';
        burgerBtn.setAttribute('aria-label', 'Menu');
        
        nav.appendChild(burgerBtn);
        
        burgerBtn.addEventListener('click', () => {
            onglets.classList.toggle('open');
            nav.classList.toggle('open');
            burgerBtn.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
        });
    } else if (window.innerWidth > 768) {
        const burger = document.querySelector('.burger-btn');
        if (burger) burger.remove();
        onglets.classList.remove('open');
        nav.classList.remove('open');
    }
}

// Fermer le menu au clic sur un lien
document.querySelectorAll('.onglets a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            onglets.classList.remove('open');
            nav.classList.remove('open');
            const burger = document.querySelector('.burger-btn');
            if (burger) burger.innerHTML = '☰';
        }
    });
});

// Init et resize
createBurgerMenu();
window.addEventListener('resize', createBurgerMenu);

// =====================
// CAROUSEL
// =====================
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carte');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let index = 0;

function updateCarousel() {
    const width = track.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
    track.style.transition = 'transform 0.6s ease';
}

btnRight.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateCarousel();
});

btnLeft.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// Swipe sur mobile
let startX = 0;
let endX = 0;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swipe gauche
            index = (index + 1) % cards.length;
        } else {
            // Swipe droite
            index = (index - 1 + cards.length) % cards.length;
        }
        updateCarousel();
    }
});

// =====================
// POPUP RÉSERVATION
// =====================
const popup = document.getElementById('reservation-popup');
const openBtn = document.getElementById('open-reservation');
const closeBtn = document.getElementById('close-popup');
const reserveBtn = document.querySelector('.reserve-btn');
const guestButtons = document.querySelectorAll('.guest-grid button');
const confirmGuests = document.getElementById('confirm-guests');

let selectedGuests = 2;

openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    popup.classList.remove('confirmed');
    document.body.style.overflow = '';
});

// Fermer au clic en dehors (mobile)
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
        popup.classList.remove('confirmed');
        document.body.style.overflow = '';
    }
});

guestButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        guestButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedGuests = btn.textContent;
    });
});

reserveBtn.addEventListener('click', () => {
    popup.classList.add('confirmed');
    confirmGuests.textContent = selectedGuests;
});

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // décalage pour la nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// BACK TO TOP
// =====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }
});

// =====================
// FORMULAIRE CONTACT
// =====================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulation envoi
    alert('Message envoyé ! Nous vous répondrons rapidement.');
    contactForm.reset();
    
    // Scroll vers le top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
// ANIMATIONS AU SCROLL
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animer les sections
document.querySelectorAll('section, .carte, .menu-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// =====================
// NAVBAR AU SCROLL
// =====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});