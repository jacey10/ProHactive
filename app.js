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

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const linkMap = {};

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        const id = href.substring(1);
        if (id) linkMap[id] = link;
    }
});

const observer = new IntersectionObserver((entries) => {
    // FIX 1: If we are near the top of the page (in the Hero section), 
    // clear all active links and stop execution.
    // (Adjust '300' if your hero section is taller/shorter)
    if (window.scrollY < 300) {
        navLinks.forEach(link => link.classList.remove('active'));
        return; 
    }

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            
            navLinks.forEach(link => link.classList.remove('active'));
            
            if (linkMap[id]) {
                linkMap[id].classList.add('active');
            }
        }
    });
}, {
    root: null,
    threshold: 0,
    // FIX 2: Adjusted rootMargin to trigger when the section is in the top 30% of the screen
    rootMargin: '-30% 0px -70% 0px'
});

sections.forEach(section => observer.observe(section));