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

const heritageCopy = {
embroidery:[
"此纹名为蹙金。",
"金线需顺光而行。",
"盛唐女子常以此纹入礼服之上。"
],
makeup:[
"花钿并不喧哗。",
"它只是轻轻落在额间。",
"却足以让一张面容拥有时代的秩序。"
],
papercut:[
"纸最薄，却最见手上的分寸。",
"每一次转角都藏着刀法的克制。",
"留下的留白，往往比图案更会说话。"
],
incense:[
"香气从不争先。",
"它总在灯影与衣袖之间缓慢弥散。",
"让记忆先于语言抵达。"
],
jewelry:[
"步摇不必夸张。",
"轻轻一动，珠玉与金属便自会生光。",
"真正动人的，往往是余韵。"
],
silk:[
"丝绸的柔软并不只是触感。",
"它也来自经纬之间极有耐心的秩序。",
"光一落下，布面便开始呼吸。"
]
};

const setupHeritageTabs = ()=>{
const tabs = document.querySelectorAll('.jade-tab');
const stages = document.querySelectorAll('.heritage-stage');
const guideScript = document.getElementById('guide-script');

if(!tabs.length || !stages.length || !guideScript) return;

const renderGuide = key=>{
guideScript.innerHTML = heritageCopy[key]
.map(line=>`<p>${line}</p>`)
.join('');
};

tabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
const key = tab.dataset.heritage;

tabs.forEach(item=>{
const isActive = item === tab;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

stages.forEach(stage=>{
stage.classList.toggle('active', stage.dataset.stage === key);
});

renderGuide(key);
});
});
};

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupHeritageTabs();
