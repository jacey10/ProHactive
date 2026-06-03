// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
    }
    });
}, { threshold: 0.1 });

reveals.forEach(el => io.observe(el));

// Stagger feature cards on reveal
const grid = document.querySelector('.features-grid');
if (grid) {
    const cards = grid.querySelectorAll('.feature-card');
    cards.forEach((c, i) => {
    c.style.transitionDelay = `${i * 0.06}s`;
    c.classList.add('reveal');
    io.observe(c);
    });
}