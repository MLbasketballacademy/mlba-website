// ── Shared Components ──
// This file injects the header, nav, footer, and login modal into every page.

const SHARED = {
  header: `
<header>
  <div class="header-brand">
    <img src="images/mlba-logo.png" alt="MLBA Logo">
    <div class="brand-text">
      <h1>Moses Lake Basketball Academy</h1>
      <p>Developing Athletes · Building Leaders</p>
    </div>
  </div>
  <div class="header-actions">
    <a href="https://app.athletepilot.com/login" class="btn-login">Member Login</a>
  </div>
</header>`,

  nav: `
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="teams.html">Teams</a>
  <a href="sponsors.html">Become A Sponsor</a>
  <a href="contact.html">Contact</a>
</nav>`,

  footer: `
<footer>
  <img class="footer-logo" src="images/mlba-logo.png" alt="MLBA">
  <div class="footer-links">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="teams.html">Teams</a>
    <a href="sponsors.html">Sponsors</a>
    <a href="contact.html">Contact</a>
  </div>
  <p><strong>Moses Lake Basketball Academy</strong></p>
  <p>Moses Lake, WA &nbsp;·&nbsp; <a href="mailto:info@mlbasketballacademy.org">info@mlbasketballacademy.org</a></p>
  <p style="margin-top:16px;font-size:0.8rem;opacity:0.5;">© 2026 Moses Lake Basketball Academy. All rights reserved.</p>
</footer>`,

  modal: `

};

// Inject into page
document.getElementById('site-header').innerHTML = SHARED.header;
document.getElementById('site-nav').innerHTML    = SHARED.nav;
document.getElementById('site-footer').innerHTML = SHARED.footer;
document.getElementById('site-modal').innerHTML  = SHARED.modal;
