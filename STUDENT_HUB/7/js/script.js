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

// Note: the FAQ on the About page used to be plain HTML with a simple
// click-to-open script here. It's now fetched from faqs.json instead —
// see section 8 near the bottom of this file, which both draws the
// FAQ cards AND handles their open/close clicks.

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

// ---------------------------------------------
// 7. Announcements: fetch JSON, search, filter, sort, paginate
// (Announcements page only)
// ---------------------------------------------
var announcementsContainer = document.getElementById('announcements-container');

if (announcementsContainer) {

  var allAnnouncements = [];
  var filteredAnnouncements = [];
  var currentPage = 1;
  var ITEMS_PER_PAGE = 5;

  var statusText = document.getElementById('announcements-status');
  var searchInput = document.getElementById('search-input');
  var categorySelect = document.getElementById('category-select');
  var sortSelect = document.getElementById('sort-select');
  var pageInfo = document.getElementById('page-info');
  var prevBtn = document.getElementById('prev-page-btn');
  var nextBtn = document.getElementById('next-page-btn');

  // ----- draws the cards for whichever page we're currently on -----
  function renderPage() {
    var startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    var endIndex = startIndex + ITEMS_PER_PAGE;
    var pageItems = filteredAnnouncements.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
      announcementsContainer.innerHTML = '<p>No announcements match your search.</p>';
    } else {
      var htmlString = '';
      for (var i = 0; i < pageItems.length; i++) {
        var item = pageItems[i];
        htmlString = htmlString +
          '<article class="announce-card">' +
          '<h3>' + item.title + '</h3>' +
          '<p>' + item.message + '</p>' +
          '<span class="announce-date">' + item.category + ' — ' + item.date + '</span>' +
          '</article>';
      }
      announcementsContainer.innerHTML = htmlString;
    }

    var totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
    if (totalPages === 0) {
      totalPages = 1;
    }
    pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage === totalPages);
  }

  // ----- applies search text + category, then sorts, then goes back to page 1 -----
  function applyFiltersAndRender() {
    var searchText = searchInput.value.toLowerCase();
    var selectedCategory = categorySelect.value;
    var sortOrder = sortSelect.value;

    filteredAnnouncements = allAnnouncements.filter(function (item) {
      var titleMatches = item.title.toLowerCase().indexOf(searchText) !== -1;
      var categoryMatches = (selectedCategory === '' || item.category === selectedCategory);
      return titleMatches && categoryMatches;
    });

    // dates are written as YYYY-MM-DD, so comparing them as plain text
    // also sorts them correctly from earliest to latest
    filteredAnnouncements.sort(function (a, b) {
      if (sortOrder === 'newest') {
        return b.date.localeCompare(a.date);
      } else {
        return a.date.localeCompare(b.date);
      }
    });

    currentPage = 1;
    renderPage();
  }

  searchInput.addEventListener('input', applyFiltersAndRender);
  categorySelect.addEventListener('change', applyFiltersAndRender);
  sortSelect.addEventListener('change', applyFiltersAndRender);

  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      renderPage();
    }
  });

  nextBtn.addEventListener('click', function () {
    var totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
      renderPage();
    }
  });

  // ----- fetch the JSON file when the page first loads -----
  fetch('data/announcements.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(function (data) {
      allAnnouncements = data;
      statusText.textContent = '';
      applyFiltersAndRender();
    })
    .catch(function (error) {
      statusText.textContent = 'Could not load announcements. Please try again later.';
    });
}

// ---------------------------------------------
// 8. FAQ: fetch JSON, search, filter, and open/close
// (About page only)
// ---------------------------------------------
var faqContainer = document.getElementById('faq-container');

if (faqContainer) {

  var allFaqs = [];
  var filteredFaqs = [];

  var faqStatus = document.getElementById('faq-status');
  var faqSearchInput = document.getElementById('faq-search-input');
  var faqCategorySelect = document.getElementById('faq-category-select');

  // ----- draws the FAQ cards and wires up their open/close click -----
  function renderFaqs() {
    if (filteredFaqs.length === 0) {
      faqContainer.innerHTML = '<p>No questions match your search.</p>';
      return;
    }

    var htmlString = '';
    for (var i = 0; i < filteredFaqs.length; i++) {
      var faq = filteredFaqs[i];
      htmlString = htmlString +
        '<div class="faq-item">' +
        '<button type="button" class="faq-question" aria-expanded="false">' +
        faq.question +
        '<span class="faq-icon" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="faq-answer"><p>' + faq.answer + '</p></div>' +
        '</div>';
    }
    faqContainer.innerHTML = htmlString;

    // the buttons above were just created, so we have to find them
    // again and attach their click behaviour now, not before
    var faqButtons = faqContainer.querySelectorAll('.faq-question');
    for (var j = 0; j < faqButtons.length; j++) {
      var faqButton = faqButtons[j];

      faqButton.addEventListener('click', function () {
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
  }

  // ----- applies search text + category to the full FAQ list -----
  function applyFaqFilters() {
    var searchText = faqSearchInput.value.toLowerCase();
    var selectedCategory = faqCategorySelect.value;

    filteredFaqs = allFaqs.filter(function (item) {
      var questionMatches = item.question.toLowerCase().indexOf(searchText) !== -1;
      var categoryMatches = (selectedCategory === '' || item.category === selectedCategory);
      return questionMatches && categoryMatches;
    });

    renderFaqs();
  }

  faqSearchInput.addEventListener('input', applyFaqFilters);
  faqCategorySelect.addEventListener('change', applyFaqFilters);

  // ----- fetch the JSON file when the page first loads -----
  fetch('data/faqs.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(function (data) {
      allFaqs = data;
      faqStatus.textContent = '';
      applyFaqFilters();
    })
    .catch(function (error) {
      faqStatus.textContent = 'Could not load FAQs. Please try again later.';
    });
}
