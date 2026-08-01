/* ========================================
   唐姝 — Entry Animation & Menu Toggle
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Elements ----
  const overlay     = document.getElementById('overlay');
  const textGroup   = document.getElementById('text-group');
  const logo        = document.getElementById('logo');
  const menuToggle  = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('menu-overlay');
  const topNav      = document.getElementById('top-nav');
  const backToTop   = document.getElementById('back-to-top');
  const body        = document.body;
  const parallaxBg  = document.getElementById('parallax-bg');
  const parallaxBgLit = document.getElementById('parallax-bg-lit');

  // ========================================
  //  Random Background Set (2 sets, pick one on each page load)
  // ========================================

  const bgSets = [
    { grey: 'images/assets/denki-bg-gy.webp', lit: 'images/assets/denki-bg.webp' },
    { grey: 'images/assets/bg-gy-4.webp',    lit: 'images/assets/bg-4.webp' }
  ];
  const chosen = bgSets[Math.floor(Math.random() * bgSets.length)];

  if (parallaxBg) {
    parallaxBg.style.backgroundImage =
      `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${chosen.grey}')`;
  }
  if (parallaxBgLit) {
    parallaxBgLit.style.backgroundImage = `url('${chosen.lit}')`;
  }

  // ========================================
  //  Entry Animation Timeline
  // ========================================

  const HOLD_WHITE   = 1000;   // hold white text
  const COLOR_TRANS  = 800;    // white → #C41E3A
  const SLIDE_DOWN   = 800;    // overlay slide down

  // Phase 1 → 2: text turns red
  setTimeout(() => {
    textGroup.classList.add('color-red');
  }, HOLD_WHITE);

  // Phase 3: text fades out + overlay slides down
  setTimeout(() => {
    textGroup.classList.add('fade-out');
    overlay.classList.add('slide-down');
  }, HOLD_WHITE + COLOR_TRANS);

  // Phase 4: animation complete — reveal nav, prep hamburger, enable scrolling
  setTimeout(() => {
    menuToggle.style.opacity = '1';
    menuToggle.classList.add('menu-hidden');
    if (topNav) topNav.style.opacity = '1';
    body.style.overflow = 'auto';
  }, HOLD_WHITE + COLOR_TRANS + SLIDE_DOWN);

  // ========================================
  //  Menu Toggle
  // ========================================

  let menuOpen = false;
  let dp = null; // DPlayer instance (shared with video section)

  function closeAllOverlays() {
    menuOpen = false;
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('open');
    if (typeof storyOverlay !== 'undefined' && storyOverlay) {
      storyOverlay.classList.remove('open');
    }

    // Close video overlay via DPlayer
    const videoOverlayEl2 = document.getElementById('video-overlay');
    if (videoOverlayEl2) {
      videoOverlayEl2.classList.remove('open');
      if (dp) dp.pause();
    }

    body.style.overflow = 'auto';
  }

  menuToggle.addEventListener('click', () => {
    const videoOverlayEl = document.getElementById('video-overlay');
    const videoOpen = videoOverlayEl && videoOverlayEl.classList.contains('open');
    const storyOpen = typeof storyOverlay !== 'undefined' && storyOverlay && storyOverlay.classList.contains('open');

    // If anything is open, close it
    if (menuOpen || storyOpen || videoOpen) {
      closeAllOverlays();
      return;
    }

    // Otherwise open menu
    menuOpen = true;
    menuToggle.classList.add('active');
    menuOverlay.classList.add('open');
    body.style.overflow = 'hidden';
  });

  // ========================================
  //  Logo Auto-Scaling — triggers near end of Screen 1, CSS transition drives the animation
  // ========================================

  const LOGO_TARGET_WIDTH = 300;
  const SCALE_THRESHOLD   = 0.65; // fraction of vh
  let logoTicking = false;
  let logoIsScaled = false;

  function getLogoScaleRatio() {
    return LOGO_TARGET_WIDTH / logo.offsetWidth;
  }

  function applyLogoState() {
    const scrollY   = window.scrollY;
    const vh        = window.innerHeight;
    const threshold = vh * SCALE_THRESHOLD;

    if (scrollY >= threshold && !logoIsScaled) {
      logoIsScaled = true;
      logo.style.transform = `scale(${getLogoScaleRatio()})`;
      if (topNav) topNav.classList.add('hidden');
      menuToggle.classList.remove('menu-hidden');
      if (backToTop) backToTop.classList.add('visible');
    } else if (scrollY < threshold && logoIsScaled) {
      logoIsScaled = false;
      logo.style.transform = 'scale(1)';
      if (topNav) topNav.classList.remove('hidden');
      menuToggle.classList.add('menu-hidden');
      if (backToTop) backToTop.classList.remove('visible');
    }
  }

  // Back-to-top click handler
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  //  Nav Scroll-to-Section
  // ========================================

  function scrollToSection(targetId) {
    if (targetId === '#screen-1') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      // #screen-6: scroll deeper so the bulb-lighting zone is visible
      const offset = targetId === '#screen-6' ? window.innerHeight * 0.35 : 0;
      window.scrollTo({ top: window.scrollY + rect.top + offset, behavior: 'smooth' });
    }
  }

  // Top nav items
  document.querySelectorAll('#top-nav .nav-item[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      scrollToSection(href);
    });
  });

  // Menu overlay nav items
  document.querySelectorAll('.menu-nav-item[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      closeAllOverlays();
      scrollToSection(href);
    });
  });

  // ========================================
  //  Language Switch — navigate between CN/EN/JP pages
  // ========================================

  // Top nav language switch
  document.querySelectorAll('#top-nav .nav-lang-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) return;
      const label = item.textContent.trim();
      if (label === 'EN') {
        window.location.href = 'index_EN.html';
      } else if (label === 'JP') {
        window.location.href = 'index_jp.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  });

  // Menu overlay language switch
  document.querySelector('#lang-switch')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-en')) {
      window.location.href = 'index_EN.html';
    } else if (e.target.classList.contains('lang-jp')) {
      window.location.href = 'index_jp.html';
    } else if (e.target.classList.contains('lang-cn')) {
      window.location.href = 'index.html';
    }
  });

  window.addEventListener('scroll', () => {
    if (!logoTicking) {
      requestAnimationFrame(() => {
        applyLogoState();
        logoTicking = false;
      });
      logoTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    // Re-apply current state with potentially new ratio
    if (logoIsScaled) {
      logo.style.transition = 'none';
      logo.style.transform = `scale(${getLogoScaleRatio()})`;
      // Force reflow so the transition-less change takes effect before re-enabling
      logo.offsetHeight;
      logo.style.transition = '';
    } else {
      logo.style.transform = 'scale(1)';
    }
  });

  applyLogoState();

  // ========================================
  //  AI Gallery — Cross-fade Thumbnail Swap
  // ========================================

  const imgFront = document.getElementById('main-img-front');
  const imgBack  = document.getElementById('main-img-back');
  const thumbnails = document.querySelectorAll('#thumbnails-row .thumb');

  // Track which layer is currently visible
  let frontIsActive = true;

  // Mark the initially active thumbnail
  const initialFile = imgFront.src.split('/').pop();
  thumbnails.forEach(t => {
    if (t.dataset.full.endsWith(initialFile)) {
      t.classList.add('active');
    }
  });

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (thumb.classList.contains('active')) return;

      const nextSrc = thumb.dataset.full;

      // Preload, then cross-fade
      const preload = new Image();
      preload.src = nextSrc;
      preload.onload = () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        if (frontIsActive) {
          // Front is visible → load into back, then cross-fade
          imgBack.src = nextSrc;
          imgFront.style.opacity = '0';
          imgBack.style.opacity = '1';
          frontIsActive = false;
        } else {
          // Back is visible → load into front, then cross-fade
          imgFront.src = nextSrc;
          imgBack.style.opacity = '0';
          imgFront.style.opacity = '1';
          frontIsActive = true;
        }
      };
    });
  });

  // ========================================
  //  Timeline — Story Detail Overlay
  // ========================================

  const storyOverlay = document.getElementById('story-overlay');
  const storyDetail  = document.getElementById('story-detail');

  const stories = [
    {
      title: '初唐气象',
      subtitle: '公元618年 — 649年',
      body: [
        '武德元年，李渊于长安称帝，国号唐，一个新的帝国在隋末群雄割据的废墟中崛起。彼时的天下尚未平定，各路诸侯割据四方，突厥铁骑虎视北疆。但唐高祖以关中为根基，次第削平群雄，仅用七年时间便完成了统一大业。',
        '紧随其后的贞观时代，是中国历史上最为人称道的治世之一。唐太宗李世民以"水能载舟，亦能覆舟"为座右铭，虚心纳谏，任用贤能。房玄龄、杜如晦、魏徵、李靖——这些名字至今仍闪耀在历史的星河中。贞观年间，天下大治，路不拾遗，夜不闭户，万国来朝。',
        '在文化上，初唐承袭六朝余绪而开一代新风。诗歌从宫廷走向民间，从骈俪走向骨力。王勃、杨炯、卢照邻、骆宾王——初唐四杰——以他们的才华开启了唐诗黄金时代的序幕。而玄奘法师从长安出发，踏上了前往天竺的万里征程，十七年后带回的不仅是佛经，更是一整个文明交流的新篇章。',
        '初唐，是一切传奇的起点。它奠定了一个帝国两百余年的基业，也种下了无数故事最初的那粒种子。'
      ]
    },
    {
      title: '贞观之治',
      subtitle: '公元627年 — 649年',
      body: [
        '如果说唐朝是中国古代社会的巅峰，那么贞观之治便是这条巅峰之路上最坚实的第一级台阶。李世民登基之初，面对的是一个百废待兴的国家。多年的战乱让人口锐减，土地荒芜，边境未宁。',
        '唐太宗深知"为君之道，必须先存百姓"。他轻徭薄赋，与民休息；他完善科举，广开才路；他修订律法，以法治国。《贞观政要》中记载了他与群臣的无数对话，每一次讨论都是对治理之道的深入探索。他不怕听到反对的声音——魏徵的犯颜直谏被视作帝王最好的镜子。',
        '在军事上，李靖雪夜袭阴山，侯君集远征高昌，唐朝的疆域在贞观年间大幅拓展。但太宗从不以武力炫耀，而是以怀柔远人来赢得四方归心。突厥可汗被俘后受到礼遇，西域诸国纷纷遣使入朝。长安城成为当时世界上最为繁华的国际都市，来自波斯、印度、日本、朝鲜的使者与商人在此汇聚。',
        '贞观二十三年，太宗驾崩。他留下的是一个疆域辽阔、文化繁荣、制度完备的帝国。贞观之治不仅是一个时代的名称，更成为后世帝王心向往之的政治理想。'
      ]
    },
    {
      title: '武周革命',
      subtitle: '公元690年 — 705年',
      body: [
        '在中国数千年的历史长河中，武则天是唯一一位正式称帝的女性。她从太宗才人、高宗皇后，到最终建立武周王朝，这段跨越半个多世纪的政治生涯充满了争议与传奇。',
        '武则天并非仅凭权术上位的阴谋家。她具有卓越的政治才能和过人的识人之明。在她主政期间，科举制度得到了空前的发展——她创立了殿试和武举，打破了士族门阀对官场的垄断，让更多寒门子弟看到了上升的希望。娄师德、狄仁杰、姚崇、宋璟——这些名臣的崛起都离不开她的提拔与信任。',
        '洛阳在她的治下成为帝国的神都。她大兴土木，营建明堂、天堂，以宏大的建筑语言宣告着新时代的到来。佛教在她的推崇下达到鼎盛，龙门石窟中的卢舍那大佛——据说面容便是依照她的容貌雕刻——至今仍俯瞰着伊水，见证着那段不平凡的岁月。',
        '神龙元年，张柬之等发动政变，武则天被迫退位。她在生命的最后时刻去帝号，称则天大圣皇后。她留下了一座无字碑，功过是非，任由后人评说。但无论如何，她证明了在那个被男性主导的时代，女性一样可以执掌天下。'
      ]
    },
    {
      title: '开元盛世',
      subtitle: '公元712年 — 741年',
      body: [
        '开元，是唐玄宗李隆基的年号，也是唐朝乃至整个中国帝制时代最为辉煌的黄金岁月。当李隆基平定太平公主之乱、亲政之初，他面对的是一个经历多次政变、亟需安定的朝廷。',
        '玄宗在位前期励精图治，任用姚崇、宋璟、张九龄等贤相，整顿吏治，发展经济，减轻赋税。开元年间，天下大治，物阜民丰，文化繁荣到了前所未有的程度。杜甫后来在《忆昔》中追忆道："忆昔开元全盛日，小邑犹藏万家室。稻米流脂粟米白，公私仓廪俱丰实。"',
        '这是唐诗最灿烂的时代。李白仗剑去国，辞亲远游，以"天生我材必有用"的豪情震撼了整个诗坛。王维在终南山下修习禅理，以"行到水穷处，坐看云起时"的意境开创了山水诗的新境界。孟浩然、王昌龄、高适、岑参——无数诗人在这个时代留下了不朽的篇章。',
        '长安城内，来自世界各地的商旅络绎不绝。西市和东市是当时世界上最大的商业中心，胡商、波斯商人的店铺鳞次栉比。音乐、舞蹈、绘画、书法——每一种艺术形式都在开元年间达到了新的高度。这是真正的盛世，是后世无数文人墨客魂牵梦绕的精神故乡。'
      ]
    },
    {
      title: '安史之乱',
      subtitle: '公元755年 — 763年',
      body: [
        '天宝十四载十一月初九，身兼范阳、平卢、河东三镇节度使的安禄山在范阳起兵，以"诛杨国忠、清君侧"为名，率十五万大军南下。这场持续近八年的战乱，成为唐朝由盛转衰的分水岭。',
        '安禄山的军队势如破竹，仅用三十四天便攻陷东都洛阳。次年正月，安禄山在洛阳称帝，国号大燕。六月，潼关失守，长安门户洞开。玄宗仓皇西逃，行至马嵬驿时，随行将士哗变，杨国忠被杀，杨贵妃被缢死于佛堂。这惊心动魄的一幕，成为后世文学创作不竭的源泉——白居易的《长恨歌》便以此为背景，将这段凄美的爱情故事传唱千年。',
        '战乱虽然最终被平定——郭子仪、李光弼等名将浴血奋战，借回纥兵收复两京——但唐朝再也无法回到从前。藩镇割据的局面从此尾大不掉；宦官专权日趋严重；均田制和府兵制的瓦解动摇了帝国的经济与军事根基。杜甫在战乱中写下了"国破山河在，城春草木深"的沉痛诗句，道尽了时代之殇。',
        '安史之乱不是唐朝的终结，但它撕开了帝国华丽外表下那道深深的裂痕。此后的一百多年，唐朝虽然依旧屹立，却已不再是那个睥睨天下的天朝上国了。'
      ]
    },
    {
      title: '落日余晖',
      subtitle: '公元763年 — 907年',
      body: [
        '安史之乱平定之后，唐朝进入了一个漫长的衰退期。但这并不意味着文化的凋零——恰恰相反，中晚唐的诗坛依旧群星璀璨，甚至在某些方面超越了盛唐的成就。',
        '韩愈、柳宗元发起的古文运动，以"文以载道"为旗帜，一扫六朝骈文的浮华之风，为中国散文开辟了新的道路。白居易倡导新乐府运动，主张"文章合为时而著，歌诗合为事而作"，他的《琵琶行》《卖炭翁》直面社会现实，至今读来仍令人动容。李商隐以无题诗构筑了一个迷离幽深的意象世界，"春蚕到死丝方尽，蜡炬成灰泪始干"成为千古绝唱。',
        '然而帝国的政治肌体却在一日日地溃烂。宦官掌握神策军，可以任意废立皇帝；牛李党争持续近四十年，朝臣之间相互倾轧；藩镇割据愈演愈烈，河北三镇事实上已经独立于中央。黄巢起义的烽火燃遍大半个中国，虽然最终被镇压，但唐朝的气数已尽。',
        '天祐四年，朱温废唐哀帝李柷，自立为帝，建立后梁。历时二百八十九年的大唐帝国正式落下帷幕。当长安城最后的宫门缓缓关闭，一个时代结束了。但唐文化的光芒从未真正熄灭——它在后世千年的文学、艺术、制度与精神血脉中，以另一种方式继续活着。'
      ]
    }
  ];

  // Open story detail on card click
  document.querySelectorAll('.dynasty-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.story);
      const s = stories[idx];

      storyDetail.innerHTML = `
        <h2>${s.title}</h2>
        <h3>${s.subtitle}</h3>
        <div class="story-body">
          ${s.body.map(p => `<p>${p}</p>`).join('')}
        </div>
      `;

      storyOverlay.classList.add('open');
      menuToggle.classList.add('active');
      body.style.overflow = 'hidden';
    });
  });

  // ========================================
  //  Scroll-triggered Title Fly-in Animation
  // ========================================

  const titles = document.querySelectorAll('.info-title-en');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fly-in');
      }
    });
  }, { threshold: 0.3 });

  titles.forEach(title => observer.observe(title));

  // ========================================
  //  Craft Carousels — JS-driven scroll
  // ========================================

  const tracks = document.querySelectorAll('.craft-track');

  tracks.forEach(track => {
    const cards       = track.querySelectorAll('.craft-card');
    const totalCards  = cards.length;
    if (totalCards < 2 || totalCards % 2 !== 0) return;

    const uniqueCount = totalCards / 2;          // we always have 2 copies
    const isLeft      = track.classList.contains('scroll-left');

    // Defer measurement until layout is fully settled
    requestAnimationFrame(() => {
      const rectFirst = cards[0].getBoundingClientRect();
      const rectDup   = cards[uniqueCount].getBoundingClientRect();
      const setWidth  = rectDup.left - rectFirst.left;  // sub-pixel precise

      const SPEED = 40;
      let progress = 0;
      let lastTime = performance.now();

      function animate(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (isLeft) {
          progress = (progress + SPEED * dt) % setWidth;
        } else {
          progress = (progress - SPEED * dt + setWidth) % setWidth;
        }

        track.style.transform = `translateX(${-progress}px)`;
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });
  });

  // ========================================
  //  Screen 6 — Progress Bar & Bulb
  // ========================================

  const progressFill = document.getElementById('progress-fill');
  const bulb        = document.getElementById('bulb');

  const progressRow = document.querySelector('.progress-row');

  if (progressFill && bulb && parallaxBg && progressRow) {
    const BULB_THRESHOLD = 0.98;
    let bulbLit = false;

    function updateScreen6() {
      const vh     = window.innerHeight;
      const rowTop = progressRow.getBoundingClientRect().top;
      // 0 = row at viewport bottom, 1 = row at viewport top
      let progress = Math.max(0, Math.min(1, 1 - rowTop / vh));

      // Progress bar fill
      progressFill.style.width = (progress * 100) + '%';

      // Bulb + background switch
      if (progress >= BULB_THRESHOLD && !bulbLit) {
        bulbLit = true;
        bulb.src = 'images/assets/bulb.webp';
        parallaxBg.classList.add('lit');
      } else if (progress < BULB_THRESHOLD && bulbLit) {
        bulbLit = false;
        bulb.src = 'images/assets/bulb-s.webp';
        parallaxBg.classList.remove('lit');
      }
    }

    window.addEventListener('scroll', updateScreen6, { passive: true });
    updateScreen6();
  }

  // ========================================
  //  Video Player — DPlayer
  // ========================================

  const videoPreview = document.getElementById('video-preview');
  const playBtn     = document.getElementById('play-btn');
  const videoOverlay   = document.getElementById('video-overlay');
  const dplayerContainer = document.getElementById('dplayer-container');

  if (videoPreview && playBtn && videoOverlay && dplayerContainer) {

    // ---------- Initialize DPlayer ----------
    function initDPlayer() {
      if (dp) return;
      dp = new DPlayer({
        container: dplayerContainer,
        video: { url: 'images/video/bg1.mp4' },
        theme: '#C41E3A',
        autoplay: false,
        volume: 1,
        loop: false,
        lang: 'zh-cn',
        preload: 'auto',
        hotkey: true,
        airplay: true,
        screenshot: true,
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2]
      });
    }

    // ---------- Open video ----------
    function openVideo() {
      initDPlayer();
      videoOverlay.classList.add('open');
      menuToggle.classList.add('active');
      body.style.overflow = 'hidden';
      dp.play();
    }

    // ---------- Close video ----------
    function closeVideo() {
      videoOverlay.classList.remove('open');
      menuToggle.classList.remove('active');
      const storyOpen = typeof storyOverlay !== 'undefined' && storyOverlay && storyOverlay.classList.contains('open');
      if (!storyOpen) {
        body.style.overflow = 'auto';
      }
      if (dp) dp.pause();
    }

    // Click play button → open
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openVideo();
    });

    // Click preview area → open
    videoPreview.addEventListener('click', (e) => {
      if (e.target === playBtn || playBtn.contains(e.target)) return;
      openVideo();
    });

    // Click overlay background → close
    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) closeVideo();
    });

    // Escape key → close overlays (video first, then story)
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (videoOverlay.classList.contains('open')) {
        closeVideo();
      } else if (typeof storyOverlay !== 'undefined' && storyOverlay && storyOverlay.classList.contains('open')) {
        closeAllOverlays();
      }
    });
  }

});
