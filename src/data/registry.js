// registry.js — the ONLY file that needs to know every project
// exists, and it finds them automatically via import.meta.glob.
//
// TO ADD A NEW PROJECT: create /src/data/projects/my-project.js
// exporting a default object (see PROJECT SHAPE in any existing
// file). That's it — this registry, the homepage list, and the
// case-study template all pick it up with zero other edits.

const modules = import.meta.glob('./projects/*.js', { eager: true });

const projects = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort((a, b) => (b.year || 0) - (a.year || 0));

export function getAllProjects() {
  return projects;
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

// Returns the next featured project after the given slug,
// wrapping around to the first — used for the "Next" link
// at the end of a case study.
export function getNextProject(slug) {
  const list = getFeaturedProjects();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return list[0];
  return list[(i + 1) % list.length];
}

// Returns all unique categories present across featured projects
export function getProjectCategories() {
  const list = getFeaturedProjects();
  const set = new Set();
  list.forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return Array.from(set);
}

// Returns projects grouped by category object: { [category]: project[] }
export function getGroupedProjects() {
  const list = getFeaturedProjects();
  const grouped = {};
  list.forEach((p) => {
    const cat = p.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  });
  return grouped;
}
