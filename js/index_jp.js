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
      title: '初唐の気象',
      subtitle: '618年 — 649年',
      body: [
        '武徳元年、李淵は長安で帝位につき、国号を唐とした。隋末の群雄割拠の廃墟から、新たな帝国が誕生したのである。天下はいまだ平定されず、諸侯が四方に割拠し、突厥の騎兵が北辺を虎視眈々と狙っていた。しかし唐の高祖は関中を拠点に次々と群雄を平定し、わずか七年で統一を成し遂げた。',
        '続く貞観の時代は、中国史上最も称えられる治世の一つである。太宗李世民は「水は舟を載せ、また舟を覆す」を座右の銘とし、謙虚に諫言を受け入れ、賢能の士を任用した。房玄齢・杜如晦・魏徴・李靖——これらの名は今なお歴史の星河に輝いている。貞観年間、天下は大いに治まり、道に落ちている物を拾う者もなく、夜も戸を閉ざす必要もなく、万国が来朝した。',
        '文化の面では、初唐は六朝の遺風を受け継ぎつつ、新たな風格を切り開いた。詩歌は宮廷から民間へ、美文から骨力へと向かった。王勃・楊炯・盧照鄰・駱賓王——初唐の四傑——はその才能をもって唐詩黄金時代の幕を開けた。また玄奘法師は長安を出発し、天竺への万里の旅に出て、十七年後に仏経だけでなく、文明交流の新たな一章を持ち帰った。',
        '初唐は、すべての伝説の起点である。二百年余りの帝国の基盤を築き、無数の物語の最初の一粒の種を蒔いたのである。'
      ]
    },
    {
      title: '貞観の治',
      subtitle: '627年 — 649年',
      body: [
        '唐朝が中国古代社会の頂点であるならば、貞観の治はその頂点への道のりにおける最も堅実な第一歩である。李世民が即位した当初、彼が受け継いだのは戦乱によって疲弊した国だった——人口は激減し、田畑は荒れ果て、国境は脆弱であった。',
        '太宗は「君たる道は、まず百姓を存することにあり」と深く理解していた。彼は租税と労役を軽減し、民に休息を与え、科挙制度を整備して人材登用の道を広げ、法律を改正して法治を徹底した。『貞観政要』には太宗と群臣との無数の対話が記録されており、その議論の一つ一つが統治の道への深い探求であった。彼は反対の声を恐れなかった——魏徴の率直な諫言は、帝王の最良の鏡として大切にされた。',
        '軍事面では、李靖が雪夜に陰山を奇襲し、侯君集が遥か高昌まで遠征するなど、唐朝の領土は貞観年間に大きく拡大した。しかし太宗は武力を誇示することなく、懐柔と外交によって四方の心を勝ち取った。捕虜となった突厥の可汗は礼遇され、西域諸国は次々と使節を派遣した。長安は当時世界で最も繁華な国際都市となり、ペルシア・インド・日本・朝鮮からの使者と商人がここに集った。',
        '貞観二十三年、太宗は崩じた。彼が残したのは、広大な領土、豊かな文化、完備された制度を持つ帝国であった。貞観の治は一時代の名称にとどまらず、後世の帝王たちが心から憧れる政治理想となったのである。'
      ]
    },
    {
      title: '武周革命',
      subtitle: '690年 — 705年',
      body: [
        '中国数千年の歴史の中で、武則天は唯一正式に皇帝を称した女性である。彼女は太宗の才人から高宗の皇后となり、最終的に武周王朝を樹立するまでの半世紀以上にわたる政治生涯は、論争と伝説に満ちている。',
        '武則天は単なる権謀術数による陰謀家ではなかった。彼女は卓越した政治手腕と優れた人材眼识を持っていた。彼女の統治下で、科挙制度は空前の発展を遂げた——殿試と武挙を創設し、貴族門閥の官職独占を打ち破り、寒門の子弟に上昇の希望を与えた。婁師徳・狄仁傑・姚崇・宋璟——これらの名臣たちの台頭は、彼女の抜擢と信頼なしにはありえなかった。',
        '洛陽は彼女の治世において帝国の神都として繁栄した。彼女は明堂と天堂を建立し、壮大な建築言語によって新時代の到来を宣言した。仏教は彼女の保護のもとで最盛期を迎え、龍門石窟の盧舎那大仏——その顔は彼女の容貌に似せて彫られたと伝えられる——は、今なお伊水を見下ろしながら、あの非凡な歳月を見守り続けている。',
        '神龍元年、張柬之らが政変を起こし、武則天は退位を余儀なくされた。彼女は最期に帝号を去り、則天大聖皇后と称した。彼女が残したのは無字碑——功罪は後世の評に委ねるという無言の記念碑である。しかし何と言おうと、彼女は男性に支配された時代にあって、女性も天下を掌握できることを証明したのだ。'
      ]
    },
    {
      title: '開元盛世',
      subtitle: '712年 — 741年',
      body: [
        '開元——唐の玄宗李隆基の年号であり、唐朝、ひいては中国帝政時代全体における最も輝かしい黄金時代である。李隆基が太平公主の乱を鎮圧し、親政を始めた当初、彼が直面したのは度重なる政変を経て、安定を切実に必要としていた朝廷だった。',
        '玄宗は在位初期、鋭意改革に励み、姚崇・宋璟・張九齢らの賢相を任用し、吏治を整備し、経済を発展させ、税負担を軽減した。開元年間、天下は大いに治まり、物資は豊かで民は裕福となり、文化は空前の繁栄を遂げた。杜甫は後に『憶昔』でこう追憶している——「憶昔開元全盛日、小邑猶蔵万家室。稲米流脂粟米白、公私倉廩俱豊実」。',
        'これは唐詩の最も燦爛たる時代であった。李白は剣を手に故郷を離れ、遠く旅して、「天生我材必有用」という豪放な気概で詩壇を震撼させた。王維は終南山の麓で禅を修め、「行到水窮処、坐看雲起時」の境地で山水詩の新たな次元を切り開いた。孟浩然・王昌齢・高適・岑参——無数の詩人たちがこの時代に不朽の名作を残した。',
        '長安城内では、世界各地からの商人や旅人が絶え間なく行き交った。西市と東市は当時世界最大の商業中心地であり、胡商やペルシア商人の店が軒を連ねた。音楽・舞踊・絵画・書道——あらゆる芸術形式が開元年間に新たな高みに達した。これこそ真の盛世であり、後世の無数の文人墨客が魂を込めて思い焦がれる精神の故郷であった。'
      ]
    },
    {
      title: '安史の乱',
      subtitle: '755年 — 763年',
      body: [
        '天宝十四載十一月九日、范陽・平盧・河東の三鎮の節度使を兼ねた安禄山は范陽で兵を挙げ、「楊国忠を誅し、君側を清む」と称して十五万の大軍を率いて南下した。この八年近く続いた戦乱は、唐朝の盛衰を分ける分水嶺となった。',
        '安禄山の軍勢は破竹の勢いで進み、わずか三十四日で東都洛陽を陥落させた。翌年正月、安禄山は洛陽で帝を称し、国号を大燕とした。六月、潼関が陥落し、長安の門戸は開け放たれた。玄宗は慌てて西方へ逃避し、馬嵬駅に至ったとき、随行の将兵が騒乱を起こし、楊国忠は殺害され、楊貴妃は仏堂で縊死した。この衝撃的な場面は、後世の文学創作の尽きせぬ源泉となった——白居易の『長恨歌』はこれを背景に、この悲しい恋物語を千年にわたって歌い継いでいる。',
        '戦乱は最終的に鎮圧された——郭子儀や李光弼らの名将が血みどろの戦いを繰り広げ、ウイグル騎兵の援けを得て両京を回復した——が、唐朝はもはや元の姿に戻ることはなかった。藩鎮割拠の局面は尾大不掉となり、宦官の専横は日増しに深刻化し、均田制と府兵制の崩壊は帝国の経済と軍事の基盤を揺るがした。杜甫は戦乱の中で「国破山河在、城春草木深」という悲痛な詩句を書き、時代の傷を言い尽くした。',
        '安史の乱は唐朝を終わらせはしなかったが、帝国の華麗な外観の下にある深い裂け目を引き裂いた。その後百余年、唐朝はなお存続したが——しかしそれはもはや、かつて天下に睥睨した天朝上国ではなかった。'
      ]
    },
    {
      title: '落日の余晖',
      subtitle: '763年 — 907年',
      body: [
        '安史の乱平定後、唐朝は長い衰退期に入った。しかしそれは文化の凋落を意味しない——むしろ中晩唐の詩壇は依然として群星のように輝き、ある面では盛唐の業績をも凌駕していた。',
        '韓愈と柳宗元が提唱した古文運動は、「文以載道」を旗印に六朝の美文体の浮華の風を一掃し、中国散文に新たな道を切り開いた。白居易は新楽府運動を提唱し、「文章合為時而著、歌詩合為事而作」と主張した——彼の『琵琶行』『売炭翁』は社会の現実を直視し、今なお読む者の心を揺さぶる。李商隠は無題詩によって迷離とした幽深なイメージの世界を構築し、「春蚕到死絲方尽、蜡炬成灰涙始乾」は千古の絶唱となった。',
        'しかし帝国の政治機構は日々腐敗していった。宦官は神策軍を掌握し、恣に皇帝を廃立できた。牛李の党争は四十年近く続き、朝臣たちは互いに誹謗中傷を繰り返した。藩鎮の割拠はますます激化し、河北三鎮は事実上独立していた。黄巣の反乱の烽火が中国の大半を焼き尽くし、鎮圧されたとはいえ、唐朝の命運は尽きていた。',
        '天祐四年、朱温は唐の哀帝李柷を廃して自ら帝位につき、後梁を建国した。二百八十九年にわたる大唐帝国は、正式に幕を閉じた。長安最後の宮門がゆっくりと閉ざされたとき、一つの時代が終わった。しかし唐文化の光芒は決して真に消えることはなかった——それは後世千年の文学・芸術・制度・精神の血脈の中で、別の形で生き続けている。'
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
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
        lang: 'ja',
        preload: 'auto',
        hotkey: true,
        airplay: true,
        screenshot: true
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
