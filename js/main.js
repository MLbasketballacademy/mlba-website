// ── Active Nav Link ──
(function () {
  const links = document.querySelectorAll('nav a');
  const page  = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Login Modal ──
const overlay   = document.getElementById('loginModal');
const openBtns  = document.querySelectorAll('[data-open-login]');
const closeBtn  = document.getElementById('closeModal');

openBtns.forEach(btn => btn.addEventListener('click', () => overlay.classList.add('open')));
if (closeBtn)  closeBtn.addEventListener('click',  () => overlay.classList.remove('open'));
if (overlay)   overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

// ── Login Form Submit (demo) ──
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email    = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // Placeholder — replace with real auth (Firebase, Supabase, etc.)
    alert(`Login submitted for: ${email}\n\n(Backend authentication not yet connected — this is a placeholder.)`);
  });
}

// ── Contact Form Submit (demo) ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#3aab3e';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; contactForm.reset(); }, 3000);
  });
}
