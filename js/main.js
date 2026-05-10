/* ============================================================
   NODO CORPORATIVO AV. 14 — main.js
   ============================================================ */

// ── NAVBAR SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ── HAMBURGER MOBILE ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SMOOTH SCROLL ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── INTERSECTION OBSERVER — SCROLL ANIMATIONS ──────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  animObserver.observe(el);
});

// ── METRIC BAR ANIMATION ───────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.metric-bar-fill').forEach(bar => {
  barObserver.observe(bar);
});

// ── TABS (PLANTAS) ─────────────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ── MODAL PDF ──────────────────────────────────────────────────
const modal = document.getElementById('modal-pdf');
const openModalBtns = document.querySelectorAll('[data-open-modal]');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => modal.classList.add('open'));
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => modal.classList.remove('open'));
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

// ── CONTACT FORM ───────────────────────────────────────────────
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Using Formspree — replace YOUR_FORM_ID with actual ID
    const formspreeEndpoint = 'https://formspree.io/f/mbdwanrd';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });

      if (response.ok) {
        form.reset();
        successMsg.style.display = 'block';
        btn.textContent = 'Dossier Solicitado';
      } else {
        throw new Error();
      }
    } catch {
      // Fallback: mailto
      const data = new FormData(form);
      const subject = encodeURIComponent('Solicitud de Dossier Técnico — Nodo Corporativo Av. 14');
      const body = encodeURIComponent(
        `Nombre: ${data.get('nombre')}\nEmpresa: ${data.get('empresa')}\nEmail: ${data.get('email')}\nCargo: ${data.get('cargo')}`
      );
      window.location.href = `mailto:info@nodocorporativo.com.ar?subject=${subject}&body=${body}`;
      btn.textContent = 'Solicitar Dossier Técnico e Ingeniería';
      btn.disabled = false;
    }
  });
}

// ── LIGHTBOX PLANOS ────────────────────────────────────────────
const lightbox   = document.getElementById('lightbox-planos');
const lbImg      = document.getElementById('lb-img');
const lbLabel    = document.getElementById('lb-label');
const lbClose    = document.getElementById('lb-close');
const lbPrev     = document.getElementById('lb-prev');
const lbNext     = document.getElementById('lb-next');
const planoItems = Array.from(document.querySelectorAll('.plano-item'));
let lbIndex = 0;

function lbOpen(index) {
  lbIndex = index;
  const item = planoItems[lbIndex];
  lbImg.src   = item.querySelector('img').src;
  lbImg.alt   = item.querySelector('img').alt;
  lbLabel.textContent = item.querySelector('.plano-label').textContent;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbClose_() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lbStep(dir) {
  lbIndex = (lbIndex + dir + planoItems.length) % planoItems.length;
  const item = planoItems[lbIndex];
  lbImg.src   = item.querySelector('img').src;
  lbImg.alt   = item.querySelector('img').alt;
  lbLabel.textContent = item.querySelector('.plano-label').textContent;
}

planoItems.forEach((item, i) => item.addEventListener('click', () => lbOpen(i)));
lbClose.addEventListener('click', lbClose_);
lbPrev.addEventListener('click', () => lbStep(-1));
lbNext.addEventListener('click', () => lbStep(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lbClose_();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      lbClose_();
  if (e.key === 'ArrowLeft')   lbStep(-1);
  if (e.key === 'ArrowRight')  lbStep(1);
});

// ── ACTIVE NAV LINK ON SCROLL ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ── LAZY LOAD IMAGES ───────────────────────────────────────────
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported — handled via HTML attribute
} else {
  // Fallback polyfill using IntersectionObserver
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}
