const heritageCopy = {
  embroidery: [
    "此纹名为蹙金。",
    "金线需顺光而行。",
    "盛唐女子常以此纹入礼服之上。"
  ],
  makeup: [
    "花钿并不喧哗。",
    "它只是轻轻落在额间。",
    "却足以让一张面容拥有时代的秩序。"
  ],
  papercut: [
    "纸最薄，却最见手上的分寸。",
    "每一次转角都藏着刀法的克制。",
    "留下的留白，往往比图案更会说话。"
  ],
  incense: [
    "香气从不争先。",
    "它总在灯影与衣袖之间缓慢弥散。",
    "让记忆先于语言抵达。"
  ],
  jewelry: [
    "步摇不必夸张。",
    "轻轻一动，珠玉与金属便自会生光。",
    "真正动人的，往往是余韵。"
  ],
  silk: [
    "丝绸的柔软并不只是触感。",
    "它也来自经纬之间极有耐心的秩序。",
    "光一落下，布面便开始呼吸。"
  ]
};

const setupHeritageTabs = () => {
  const tabs = document.querySelectorAll('.jade-tab');
  const stages = document.querySelectorAll('.heritage-stage');
  const guideScript = document.getElementById('guide-script');

  if (!tabs.length || !stages.length || !guideScript) return;

  const renderGuide = key => {
    guideScript.innerHTML = heritageCopy[key]
      .map(line => `<p>${line}</p>`)
      .join('');
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.heritage;
      tabs.forEach(item => {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      stages.forEach(stage => {
        stage.classList.toggle('active', stage.dataset.stage === key);
      });
      renderGuide(key);
    });
  });
};

setupHeritageTabs();
