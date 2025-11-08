// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appear = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
faders.forEach(el => appear.observe(el));
