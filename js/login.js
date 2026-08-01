/* ========================================
   唐姝 · Login — Mock Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Elements ----
  const parallaxBg    = document.getElementById('parallax-bg');
  const parallaxBgLit = document.getElementById('parallax-bg-lit');
  const loginForm     = document.getElementById('login-form');
  const emailInput    = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const btnTogglePwd  = document.getElementById('btn-toggle-password');
  const btnLogin      = document.getElementById('btn-login');
  const backToTop     = document.getElementById('back-to-top');
  const toast         = document.getElementById('toast');

  const emailError    = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  // ========================================
  //  Random Background Set
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
  //  Password Visibility Toggle
  // ========================================

  if (btnTogglePwd && passwordInput) {
    btnTogglePwd.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      btnTogglePwd.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // ========================================
  //  Clear Validation Error on Input
  // ========================================

  function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.classList.remove('visible');
  }

  if (emailInput && emailError) {
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  }
  if (passwordInput && passwordError) {
    passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));
  }

  // ========================================
  //  Toast Notification
  // ========================================

  function showToast(message, duration = 2000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ========================================
  //  Form Validation
  // ========================================

  function validate() {
    let valid = true;

    if (!emailInput.value.trim()) {
      emailInput.classList.add('error');
      emailError.classList.add('visible');
      valid = false;
    }

    if (!passwordInput.value.trim()) {
      passwordInput.classList.add('error');
      passwordError.classList.add('visible');
      valid = false;
    }

    return valid;
  }

  // ========================================
  //  Mock Login Flow
  // ========================================

  if (loginForm && btnLogin) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validate()) return;

      // Enter loading state
      btnLogin.classList.add('loading');
      btnLogin.textContent = '登录中…';

      // Simulate network request
      setTimeout(() => {
        btnLogin.classList.remove('loading');
        btnLogin.textContent = '登录';

        showToast('✓ 登录成功');

        // Redirect to home after brief delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }, 1500);
    });
  }

  // ========================================
  //  Back to Top Button
  // ========================================

  if (backToTop) {
    // Always visible on login page (scrollable on small screens)
    backToTop.classList.add('visible');

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  //  Background lit effect (subtle pulse)
  // ========================================

  // On login page, we add a gentle lit pulse after load
  if (parallaxBg) {
    setTimeout(() => {
      parallaxBg.classList.add('lit');
    }, 600);
  }

});
