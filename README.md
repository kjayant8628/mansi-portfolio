# Mansi Portfolio

> An editorial fashion portfolio built as a reusable digital case study framework.

A premium portfolio experience designed to transform fashion presentation boards into interactive digital exhibitions.

The project combines:

- Fashion lookbook aesthetics
- Editorial magazine layouts
- Industrial design documentation
- Modern frontend architecture

The goal:

> Build an experience where the interface supports the designer's story instead of competing with it.

---

# Overview

The portfolio consists of two main pages:

## `index.html`

Homepage containing:

- Introduction
- Design philosophy
- Selected work
- About section
- Contact

## `case-study.html`

A reusable case study template that renders every project dynamically.

Projects are selected through:

```
case-study.html?project=<slug>
```

No separate HTML page is required for new projects.

---

# Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Project Architecture

The application follows a data-driven case study architecture.

```
Project Data
      |
      ↓
registry.js
      |
      ↓
caseStudyRenderer.js
      |
      ↓
Reusable Case Study Template
      |
      ↓
Rendered Project Experience
```

Each project contains only:

- Content
- Images
- Sections
- Metadata

The renderer controls:

- Structure
- Layout generation
- Section rendering

This allows new projects to be added without creating new pages.

---

# Adding a New Project

## 1. Create project data

Copy an existing project:

```
src/data/projects/marrow.js
```

into:

```
src/data/projects/new-project.js
```

---

## 2. Configure metadata

Each project contains:

```javascript
{
  slug,
  title,
  discipline,
  year,
  featured,
  sections
}
```

---

## 3. Define sections

The section order controls the storytelling flow.

Default structure:

```
hero
 ↓
brief
 ↓
research
 ↓
process
 ↓
exploration
 ↓
development
 ↓
outcome
 ↓
reflection
```

Custom sections can also be added for project-specific content.

---

## 4. Add imagery

Images are stored inside:

```
public/images/
```

Projects reference assets directly:

```javascript
image:
'/images/project/image.jpg'
```

---

# Current Projects

## Tennis Performance Collection

Exploration of:

- Athletic-inspired fashion
- Performance concepts
- Trend forecasting
- Market research
- Technical development
- Final collection

---

## Streetwear Collection

Exploration of:

- Streetwear identity
- Consumer persona
- Fabric exploration
- Silhouette development
- Technical studies
- Final garments

---

## Nike Retail Experience

Brand and retail exploration focused on:

- Consumer interaction
- Retail storytelling
- Brand experience
- Visual merchandising

---

# Folder Structure

```
├── index.html
├── case-study.html
├── vite.config.js

├── src/

│   ├── main.js
│   │
│   ├── case-study.js
│   │
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── hero.css
│   │   ├── featured.css
│   │   ├── contact.css
│   │   ├── case-study.css
│   │   ├── responsive.css
│   │   └── main.css
│   │
│   ├── modules/
│   │   ├── caseStudyRenderer.js
│   │   ├── featuredList.js
│   │   ├── hero.js
│   │   ├── cursor.js
│   │   ├── slider.js
│   │   ├── progressRail.js
│   │   ├── lenis.js
│   │   └── animations/
│   │
│   └── data/
│       ├── registry.js
│       └── projects/
│
└── public/
    └── images/
```

---

# Design System

The visual system is centralized.

## `tokens.css`

Single source of truth for:

- Colors
- Typography
- Font weights
- Spacing
- Container sizes
- Animation timing

Example:

```css
var(--bg)
var(--text)
var(--accent)
var(--space-5)
```

---

## `layout.css`

Controls:

- Containers
- Page structure
- Section rhythm
- Responsive layouts
- Shared utilities

---

## `case-study.css`

Controls:

- Case study presentation
- Typography hierarchy
- Image layouts
- Project storytelling

---

# Design Direction

The portfolio follows an editorial design philosophy.

Visual language:

- Soft neutral palette
- Strong typography
- Large whitespace
- Minimal decoration
- Structured layouts

Inspired by:

- Fashion archives
- Architecture studios
- Industrial design documentation
- Editorial publications

---

# Motion System

Current motion architecture includes:

- Scroll reveal
- Hero animations
- Custom cursor
- Progress rail
- Modular animation utilities

Future enhancements:

- GSAP timelines
- Lenis smooth scrolling
- Image reveal masks
- Scroll-based storytelling
- Advanced transitions

---

# Experimental Direction

Future creative explorations:

- WebGL experiences
- Ferrofluid-inspired backgrounds
- Generative visual systems
- Interactive portfolio moments

These will remain supporting elements, never distractions from the design work.

---

# AI-Assisted Development

This repository is prepared for AI-assisted development.

Documentation included:

## `PROJECT_BIBLE.md`

Contains:

- Project vision
- Architecture philosophy
- Design direction
- Long-term roadmap

## `AGENTS.md`

Contains:

- Universal AI coding instructions
- Repository rules
- Development standards

## `.github/copilot-instructions.md`

Contains:

- GitHub Copilot-specific guidance

---

# Development Principles

## Always

- Preserve architecture
- Use reusable systems
- Use design tokens
- Optimize performance
- Maintain accessibility
- Keep code readable

## Avoid

- Hardcoded styles
- Duplicate components
- Unnecessary dependencies
- Decorative effects without purpose

---

# Roadmap

## Phase 1: Foundation

Completed:

- Data-driven project system
- Dynamic case studies
- Design token system
- Layout framework


## Phase 2: Visual Refinement

In progress:

- Editorial typography
- Premium case study layouts
- Improved storytelling
- Better responsive behaviour


## Phase 3: Motion

Planned:

- GSAP animation system
- Smooth scrolling
- Advanced transitions


## Phase 4: Signature Experience

Exploration:

- WebGL interactions
- Generative visuals
- Immersive portfolio moments

---

# Final Goal

Create a portfolio that feels like:

**A fashion archive.**

**A digital exhibition.**

**A technical showcase.**

The code should disappear behind the experience.