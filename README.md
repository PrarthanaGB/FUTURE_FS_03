# FUTURE_FS_01 — Prarthana G B Portfolio

Task 1 portfolio for **FUTURE_FS_01**: a responsive, accessible personal portfolio for Prarthana G B, an Information Science Engineering student in Shivamogga, Karnataka. The site highlights her education, skills, projects, certifications, achievements, language proficiency, and resume.

## Run locally

This is a dependency-free static site. From the repository root, run:

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Deploy to GitHub Pages

The included `.github/workflows/deploy-pages.yml` publishes the repository root with the official GitHub Pages actions.

1. Push the repository to GitHub.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Push to `main` or trigger the workflow manually.

Live project URL: <https://prarthanagb.github.io/FUTURE_FS_03/>

## Project structure

```text
index.html   Semantic portfolio content, SEO metadata, project and contact sections
styles.css   Responsive visual system, accessible focus states, cards, timeline, and layout
script.js    Mobile navigation, scroll reveals, and contact-form demo behavior
favicon.svg  Portfolio favicon
assets/      Provided resume PDF used by the view/download resume actions
images/      Provided profile image used in the hero profile card
```

## Contact form behavior

The contact form is intentionally a front-end demo: it validates required fields and email format, then shows a confirmation message without sending or storing data. Connect the submit handler in `script.js` to a trusted form endpoint or backend when a production contact workflow is available.
