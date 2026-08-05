// caseStudyRenderer.js — the ONE template every project uses.
//
// This file answers exactly one question: "given a section object,
// how should it be drawn?" It never knows anything about a specific
// project (Nike Retail, Streetwear, Tennis, Graphic Design, etc.) —
// all of that content lives in /src/data/projects/*.js.
//
// ---------------------------------------------------------------
// TWO INDEPENDENT AXES
// ---------------------------------------------------------------
// Every section has:
//   1. a CONTENT TYPE  — what it *is* in the story:
//        hero | brief | research | process | development
//        | outcome | reflection | custom
//   2. a LAYOUT         — how it's *arranged* on the page:
//        stack | full | center | gallery | grid | cards
//        | pair | statement | metrics | media-left | media-right
//        | full-bleed
//
// Content type never dictates markup. Layout does. A "research"
// section and a "development" section can both use the `gallery`
// layout and render identically in structure — only their copy
// differs. This is what keeps the renderer generic: adding a new
// content type (say, "testing") needs zero new markup, because it
// just picks an existing layout. Adding a new *layout* is the only
// thing that requires a new render function.
//
// hero and reflection are the two exceptions — they have fixed,
// purpose-built structure (see renderHero / renderReflection) since
// every project needs exactly one of each, shaped consistently.
// ---------------------------------------------------------------

import { getProjectBySlug, getNextProject } from '../data/registry.js';

/* =================================================================
   SHARED PRIMITIVES
   Small building blocks reused across every layout renderer, so
   markup for "an image with a caption" or "a section header" is
   never duplicated.
   ================================================================= */

/** Escapes nothing by design — content is trusted, authored data
 *  from /src/data/projects/*.js, not user input. Kept as a single
 *  named function so that changes if that assumption ever changes. */
function text(value = '') {
  return value;
}

/** Renders a single media item.
 * Supports:
 * - image
 * - caption
 * - description
 * - alt text
 * - loading strategy
 * - aspect class (handled entirely by CSS)
 */
function normalizeItem(item) {
  if (typeof item === 'string') {
    const isVideo = item.match(/\.(mp4|webm|ogg|mov)$/i);
    const is3d = item.match(/\.(gltf|glb|obj|fbx)$/i);
    return {
      type: isVideo ? 'video' : is3d ? '3d' : 'image',
      image: item,
      src: item,
      poster: '',
      caption: '',
      description: '',
      alt: '',
      aspect: '',
      loading: 'lazy'
    };
  }

  const src = item.image || item.video || item.url || item.src || '';
  let type = item.type;
  if (!type) {
    if (src.match(/\.(mp4|webm|ogg|mov)$/i)) {
      type = 'video';
    } else if (src.match(/\.(gltf|glb|obj|fbx)$/i)) {
      type = '3d';
    } else {
      type = 'image';
    }
  }

  return {
    type,
    image: src,
    src,
    poster: item.poster || '',
    caption: item.caption || '',
    description: item.description || '',
    alt: item.alt || '',
    aspect: item.aspect || '',
    loading: item.loading || 'lazy'
  };
}

/** Renders a single media item.
 * Supports:
 * - image (default)
 * - video (HTML5 video stream)
 * - 3d (interactive model placeholder)
 * - caption / description / alt / loading
 */
function renderFigure(media = {}, options = {}) {
  if (!media) return '';

  const normalized = {
    ...normalizeItem(media),
    caption: media.caption || options.caption || '',
    description: media.description || options.description || '',
    alt: media.alt || options.alt || '',
    aspect: media.aspect || options.aspect || '',
    loading: media.loading || options.loading || 'lazy'
  };

  const {
    type = 'image',
    src = '',
    poster = '',
    caption = '',
    description = '',
    alt = '',
    aspect = '',
    loading = 'lazy'
  } = normalized;

  if (!src && type !== '3d') return '';

  const className = [
    'cs-figure',
    aspect ? `aspect-${aspect}` : ''
  ]
    .filter(Boolean)
    .join(' ');

  let mediaHtml = '';

  if (type === 'video') {
    mediaHtml = `
      <video
        class="cs-media cs-video"
        src="${src}"
        ${poster ? `poster="${poster}"` : ''}
        autoplay
        loop
        muted
        playsinline
      ></video>`;
  } else if (type === '3d') {
    mediaHtml = `
      <div class="cs-media cs-3d-placeholder" data-model="${src}">
        ${poster ? `<img src="${poster}" alt="${alt || '3D Model Poster'}" class="cs-3d-poster" />` : ''}
        <div class="cs-3d-tag mono">INTERACTIVE 3D MODEL / PLACEHOLDER</div>
      </div>`;
  } else {
    mediaHtml = `
      <img
        class="cs-media"
        src="${src}"
        alt="${alt}"
        loading="${loading}"
      />`;
  }

  return `
    <figure class="${className}">
      ${mediaHtml}
      ${
        caption || description
          ? `
        <figcaption>
          ${caption ? `<strong>${text(caption)}</strong>` : ''}
          ${description ? `<span>${text(description)}</span>` : ''}
        </figcaption>`
          : ''
      }
    </figure>
  `;
}

