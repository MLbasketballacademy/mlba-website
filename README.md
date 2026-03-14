# Moses Lake Basketball Academy — Website

Official website for the **Moses Lake Basketball Academy (MLBA)**.

🌐 Live site: [mlbasketballacademy.org](https://mlbasketballacademy.org)

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About MLBA |
| `teams.html` | Our Teams |
| `sponsors.html` | Become A Sponsor |
| `contact.html` | Contact Us |

## Folder Structure

```
mlba-website/
├── index.html
├── about.html
├── teams.html
├── sponsors.html
├── contact.html
├── CNAME                  ← Points domain to GitHub Pages
├── css/
│   └── style.css
├── js/
│   ├── components.js      ← Shared header/nav/footer/modal
│   └── main.js            ← Interactions (login modal, forms)
└── images/
    ├── mlba-logo.png
    └── llakers-5th-grade.jpg
```

## Hosting

This site is hosted on **GitHub Pages** at:
`https://MLbasketballacademy.github.io/mlba-website`

The custom domain `mlbasketballacademy.org` is configured via the `CNAME` file and GoDaddy DNS settings.

### GoDaddy DNS Settings Required

In your GoDaddy DNS panel, set these records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | MLbasketballacademy.github.io |

---

## Updating the Site

1. Edit the HTML/CSS/JS files
2. Commit and push to GitHub
3. GitHub Pages publishes automatically within ~1 minute

## Login / Member Area

The login button opens a modal. Currently it is a **UI placeholder only** — no backend is connected yet. 
To add real authentication, consider:
- [Firebase Authentication](https://firebase.google.com/docs/auth) (free tier, easy setup)
- [Supabase](https://supabase.com) (free tier, open source)

## Contact

📧 info@mlbasketballacademy.org  
📍 Moses Lake, WA
