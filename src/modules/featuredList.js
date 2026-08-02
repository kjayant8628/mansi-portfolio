// featuredList.js — renders the homepage Curated Archive
// grouped by discipline/category from the project registry.
// Adding a project file with `category` and `featured: true`
// automatically registers it under its category group.
import { getFeaturedProjects, getGroupedProjects } from '../data/registry.js';

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function initFeaturedList() {
  const container = document.getElementById('featuredList');
  if (!container) return;

  const projects = getFeaturedProjects();
  const grouped = getGroupedProjects();
  const categories = Object.keys(grouped);

  // Preload images to eliminate hover flicker
  projects.forEach((p) => {
    if (p.cover) {
      const img = new Image();
      img.src = p.cover;
    }
  });

  // 1. Build Filter Navigation Bar
  const filterButtonsHtml = `
    <div class="archive-filters" id="archiveFilters">
      <button class="archive-filter-btn active" data-category="all">
        All Work <span class="count-badge">(${projects.length})</span>
      </button>
      ${categories
        .map(
          (cat) => `
        <button class="archive-filter-btn" data-category="${slugifyCategory(cat)}">
          ${cat} <span class="count-badge">(${grouped[cat].length})</span>
        </button>`
        )
        .join('')}
    </div>`;

  // 2. Build Category Group Sections & Rows
  let globalIndex = 1;
  const groupsHtml = categories
    .map((cat, catIdx) => {
      const catSlug = slugifyCategory(cat);
      const catProjects = grouped[cat];

      const rowsHtml = catProjects
        .map((p) => {
          const itemIndex = String(globalIndex++).padStart(2, '0');
          const previewUrl = p.heroPreview?.url || p.cover || '';
          const previewType =
            p.heroPreview?.type || (previewUrl.match(/\.(mp4|webm)$/i) ? 'video' : 'image');

          const disciplineHtml = p.discipline
            ? p.discipline.map((d) => `<span>${d}</span>`).join(' • ')
            : `<span>${cat}</span>`;

          return `
          <a class="feat-row rv" href="case-study.html?project=${p.slug}" data-cursor="explore" data-cover="${p.cover || ''}" data-preview-url="${previewUrl}" data-preview-type="${previewType}" data-title="${p.title}" data-category="${catSlug}">
            <div class="num mono">${itemIndex}</div>
            <div class="feat-info">
              <div class="name">${p.title}</div>
              ${p.summary ? `<div class="summary">${p.summary}</div>` : ''}
            </div>
            <div class="desc mono">${disciplineHtml}</div>
            <div class="count mono">${p.year}</div>
            <div class="feat-mark"></div>
          </a>`;
        })
        .join('');

      const groupIdxStr = String(catIdx + 1).padStart(2, '0');
      const countLabel = catProjects.length === 1 ? '1 Project' : `${catProjects.length} Projects`;

      return `
      <div class="archive-group" data-category="${catSlug}">
        <div class="archive-group-head">
          <div class="archive-group-title">
            <span class="group-idx">${groupIdxStr} /</span> ${cat}
          </div>
          <div class="archive-group-count">${countLabel}</div>
        </div>
        <div class="archive-group-rows">
          ${rowsHtml}
        </div>
      </div>`;
    })
    .join('');

  container.innerHTML = filterButtonsHtml + `<div class="archive-content">${groupsHtml}</div>`;

  // 3. Filter Interactive Wiring
  const filterBtns = container.querySelectorAll('.archive-filter-btn');
  const groups = container.querySelectorAll('.archive-group');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.category;

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      groups.forEach((group) => {
        if (selected === 'all' || group.dataset.category === selected) {
          group.classList.remove('is-hidden');
        } else {
          group.classList.add('is-hidden');
        }
      });
    });
  });
}
