(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const intro = document.getElementById('intro');
  const introLogo = document.getElementById('introLogo');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (intro && introLogo) {
    const seen = sessionStorage.getItem('swp_intro') === '1';
    if (seen) {
      intro.classList.add('done');
      nav.classList.add('show');
      document.querySelectorAll('[data-anim="fade-up"]').forEach((el) => el.classList.add('in'));
    } else {
      setTimeout(() => introLogo.classList.add('shrink'), 1500);
      setTimeout(() => {
        intro.classList.add('done');
        nav.classList.add('show');
        document.querySelectorAll('[data-anim="fade-up"]').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), i * 100);
        });
        sessionStorage.setItem('swp_intro', '1');
      }, 3000);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-anim="fade-up"]').forEach((el) => {
    if (!el.classList.contains('in')) observer.observe(el);
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
})();