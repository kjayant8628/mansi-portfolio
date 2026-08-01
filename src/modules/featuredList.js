// featuredList.js — renders the homepage "Selected Case Studies"
// list from the project registry. Adding a project file with
// `featured: true` is enough for it to appear here — no markup
// changes needed.
import { getFeaturedProjects } from '../data/registry.js';

export function initFeaturedList() {
  const container = document.getElementById('featuredList');
  if (!container) return;

  const projects = getFeaturedProjects();

  // Image preloading to eliminate hover flicker
  projects.forEach((p) => {
    if (p.cover) {
      const img = new Image();
      img.src = p.cover;
    }
  });

  container.innerHTML = projects
    .map(
      (p, i) => {
        const previewUrl = p.heroPreview?.url || p.cover || '';
        const previewType = p.heroPreview?.type || (previewUrl.match(/\.(mp4|webm)$/i) ? 'video' : 'image');
        return `
        <a class="feat-row rv" href="case-study.html?project=${p.slug}" data-cursor="explore" data-cover="${p.cover || ''}" data-preview-url="${previewUrl}" data-preview-type="${previewType}" data-title="${p.title}">
          <div class="num mono">${String(i + 1).padStart(2, '0')}</div>
          <div class="feat-info">
            <div class="name">${p.title}</div>
            ${p.summary ? `<div class="summary">${p.summary}</div>` : ''}
          </div>
          <div class="desc mono">${p.discipline.map((d) => `<span>${d}</span>`).join(' • ')}</div>
          <div class="count mono">${p.year}</div>
          <div class="feat-mark"></div>
        </a>`;
      }
    )
    .join('');
}
