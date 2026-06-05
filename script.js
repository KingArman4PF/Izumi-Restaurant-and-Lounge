/* =============================================
   IZUMI RESTAURANT & LOUNGE — SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // NAVBAR — scroll state
  // =============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // =============================================
  // HAMBURGER — mobile menu
  // =============================================
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks   = document.querySelectorAll('.mob-link');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobLinks.forEach(link => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }));


  // =============================================
  // REVEAL — scroll-triggered animations
  // =============================================
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // Hero — trigger on load
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
  }, 100);


  // =============================================
  // MENU TABS
  // =============================================
  const tabBtns      = document.querySelectorAll('.tab-btn');
  const menuSections = document.querySelectorAll('.menu-section');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      menuSections.forEach(sec => {
        if (sec.dataset.section === tab) {
          sec.style.display = 'block';
          sec.style.opacity = '0';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              sec.style.transition = 'opacity 0.35s ease';
              sec.style.opacity = '1';
            });
          });
          sec.classList.add('active');
        } else {
          sec.style.display = 'none';
          sec.classList.remove('active');
        }
      });
    });
  });


  // =============================================
  // RESERVATION FORM
  // =============================================
  const form        = document.getElementById('reservationForm');
  const formSuccess = document.getElementById('formSuccess');
  const dateInput   = document.getElementById('date');

  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1200);
    });
  }


  // =============================================
  // SMOOTH SCROLL
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // =============================================
  // ACTIVE NAV on scroll
  // =============================================
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.4 }).observe;

  sections.forEach(sec => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.style.color = '');
          const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
          if (active) active.style.color = 'var(--gold)';
        }
      });
    }, { threshold: 0.4 }).observe(sec);
  });

});