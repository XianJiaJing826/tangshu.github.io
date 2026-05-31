const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setupRevealObserver = ()=>{
const fadeNodes = document.querySelectorAll('.fade');

if(prefersReducedMotion){
fadeNodes.forEach(node=>node.classList.add('show'));
return;
}

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const target = entry.target;
target.classList.add('animating');
target.classList.add('show');
observer.unobserve(target);
setTimeout(()=>{
target.classList.remove('animating');
},1200);
}
});
},{threshold:.16,rootMargin:"0px 0px -8% 0px"});

fadeNodes.forEach(node=>observer.observe(node));
};

const setupPageTransition = ()=>{
const overlay = document.createElement('div');
overlay.className = 'page-transition-overlay';
document.body.appendChild(overlay);

requestAnimationFrame(()=>{
document.body.classList.add('page-ready');
});

document.querySelectorAll('a[href]').forEach(link=>{
link.addEventListener('click', event=>{
const href = link.getAttribute('href');
if(!href) return;

const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
const isExternalTarget = link.target && link.target !== '_self';
const isHashOnly = href.startsWith('#');
const isDownload = link.hasAttribute('download');

if(isModified || isExternalTarget || isHashOnly || isDownload) return;

event.preventDefault();
document.body.classList.add('is-leaving');

window.setTimeout(()=>{
window.location.href = href;
}, 420);
});
});
};

const setupAnchorScroll = ()=>{
const scrollToTarget = hash=>{
if(!hash) return;
const target = document.querySelector(hash);
if(!target) return;

const nav = document.querySelector('.nav');
const navOffset = nav ? nav.offsetHeight + 28 : 110;
const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

window.scrollTo({
top,
behavior: prefersReducedMotion ? 'auto' : 'smooth'
});
};

document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener('click', event=>{
const hash = link.getAttribute('href');
if(!hash || hash === '#') return;
event.preventDefault();
scrollToTarget(hash);
});
});

if(window.location.hash){
window.setTimeout(()=>scrollToTarget(window.location.hash), 80);
}
};

const setupParallax = ()=>{
const parallaxNodes = document.querySelectorAll('[data-parallax]');
if(!parallaxNodes.length || prefersReducedMotion) return;

const updateParallax = ()=>{
const offset = window.scrollY || window.pageYOffset;
parallaxNodes.forEach(node=>{
const speed = Number(node.dataset.parallax || 0);
node.style.setProperty('--parallax-shift', `${offset * speed}px`);
});
};

updateParallax();
window.addEventListener('scroll', updateParallax, { passive:true });
};

/* 滚动进度光效 */
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
        
        // 只修改透明度，不修改transform（避免与CSS动画冲突）
        const opacity = 0.15 - (progress * 0.12);
        heroLight.style.opacity = Math.max(opacity, 0);
        
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

/* 粒子效果 */
const setupParticles = () => {
  if (prefersReducedMotion) return;
  
  const container = document.querySelector('.particles-container');
  if (!container) return;
  
  const particleCount = 25;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 12 + Math.random() * 10;
    
    particle.style.left = left + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
  }
};

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupParallax();
setupScrollGlow();
setupParticles();

function setupPanelCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 4000); // 每4秒切换一张
  });
}

setupPanelCarousels();
function setupPreviewArrows() {
  const ribbon = document.querySelector('.preview-ribbon');
  const left = document.querySelector('.arrow-left');
  const right = document.querySelector('.arrow-right');

  if (!ribbon || !left || !right) return;

  const scrollAmount = 320; // 每次滑动一个卡片宽度

  left.addEventListener('click', () => {
    ribbon.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  right.addEventListener('click', () => {
    ribbon.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

setupPreviewArrows();
// 鼠标跟踪高光
const glow = document.querySelector('.cursor-glow');
let glowTimeout;

document.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
  glow.style.opacity = 1;

  clearTimeout(glowTimeout);
  glowTimeout = setTimeout(() => {
    glow.style.opacity = 0;
  }, 1800); // 停止 1.8 秒后淡出
});
