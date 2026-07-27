export default {
  slug: 'second-skin',
  title: 'Second Skin',
  discipline: ['Fashion Design'],
  year: 2023,
  featured: true,
  sections: [
    {
      type: 'hero',
      tagline: 'Six pieces draped around the idea of armor worn soft — structure outside, ease underneath.',
      meta: [
        { label: 'Discipline', value: 'Fashion Design' },
        { label: 'Year', value: '2023' },
        { label: 'Role', value: 'Concept, Pattern Drafting' }
      ]
    },
    { type: 'brief', heading: 'The Brief', body: ['A self-initiated capsule exploring exoskeleton silhouettes — protection as a shape, not just a material.'] },
    { type: 'research', heading: 'Research', layout: 'media-right', mediaLabel: 'Reference Board',
      body: ['Study moved between insect exoskeletons and structured tailoring, looking for where rigidity and drape could occupy the same seam.'] },
    { type: 'process', heading: 'Process', layout: 'media-left', mediaLabel: 'Muslin Toiles',
      body: ['Muslin toiles were draped directly on the form rather than drafted flat first — the fabric was allowed to argue with the plan.'] },
    {
      type: 'custom',
      heading: 'Fit Studies',
      layout: 'grid',
      mediaCount: 3,
      mediaLabel: 'Fit Iterations',
      body: ['A project-specific step: three fit passes on a live model, tracking where the exoskeleton panels needed to give.']
    },
    { type: 'exploration', heading: 'Exploration', layout: 'media-right', mediaLabel: 'Textile Tests',
      body: ['Bonded neoprene and raw silk were tested side by side until one combination held its shape without losing all softness.'] },
    { type: 'development', heading: 'Development', layout: 'media-left', mediaLabel: 'Final Patterns',
      body: ['Patterns were finalised across three sizes, with panel seams adjusted so the structure reads consistently at every scale.'] },
    { type: 'outcome', heading: 'Final Outcome', layout: 'full-bleed', mediaLabel: 'Capsule, Six Looks',
      body: ['A six-look capsule that has since been referenced by two collaborating studios for its panel construction.'] },
    { type: 'reflection', heading: 'Reflection',
      quote: 'The muslin toiles argued with the final garment almost as much as they agreed with it.',
      body: ['Letting the fabric win a few of those arguments made the collection better than the original sketches.'] }
  ]
};
