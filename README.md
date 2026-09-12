# SAVOR & SEED

SAVOR & SEED is a polished, responsive restaurant website for a fictional neighborhood restaurant in Portland. It uses a warm espresso, cream, and terracotta palette with editorial typography, food-forward imagery, and a welcoming voice to make the brand feel memorable before a guest ever walks through the door.

## How the site helps the cafe grow

- **Turns appetite into reservations:** prominent reservation CTAs, a clear menu, and an accessible request form reduce friction between discovery and a confirmed visit.
- **Builds confidence before the first visit:** pricing, dietary labels, hours, address, contact links, chef story, testimonials, and a gallery answer the practical questions guests have.
- **Creates a distinctive brand moment:** seasonal storytelling, the warm visual system, and a focused menu experience make SAVOR & SEED easier to remember and share.
- **Supports repeat visits:** a seasonal menu structure and content that highlights the room, chef, and hospitality give guests reasons to return.

## Run locally

This is a dependency-free static website. Open `index.html` directly, or serve the repository with any static server:

```bash
python -m http.server 8080
```

Visit `http://localhost:8080`.

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`, which publishes the static root with the official GitHub Pages artifact and deployment actions. There is no build command or package installation.

1. Push the repository's `main` branch to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**. This is a one-time repository setting; the workflow cannot change it without an appropriately authorized GitHub API token.
3. Pushes to `main` (and manual runs from the **Actions** tab) deploy the site.
4. Wait for the **Deploy static site to GitHub Pages** workflow to finish.

Expected project-site URL:

**https://prarthanagb.github.io/FUTURE_FS_03/**

If the repository is renamed or Pages is configured under a custom domain, use the URL shown in the workflow's `github-pages` environment instead. Before launch, replace the placeholder Open Graph URL, address, phone, email, map query, and social links with the cafe's production details. The reservation form validates required fields and shows an in-page confirmation; connect its submit handler in `script.js` to a booking service or backend endpoint for real reservation capture.

## Project structure

```text
index.html   Semantic page structure, menu, reservation form, and SEO metadata
styles.css   Responsive warm visual system, layouts, gallery, and motion
script.js    Mobile navigation, menu tabs, scroll reveal, and form validation/state
favicon.svg  SAVOR & SEED brand favicon
```
