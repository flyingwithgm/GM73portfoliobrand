// Preloader Animation
const preloader = document.getElementById('preloader');
const progress = document.querySelector('.progress');
gsap.to(progress, { width: '100%', duration: 2, ease: 'power2.out', onComplete: () => {
    gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.style.display = 'none' });
}});

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.1 });
});

// Hero Globe (Three.js)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animateGlobe();

// GSAP Animations
gsap.from('.hero-content h1', { opacity: 0, y: 50, duration: 1, delay: 2.5 });
gsap.from('.hero-content p', { opacity: 0, y: 50, duration: 1, delay: 2.7 });
gsap.from('.cta-button', { opacity: 0, scale: 0.8, duration: 1, delay: 2.9 });

// Timeline Animations
document.querySelectorAll('[data-gsap="fade-up"]').forEach((el, i) => {
    gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
        },
        delay: el.dataset.delay || 0,
    });
});

// Project Card Flip
document.querySelectorAll('[data-gsap="flip"]').forEach((card, i) => {
    card.addEventListener('mouseenter', () => card.classList.add('flipped'));
    card.addEventListener('mouseleave', () => card.classList.remove('flipped'));
});

// Vision & Gallery Animations
document.querySelectorAll('[data-gsap="zoom"]').forEach((el, i) => {
    gsap.from(el, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 80%' },
        delay: el.dataset.delay || 0,
    });
});

document.querySelectorAll('[data-gsap="scale"]').forEach((el, i) => {
    gsap.from(el, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 80%' },
        delay: el.dataset.delay || 0,
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        gsap.to(window, {
            scrollTo: document.querySelector(anchor.getAttribute('href')).offsetTop,
            duration: 1,
            ease: 'power2.out',
        });
    });
});

// Nav Active State
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
