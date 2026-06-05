const mentorCopy = {
  embroidery: [
    "针脚需缓。",
    "不可急。",
    "金线需顺光而行。"
  ],
  makeup: [
    "此式更近盛唐。",
    "花钿位置可略高半寸。",
    "发饰不必繁，留一点空才更见气韵。"
  ],
  incense: [
    "此香偏烈。",
    "更适合冬日夜宴。",
    "若要留香更长，便让木香再稳一些。"
  ]
};

const setupPracticeTabs = () => {
  const tabs = document.querySelectorAll('.practice-tab');
  const panels = document.querySelectorAll('.practice-panel');
  if (!tabs.length || !panels.length) return;

  let isAnimating = false;

  const renderMentor = key => {
    const activePanel = document.querySelector(`.practice-panel[data-panel="${key}"] .mentor-quote`);
    if (!activePanel || !mentorCopy[key]) return;
    activePanel.innerHTML = mentorCopy[key].map(line => `<p>${line}</p>`).join('');
  };

  const switchPanel = (tab, target) => {
    if (isAnimating) return;

    const currentPanel = document.querySelector('.practice-panel.active');
    const nextPanel = document.querySelector(`.practice-panel[data-panel="${target}"]`);
    if (currentPanel === nextPanel) return;

    isAnimating = true;

    // 更新 tab 高亮
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 当前面板：移除激活态 → 添加离开动画
    currentPanel.classList.remove('active');
    currentPanel.classList.add('leave-left');

    // 新面板：设置进入起始位置 → 激活（触发滑入过渡）
    nextPanel.classList.add('enter-right');
    void nextPanel.offsetWidth; // 强制回流，确保 enter-right 生效
    nextPanel.classList.add('active');
    requestAnimationFrame(() => {
      nextPanel.classList.remove('enter-right');
    });

    // 监听离开动画结束 → 清理并解锁
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      currentPanel.removeEventListener('transitionend', onLeaveEnd);
      currentPanel.classList.remove('leave-left');
      isAnimating = false;
    };

    const onLeaveEnd = (e) => {
      if (e.target !== currentPanel) return;
      cleanup();
    };
    currentPanel.addEventListener('transitionend', onLeaveEnd);
    // 安全兜底：800ms 后强制清理（防止 transitionend 未触发导致 UI 锁定）
    setTimeout(cleanup, 800);

    renderMentor(target);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchPanel(tab, tab.dataset.practice);
    });
  });

  const initialTab = document.querySelector('.practice-tab.active');
  if (initialTab) renderMentor(initialTab.dataset.practice);
};

setupPracticeTabs();
