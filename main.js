// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50 ? 'rgba(13,13,13,0.99)' : 'rgba(13,13,13,0.96)';
});

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if(navToggle) navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
if(backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// TYPING EFFECT
const phrases = [
  '> Initializing profile...',
  '> Loading offensive toolkit...',
  '> Target acquired: Red Team',
  '> Welcome to my portfolio_'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  if (!typedEl) return;
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

// MATRIX CANVAS — red
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  const chars = '01アイウエカキABCDEF></?!@#$%^&*{}[]';
  const fs = 14;
  let drops = [];
  const initDrops = () => { drops = Array(Math.floor(canvas.width / fs)).fill(1); };
  initDrops();
  window.addEventListener('resize', initDrops);
  setInterval(() => {
    ctx.fillStyle = 'rgba(13,13,13,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff3c3c';
    ctx.font = fs + 'px Share Tech Mono,monospace';
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
      if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 55);
}

// SCROLL FADE IN
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.exp-card,.project-card,.cert-card,.badge-card,.terminal-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s';
  observer.observe(el);
});
