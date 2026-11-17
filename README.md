# Moses Lake Basketball Academy — Website

Official website for the **Moses Lake Basketball Academy (MLBA)** — the basketball
organization serving Moses Lake and the broader Columbia Basin.

🌐 Live site: [mlbasketballacademy.org](https://mlbasketballacademy.org)

Static site (HTML, CSS, vanilla JS) hosted on **GitHub Pages**. No build step.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `pathways.html` | Player Pathways |
| `academy.html` | Academy |
| `elite.html` | MLBA Elite |
| `columbia-basin-aau.html` | Columbia Basin AAU |
| `leagues-tournaments.html` | Leagues & Tournaments |
| `sponsors.html` | Sponsors |
| `about.html` | About |
| `contact.html` | Contact |
| `team-registration.html` | Outside Team Registration (embedded Zoho form; teams outside Moses Lake only; not in the main nav) |
| `fall-league-schedule.html` | Fall 2026 League Schedule (master-schedule PDF viewer + download; not in the main nav) |

## Folder structure

```
mlba-website/
├── index.html
├── pathways.html
├── academy.html
├── elite.html
├── columbia-basin-aau.html
├── leagues-tournaments.html
├── sponsors.html
├── about.html
├── contact.html
├── team-registration.html
├── fall-league-schedule.html
├── CNAME                  ← Custom domain for GitHub Pages (do not remove)
├── css/
│   ├── style.css          ← Design system + all page styles
│   ├── seasonal-promo.css ← Temporary seasonal promotions (see "Seasonal promotions")
│   └── seasonal-holiday.css ← Temporary Christmas decoration (body.season-holiday)
├── js/
│   ├── components.js      ← Shared header / nav / footer (single source of truth)
│   └── main.js            ← Active nav, mobile menu, contact-form mailto handoff
├── files/
│   ├── 2026-fall-league/ ← Published league schedule PDFs
│   └── swishmas/         ← Swishmas flyer PDF (temporary)
└── images/
    └── mlba-logo.png      ← MLBA logo (also used as favicon)
```

## Seasonal promotions (temporary — Winter 2026–27)

Added for Swishmas at The Lake, MLBA Winter player registration and the January–February Winter League.
The permanent design and the standard homepage content are unchanged; the seasonal material is layered on top.

| Piece | Where | Purpose |
|---|---|---|
| Seasonal block | `index.html`, between `SEASONAL PROMOTIONS — START` and `SEASONAL PROMOTIONS — END` | Three-path chooser + Swishmas, Winter player and Winter League sections. Each promotion is its own marked sub-block. |
| Swishmas block | `leagues-tournaments.html`, between `SEASONAL: Swishmas … START/END`, plus lines marked `SEASONAL:` | Flyer, details, Saturday-only option; replaces the "MLBA-Operated Tournament / TBD" card. |
| `css/seasonal-promo.css` | linked from both pages | Promotion layout only. Every selector starts with `.sp-`. |
| `css/seasonal-holiday.css` | linked from `index.html`; active only with `<body class="season-holiday">` | Christmas decoration only (no content). Static; no animation. |
| `images/seasonal/` | flyer PNG (approved original, unmodified) + WebP sizes 560/800/1103 | WebP versions verified to keep the QR readable. |
| `files/swishmas/Swishmas-at-The-Lake-2026-Flyer.pdf` | approved flyer PDF (unmodified) | "Download Flyer" link. |

**Remove only the Christmas styling** (keep January–February promotions): delete `class="season-holiday"` from the
`<body>` tag in `index.html` and its `seasonal-holiday.css` `<link>`; then delete `css/seasonal-holiday.css`.

**Retire one promotion:** delete its marked sub-block (and the matching chooser card in `sp-hub`). On
`leagues-tournaments.html`, restore the tournament placeholder card and wording from the pre-seasonal commit.

**Restore the standard homepage exactly:** `git checkout 20309b6 -- index.html` (the commit before the seasonal
work), or delete the whole seasonal block plus the two seasonal `<link>` tags and the body class. When no page
uses `.sp-` markup any more, delete `css/seasonal-promo.css`, `images/seasonal/` and `files/swishmas/`.

## Integrations

- **AthletePilot registration** — every Register call-to-action is a plain link (not a script or
  click handler) to a specific AthletePilot offering-registration URL:
  - General chooser: `https://www.athletepilot.com/register/mlba_1773697477281/offerings`
  - Academy only: `https://www.athletepilot.com/register/mlba_1773697477281/offerings/cmtbly5ib03wdnc2kz0k5lbtm`
  - Academy + Team: `https://www.athletepilot.com/register/mlba_1773697477281/offerings/cmtblzw0o03wfnc2kp4774ybh`

  The site previously loaded an AthletePilot widget script (`widget.js`) and called
  `window.AthletePilot.open()` from Register buttons; that global was never actually provided by
  the script, so every Register button was broken. Both have been removed in favor of the plain
  links above. **Do not change the club id (`mlba_1773697477281`) or the offering ids.**
- **Member Login** — the header button links to the AthletePilot production login at
  `https://www.athletepilot.com/login`.
- **Team registration (Zoho Forms)** — `team-registration.html` embeds an MLBA-owned Zoho form
  with Zoho's supplied embed script. The form URL is public embed configuration, not a secret.
  Zoho resizes the iframe to fit the form so the page scrolls normally. The form collects
  registration details only: **no payment is taken**, MLBA reviews each submission, and approved
  teams receive a separate payment request. The form is **only for teams outside Moses Lake**
  (Fall 2026 deadline: October 7, 2026); Moses Lake families register each player individually
  through an MLBA player offering (`pathways.html`). The "Start Outside Team Registration" button on
  `leagues-tournaments.html` links here. Roster corrections go to
  `league@mlbasketballacademy.org`. Change the form itself in Zoho, not in this repo.
- **League Communities** — `leagues-tournaments.html` lists the communities represented in league
  play as text-only cards (no logos: written authorization for official school logos is pending).
  Add a community by copying one `.community-card` `<li>`; add an approved image later with an
  `<img class="community-logo">` before the name. Never add school or mascot images without written permission.

## Hosting

Hosted on **GitHub Pages** at `https://MLbasketballacademy.github.io/mlba-website`.
The custom domain `mlbasketballacademy.org` is configured via the `CNAME` file and
GoDaddy DNS.

### GoDaddy DNS records

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | MLbasketballacademy.github.io |

## Updating the site

1. Edit the HTML/CSS/JS files.
2. Commit and push to GitHub.
3. GitHub Pages publishes automatically within ~1 minute.

## Contact form

The contact form has **no backend**. On submit it opens the visitor's email client
with the message pre-filled (a `mailto:` handoff) and shows a clear notice — it never
falsely reports that a message was sent. To make it a true server-backed form later,
wire it to a form service (e.g. Formspree) or a serverless endpoint.

## Member area

Member access is handled by **AthletePilot** — the Member Login button links directly to
the AthletePilot login. The site does not implement its own authentication.

## Contact

📧 info@mlbasketballacademy.org
📍 Moses Lake, WA
