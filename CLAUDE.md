# Project: timseitzinger.me

Personal site for Tim Seitzinger, built with Astro + Tailwind v4 and
deployed as a static site (Cloudflare Pages recommended). Subdomains point
to separate Heroku-hosted apps and are not part of this repo.

For full context see `README.md` and `ARCHITECTURE.md`.

## Commands

| Command          | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `npm install`    | Install dependencies                             |
| `npm run dev`    | Start the Astro dev server at `localhost:4321`   |
| `npm run build`  | Generate the static site to `./dist`             |
| `npm run preview`| Serve `./dist` locally for a final smoke check   |
| `npm run astro`  | Run any Astro CLI command (e.g. `astro add`)     |

There is no separate lint/format step yet — TypeScript checking runs as
part of `astro build`. The build is the smoke test.

## Conventions

- **Single source of truth for content:** all personal info, navigation,
  and project entries live in `src/config.ts`. Edit there, not in pages.
- **Page-local structured data is fine** when it's specific to one page
  (see the `experience`, `education`, `skills` arrays at the top of
  `src/pages/resume.astro`). Don't push that into `config.ts` unless it
  starts being reused.
- **Components belong in `src/components/`**, layouts in `src/layouts/`,
  routes in `src/pages/`. Pages should compose components, not redefine
  layout or styling concerns.
- **Tailwind v4, CSS-first.** The custom `dark` variant is defined in
  `src/styles/global.css`. Don't reintroduce a `tailwind.config.js`.
- **Class-based dark mode.** Use `dark:` utility variants. The toggle is in
  `src/components/ThemeToggle.astro` and an inline pre-paint script in
  `src/layouts/Layout.astro` prevents FOUC.
- **Keep it static.** No SSR, no runtime data fetching. If a server-side
  feature is genuinely needed (contact form, etc.), prefer a Cloudflare
  Pages Function or a third-party service over adopting SSR.
- **Accent color:** indigo. Neutrals: slate. Keep the palette tight.
- **Typography:** Inter (sans), JetBrains Mono (mono), loaded via Google
  Fonts in `Layout.astro`.

## Deployment workflow

1. Push to `main` on GitHub.
2. Cloudflare Pages auto-deploys (`npm run build`, output `dist/`).
3. The apex `timseitzinger.me` and `www` resolve to Pages.
4. Subdomains (`app1.`, `app2.`, …) are CNAMEs to Heroku and are managed in
   Cloudflare DNS — **not** in this repo.

See `ARCHITECTURE.md` for the full hosting + DNS plan.

## Special rules

- **Don't add a heavy JS framework** (React/Vue/etc.) just to add an
  interactive widget. Reach for an Astro island or a small `<script>` first.
- **Don't break the static build.** If a feature would require SSR, raise
  the tradeoff explicitly before implementing.
- **Don't commit `dist/` or `.env`.** Both are gitignored.
- **Don't put real secrets in `src/config.ts`.** It's bundled into the
  client. Email is fine; API keys are not.
