# AGENTS.md

# Mansi Portfolio • Universal AI Agent Guide

This document is the primary operating manual for any AI coding agent
working on this repository.

Supported agents include (but are not limited to):

-   GitHub Copilot Agent
-   Codex
-   Claude Code
-   Gemini CLI
-   Cursor
-   Windsurf
-   OpenHands
-   Future agentic coding systems

------------------------------------------------------------------------

# Mission

Build and maintain a premium editorial portfolio for a fashion designer.

Every change should make the experience feel cleaner, more intentional,
and more maintainable.

The portfolio should showcase the work, not the technology.

------------------------------------------------------------------------

# Tech Stack
- Vanilla JavaScript ES Modules
- Vite Multi Page Application
- HTML templates
- CSS modules/files
-   Vite
-   JavaScript
-   CSS
-   OGL/WebGL (optional enhancements)
-   GSAP (future)
-   Lenis (future)

Package manager:

npm

Development:

npm install npm run dev

Production:

npm run build npm run preview

------------------------------------------------------------------------

# Repository Architecture

src/ ├── data/ │ ├── registry.js │ └── projects/ ├── modules/ │ ├──
caseStudyRenderer.js │ └── reusable modules ├── styles/ │ ├── tokens.css
│ ├── layout.css │ ├── case-study.css │ └── main.css

Responsibilities:

-   Project data = content only.
-   Renderer = HTML structure and rendering logic.
-   Styles = presentation only.

Do not mix these responsibilities.


## Architecture Rules

- This project uses Vanilla JavaScript, not React.
- Maintain the Vite multi-page architecture.
- Do not convert to React without explicit approval.
- Keep project content inside src/data/projects.
- Keep rendering logic inside src/modules.
- Keep styling inside src/styles.

------------------------------------------------------------------------

# Design Principles

The visual language should feel:

-   Editorial
-   Fashion-forward
-   Architectural
-   Minimal
-   Calm
-   Premium

Avoid trendy effects that compete with the portfolio.

------------------------------------------------------------------------

# Code Standards

Always:

-   Preserve architecture.
-   Use semantic HTML.
-   Use reusable components.
-   Reuse existing utilities.
-   Keep CSS modular.
-   Use design tokens.
-   Keep accessibility in mind.
-   Optimize for performance.

Never:

-   Hardcode colors.
-   Add unnecessary libraries.
-   Duplicate components.
-   Rewrite working systems without reason.
-   Mix content with styling logic.

------------------------------------------------------------------------

# CSS Rules

Use:

tokens.css → design tokens

layout.css → layouts

case-study.css → reusable component styling

Prefer token variables over literal values.

------------------------------------------------------------------------

# Renderer Rules

caseStudyRenderer.js is the rendering engine.

When extending functionality:

-   add reusable section types
-   avoid project-specific logic
-   preserve backwards compatibility

------------------------------------------------------------------------

# Motion Rules

Motion should feel subtle and purposeful.

Preferred:

-   fade
-   reveal
-   mask
-   stagger
-   scroll storytelling

Avoid:

-   excessive parallax
-   distracting particle systems
-   large rotations
-   random floating elements

------------------------------------------------------------------------

# Pull Request Checklist

Before considering a task complete, verify:

-   Project builds successfully.
-   No console errors.
-   Responsive layouts remain intact.
-   Existing projects still render correctly.
-   New code follows repository conventions.
-   Repeated logic has been extracted where appropriate.

------------------------------------------------------------------------

# When Unsure

If multiple implementations are possible:

1.  Choose the simpler architecture.
2.  Prefer reusable solutions.
3.  Explain trade-offs.
4.  Avoid introducing technical debt.

------------------------------------------------------------------------

# Long-Term Vision

The repository should evolve into a reusable portfolio framework where:

-   New case studies require only data additions.
-   Styling remains centralized.
-   Motion is layered on top without restructuring.
-   The codebase remains approachable for future contributors and AI
    agents.
