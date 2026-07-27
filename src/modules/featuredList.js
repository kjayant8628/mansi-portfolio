// featuredList.js — renders the homepage "Selected Case Studies"
// list from the project registry. Adding a project file with
// `featured: true` is enough for it to appear here — no markup
// changes needed.
import { getFeaturedProjects } from '../data/registry.js';

export function initFeaturedList() {
  const container = document.getElementById('featuredList');
  if (!container) return;

  const projects = getFeaturedProjects();

  container.innerHTML = projects
    .map(
      (p, i) => `
      <a class="feat-row rv" href="case-study.html?project=${p.slug}" data-cursor="explore">
        <div class="num mono">${String(i + 1).padStart(2, '0')}</div>
        <div class="name">${p.title}</div>
        <div class="desc">${p.discipline.join(' / ')}</div>
        <div class="count">${p.year}</div>
        <div class="feat-mark"></div>
      </a>`
    )
    .join('');
}
