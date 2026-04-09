# Context

Bram owns the LD (Last Drop) underwear website currently hosted on Lovable (a paid SaaS). He's exported the full React/Vite/Tailwind source code to `/Users/bram/Documents/coding/LD-website/Lovable code exported/`. The goal is to move it to GitHub Pages with his own domain (ld-underwear.nl) to eliminate the Lovable subscription cost.

---

## What the project is

- React 18 + Vite + TypeScript + Tailwind + shadcn/ui
- Single-page app with sections: Hero, Benefits, Product Cards, Technology, Testimonials, HowItWorks, Lifestyle Banner, Footer
- Custom fonts: Playfair Display + Inter (Google Fonts)
- Analytics: Google Tag Manager (GTM-KXXWP8DV)
- Waitlist form: Tally.so popup (form ID `BzZbl7`)
- Assets: 9 jpg images in `src/assets/`

**Critical files:**
- `Lovable code exported/` — entire source to copy
- `Lovable code exported/vite.config.ts` — needs lovable-tagger removed
- `Lovable code exported/package.json` — needs lovable-tagger removed from devDeps

---

## Plan

### Step 1 — Copy source files into repo root

Copy everything from `Lovable code exported/` into `/Users/bram/Documents/coding/LD-website/` (the git repo root), excluding the Lovable code exported folder itself. This means all files land directly at repo root:
- `src/`, `public/`, `index.html`, `package.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`, `components.json`, `.gitignore` (if any)

### Step 2 — Remove Lovable-specific dependencies

Edit `vite.config.ts`:
- Remove the `componentTagger` import and its usage (the `mode === "development" && componentTagger()` plugin)

Edit `package.json`:
- Remove `lovable-tagger` from devDependencies

### Step 3 — Configure for GitHub Pages

Edit `vite.config.ts`:
- Add `base: '/'` (since we're using a custom domain, base stays `/`)

Add `public/CNAME` file with content:
```
ld-underwear.nl
```

### Step 4 — Add GitHub Actions deploy workflow

Create `.github/workflows/deploy.yml`:
- Trigger: push to `main`
- Steps: checkout → setup Node → install (npm ci) → build (`npm run build`) → deploy to `gh-pages` branch using `peaceiris/actions-gh-pages`

### Step 5 — Initialize git and create GitHub repo

```bash
cd /Users/bram/Documents/coding/LD-website
git init
git add .
git commit -m "Initial commit: LD website migrated from Lovable"
gh repo create LD-website --public --source=. --remote=origin --push
```

### Step 6 — Configure GitHub Pages

In the new GitHub repo settings:
- Source: `gh-pages` branch, `/ (root)`
- Custom domain: `ld-underwear.nl`

Bram will also need to update his DNS:
- Add a CNAME record: `ld-underwear.nl` → `<github-username>.github.io`
- Or use A records pointing to GitHub Pages IPs

---

## Verification

1. After deploy, visit `https://<github-username>.github.io/` or `https://ld-underwear.nl/`
2. Check all sections render, images load, Tally popup opens on "Koop nu"
3. GTM fires (verify in GTM preview mode)
4. Run `npm run build` locally first to confirm no build errors
