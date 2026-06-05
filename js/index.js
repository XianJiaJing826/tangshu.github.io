const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setupParallax = () => {
  const parallaxNodes = document.querySelectorAll('[data-parallax]');
  if (!parallaxNodes.length || prefersReducedMotion) return;

  const updateParallax = () => {
    const offset = window.scrollY || window.pageYOffset;
    parallaxNodes.forEach(node => {
      const speed = Number(node.dataset.parallax || 0);
      node.style.setProperty('--parallax-shift', `${offset * speed}px`);
    });
  };

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
};

const setupScrollGlow = () => {
  if (prefersReducedMotion) return;
  const heroLight = document.querySelector('.hero-light');
  if (!heroLight) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight * 0.8;
        const progress = Math.min(scrollY / maxScroll, 1);
        const opacity = 0.15 - (progress * 0.12);
        heroLight.style.opacity = Math.max(opacity, 0);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

const setupParticles = () => {
  if (prefersReducedMotion) return;
  const container = document.querySelector('.particles-container');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = 18 + Math.random() * 14 + 's';
    container.appendChild(particle);
  }
};

const setupPanelCarousels = () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let index = 0;
    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 4000);
  });
};

const setupPreviewArrows = () => {
  const ribbon = document.querySelector('.preview-ribbon');
  const left = document.querySelector('.arrow-left');
  const right = document.querySelector('.arrow-right');
  if (!ribbon || !left || !right) return;

  const cardWidth = 388;
  let index = 0;

  // Clone cards for seamless looping
  const cards = document.querySelectorAll('.preview-item');
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    ribbon.appendChild(clone);
  });

  const allCards = document.querySelectorAll('.preview-item');
  const totalOriginals = cards.length;

  const moveSlider = () => {
    index++;
    ribbon.style.transition = 'transform .8s cubic-bezier(.22,.61,.36,1)';
    ribbon.style.transform = `translateX(-${index * cardWidth}px)`;

    if (index >= totalOriginals) {
      setTimeout(() => {
        ribbon.style.transition = 'none';
        ribbon.style.transform = 'translateX(0px)';
        index = 0;
      }, 850);
    }
  };

  let autoSlide = setInterval(moveSlider, 3000);

  ribbon.addEventListener('mouseenter', () => { clearInterval(autoSlide); });
  ribbon.addEventListener('mouseleave', () => { autoSlide = setInterval(moveSlider, 3000); });

  right.addEventListener('click', () => { moveSlider(); });

  left.addEventListener('click', () => {
    if (index <= 0) {
      index = totalOriginals;
      ribbon.style.transition = 'none';
      ribbon.style.transform = `translateX(-${index * cardWidth}px)`;
    }
    setTimeout(() => {
      index--;
      ribbon.style.transition = 'transform .8s cubic-bezier(.22,.61,.36,1)';
      ribbon.style.transform = `translateX(-${index * cardWidth}px)`;
    }, 20);
  });
};

setupParallax();
setupScrollGlow();
setupParticles();
setupPanelCarousels();
setupPreviewArrows();
