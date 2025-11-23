// ----------------------------
// ELEMENT SELECTORS
// ----------------------------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar');

// ----------------------------
// MOBILE NAV TOGGLE
// ----------------------------
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ----------------------------
// SMOOTH SCROLL WITH OFFSET
// ----------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetID = this.getAttribute('href');

    if (targetID.length === 1) return;

    const target = document.querySelector(targetID);
    if (!target) return;

    e.preventDefault();

    const offset = navbar.offsetHeight + 10;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});

// ----------------------------
// NAVBAR SHADOW ON SCROLL
// ----------------------------
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.10)';
  } else {
    navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
  }
});

// ----------------------------
// REVEAL ANIMATION
// ----------------------------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// ----------------------------
// ACTIVE NAV HIGHLIGHT
// ----------------------------
function updateActiveLink() {
  let currentSection = '';

  sections.forEach(sec => {
    const offset = sec.offsetTop - navbar.offsetHeight - 50;
    if (window.scrollY >= offset) {
      currentSection = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ----------------------------
// FOOTER YEAR
// ----------------------------
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
