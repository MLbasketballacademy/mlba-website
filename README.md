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
├── CNAME                  ← Custom domain for GitHub Pages (do not remove)
├── css/
│   └── style.css          ← Design system + all page styles
├── js/
│   ├── components.js      ← Shared header / nav / footer (single source of truth)
│   └── main.js            ← Active nav, mobile menu, contact-form mailto handoff
└── images/
    └── mlba-logo.png      ← MLBA logo (also used as favicon)
```

## Integrations

- **AthletePilot registration widget** — loaded via
  `<script src="https://athletepilot.com/widget.js" data-club-id="mlba_1773697477281"></script>`
  on pages with a registration call-to-action (Home, Player Pathways, Academy, Contact).
  Register buttons call `window.AthletePilot.open()`. **Do not change the `data-club-id`.**
- **Member Login** — the header button links to the AthletePilot production login at
  `https://www.athletepilot.com/login`.

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
