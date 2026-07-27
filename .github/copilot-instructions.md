# GitHub Copilot Instructions

## Purpose

You are contributing to **Mansi Portfolio**, a premium editorial fashion
portfolio built with React + Vite.

Your goal is to improve quality while preserving the architecture.

------------------------------------------------------------------------

# Guiding Principles

1.  The designer's work is always the focus.
2.  Simplicity beats decoration.
3.  Reuse before creating new components.
4.  Keep the codebase maintainable.
5.  Explain significant architectural changes.

------------------------------------------------------------------------

# Architecture

Do NOT change these unless explicitly requested.

-   `src/data/projects/` contains content only.
-   `caseStudyRenderer.js` is responsible for rendering.
-   `tokens.css` is the source of truth for colors, typography, spacing,
    radii, durations and shadows.
-   `layout.css` defines layout primitives.
-   `case-study.css` styles the reusable case study system.

Projects should be addable without modifying renderer logic.

------------------------------------------------------------------------

# CSS Rules

Always:

-   Use CSS variables from `tokens.css`.
-   Use existing spacing tokens.
-   Prefer reusable utility classes.
-   Keep responsive behavior intact.
-   Maintain accessibility.

Never:

-   Hardcode colors.
-   Hardcode spacing when a token exists.
-   Add inline styles.
-   Duplicate selectors.
-   Create one-off utility classes for a single component.

------------------------------------------------------------------------

# React Rules

Prefer:

-   Functional components
-   Small reusable helpers
-   Clear prop names
-   Composition over duplication

Avoid unnecessary dependencies.

------------------------------------------------------------------------

# Design Language

Visual style should feel:

-   Editorial
-   Technical
-   Minimal
-   Premium
-   Quiet
-   Intentional

Avoid:

-   Glassmorphism
-   Neumorphism
-   Excessive gradients
-   Loud animations
-   Random shadows
-   Decorative borders

------------------------------------------------------------------------

# Motion

When adding animation:

Prefer: - GSAP - Lenis - Intersection Observer

Animation should support storytelling, not distract from it.

------------------------------------------------------------------------

# Performance

Prioritize:

-   Lazy loading
-   Responsive images
-   Minimal bundle size
-   GPU-friendly transforms
-   Accessibility

------------------------------------------------------------------------

# Before Completing Any Task

Check:

-   Does this preserve architecture?
-   Does this improve readability?
-   Does it use existing tokens?
-   Is the code reusable?
-   Is it mobile friendly?
-   Does it introduce unnecessary complexity?

If the answer to any of these is "no", revise the solution.
