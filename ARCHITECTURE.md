# Architecture

This is a tiny site, but documenting the boundaries up front keeps later
changes (analytics, a blog, a contact form) from turning into a mess.

## System overview

```
                ┌────────────────────────────────────────────┐
                │             timseitzinger.me               │
                └────────────────────────────────────────────┘
                                    │
                  ┌─────────────────┼──────────────────┐
                  │                 │                  │
            apex / www        app1.timseitzinger.me   app2.timseitzinger.me
                  │                 │                  │
            ┌─────▼──────┐    ┌─────▼──────┐    ┌─────▼──────┐
            │ Cloudflare │    │   Heroku   │    │   Heroku   │
            │   Pages    │    │   (app)    │    │   (app)    │
            │  (static)  │    │            │    │            │
            └────────────┘    └────────────┘    └────────────┘
                  ▲
                  │ git push to main
                  │
            ┌─────┴──────┐
            │   GitHub   │
            └────────────┘
```

The personal site (this repo) is a **static** site served from Cloudflare
Pages. Existing dynamic apps continue to run on Heroku and are exposed
through CNAME records on Cloudflare DNS.

## Layers / modules

The runtime is dead simple — no server, no DB. The codebase has three
internal layers:

1. **Content layer** — `src/config.ts` and the structured arrays at the top
   of `src/pages/resume.astro`. This is the single source of truth for
   personal info. Editing content should never require touching components
   or layouts.

2. **Presentation layer** — `src/layouts/Layout.astro` and
   `src/components/*`. Reusable, composition-friendly Astro components.
   Pages should only assemble these — they should not redefine layout or
   styling concerns.

3. **Pages** — `src/pages/*.astro`. One file per route. Pages import the
   layout, pull data from the content layer, and arrange components.

## Data flow

1. Author edits `src/config.ts` (or page-local data).
2. `npm run build` produces a fully static `dist/` directory.
3. CI (Cloudflare Pages) runs the build on every push to `main`.
4. Cloudflare's CDN serves the resulting HTML/CSS/JS globally.

There is no runtime data fetching. Anything dynamic (e.g. a contact form
backend, analytics) would be a deliberate, additive decision and should be
documented here.

## Key dependencies

| Dependency           | Why it's here                                   |
| -------------------- | ----------------------------------------------- |
| `astro`              | Static site framework, file-based routing       |
| `tailwindcss` v4     | Utility-first styling, CSS-first config         |
| `@tailwindcss/vite`  | Tailwind's official Astro/Vite integration      |
| Google Fonts (Inter) | Loaded via stylesheet in `Layout.astro`         |

## Theming

Light/dark theme is class-based (`.dark` on `<html>`). The toggle in the
header writes the choice to `localStorage`; an inline script in
`Layout.astro` runs before paint to apply the theme and avoid a flash. The
custom Tailwind variant `@custom-variant dark (&:where(.dark, .dark *))` in
`src/styles/global.css` makes `dark:` utilities respond to that class.

## Tradeoffs

- **Static over SSR.** Fast, free to host, simple to reason about. Loses
  out on per-request personalization, but this site has none.
- **Tailwind over hand-written CSS.** Verbose markup, but trivially
  consistent and fast to iterate on. The CSS-first v4 config keeps
  configuration small.
- **One config file for content.** Simple now; migrate to Astro Content
  Collections if/when a blog or many projects show up.
- **No JS framework.** Astro ships near-zero JS by default; the only client
  scripts are tiny `<script>` blocks for the theme toggle and mobile menu.

## Hosting & DNS plan

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a new project from the GitHub repo.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 22+
3. Move `timseitzinger.me` to Cloudflare nameservers (if not already).
4. Add the apex (`@`) and `www` to the Pages project; Cloudflare provisions
   TLS automatically.
5. For each Heroku app, add a `CNAME` record on Cloudflare:
   `app1.timseitzinger.me` → the Heroku DNS target. Configure the matching
   custom domain on the Heroku side and let Heroku's ACM provision TLS.

Vercel is an equally fine substitute for step 2 if preferred — the rest of
the plan is identical.

## Future considerations

- **Blog / writing.** Add Astro Content Collections under
  `src/content/posts/`. Wire up a `/writing` index and per-post route.
- **Resume PDF.** Drop a `public/resume.pdf` so the existing "Download PDF"
  button on `/resume` works without code changes.
- **Contact form.** A static site can use a serverless function (Cloudflare
  Worker / Pages Function) or a third-party service (Formspree, Plunk).
  Document the chosen path here when added.
- **Analytics.** Prefer privacy-respecting options (Cloudflare Web
  Analytics, Plausible). Avoid anything that needs cookie banners.
- **Tests.** Add Playwright smoke tests when interactive features land.
