/**
 * 入长安·唐姝驾到 - 公共JavaScript
 * Common JavaScript for all pages
 */

// ============================================
// 全局工具函数
// ============================================

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function}
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function}
 */
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

/**
 * 检查元素是否在视口内
 * @param {Element} element - 要检查的元素
 * @param {number} offset - 偏移量
 * @returns {boolean}
 */
function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// 导航栏功能
// ============================================

/**
 * 设置导航栏滚动效果
 */
function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 设置移动端菜单
 */
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // 点击导航链接后关闭菜单
  const navLinkElements = navLinks.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 设置当前页面导航高亮
 */
function setupActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

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

/**
 * 设置鼠标跟随光效
 * 统一参数：600px大小，0.08缓动系数，40px模糊
 */
function setupCursorGlow() {
  // 移动端不启用
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  // 减少动画偏好检查
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.querySelector('.cursor-glow');
  if (!glow) return; // 页面没有光标元素则不启用

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let isActive = false;
  let rafId = null;

  const updateGlow = () => {
    if (!isActive) return;
    
    // 统一缓动系数：0.08（灵敏度）
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    
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
// 滚动渐显动画
// ============================================

/**
 * 设置滚动渐显动画
 */
function setupRevealObserver() {
  // 处理 reveal 类
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  // 处理 fade 类（页面实际使用的类）
  const fadeElements = document.querySelectorAll('.fade');
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // 处理 reveal 元素
  if (revealElements.length > 0) {
    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('active'));
    } else {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
      });
    }
  }
  
  // 处理 fade 元素
  if (fadeElements.length > 0) {
    if (prefersReducedMotion) {
      fadeElements.forEach(el => el.classList.add('show'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

      fadeElements.forEach(el => observer.observe(el));
    }
  }
}

// ============================================
// 锚点平滑滚动
// ============================================

/**
 * 设置锚点平滑滚动
 */
function setupAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// 页面过渡动画
// ============================================

/**
 * 设置页面过渡动画
 */
function setupPageTransition() {
  // 创建过渡元素
  let transition = document.querySelector('.page-transition');
  if (!transition) {
    transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
  }

  // 页面加载完成后隐藏过渡
  window.addEventListener('load', () => {
    transition.classList.remove('active');
  });

  // 点击链接时显示过渡
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // 只处理内部链接
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        transition.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });
}

// ============================================
// 返回顶部按钮
// ============================================

/**
 * 设置返回顶部按钮
 */
function setupBackToTop() {
  let backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);

    // 添加样式
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--accent-gold);
      color: var(--primary-dark);
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// 图片懒加载
// ============================================

/**
 * 设置图片懒加载
 */
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
  }, {
    rootMargin: '50px 0px'
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// 滚动进度条
// ============================================

/**
 * 设置滚动进度条
 */
function setupScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress');

  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // 添加样式
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--gradient-gold);
      z-index: 10000;
      transition: width 0.1s ease;
    `;
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
// 初始化函数
// ============================================

/**
 * 初始化所有公共功能
 */
function initCommon() {
  // 按顺序初始化
  setupNavbarScroll();
  setupMobileMenu();
  setupActiveNavLink();
  setupCursorGlow();
  setupRevealObserver();
  setupAnchorScroll();
  setupPageTransition();
  setupBackToTop();
  setupLazyLoad();
  setupScrollProgress();

  console.log('🎋 入长安·唐姝驾到 - 公共脚本已初始化');
}

// ============================================
// 页面加载完成后初始化
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}

// ============================================
// 导出函数供页面脚本使用
// ============================================

window.TangShu = {
  debounce,
  throttle,
  isInViewport,
  setupNavbarScroll,
  setupMobileMenu,
  setupActiveNavLink,
  setupCursorGlow,
  setupRevealObserver,
  setupAnchorScroll,
  setupPageTransition,
  setupBackToTop,
  setupLazyLoad,
  setupScrollProgress
};
