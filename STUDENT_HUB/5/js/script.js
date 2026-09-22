/* ============================================
   StudentHub — script.js
   One shared file, linked from every page.
   ============================================ */

// ---------------------------------------------
// 1. Hamburger menu (all pages)
// ---------------------------------------------
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

// ---------------------------------------------
// 6. Registration form validation (Register page only)
// ---------------------------------------------
var registerForm = document.getElementById('register-form');

if (registerForm) {

  // one regex per field, kept simple and separate so each is easy to explain
  var namePattern = /^[A-Za-z ]{2,}$/;
  var emailPattern = /^\S+@\S+\.\S+$/;
  var mobilePattern = /^[0-9]{10}$/;

  var fullnameInput = document.getElementById('fullname');
  var emailInput = document.getElementById('reg-email');
  var mobileInput = document.getElementById('mobile');
  var passwordInput = document.getElementById('reg-password');
  var confirmInput = document.getElementById('confirm-password');
  var courseInput = document.getElementById('course');
  var yearInput = document.getElementById('year');
  var termsInput = document.getElementById('terms');

  // ----- password strength meter -----
  // updates live as the student types, does not block submission
  var strengthBox = document.getElementById('password-strength');

  if (passwordInput && strengthBox) {
    passwordInput.addEventListener('input', function () {
      var value = passwordInput.value;
      var score = 0;

      if (value.length >= 8) { score = score + 1; }
      if (/[A-Z]/.test(value)) { score = score + 1; }
      if (/[0-9]/.test(value)) { score = score + 1; }
      if (/[^A-Za-z0-9]/.test(value)) { score = score + 1; }

      if (value.length === 0) {
        strengthBox.textContent = '';
        strengthBox.className = 'password-strength';
      } else if (score <= 1) {
        strengthBox.textContent = 'Weak password';
        strengthBox.className = 'password-strength weak';
      } else if (score <= 3) {
        strengthBox.textContent = 'Medium password';
        strengthBox.className = 'password-strength medium';
      } else {
        strengthBox.textContent = 'Strong password';
        strengthBox.className = 'password-strength strong';
      }
    });
  }

  // ----- main validation, runs on submit -----
  registerForm.addEventListener('submit', function (event) {
    var isValid = true;

    // clear every error message before checking again
    var allErrors = registerForm.querySelectorAll('.field-error');
    for (var e = 0; e < allErrors.length; e++) {
      allErrors[e].textContent = '';
    }

    // full name
    if (!namePattern.test(fullnameInput.value)) {
      document.getElementById('fullname-error').textContent = 'Enter your full name using letters only.';
      isValid = false;
    }

    // email
    if (!emailPattern.test(emailInput.value)) {
      document.getElementById('email-error').textContent = 'Enter a valid email address.';
      isValid = false;
    }

    // mobile number
    if (!mobilePattern.test(mobileInput.value)) {
      document.getElementById('mobile-error').textContent = 'Enter a 10-digit mobile number.';
      isValid = false;
    }

    // password
    if (passwordInput.value.length < 8) {
      document.getElementById('password-error').textContent = 'Password must be at least 8 characters.';
      isValid = false;
    }

    // confirm password
    if (confirmInput.value !== passwordInput.value || confirmInput.value === '') {
      document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
      isValid = false;
    }

    // course
    if (courseInput.value === '') {
      document.getElementById('course-error').textContent = 'Please select a course.';
      isValid = false;
    }

    // year
    if (yearInput.value === '') {
      document.getElementById('year-error').textContent = 'Please select a year.';
      isValid = false;
    }

    // gender — check if any radio button in the group is checked
    var genderChecked = document.querySelector('input[name="gender"]:checked');
    if (!genderChecked) {
      document.getElementById('gender-error').textContent = 'Please select a gender.';
      isValid = false;
    }

    // terms
    if (!termsInput.checked) {
      document.getElementById('terms-error').textContent = 'You must accept the terms and conditions.';
      isValid = false;
    }

    // stop the form from submitting only if something is wrong
    if (!isValid) {
      event.preventDefault();
    }
  });
}
