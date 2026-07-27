# Iris Marek Studio

Vanilla HTML/CSS/JS, bundled with Vite, no frameworks. Two pages:

- **`index.html`** — homepage (intro, philosophy, curated case studies, contact)
- **`case-study.html`** — one reusable template that renders **every** project,
  chosen via `?project=<slug>` in the URL

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
```

## Adding a new project (no new HTML page, ever)

1. Copy `src/data/projects/marrow.js` to `src/data/projects/your-project.js`.
2. Fill in `slug`, `title`, `discipline`, `year`, `featured`, and the
   `sections` array. Section order in the array **is** the order it renders
   in — the story spine is:

   ```
   hero → brief → research → process → exploration
        → development → outcome → reflection
   ```

   You can also drop in a `type: 'custom'` section anywhere in the array for
   project-specific steps (see `second-skin.js`'s "Fit Studies" or
   `aviary.js`'s "Material Tests" for examples).
3. Set `featured: true` if it should appear in the homepage's "Selected Work"
   list. That's it — `src/data/registry.js` finds the file automatically via
   `import.meta.glob`, the homepage list re-renders itself, and
   `case-study.html?project=your-project` works immediately.

Real imagery: replace the CSS gradient placeholders in
`caseStudyRenderer.js`'s `mediaBlock()` with real `<img>`/`<picture>` tags
once photography/renders are ready — drop files into `/public/images/` and
reference them from the project data (e.g. `image: '/images/marrow-01.jpg'`).

## Folder structure

```
├── index.html                  homepage markup
├── case-study.html             single dynamic template markup
├── vite.config.js              multi-page build config (no plugins)
│
├── src/
│   ├── main.js                 homepage entry — wires up modules
│   ├── case-study.js           case-study entry — reads ?project=, renders, wires up modules
│   │
│   ├── styles/
│   │   ├── tokens.css          colors, fonts — single source of truth
│   │   ├── base.css            reset + global type
│   │   ├── layout.css          .wrap, .rv scroll-reveal utility
│   │   ├── cursor.css          custom cursor
│   │   ├── header.css          nav
│   │   ├── hero.css            homepage hero
│   │   ├── featured.css        homepage "Selected Work" list
│   │   ├── curator.css         homepage About section
│   │   ├── marquee.css         tools ticker
│   │   ├── testimonials.css    quote slider
│   │   ├── contact.css         closing CTA (shared by both pages)
│   │   ├── case-study.css      the spine template + progress rail
│   │   ├── responsive.css      cross-cutting overrides, imported last
│   │   ├── main.css            homepage CSS entry (imports the above)
│   │   └── case-study-entry.css case-study CSS entry (imports the above)
│   │
│   ├── modules/                 one file, one behavior
│   │   ├── cursor.js
│   │   ├── header.js
│   │   ├── clock.js
│   │   ├── hero.js
│   │   ├── slider.js
│   │   ├── scrollReveal.js
│   │   ├── featuredList.js       renders homepage list from registry
│   │   ├── caseStudyRenderer.js  renders a project's sections into the template
│   │   └── progressRail.js       fixed tick-mark nav for a case study page
│   │
│   └── data/
│       ├── registry.js           import.meta.glob — finds every project file
│       └── projects/
│           ├── marrow.js
│           ├── second-skin.js    (includes a `custom` section example)
│           ├── kestrel.js
│           ├── glasshouse.js
│           ├── aviary.js         (includes a `custom` section example)
│           ├── pocket-museum.js
│           ├── ghost-drafts.js
│           └── held-water.js
│
└── public/images/                 static assets Vite serves as-is
```

## Design notes

- Visual language (monochrome, geometric SVG motifs, custom cursor with
  VIEW/OPEN/EXPLORE/NEXT labels, editorial type) is unchanged from the
  previous single-file version — this refactor only touches architecture.
- All animation/scroll-reveal/motion behavior is preserved exactly; it's just
  been split into `initScrollReveal()`, `initHero()`, etc.
- The case-study progress rail is new (it didn't exist in the single-page
  version) — it's the one addition needed to make "experience it in
  sequence" legible as you scroll a project page.
