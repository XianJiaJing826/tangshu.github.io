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
entry.target.classList.add('show');
observer.unobserve(entry.target);
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

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupParallax();
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
