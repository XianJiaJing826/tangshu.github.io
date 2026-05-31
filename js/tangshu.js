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

const setupMemoryShards = ()=>{
const memoryButtons = document.querySelectorAll('.memory-shard');
const memoryPanels = document.querySelectorAll('.memory-panel');

if(!memoryButtons.length || !memoryPanels.length) return;

memoryButtons.forEach(button=>{
button.addEventListener('click', ()=>{
const key = button.dataset.memory;

memoryButtons.forEach(item=>{
const isActive = item === button;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

memoryPanels.forEach(panel=>{
panel.classList.toggle('active', panel.dataset.panel === key);
});
});
});
};

const dialogueCopy = {
embroidery:{
user:"什么是蹙金绣？",
ai:[
"蹙金者，以金线隐入丝纹之间。",
"灯火之下，方见流光。",
"它不是张扬地发亮，而是在靠近时才慢慢显露出分寸。"
]
},
makeup:{
user:"花钿为什么总让人觉得温柔？",
ai:[
"因为它从不喧哗。",
"它只是轻轻落在额间，却足以改变整张面容的气韵。",
"真正的温柔，往往来自极轻的秩序。"
]
},
incense:{
user:"香艺最难学的是什么？",
ai:[
"不是配方本身。",
"而是分辨气味在时间里如何变化。",
"会调香的人，往往先学会了如何安静地感受。"
]
}
};

const setupDialogueTabs = ()=>{
const dialogueTabs = document.querySelectorAll('.dialogue-tab');
const userLine = document.getElementById('user-line');
const aiLines = document.getElementById('ai-lines');

if(!dialogueTabs.length || !userLine || !aiLines) return;

const renderDialogue = key=>{
const entry = dialogueCopy[key];
if(!entry) return;

userLine.textContent = entry.user;
aiLines.innerHTML = entry.ai.map(line=>`<p>${line}</p >`).join('');
};

dialogueTabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
const key = tab.dataset.dialogue;

dialogueTabs.forEach(item=>{
const isActive = item === tab;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

renderDialogue(key);
});
});
};

const setupSceneTabs = ()=>{
const sceneTabs = document.querySelectorAll('.scene-tab');
const scenePanels = document.querySelectorAll('.scene-panel');

if(!sceneTabs.length || !scenePanels.length) return;

sceneTabs.forEach(tab=>{
tab.addEventListener('click', ()=>{
const key = tab.dataset.scene;

sceneTabs.forEach(item=>{
const isActive = item === tab;
item.classList.toggle('active', isActive);
item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
});

scenePanels.forEach(panel=>{
panel.classList.toggle('active', panel.dataset.scenePanel === key);
});
});
});
};

setupRevealObserver();
setupPageTransition();
setupAnchorScroll();
setupMemoryShards();
setupDialogueTabs();
setupSceneTabs();
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
const tabs = document.querySelectorAll(".dialogue-tab");
const contents = document.querySelectorAll(".dialogue-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 切换 tab 样式
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 切换内容
    const target = tab.dataset.dialogue;
    contents.forEach(c => {
      c.style.display = c.id === target ? "block" : "none";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const shards = document.querySelectorAll(".memory-shard");
  const panels = document.querySelectorAll(".memory-panel");

  shards.forEach(shard => {
    shard.addEventListener("click", () => {
      // 移除所有按钮的 active 状态
      shards.forEach(btn => btn.classList.remove("active"));
      // 当前按钮高亮
      shard.classList.add("active");

      // 获取对应面板
      const target = shard.dataset.memory;

      panels.forEach(panel => {
        if (panel.dataset.panel === target) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
});
