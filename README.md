# timseitzinger.me

Personal site for **Tim Seitzinger** — a small, fast, static site built with
[Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).
The site lives at the apex of `timseitzinger.me`; subdomains
(e.g. `app1.timseitzinger.me`) point at separate apps hosted elsewhere.

## What's here

- A landing page with a short intro and featured projects
- An about page
- A projects page that links out to the apps running on subdomains
- An HTML resume (with a slot for a downloadable PDF)
- A contact page

## Tech stack

- **Framework:** Astro 6 (static output)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Language:** TypeScript (strict)
- **Hosting:** Cloudflare Pages (recommended) — see `ARCHITECTURE.md`

## Install

```sh
npm install
```

Requires Node.js **>= 22.12**.

## Run locally

```sh
npm run dev
```

Then open http://localhost:4321.

## Build

```sh
npm run build       # outputs static site to ./dist
npm run preview     # serves ./dist locally
```

## Test

This project has no automated tests yet. The build itself acts as a smoke
test (TypeScript + Astro compile + static generation):

```sh
npm run build
```

If/when interactive components are added, plan to introduce
[Vitest](https://vitest.dev) for unit tests and
[Playwright](https://playwright.dev) for end-to-end.

## Editing content

All personal info, navigation, and project entries are centralized in
**`src/config.ts`** — edit that file first when updating copy, links, or
adding/removing projects.

The resume page (`src/pages/resume.astro`) holds its own structured data
(experience, education, skills) at the top of the file.

## Project structure

```
.
├── astro.config.mjs        # Astro + Tailwind config, canonical site URL
├── public/                 # static assets served as-is (favicon, resume.pdf)
├── src/
│   ├── components/         # Header, Footer, ProjectCard, ThemeToggle
│   ├── config.ts           # site name, links, projects (single source of truth)
│   ├── layouts/
│   │   └── Layout.astro    # shared <html> shell, header, footer, theme bootstrap
│   ├── pages/              # file-based routes
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   ├── resume.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css      # Tailwind import + custom variants
├── ARCHITECTURE.md
├── CLAUDE.md               # project-specific assistant rules
└── README.md
```

## Environment variables

None required for the static site itself. If a contact form or analytics is
added later, document the variables here and provide a `.env.example`.

## Deployment

Static-only — deploy the contents of `./dist` to any static host.
Recommended: **Cloudflare Pages** (free, Cloudflare DNS already manages the
domain, generous limits). See `ARCHITECTURE.md` for the deployment plan and
DNS / subdomain strategy.

## Skills

| Area          | Tools                                       |
| ------------- | ------------------------------------------- |
| Language      | TypeScript                                  |
| Framework     | Astro 6                                     |
| Styling       | Tailwind CSS v4                             |
| Build         | Vite (via Astro), npm                       |
| Hosting       | Cloudflare Pages (recommended) / Vercel     |
| DNS           | Cloudflare                                  |
| Apps elsewhere| Heroku (subdomains)                         |

## License

Personal project — all rights reserved.
