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

const mentorCopy = {
embroidery:[
"针脚需缓。",
"不可急。",
"金线需顺光而行。"
],
makeup:[
"此式更近盛唐。",
"花钿位置可略高半寸。",
"发饰不必繁，留一点空才更见气韵。"
],
incense:[
"此香偏烈。",
"更适合冬日夜宴。",
"若要留香更长，便让木香再稳一些。"
]
};

const setupPracticeTabs = ()=>{
const practiceTabs = document.querySelectorAll('.practice-tab');
const practicePanels = document.querySelectorAll('.practice-panel');

if(!practiceTabs.length || !practicePanels.length) return;

const renderMentor = key=>{
const activePanel = document.querySelector(`.practice-panel[data-panel="${key}"] .mentor-quote`);
if(!activePanel || !mentorCopy[key]) return;

activePanel.innerHTML = mentorCopy[key]
.map(line=>`<p>${line}</p>`)
.join('');
};

practiceTabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
const key = tab.dataset.practice;

practiceTabs.forEach(item=>{
const isActive = item === tab;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

practicePanels.forEach(panel=>{
panel.classList.toggle('active', panel.dataset.panel === key);
});

renderMentor(key);
});
});

const initialTab = document.querySelector('.practice-tab.active');
if(initialTab){
renderMentor(initialTab.dataset.practice);
}
};

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupPracticeTabs();
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