function normalizeMedia(media) {
  if (!media) return [];

  if (typeof media === 'string') {
    return [normalizeItem(media)];
  }

  if (Array.isArray(media)) {
    return media.map(normalizeItem);
  }

  if (typeof media === 'object' && (media.image || media.video || media.url || media.src)) {
    return [normalizeItem(media)];
  }

  return [];
}

/** All normalized media items for a section. */
function getSectionMediaItems(section) {
  return normalizeMedia(section.media);
}

/** First media item with section-level caption / alt defaults applied. */
function getPrimaryMedia(section) {
  const items = getSectionMediaItems(section);
  const first = items[0] || {
    type: 'image',
    image: '',
    src: '',
    poster: '',
    caption: '',
    description: '',
    alt: '',
    aspect: '',
    loading: 'lazy'
  };

  return {
    ...first,
    caption: first.caption || section.mediaLabel || '',
    alt: first.alt || section.heading || ''
  };
}

function renderSectionHead(section) {
  const label = section.eyebrow || "";

  return `
    <header class="cs-section-head">
      ${
        label
          ? `<div class="eyebrow">${capitalize(label)}</div>`
          : ""
      }

      ${
        section.heading
          ? `<h2>${text(section.heading)}</h2>`
          : ""
      }

    </header>`;
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderBody(body = []) {
  return body.map((p) => `<p>${text(p)}</p>`).join('');
}

function renderSectionShell(section, innerHtml, { className = '' } = {}) {
  return `
    <section class="cs-section layout-${section.layout || 'stack'} ${className} rv" data-type="${section.type}">
      <div class="wrap">
        ${innerHtml}
      </div>
    </section>`;
}

function renderHero(section, project) {
  // Extract or fallback metadata fields for editorial book colophon composition
  const category = project.category || (project.discipline ? project.discipline[0] : 'Design Archive');
  const year = project.year || '2023';

  // Meta search helpers for robust backward compatibility
  const findMeta = (key) =>
    section.meta?.find((m) => m.label && m.label.toLowerCase().includes(key))?.value;

  const role = section.role || findMeta('role') || (project.discipline ? project.discipline.join(' • ') : 'Design Direction');
  const tools = section.tools || findMeta('tools') || 'Design Systems • 3D • Adobe CC';
  const timeline = section.timeline || section.duration || findMeta('duration') || findMeta('timeline') || '12 Weeks';
  const statement = section.statement || section.tagline || project.summary || '';

  let cover = '';
  const heroPreview = project.heroPreview || (project.cover ? { type: 'image', url: project.cover } : null);

  if (heroPreview) {
    const { type = 'image', url = project.cover || '', poster = '' } =
      typeof heroPreview === 'string' ? { type: 'image', url: heroPreview } : heroPreview;
    if (type === 'video') {
      cover = `<video class="cs-cover cs-video-cover" src="${url}" ${poster ? `poster="${poster}"` : ''} autoplay loop muted playsinline></video>`;
    } else {
      cover = `<img class="cs-cover" src="${url}" alt="${project.title}" loading="eager">`;
    }
  }

  return `
    <section class="cs-hero rv" data-type="hero">
      ${cover}
      <div class="wrap cs-opening-grid">
        <div class="cs-opening-main">
          <div class="cs-opening-eyebrow mono">
            <span class="catalog-num">CASE STUDY</span>
            <span class="sep">/</span>
            <span class="cat-tag">${text(category).toUpperCase()}</span>
            <span class="sep">•</span>
            <span class="year-tag">${text(String(year))}</span>
          </div>
          <h1 class="cs-opening-title">${text(project.title)}</h1>
          ${statement ? `<p class="cs-opening-statement">${text(statement)}</p>` : ''}
        </div>

        <div class="cs-opening-colophon">
          <div class="colophon-header mono">STUDIO COLOPHON</div>
          <div class="colophon-grid">
            <div class="colophon-item">
              <span class="colophon-label mono">ROLE</span>
              <span class="colophon-val">${text(role)}</span>
            </div>
            <div class="colophon-item">
              <span class="colophon-label mono">TOOLS</span>
              <span class="colophon-val">${text(tools)}</span>
            </div>
            <div class="colophon-item">
              <span class="colophon-label mono">TIMELINE</span>
              <span class="colophon-val">${text(timeline)}</span>
            </div>
            <div class="colophon-item">
              <span class="colophon-label mono">CATEGORY</span>
              <span class="colophon-val">${text(category)} (${text(String(year))})</span>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/* =================================================================
   REFLECTION
   Fixed structure — the editorial close of every case study:
   eyebrow, heading, a large pulled quote, then reflection copy.
   ================================================================= */

function renderReflection(section) {
  const inner = `
    <header class="cs-section-head">
      <div class="eyebrow">Reflection</div>
      <h2>${text(section.heading || 'Reflection')}</h2>
    </header>
    ${section.quote ? `<blockquote class="cs-quote">${text(section.quote)}</blockquote>` : ''}
    <div class="cs-copy">${renderBody(section.body)}</div>`;

  return `
    <section class="cs-section layout-reflection rv" data-type="reflection">
      <div class="wrap">${inner}</div>
    </section>`;
}

/* =================================================================
   LAYOUT RENDERERS
   One function per layout, each responsible only for arrangement.
   Every renderer receives the full `section` object and returns a
   complete <section> element via renderSectionShell().
   ================================================================= */

/** stack — heading, then copy, then a single image underneath.
 *  The default, general-purpose layout (used when no layout is
 *  specified, or as a fallback for an unrecognized one). */
function renderStack(section) {
  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-copy">${renderBody(section.body)}</div>
    ${renderFigure(getPrimaryMedia(section))}`;

  return renderSectionShell(section, inner);
}

/** full — a single large, full-bleed image with copy alongside it.
 *  Used for hero-weight moments inside a case study (e.g. the
 *  outcome). */
function renderFull(section) {
  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-media-wrapper">
      ${renderFigure(getPrimaryMedia(section))}
    </div>
    <div class="cs-copy">${renderBody(section.body)}</div>`;

  return renderSectionShell(section, inner);
}

/** center — heading, one centered image, then copy. Good for a
 *  single focal artifact (a key mark, a hero shot of an object). */
function renderCenter(section) {
  const inner = `
    ${renderSectionHead(section)}
    ${renderFigure(getPrimaryMedia(section))}
    <div class="cs-copy">${renderBody(section.body)}</div>`;

  return renderSectionShell(section, inner, { className: 'center' });
}

/** pair — exactly two images shown side by side, each with its own
 *  optional caption. Falls back gracefully if fewer are supplied. */
function renderPair(section) {
  const media = getSectionMediaItems(section).slice(0, 2);
  const figures = media.map((item) => renderFigure(item)).join('');

  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-pair">${figures}</div>`;

  return renderSectionShell(section, inner);
}

/** grid — any number of images in a uniform grid. No captions by
 *  design (use `gallery` when captions matter). */
function renderGrid(section) {
  const media = getSectionMediaItems(section);
  const cells = media.map((item) => renderFigure(item)).join('');

  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-grid">${cells}</div>`;

  return renderSectionShell(section, inner);
}

/** gallery — any number of images, each individually captioned.
 *  Semantic <figure>/<figcaption> pairs, no assumption about count. */
function renderGallery(section) {
  const media = getSectionMediaItems(section);
  const figures = media.map((item) => renderFigure(item)).join('');

  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-gallery">${figures}</div>`;

  return renderSectionShell(section, inner);
}

/** cards — a set of short text cards (no images) — good for
 *  process steps, principles, or considerations. */
function renderCards(section) {
  const cards = (section.cards || [])
    .map((card) => `
      <div class="cs-card">
        <h3>${text(card.title)}</h3>
        <p>${text(card.text)}</p>
      </div>`)
    .join('');

  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-card-grid">${cards}</div>`;

  return renderSectionShell(section, inner);
}

/** metrics — a row of number + label pairs (e.g. "18 / Interviews").
 *  Distinct from `cards`: metrics are always a number-led stat. */
function renderMetrics(section) {
  const stats = (section.cards || [])
    .map((stat) => `
      <div class="cs-metric">
        <span class="cs-metric-number">${text(stat.number)}</span>
        <span class="cs-metric-label">${text(stat.label)}</span>
      </div>`)
    .join('');

  const inner = `
    ${section.heading ? renderSectionHead(section) : ''}
    <div class="cs-metric-grid">${stats}</div>`;

  return renderSectionShell(section, inner);
}

/** statement — a single large editorial line or pulled thought block. */
function renderStatement(section) {
  const statementText = section.text || (Array.isArray(section.body) ? section.body[0] : section.body) || '';
  const inner = `
    ${section.heading || section.eyebrow ? renderSectionHead(section) : ''}
    <blockquote class="cs-quote cs-statement">${text(statementText)}</blockquote>`;
  return renderSectionShell(section, inner);
}

/** Shared two-column copy + image split (DOM order sets left/right). */
function renderMediaSplit(section, { mediaFirst = false } = {}) {
  const figure = renderFigure(getPrimaryMedia(section));
  const copy = `<div class="cs-copy">${renderBody(section.body)}</div>`;
  const mediaCol = figure ? `<div class="cs-split-media">${figure}</div>` : '';
  const splitInner = mediaFirst ? `${mediaCol}${copy}` : `${copy}${mediaCol}`;

  const inner = `
    ${renderSectionHead(section)}
    <div class="cs-split">${splitInner}</div>`;

  return renderSectionShell(section, inner);
}

/** Copy left, image right. */
function renderMediaRight(section) {
  return renderMediaSplit(section, { mediaFirst: false });
}

/** Image left, copy right. */
function renderMediaLeft(section) {
  return renderMediaSplit(section, { mediaFirst: true });
}

/** Outcome-style viewport-wide image; copy stays in .wrap below. */
function renderFullBleed(section) {
  const layout = section.layout || 'full-bleed';
  const figure = renderFigure(getPrimaryMedia(section));

  return `
    <section class="cs-section layout-${layout} rv" data-type="${section.type}">
      <div class="wrap">
        ${renderSectionHead(section)}
      </div>
      ${figure ? `<div class="cs-bleed">${figure}</div>` : ''}
      <div class="wrap">
        <div class="cs-copy">${renderBody(section.body)}</div>
      </div>
    </section>`;
}

/* =================================================================
   DISPATCH
   The only place that maps a layout name to its renderer. Adding a
   layout means: write a render function above, add one line here.
   Unknown/omitted layouts fall back to `stack`.
   ================================================================= */

const LAYOUT_RENDERERS = {
  stack: renderStack,
  full: renderFull,
  center: renderCenter,
  pair: renderPair,
  grid: renderGrid,
  gallery: renderGallery,
  cards: renderCards,
  metrics: renderMetrics,
  statement: renderStatement,
  'media-left': renderMediaLeft,
  'media-right': renderMediaRight,
  'full-bleed': renderFullBleed
};

function renderGeneric(section) {
  const renderer = LAYOUT_RENDERERS[section.layout] || renderStack;
  return renderer(section);
}

/* =================================================================
   ENTRY POINT
   ================================================================= */

function renderNotFound() {
  return `
    <section class="cs-hero wrap">
      <h1>Project not found</h1>
      <p><a href="index.html" data-cursor="open">Back home</a></p>
    </section>`;
}

function renderNextProject(slug) {
  const next = getNextProject(slug);
  if (!next) return '';

  return `
    <section class="cs-next rv">
      <div class="eyebrow">Next Project</div>
      <a href="case-study.html?project=${next.slug}" data-cursor="explore">${text(next.title)}</a>
    </section>`;
}

/** Renders the full case study for `slug` into #caseStudyRoot.
 *  Returns the resolved project object (or null if not found) so
 *  callers — e.g. the progress rail — know whether to initialize. */
export function renderCaseStudy(slug) {
  const root = document.getElementById('caseStudyRoot');
  if (!root) return null;

  const project = getProjectBySlug(slug);
  if (!project) {
    root.innerHTML = renderNotFound();
    return null;
  }

  const sectionsHtml = project.sections
    .map((section) => {
      if (section.type === 'hero') return renderHero(section, project);
      if (section.type === 'reflection') return renderReflection(section);
      return renderGeneric(section);
    })
    .join('');

  root.innerHTML = sectionsHtml + renderNextProject(slug);
  document.title = `${project.title} — Mansi Rawat Studio`;

  return project;
}