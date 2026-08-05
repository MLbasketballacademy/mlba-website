// ── Site interactions ──
// Runs after components.js has injected the shared chrome.

(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ── Active nav link ──
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ── Mobile nav toggle ──
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the menu after choosing a destination (mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Contact form: real mailto handoff (no fake "sent" state) ──
  // The static site has no backend, so the form composes an email in the
  // visitor's mail client using the details they entered. This is transparent:
  // the page never claims a message was sent on its own.
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name    = get('name');
      var email   = get('email');
      var topicEl = document.getElementById('subject');
      var topic   = topicEl && topicEl.selectedIndex >= 0 ? topicEl.options[topicEl.selectedIndex].text : '';
      var message = get('message');

      var subject = 'MLBA inquiry' + (topic && topic.indexOf('Select') === -1 ? ' — ' + topic : '');
      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        'Topic: ' + topic,
        '',
        message
      ];
      var mailto = 'mailto:info@mlbasketballacademy.org'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;

      var status = document.getElementById('formStatus');
      if (status) {
        status.hidden = false;
        status.textContent = 'Your email app should now open with your message pre-filled. '
          + 'If it does not, email us directly at info@mlbasketballacademy.org.';
      }
    });
  }
})();
