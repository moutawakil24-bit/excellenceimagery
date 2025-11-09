// script.js — interactive behaviours (lightweight, dependency-free)

/* ====== NAV: shrink on scroll ====== */
const navbar = document.querySelector('header.navbar');
const hero = document.querySelector('.hero');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  // shrink nav when scrolled past hero header height
  if (sc > 80) navbar.classList.add('shrink'); else navbar.classList.remove('shrink');
  lastScroll = sc;
});

/* ====== PARALLAX HERO BG ====== */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('mousemove', (e) => {
  // subtle parallax based on mouse (desktop)
  if (window.innerWidth > 900 && heroBg) {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  }
});
window.addEventListener('scroll', () => {
  // vertical parallax on scroll
  const y = window.scrollY * -0.12;
  if (heroBg) heroBg.style.transform = `translateY(${y}px)`;
});

/* ====== SMOOTH SCROLL FOR ANCHORS ====== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ====== REVEAL ON SCROLL (IntersectionObserver) ====== */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => revealObserver.observe(r));

/* ====== STAT COUNTER ====== */
const statEls = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      // animate number
      let current = 0;
      const duration = 1400;
      const start = performance.now();
      const step = (ts) => {
        const progress = Math.min(1, (ts - start) / duration);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statsObserver.observe(el));

/* ====== GALLERY LIGHTBOX ====== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const galleryGrid = document.getElementById('galleryGrid');

let currentIndex = -1;
let items = [];

function openLightbox(index) {
  const item = items[index];
  if (!item) return;
  lightboxImg.src = item.full;
  lightboxImg.alt = item.alt || '';
  lightboxCaption.textContent = item.alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  currentIndex = index;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentIndex = -1;
}

function nextLightbox() {
  if (items.length === 0) return;
  const next = (currentIndex + 1) % items.length;
  openLightbox(next);
}
function prevLightbox() {
  if (items.length === 0) return;
  const prev = (currentIndex - 1 + items.length) % items.length;
  openLightbox(prev);
}

// build items list
if (galleryGrid) {
  const imgs = Array.from(galleryGrid.querySelectorAll('img'));
  items = imgs.map(img => ({ full: img.dataset.full || img.src, alt: img.alt }));
  imgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });
}

// lightbox controls
const lbClose = document.querySelector('.lightbox-close');
const lbNext = document.querySelector('.lightbox-next');
const lbPrev = document.querySelector('.lightbox-prev');
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbNext) lbNext.addEventListener('click', nextLightbox);
if (lbPrev) lbPrev.addEventListener('click', prevLightbox);

// keyboard nav
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') nextLightbox();
  else if (e.key === 'ArrowLeft') prevLightbox();
});

// close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


/* ====== SIMPLE CAROUSEL FOR TESTIMONIALS ====== */
(function testimonialCarousel(){
  const track = document.querySelector('.carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;

  function goTo(i){
    if (!track) return;
    index = (i + slides.length) % slides.length;
    const offset = index * -100;
    track.style.transform = `translateX(${offset}%)`;
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

  // auto-advance
  let timer = setInterval(() => goTo(index + 1), 6000);
  [prevBtn, nextBtn, track].forEach(n => {
    if (n) n.addEventListener('mouseenter', () => clearInterval(timer));
    if (n) n.addEventListener('mouseleave', () => timer = setInterval(() => goTo(index + 1), 6000));
  });
})();

/* ====== Accessibility: focus outlines fo*
