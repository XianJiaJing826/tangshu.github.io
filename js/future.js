const creatorCopy = {
  poster: [
    "输入一句主题，例如：\"盛唐花钿与未来玉石光影\"。",
    "AI 将输出符合世界观的文创海报概念与画面描述。"
  ],
  script: [
    "自动生成分镜、运镜建议与旁白节奏。",
    "帮助非遗内容从\"资料\"变成\"可传播的故事\"。"
  ],
  copy: [
    "可生成品牌故事、展览标题、活动文案与产品介绍。",
    "让非遗表达保持温度，同时拥有传播效率。"
  ]
};

const setupCreatorTabs = () => {
  const creatorTabs = document.querySelectorAll('.creator-tab');
  const creatorPanels = document.querySelectorAll('.creator-panel');
  if (!creatorTabs.length || !creatorPanels.length) return;

  const renderNote = key => {
    const target = document.querySelector(`.creator-panel[data-panel="${key}"] .creator-note`);
    if (!target || !creatorCopy[key]) return;
    target.innerHTML = creatorCopy[key].map(line => `<p>${line}</p>`).join('');
  };

  const updateCreatorHeight = () => {
    const activePanel = document.querySelector('.creator-panel.active');
    const stage = document.getElementById('creatorStage');
    if (activePanel && stage) {
      stage.style.height = activePanel.offsetHeight + 'px';
    }
  };

  creatorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.creator;
      const currentPanel = document.querySelector('.creator-panel.active');
      const nextPanel = document.querySelector(`[data-panel="${key}"]`);
      if (currentPanel === nextPanel) return;

      creatorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentPanel.classList.add('leave');
      nextPanel.classList.add('enter');
      void nextPanel.offsetWidth;
      nextPanel.classList.add('active');
      requestAnimationFrame(() => { nextPanel.classList.remove('enter'); });
      setTimeout(() => { currentPanel.classList.remove('active', 'leave'); }, 1000);
      renderNote(key);
    });
  });

  window.addEventListener('load', updateCreatorHeight);
  window.addEventListener('resize', updateCreatorHeight);

  const initialTab = document.querySelector('.creator-tab.active');
  if (initialTab) {
    renderNote(initialTab.dataset.creator);
    updateCreatorHeight();
  }
};

setupCreatorTabs();
