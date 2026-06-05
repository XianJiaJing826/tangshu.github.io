/**
 * 入长安·唐姝驾到 - 公共JavaScript
 * Common JavaScript for all pages
 */

// ============================================
// 全局工具函数
// ============================================

function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => { clearTimeout(timeout); func(...args); };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Spring 插值 — 模拟物理弹簧
 * @param {number} current - 当前值
 * @param {number} target - 目标值
 * @param {number} stiffness - 刚度 (0-1, 越大越快)
 * @returns {number} 新值
 */
function spring(current, target, stiffness = 0.12) {
  return current + (target - current) * stiffness;
}

// ============================================
// 导航栏功能
// ============================================

function setupNavbarScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

function setupMobileMenu() {
  // 当前设计无移动端汉堡菜单，保留为扩展点
}

function setupActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage ||
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage === '/' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// 鼠标跟随光效
// ============================================

function setupCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let isActive = false;
  let rafId = null;

  const updateGlow = () => {
    if (!isActive) return;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.transform = `translate3d(calc(${glowX}px - 50%), calc(${glowY}px - 50%), 0)`;
    rafId = requestAnimationFrame(updateGlow);
  };

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isActive) {
      isActive = true;
      glow.style.opacity = '1';
      updateGlow();
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isActive = false;
    glow.style.opacity = '0';
    if (rafId) cancelAnimationFrame(rafId);
  });
}

// ============================================
// 液态玻璃卡片倾斜 — 鼠标驱动 3D 微旋转
// ============================================

function setupGlassTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.glass-tilt');
  if (!cards.length) return;

  const MAX_TILT = 3.5;       // 最大旋转角度
  const STIFFNESS = 0.08;     // spring 刚度

  cards.forEach(card => {
    // 每个卡片维护独立的插值状态
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentGlowX = 50;    // 高光位置 %
    let currentGlowY = 30;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetGlowX = 50;
    let targetGlowY = 30;
    let isHovering = false;
    let rafId = null;

    // 获取或创建高光层
    let glowLayer = card.querySelector('.glass-tilt-glow');
    if (!glowLayer) {
      glowLayer = document.createElement('div');
      glowLayer.className = 'glass-tilt-glow';
      glowLayer.style.cssText = `
        position:absolute;inset:0;pointer-events:none;z-index:3;border-radius:inherit;
        background:radial-gradient(circle at 50% 30%,rgba(255,255,255,.08),transparent 60%);
        transition:none;
      `;
      card.appendChild(glowLayer);
    }

    const animate = () => {
      currentRotateX = spring(currentRotateX, targetRotateX, STIFFNESS);
      currentRotateY = spring(currentRotateY, targetRotateY, STIFFNESS);
      currentGlowX = spring(currentGlowX, targetGlowX, STIFFNESS * 1.2);
      currentGlowY = spring(currentGlowY, targetGlowY, STIFFNESS * 1.2);

      if (isHovering) {
        card.style.transform = `perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateY(-2px)`;
        glowLayer.style.background =
          `radial-gradient(circle at ${currentGlowX}% ${currentGlowY}%,rgba(255,255,255,.10),rgba(255,255,255,.02) 45%,transparent 65%)`;
      } else {
        // 归位
        const nearX = Math.abs(currentRotateX) < 0.05;
        const nearY = Math.abs(currentRotateY) < 0.05;
        if (nearX && nearY) {
          card.style.transform = '';
          glowLayer.style.background = '';
          rafId = null;
          return;
        }
        card.style.transform = `perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        glowLayer.style.background =
          `radial-gradient(circle at ${currentGlowX}% ${currentGlowY}%,rgba(255,255,255,.06),transparent 60%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    card.addEventListener('mouseenter', (e) => {
      isHovering = true;

      // 设置初始值为入口位置
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      targetRotateX = ((yPercent - 50) / 50) * -MAX_TILT;
      targetRotateY = ((xPercent - 50) / 50) * MAX_TILT;
      targetGlowX = xPercent;
      targetGlowY = yPercent;

      // 快速跳转到初始位置
      currentRotateX = targetRotateX * 0.6;
      currentRotateY = targetRotateY * 0.6;
      currentGlowX = targetGlowX;
      currentGlowY = targetGlowY;

      card.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetRotateX = ((y / rect.height - 0.5)) * -MAX_TILT;
      targetRotateY = ((x / rect.width - 0.5)) * MAX_TILT;
      targetGlowX = (x / rect.width) * 100;
      targetGlowY = (y / rect.height) * 100;
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      targetGlowX = 50;
      targetGlowY = 30;
      card.style.transition = 'border-color 0.6s ease, box-shadow 0.6s ease';
    });
  });
}

// ============================================
// 滚动渐显动画
// ============================================

function setupRevealObserver() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeElements = document.querySelectorAll('.fade');

  if (prefersReducedMotion) {
    fadeElements.forEach(el => el.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('animating');
        target.classList.add('show');
        observer.unobserve(target);
        setTimeout(() => target.classList.remove('animating'), 1200);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// 锚点平滑滚动
// ============================================

function setupAnchorScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollToTarget = (hash) => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const nav = document.querySelector('.nav');
    const navOffset = nav ? nav.offsetHeight + 28 : 110;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      e.preventDefault();
      scrollToTarget(hash);
    });
  });

  if (window.location.hash) {
    window.setTimeout(() => scrollToTarget(window.location.hash), 80);
  }
}

// ============================================
// 页面过渡动画
// ============================================

function setupPageTransition() {
  let transition = document.querySelector('.page-transition-overlay');
  if (!transition) {
    transition = document.createElement('div');
    transition.className = 'page-transition-overlay';
    document.body.appendChild(transition);
  }

  window.addEventListener('load', () => {
    document.body.classList.add('page-ready');
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

    link.addEventListener('click', (e) => {
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (isModified) return;
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });
}

// ============================================
// 返回顶部按钮
// ============================================

function setupBackToTop() {
  let backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
  }

  const handleScroll = throttle(() => {
    if (window.scrollY > 500) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
      backToTopBtn.style.transform = 'translateY(20px)';
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// 图片懒加载
// ============================================

function setupLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px 0px' });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// 滚动进度条
// ============================================

function setupScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress');

  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  const handleScroll = throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ============================================
// 初始化
// ============================================

function initCommon() {
  setupNavbarScroll();
  setupMobileMenu();
  setupActiveNavLink();
  setupCursorGlow();
  setupGlassTilt();
  setupRevealObserver();
  setupAnchorScroll();
  setupPageTransition();
  setupBackToTop();
  setupLazyLoad();
  setupScrollProgress();

  console.log('🎋 入长安·唐姝驾到 - 公共脚本已初始化');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}

// ============================================
// 导出
// ============================================

window.TangShu = {
  debounce,
  throttle,
  isInViewport,
  spring,
  setupNavbarScroll,
  setupMobileMenu,
  setupActiveNavLink,
  setupCursorGlow,
  setupGlassTilt,
  setupRevealObserver,
  setupAnchorScroll,
  setupPageTransition,
  setupBackToTop,
  setupLazyLoad,
  setupScrollProgress
};
