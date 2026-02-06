const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const faqItems = document.querySelectorAll('.faq-item');
const faqPanels = document.querySelectorAll('.faq-panel');

faqItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const panel = faqPanels[index];
    const isOpen = panel.classList.contains('open');

    faqPanels.forEach((p) => p.classList.remove('open'));
    if (!isOpen) panel.classList.add('open');
  });
});

const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-visual, .highlight-strip, .section, .cta-banner, .footer'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
