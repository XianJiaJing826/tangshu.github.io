const setupMemoryShards = () => {
  const memoryButtons = document.querySelectorAll('.memory-shard');
  const memoryPanels = document.querySelectorAll('.memory-panel');
  if (!memoryButtons.length || !memoryPanels.length) return;

  memoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.memory;
      memoryButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      memoryPanels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === key);
      });
    });
  });
};

const dialogueCopy = {
  embroidery: {
    user: "什么是蹙金绣？",
    ai: [
      "蹙金者，以金线隐入丝纹之间。",
      "灯火之下，方见流光。",
      "它不是张扬地发亮，而是在靠近时才慢慢显露出分寸。"
    ]
  },
  makeup: {
    user: "花钿为什么总让人觉得温柔？",
    ai: [
      "因为它从不喧哗。",
      "它只是轻轻落在额间，却足以改变整张面容的气韵。",
      "真正的温柔，往往来自极轻的秩序。"
    ]
  },
  incense: {
    user: "香艺最难学的是什么？",
    ai: [
      "不是配方本身。",
      "而是分辨气味在时间里如何变化。",
      "会调香的人，往往先学会了如何安静地感受。"
    ]
  }
};

const setupDialogueTabs = () => {
  const dialogueTabs = document.querySelectorAll('.dialogue-tab');
  const dialogueContents = document.querySelectorAll('.dialogue-content');
  if (!dialogueTabs.length || !dialogueContents.length) return;

  dialogueTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.dialogue;
      dialogueTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      dialogueContents.forEach(c => {
        c.style.display = c.id === target ? 'block' : 'none';
      });
    });
  });
};

const setupSceneTabs = () => {
  const sceneTabs = document.querySelectorAll('.scene-tab');
  const scenePanels = document.querySelectorAll('.scene-panel');
  if (!sceneTabs.length || !scenePanels.length) return;

  sceneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.scene;
      sceneTabs.forEach(item => {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      scenePanels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.scenePanel === key);
      });
    });
  });
};

setupMemoryShards();
setupDialogueTabs();
setupSceneTabs();
