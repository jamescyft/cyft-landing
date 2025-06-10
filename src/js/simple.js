// MINIMAL JAVASCRIPT - Just the basics

// Import CSS
import '../css/simple.css';

console.log('Cyft Simple Version Loaded');

// Basic smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Basic form handler
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Demo request submitted! We will contact you soon.');
        form.reset();
    });
}

// Basic demo button
const demoButton = document.querySelector('.demo button');
if (demoButton) {
    demoButton.addEventListener('click', () => {
        alert('Demo would start here in the full version.');
    });
} 