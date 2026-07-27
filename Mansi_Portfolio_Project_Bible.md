# Mansi Portfolio - Project Bible

## Project Vision

Mansi Portfolio is an editorial fashion design portfolio built to
present creative work through a premium digital experience.

The website should feel like a combination of: - Fashion lookbook -
Industrial design portfolio - Architecture studio website - Digital
gallery

The technology should support the designer's story, never overpower it.

------------------------------------------------------------------------

## Technical Architecture

Stack: - Vite - JavaScript - CSS design system - Future GSAP and
Lenis motion layer

Architecture:

src/ - data/projects: project content only - modules: rendering logic -
styles: visual system - main.js: homepage - case-study.js: project pages

------------------------------------------------------------------------

## Technical Identity

The project is not React.

Stack:

- Vite
- Vanilla JavaScript ES Modules
- CSS Architecture
- HTML Multi Page Application

------------------------------------------------------------------------

## Core Architecture Rules

Project files should contain content: - titles - descriptions - images -
sections - metadata

Do not put styling decisions inside project data.

The renderer controls: - section generation - layouts - reusable
structures

CSS controls: - typography - spacing - colors - visual hierarchy

------------------------------------------------------------------------

## Design System Rules

Use: - tokens.css for global values - layout.css for page structure -
component CSS for individual styling

Avoid: - hardcoded colors - random spacing values - duplicated styles

Use variables:

var(--bg) var(--text) var(--line) var(--accent)

------------------------------------------------------------------------

## Design Philosophy

The portfolio should feel like:

- Fashion archive
- Digital exhibition
- Editorial magazine

Avoid:

- Excessive animations
- Generic gradients
- Dashboard-style layouts
- Template-like UI

------------------------------------------------------------------------

## Visual Direction

The portfolio should feel:

-   Editorial
-   Technical
-   Minimal
-   Premium
-   Intentional

Avoid pure black and pure white.

Prefer: - warm backgrounds - charcoal text - soft greys - restrained
accents

------------------------------------------------------------------------

## Motion Philosophy

Motion should support storytelling.

Preferred:
- subtle reveals
- image transitions
- typography movement
- scroll progression

Avoid:
- distracting effects
- unnecessary WebGL
- animation for decoration only

------------------------------------------------------------------------

## Typography

Typography is the main visual element.

Rules: - Large confident headings - Small uppercase labels - Comfortable
body text - Strong whitespace

Avoid excessive font styles.

------------------------------------------------------------------------

## Layout Philosophy

The website should feel like turning pages in a design book.

Avoid repetitive layouts.

Use variation: - text + image - image + text - full-width artwork -
galleries - statements - technical sections

Whitespace is intentional.

------------------------------------------------------------------------

## Animation Philosophy

Motion should feel elegant.

Use: - subtle reveals - smooth transitions - scroll storytelling -
controlled interactions

Avoid: - flashy effects - unnecessary 3D - distracting animations

Future: - GSAP - Lenis - Intersection Observer

------------------------------------------------------------------------

## Image Rules

Images are the primary content.

Do: - preserve quality - optimize loading - maintain clean presentation

Avoid: - unnecessary shadows - decorative frames - excessive rounding

------------------------------------------------------------------------

## AI Agent Instructions

For Copilot/Codex/Claude:

Always: - preserve architecture - reuse components - use design tokens -
explain major changes - optimize performance

Never: - add unnecessary dependencies - rewrite working systems without
reason - create inconsistent styles - add effects that distract from the
work

------------------------------------------------------------------------

## Roadmap

Phase 1: Design system refinement.

Phase 2: Renderer improvements and reusable layouts.

Phase 3: GSAP, smooth scrolling, and advanced motion.

Phase 4: Signature experiences such as WebGL/ferrofluid experiments.

------------------------------------------------------------------------

## Final Goal

Create a portfolio that feels like:

A fashion archive. A design exhibition. A technical showcase.

The code should disappear behind the experience.
