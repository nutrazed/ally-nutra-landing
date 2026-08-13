# Ally Nutra — Landing Page

A React + Vite port of the Ally Nutra marketing site, deployed to GitHub Pages.

**Live:** https://nutrazed.github.io/ally-nutra-landing/

## Prototype status

This is a design prototype, not a production site. Nothing on the Contact page's quote form
is wired to a backend — `handleSubmit` in `src/views/Contact.jsx` never transmits data. It
renders an inline success state so the design can be reviewed, and that success state carries
its own visible "Prototype — this form does not send" notice for exactly that reason. See
`docs/PLAN.md` for the audit this behavior answers.

## Prerequisites

- Node 22 (see `.nvmrc`; `nvm use` if you have nvm installed)
- npm

## Install & run

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint       # oxlint
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes
`dist/` to GitHub Pages via the official `actions/deploy-pages` action (Pages source = GitHub
Actions, not a `gh-pages` branch). No manual deploy step is needed.

The Vite `base` in `vite.config.js` is hard-coded to `/ally-nutra-landing/` to match the GitHub
Pages project-page URL — without it, every built asset resolves to the domain root and 404s.

## Routing

Client-side routing uses `react-router-dom`'s `HashRouter`, not `BrowserRouter`. GitHub Pages
serves static files with no server-side rewrite rule, so a `BrowserRouter` path like `/faq`
would hard-404 on a direct load or a page refresh. `HashRouter` keeps the route in the URL
fragment (`#/faq`), which the browser never sends to the server, so deep links and refreshes
always resolve to `index.html` and then route client-side.

## Structure

```
src/
  main.jsx              app entry, imports global CSS
  App.jsx               HashRouter + route table + Header/Footer layout
  styles/
    tokens.css           design system CSS variables (colors, fonts, spacing, radii)
    global.css           reset + every component/page style, copied from the original design
  components/            Header, Footer, nav dropdown, mobile menu
  views/                 one component per route (Home, Services, Facility, FAQ, Contact, ...)
  assets/
    images/               all photography, imported per-component (fails the build if missing)
    videos/               hero background video + poster
public/
  favicon-32.png, favicon-180.png
```

## Images

All imagery is committed locally under `src/assets/images/` — nothing loads from a remote image
host at runtime. Sources, subjects, and licenses for every photo are documented in
[`IMAGE-CREDITS.md`](./IMAGE-CREDITS.md).

Google Fonts (Roboto Slab, Roboto, JetBrains Mono) and the Google Maps embed on the Contact page
remain remote dependencies by design.

## License

All rights reserved. This is Ally Nutra's marketing content — no license is granted for reuse.
