export default {
  slug: 'pocket-museum',
  title: 'Pocket Museum',
  discipline: ['UI/UX', 'Digital Design'],
  year: 2023,
  featured: true,
  sections: [
    { type: 'hero', tagline: 'A mobile interface for browsing micro-exhibitions — one object at a time, at full scale.',
      meta: [{ label: 'Discipline', value: 'UI/UX' }, { label: 'Year', value: '2023' }, { label: 'Role', value: 'Product Design, Prototyping' }] },
    { type: 'brief', heading: 'The Brief', body: ['Design a browsing experience that resists the instinct to scan and dismiss a grid.'] },
    { type: 'research', heading: 'Research', layout: 'media-right', mediaLabel: 'Behaviour Studies',
      body: ['Session recordings on existing gallery apps showed most users never opened a single object past the thumbnail — the grid was the problem.'] },
    { type: 'process', heading: 'Process', layout: 'media-left', mediaLabel: 'Wireframes',
      body: ['Early wireframes removed the grid entirely, forcing a single, sequential path through any collection.'] },
    { type: 'exploration', heading: 'Exploration', layout: 'grid', mediaCount: 3, mediaLabel: 'Wireframe → Hi-Fi',
      body: ['Progression from grayscale wireframes to high-fidelity screens, tracking how much restraint the interface could hold before it felt withholding.'] },
    { type: 'development', heading: 'Development', layout: 'media-right', mediaLabel: 'Motion Prototype',
      body: ['A Figma motion prototype tested transition timing between objects until pacing felt closer to walking than swiping.'] },
    { type: 'outcome', heading: 'Final Outcome', layout: 'full-bleed', mediaLabel: 'Shipped Product',
      body: ['The shipped app keeps a single-object-at-a-time browsing model across its entire collection library.'] },
    { type: 'reflection', heading: 'Reflection', quote: 'Deliberately the opposite of a grid you can scan and dismiss.',
      body: ['Removing an entire, expected interaction pattern was the riskiest and most correct decision on the project.'] }
  ]
};
