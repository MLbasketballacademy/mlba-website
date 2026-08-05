// ── Shared Components ──
// Injects the header, navigation, and footer into every page so there is a
// single source of truth for the site chrome. The Member Login button links to
// the AthletePilot production login; the AthletePilot registration widget is
// loaded per-page via the widget script tag.

const NAV_LINKS = [
  { href: 'index.html',              label: 'Home' },
  { href: 'pathways.html',           label: 'Player Pathways' },
  { href: 'academy.html',            label: 'Academy' },
  { href: 'elite.html',              label: 'MLBA Elite' },
  { href: 'columbia-basin-aau.html', label: 'Columbia Basin AAU' },
  { href: 'leagues-tournaments.html',label: 'Leagues & Tournaments' },
  { href: 'sponsors.html',           label: 'Sponsors' },
  { href: 'about.html',              label: 'About' },
  { href: 'contact.html',            label: 'Contact' },
];

const MEMBER_LOGIN_URL = 'https://www.athletepilot.com/login';

const SHARED = {
  header: `
<a href="#main" class="skip-link">Skip to content</a>
<header>
  <div class="header-inner">
    <a class="header-brand" href="index.html" aria-label="MLBA home">
      <img src="images/mlba-logo.png" alt="Moses Lake Basketball Academy logo">
      <span class="brand-text">
        <h1>Moses Lake Basketball Academy</h1>
        <p>Develop · Compete · Belong</p>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Toggle navigation"
            aria-expanded="false" aria-controls="primary-nav">
      <span></span><span></span><span></span>
    </button>
    <div class="header-login">
      <button class="btn-login" type="button"
              onclick="window.location.href='${MEMBER_LOGIN_URL}'">Member Login</button>
    </div>
  </div>
</header>`,

  nav: `
<nav class="site-nav" id="primary-nav" aria-label="Primary">
  <div class="nav-inner">
    <ul>
      ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
    </ul>
  </div>
</nav>`,

  footer: `
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="images/mlba-logo.png" alt="Moses Lake Basketball Academy logo">
      <strong>Moses Lake Basketball Academy</strong>
      <p>Player development, competitive teams, and the home of Columbia Basin AAU — serving Moses Lake and the surrounding communities.</p>
    </div>
    <nav class="footer-col" aria-label="Footer">
      <h4>Explore</h4>
      <a href="pathways.html">Player Pathways</a>
      <a href="academy.html">Academy</a>
      <a href="elite.html">MLBA Elite</a>
      <a href="columbia-basin-aau.html">Columbia Basin AAU</a>
      <a href="leagues-tournaments.html">Leagues &amp; Tournaments</a>
    </nav>
    <div class="footer-col">
      <h4>Connect</h4>
      <a href="sponsors.html">Become a Sponsor</a>
      <a href="about.html">About MLBA</a>
      <a href="contact.html">Contact</a>
      <div class="contact-detail" style="margin-top:8px;">
        <span class="icon" aria-hidden="true">✉️</span>
        <a class="mail" href="mailto:info@mlbasketballacademy.org">info@mlbasketballacademy.org</a>
      </div>
      <div class="contact-detail">
        <span class="icon" aria-hidden="true">📍</span>
        <span>Moses Lake, Washington</span>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    © <span id="footer-year">2026</span> Moses Lake Basketball Academy. All rights reserved.
  </div>
</footer>`
};

// Inject chrome
const headerMount = document.getElementById('site-header');
const navMount    = document.getElementById('site-nav');
const footerMount = document.getElementById('site-footer');
if (headerMount) headerMount.innerHTML = SHARED.header;
if (navMount)    navMount.innerHTML    = SHARED.nav;
if (footerMount) footerMount.innerHTML = SHARED.footer;
