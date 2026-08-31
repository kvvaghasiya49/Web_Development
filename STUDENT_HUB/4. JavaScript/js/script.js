var navToggle = document.getElementById('nav-toggle');
var mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {

  navToggle.addEventListener('click', function () {
    if (mainNav.classList.contains('nav-open')) {
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      mainNav.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close the menu once a link inside it is clicked
  var navLinks = mainNav.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }
}

// ---------------------------------------------
// 2. Light / dark theme toggle (all pages)
// Saved in localStorage so the choice stays the same
// after a page reload and on every other page too.
// ---------------------------------------------
var themeToggle = document.getElementById('theme-toggle');
var THEME_KEY = 'studenthub-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    if (themeToggle) {
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  } else {
    document.documentElement.classList.remove('dark-theme');
    if (themeToggle) {
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
}

// Run this as soon as the page loads
var savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === null) {
  savedTheme = 'light';
}
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.classList.contains('dark-theme');
    if (isDark) {
      applyTheme('light');
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      applyTheme('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    }
  });
}

// ---------------------------------------------
// 3. Dismissible notification banner (Dashboard page only)
// ---------------------------------------------
var feeBanner = document.getElementById('fee-banner');
var bannerClose = document.getElementById('banner-close');
var BANNER_KEY = 'studenthub-banner-dismissed';

if (feeBanner) {
  if (localStorage.getItem(BANNER_KEY) === 'true') {
    feeBanner.classList.add('hidden');
  }
}

if (bannerClose && feeBanner) {
  bannerClose.addEventListener('click', function () {
    feeBanner.classList.add('hidden');
    localStorage.setItem(BANNER_KEY, 'true');
  });
}

// ---------------------------------------------
// 4. Collapsible FAQ (About page only)
// ---------------------------------------------
var faqButtons = document.querySelectorAll('.faq-question');

for (var j = 0; j < faqButtons.length; j++) {
  var faqButton = faqButtons[j];

  faqButton.addEventListener('click', function () {
    // the box around each question+answer pair is its direct parent
    var item = this.parentElement;

    if (item.classList.contains('open')) {
      item.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
}

// ---------------------------------------------
// 5. Payment confirmation modal (Fees page only)
// ---------------------------------------------
var payBtn = document.getElementById('pay-now-btn');
var payModal = document.getElementById('pay-modal');
var payCancel = document.getElementById('pay-modal-cancel');
var payConfirm = document.getElementById('pay-modal-confirm');

if (payBtn && payModal) {
  payBtn.addEventListener('click', function () {
    payModal.removeAttribute('hidden');
  });
}

if (payCancel && payModal) {
  payCancel.addEventListener('click', function () {
    payModal.setAttribute('hidden', '');
  });
}

if (payConfirm && payModal) {
  payConfirm.addEventListener('click', function () {
    payModal.setAttribute('hidden', '');
  });
}