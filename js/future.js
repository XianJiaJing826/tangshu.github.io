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

const creatorCopy = {
poster:[
"输入一句主题，例如：“盛唐花钿与未来玉石光影”。",
"AI 将输出符合世界观的文创海报概念与画面描述。"
],
script:[
"自动生成分镜、运镜建议与旁白节奏。",
"帮助非遗内容从“资料”变成“可传播的故事”。"
],
copy:[
"可生成品牌故事、展览标题、活动文案与产品介绍。",
"让非遗表达保持温度，同时拥有传播效率。"
]
};

const setupCreatorTabs = ()=>{
const creatorTabs = document.querySelectorAll('.creator-tab');
const creatorPanels = document.querySelectorAll('.creator-panel');

if(!creatorTabs.length || !creatorPanels.length) return;

const renderNote = key=>{
const target = document.querySelector(`.creator-panel[data-panel="${key}"] .creator-note`);
if(!target || !creatorCopy[key]) return;

target.innerHTML = creatorCopy[key].map(line=>`<p>${line}</p>`).join('');
};

creatorTabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
const key = tab.dataset.creator;

creatorTabs.forEach(item=>{
const isActive = item === tab;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

creatorPanels.forEach(panel=>{
panel.classList.toggle('active', panel.dataset.panel === key);
});

renderNote(key);
});
});

const initialTab = document.querySelector('.creator-tab.active');
if(initialTab){
renderNote(initialTab.dataset.creator);
}
};

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupCreatorTabs();
