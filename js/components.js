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
<div class="modal-overlay" id="loginModal">
  <div class="modal">
    <button class="modal-close" id="closeModal" aria-label="Close">×</button>
    <img class="modal-logo" src="images/mlba-logo.png" alt="MLBA">
    <h2>Member Login</h2>
    <p class="sub">Sign in to access team schedules, rosters, and coach resources.</p>
    <form id="loginForm">
      <div class="form-group">
        <label for="loginEmail">Email</label>
        <input type="email" id="loginEmail" placeholder="you@email.com" required>
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input type="password" id="loginPassword" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn-primary" style="width:100%;margin-top:8px;">Sign In</button>
    </form>
    <p style="text-align:center;margin-top:16px;font-size:0.85rem;color:#6b7280;">
      Need access? <a href="contact.html" style="color:#0a6c74;font-weight:600;">Contact us</a> to register.
    </p>
  </div>
</div>`
};

// Inject into page
document.getElementById('site-header').innerHTML = SHARED.header;
document.getElementById('site-nav').innerHTML    = SHARED.nav;
document.getElementById('site-footer').innerHTML = SHARED.footer;
document.getElementById('site-modal').innerHTML  = SHARED.modal;
