# SAVOR & SEED

SAVOR & SEED is a responsive restaurant ordering experience for a fictional neighborhood kitchen. The warm espresso, cream, and terracotta UI pairs image-led dish cards with a practical cart and checkout flow.

## Ordering experience

- Eight dish cards with category, description, INR price, and reliable Unsplash food imagery.
- Add-to-bag buttons, cart drawer, quantity controls, remove actions, empty state, live subtotal, ₹35 packaging fee, delivery/pickup fee logic, and grand total.
- Checkout form for customer name, phone, email, delivery or pickup, conditional delivery address, and cash/UPI placeholder/pay-at-counter choices.
- Native accessible required-field validation, keyboard-friendly buttons, live cart count, and generated order number with a 35–45 minute estimate.
- Dining reservations remain available as a separate form below the ordering experience.

This is a **front-end demo only**. It does not process real payments, store orders, send email, or connect to a delivery provider. For production, connect the checkout submit handler in `script.js` to an order API/payment provider and replace the placeholder business details.

## Run locally

The site has no dependencies or build step:

```bash
python -m http.server 8080
```

Visit `http://localhost:8080`.

## Deploy to GitHub Pages

`.github/workflows/deploy-pages.yml` publishes the repository root using official GitHub Pages actions.

1. Push `main` to GitHub.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Pushes to `main` or a manual workflow run deploy the site.

Live project URL:

**https://prarthanagb.github.io/FUTURE_FS_03/**

## Project structure

```text
index.html   Semantic restaurant site, dish cards, cart, checkout, reservations, SEO
styles.css   Warm responsive UI, cards, drawer, modal, responsive breakpoints
script.js    Menu filtering, cart state, totals, checkout validation and confirmation
favicon.svg  SAVOR & SEED favicon
```
