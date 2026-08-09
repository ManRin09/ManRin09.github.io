export function initNavigation() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Get target section id from href (e.g., #inicio)
      const targetId = link.getAttribute('href').substring(1);

      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      link.classList.add('active');

      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });

      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // CTA button support in Hero section
  const ctaButton = document.getElementById('cta-proyectos');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      const proyectosLink = document.querySelector('.nav-links a[href="#proyectos"]');
      if (proyectosLink) {
        proyectosLink.click();
      }
    });
  }
}
