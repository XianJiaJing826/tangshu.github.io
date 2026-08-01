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
      title: 'Early Tang',
      subtitle: '618 — 649 CE',
      body: [
        'In the first year of the Wude era, Li Yuan declared himself Emperor in Chang\'an, founding the Tang Dynasty. A new empire rose from the ashes of the fragmented Sui, with rival warlords still contesting every corner of the realm and Turkic cavalry threatening the northern frontier. From his Guanzhong stronghold, Emperor Gaozu subdued his rivals one by one, unifying the realm in just seven years.',
        'The Zhenguan era that followed remains one of the most celebrated periods of governance in Chinese history. Emperor Taizong lived by the maxim "Water can carry a boat, but it can also overturn it" — he welcomed frank counsel and surrounded himself with talent. Fang Xuanling, Du Ruhui, Wei Zheng, Li Jing — their names still shine in the constellation of history. Under Zhenguan, the realm prospered, roads were safe for travelers, and envoys from countless nations flocked to Chang\'an.',
        'Culturally, the Early Tang inherited the legacy of the Six Dynasties while forging a bold new voice. Poetry moved from palace halls to the wider world, from ornate parallel prose to raw expressive power. Wang Bo, Yang Jiong, Lu Zhaolin, and Luo Binwang — the Four Paragons of Early Tang — opened the curtain on the golden age of Tang poetry. And the monk Xuanzang departed Chang\'an for his epic journey to India, returning seventeen years later not only with Buddhist scriptures, but with an entire new chapter of civilizational exchange.',
        'The Early Tang is where every legend begins. It laid the foundation for over two centuries of empire — and planted the first seed of countless stories yet to be told.'
      ]
    },
    {
      title: 'Zhenguan Reign',
      subtitle: '627 — 649 CE',
      body: [
        'If the Tang Dynasty represents the pinnacle of imperial China, the Zhenguan reign is the first solid step on that ascent. When Li Shimin took the throne, he inherited a land scarred by war — its population decimated, its fields barren, its borders vulnerable.',
        'Emperor Taizong understood that "the way of the ruler must begin with caring for the people." He lightened taxes and corvée, gave the populace time to recover, refined the imperial examination system, and codified laws to govern by statute rather than whim. The "Essentials of Zhenguan Governance" records countless dialogues between emperor and ministers — each discussion an inquiry into the art of rule. He was unafraid of dissent; Wei Zheng\'s blunt remonstrations were treasured as the emperor\'s finest mirror.',
        'Militarily, Li Jing captured the Yin Mountains in a legendary nighttime assault, and Hou Junji led expeditions as far as Gaochang. Tang territory expanded dramatically. Yet Taizong never relied on force alone — he won allegiance through clemency and diplomacy. The captive Turkic Khan was treated with honor, and emissaries from the Western Regions, Persia, India, Japan, and Korea converged on Chang\'an, which became the most cosmopolitan metropolis in the world.',
        'In the 23rd year of Zhenguan, Taizong passed away. He left behind an empire vast in territory, rich in culture, and sound in institutions. Zhenguan became more than an era name — it became a political ideal that later rulers could only aspire to.'
      ]
    },
    {
      title: 'Wu Zhou Dynasty',
      subtitle: '690 — 705 CE',
      body: [
        'Across three millennia of Chinese history, Wu Zetian remains the only woman to formally assume the imperial title. Her journey from Taizong\'s junior consort to Gaozong\'s empress, and ultimately to founding her own dynasty, spans over half a century — and is steeped in both controversy and legend.',
        'Wu Zetian was no mere schemer wielding palace intrigue. She possessed formidable political acumen and a keen eye for talent. Under her rule, the examination system flourished — she established the palace examination and the military examination, shattering the aristocracy\'s monopoly on office and opening paths of advancement for talented commoners. Lou Shide, Di Renjie, Yao Chong, Song Jing — these distinguished ministers owed their rise to her patronage.',
        'Luoyang flourished as the divine capital of her empire. She raised the Mingtang and Tiantang halls, declaring the arrival of a new epoch through monumental architecture. Buddhism reached its zenith under her patronage — the colossal Vairocana Buddha at Longmen, said to bear her own features, still gazes over the Yi River, witnessing an age unlike any other.',
        'In the first year of Shenlong, Zhang Jianzhi and his allies launched a coup. Wu Zetian was forced to abdicate, and in her final days she renounced the imperial title. She left behind a blank stele — a wordless monument, inviting posterity to render its own verdict. Whatever one may conclude, she proved beyond doubt that in an age dominated by men, a woman could rule the world.'
      ]
    },
    {
      title: 'Kaiyuan Golden Age',
      subtitle: '712 — 741 CE',
      body: [
        'Kaiyuan — the reign title of Emperor Xuanzong — marks the most radiant golden age of the Tang, and arguably of all imperial China. When Li Longji quelled the Princess Taiping rebellion and took personal control, he faced a court battered by successive coups, desperate for stability.',
        'In his early years, Xuanzong governed with energy and vision. He appointed sage ministers like Yao Chong, Song Jing, and Zhang Jiuling, streamlined the bureaucracy, grew the economy, and lightened the tax burden. The Kaiyuan era produced unprecedented prosperity. Decades later, Du Fu would recall: "In the full flush of Kaiyuan, even a small town held ten thousand households. Rice glistened like fat, millet shone white, and barns — public and private — overflowed with abundance."',
        'This was the most brilliant age of Tang poetry. Li Bai took up his sword and left home, journeying far and wide, electrifying the literary world with his defiant declaration: "Heaven gave me talents — they must be used!" Wang Wei cultivated Chan Buddhism at the foot of Zhongnan Mountain, opening new dimensions in landscape poetry with lines like "I walk to where the water ends, and sit to watch the clouds rise." Meng Haoran, Wang Changling, Gao Shi, Cen Shen — countless poets left immortal works in this era.',
        'Within Chang\'an, merchants and travelers from every corner of the world thronged the streets. The Western and Eastern Markets were the largest commercial centers on earth, lined with shops run by Central Asian and Persian traders. Music, dance, painting, calligraphy — every art form reached new heights. This was a true golden age, a spiritual homeland that later generations of poets and scholars would forever yearn to return to.'
      ]
    },
    {
      title: 'An-Shi Rebellion',
      subtitle: '755 — 763 CE',
      body: [
        'On the ninth day of the eleventh month of Tianbao Year 14, An Lushan — commander of three frontier provinces — raised his banner at Fanyang. Under the pretext of "punishing Yang Guozhong and purging the court," he marched south with 150,000 troops. The devastating rebellion that followed would rage for nearly eight years and become the watershed between Tang glory and decline.',
        'An Lushan\'s forces swept south with terrifying speed, capturing the eastern capital Luoyang in just 34 days. The following spring, he declared himself Emperor of the Great Yan. By summer, Tong Pass had fallen, and Chang\'an lay exposed. Xuanzong fled west in panic. At Mawei Post Station, the imperial guard mutinied — Yang Guozhong was executed, and the Lady Yang was strangled in a Buddhist shrine. This heart-wrenching episode became an inexhaustible source for later literature; Bai Juyi\'s "Song of Everlasting Regret" immortalized the tragic romance for a thousand years.',
        'The rebellion was eventually put down — generals like Guo Ziyi and Li Guangbi fought with desperate courage, retaking both capitals with Uighur cavalry support — but the Tang would never be the same. Regional warlords became a permanent, intractable problem. Eunuchs tightened their grip on the palace. The equal-field system and the fubing militia collapsed, undermining both the economy and the military. Du Fu, living through the chaos, wrote: "The nation is broken, yet the hills and rivers remain; spring fills the city, but the grasses and trees grow wild."',
        'The An-Shi Rebellion did not end the Tang, but it tore open a deep fissure beneath the empire\'s splendid surface. For over a century more, the Tang would endure — but it was no longer the supreme Celestial Empire that had once commanded the awe of the world.'
      ]
    },
    {
      title: 'Last Light of Tang',
      subtitle: '763 — 907 CE',
      body: [
        'After the An-Shi Rebellion, the Tang entered a prolonged twilight. But cultural decline did not follow — on the contrary, the Mid- and Late Tang poetic firmament blazed with stars as bright as any in the High Tang, and in some dimensions surpassed it.',
        'Han Yu and Liu Zongyuan launched the Classical Prose Movement under the banner of "literature as the vehicle of the Way," sweeping aside the florid parallel prose of the Six Dynasties and carving a new path for Chinese prose. Bai Juyi championed the New Yuefu Movement, insisting that "writing must serve its time, and poetry must address real affairs" — his "Song of the Pipa" and "The Old Charcoal Seller" confronted social reality so directly they still move readers today. Li Shangyin constructed a labyrinth of imagery in his untitled poems, giving the world the immortal lines: "The silkworm spins till death — only then does the thread end; the candle weeps till ash — only then do the tears dry."',
        'Yet the body politic rotted day by day. Eunuchs controlled the Palace Army and could depose emperors at will. The Niu-Li factional feud consumed the court for nearly forty years. Warlord provinces grew ever more autonomous, the three Hebei circuits functioning in all but name as independent states. When the Huang Chao rebellion swept across half the empire, the Tang\'s fate was sealed — even as the flames were finally extinguished.',
        'In the fourth year of Tianyou, Zhu Wen deposed the young Emperor Ai and proclaimed the Later Liang Dynasty. The great Tang Empire, after 289 years, came to its formal close. As the palace gates of Chang\'an shut for the last time, an era ended. But the light of Tang culture was never truly extinguished — it lives on, in a thousand years of literature, art, institutions, and spirit, transmuted into forms that continue to shape the world.'
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
        lang: 'en',
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
