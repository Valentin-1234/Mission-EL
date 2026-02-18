// ===========================
// ESTELLE LOVE — script.js
// ===========================

document.addEventListener(‘DOMContentLoaded’, () => {

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById(‘navbar’);
window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 30);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById(‘hamburger’);
const navLinks = document.getElementById(‘navLinks’);

hamburger.addEventListener(‘click’, () => {
navLinks.classList.toggle(‘open’);
hamburger.classList.toggle(‘active’);
});

// Close menu on nav link click
navLinks.querySelectorAll(‘a’).forEach(link => {
link.addEventListener(‘click’, () => {
navLinks.classList.remove(‘open’);
hamburger.classList.remove(‘active’);
});
});

// Close on outside click
document.addEventListener(‘click’, (e) => {
if (!navbar.contains(e.target)) {
navLinks.classList.remove(‘open’);
hamburger.classList.remove(‘active’);
}
});

// ===== DROPDOWN (mobile touch support) =====
const dropdowns = document.querySelectorAll(’.dropdown’);
dropdowns.forEach(dd => {
dd.querySelector(’.dropdown-toggle’).addEventListener(‘click’, (e) => {
if (window.innerWidth <= 900) {
e.preventDefault();
dd.classList.toggle(‘open’);
}
});
});

// ===== ANIMATED COUNTERS =====
const statNums = document.querySelectorAll(’.stat-num’);

const animateCounter = (el) => {
const target = parseInt(el.dataset.target);
const duration = 1800;
const start = performance.now();

```
const update = (now) => {
  const elapsed = now - start;
  const progress = Math.min(elapsed / duration, 1);
  const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
  const current = Math.round(eased * target);
  el.textContent = current;
  if (progress < 1) requestAnimationFrame(update);
};

requestAnimationFrame(update);
```

};

const counterObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
counterObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll(’.faq-item’);

faqItems.forEach(item => {
const question = item.querySelector(’.faq-question’);
const answer = item.querySelector(’.faq-answer’);

```
question.addEventListener('click', () => {
  const isOpen = item.classList.contains('open');

  // Close all
  faqItems.forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-answer').style.display = 'none';
  });

  // Open clicked if was closed
  if (!isOpen) {
    item.classList.add('open');
    answer.style.display = 'block';

    // Smooth animation
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.35s ease';
    requestAnimationFrame(() => {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    });

    // Clean up overflow after animation
    answer.addEventListener('transitionend', () => {
      answer.style.overflow = '';
      answer.style.maxHeight = '';
    }, { once: true });
  }
});
```

});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
‘.crit-card, .mission-card, .testi-card, .remu-card, .bonus-item, .value-list li’
);

revealEls.forEach(el => el.classList.add(‘reveal’));

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
setTimeout(() => {
entry.target.classList.add(‘visible’);
}, 60 * (Array.from(revealEls).indexOf(entry.target) % 6));
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== FORM SUBMISSION =====
const form = document.getElementById(‘contactForm’);
const formSuccess = document.getElementById(‘formSuccess’);

if (form) {
form.addEventListener(‘submit’, (e) => {
e.preventDefault();

```
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Envoi en cours… 💌';
  btn.disabled = true;

  // Simulate sending (replace with real API call for Vercel)
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1400);
});
```

}

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll(‘section[id]’);
const navAnchors = document.querySelectorAll(’.nav-links a[href^=”#”]’);

const activateLink = () => {
let current = ‘’;
sections.forEach(sec => {
if (window.scrollY >= sec.offsetTop - 120) {
current = sec.id;
}
});
navAnchors.forEach(a => {
a.style.color = ‘’;
a.style.background = ‘’;
if (a.getAttribute(‘href’) === `#${current}`) {
a.style.color = ‘var(–pink)’;
a.style.background = ‘rgba(233, 30, 140, 0.07)’;
}
});
};

window.addEventListener(‘scroll’, activateLink, { passive: true });

// ===== EASTER EGG: penalty row click =====
const penaltyRows = document.querySelectorAll(’.penalty-row’);
const funMessages = [
“❌ Candidature refusée d’office”,
“🚪 La porte est par là”,
“😂 Non sérieusement, passez votre chemin”,
“💀 RIP votre candidature”,
“🚫 Blacklist activée”
];

penaltyRows.forEach((row, i) => {
row.style.cursor = ‘pointer’;
row.addEventListener(‘click’, () => {
const val = row.querySelector(’.penalty-val’);
val.style.transition = ‘opacity 0.2s’;
val.style.opacity = ‘0’;
setTimeout(() => {
val.textContent = funMessages[i % funMessages.length];
val.style.opacity = ‘1’;
}, 200);
});
});

});