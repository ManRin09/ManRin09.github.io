export function initNavigation() {
  const nav = document.querySelector('nav');
  const links = document.querySelectorAll('.nav-links a');
  const sectionLinks = document.querySelectorAll('.section-link');
  const sections = document.querySelectorAll('.section');
  const navToggle = document.querySelector('.nav-toggle');

  const closeMenu = () => {
    nav?.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Abrir menú');
  };

  const navigateTo = (targetId, activeLink = null) => {
    links.forEach(l => l.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    } else {
      const matchingNavLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
      matchingNavLink?.classList.add('active');
    }

    sections.forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    closeMenu();
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute('href').substring(1), link);
    });
  });

  sectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute('href').substring(1));
    });
  });

  const ctaButton = document.getElementById('cta-proyectos');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      navigateTo('proyectos', document.querySelector('.nav-links a[href="#proyectos"]'));
    });
  }

  document.addEventListener('click', (e) => {
    if (!nav?.classList.contains('nav-open')) return;
    if (nav.contains(e.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}
