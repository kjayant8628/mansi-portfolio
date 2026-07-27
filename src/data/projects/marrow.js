// PROJECT SHAPE — copy this file as a starting point for a new project.
// `sections` is an ORDERED array. Each entry needs a `type` (one of the
// spine steps below, or "custom") and whatever content that section needs.
// The renderer (modules/caseStudyRenderer.js) draws them in order —
// nothing else needs to change to add, remove, or reorder a section.
export default {
  slug: 'marrow',
  title: 'Marrow',
  discipline: ['Graphic Design'],
  year: 2024,
  featured: true,
  sections: [
    {
      type: 'hero',
      tagline: 'A type system built to survive a Risograph drum, misregistration and all.',
      meta: [
        { label: 'Discipline', value: 'Graphic Design' },
        { label: 'Year', value: '2024' },
        { label: 'Role', value: 'Type Design, Print Production' }
      ]
    },
    {
      type: 'brief',
      heading: 'The Brief',
      body: [
        'An independent poetry press needed a type system that could hold both quiet, long-form text and loud, one-off broadsides — without feeling like two different studios made them.'
      ]
    },
    {
      type: 'research',
      heading: 'Research',
      layout: 'media-right',
      mediaLabel: 'Archive Scans',
      body: [
        'Six months of the press\u2019s back catalogue were scanned and sorted by how badly each one had aged — the ones still legible after a decade of cheap paper became the starting reference, not the polished ones.'
      ]
    },
    {
      type: 'process',
      heading: 'Process',
      layout: 'media-left',
      mediaLabel: 'Letterform Studies',
      body: [
        'Early drafts treated Riso misregistration as an error to correct for. That was wrong. The type was redrawn with intentionally loose joins so a half-millimetre drum shift reads as texture, not a mistake.'
      ]
    },
    {
      type: 'exploration',
      heading: 'Exploration',
      layout: 'grid',
      mediaCount: 3,
      mediaLabel: 'Weight Tests',
      body: ['Eleven weights were cut before three survived contact with real ink on real stock.']
    },
    {
      type: 'development',
      heading: 'Development',
      layout: 'media-right',
      mediaLabel: 'Proofing Runs',
      body: [
        'Four proofing runs on the press\u2019s own Riso, each one folding feedback about ink coverage and drying time back into the letterforms themselves.'
      ]
    },
    {
      type: 'outcome',
      heading: 'Final Outcome',
      layout: 'full-bleed',
      mediaLabel: 'Shipped System',
      body: [
        'A three-weight family now used across the press\u2019s books, broadsides, and signage — legible at 8pt, and just as comfortable at poster scale.'
      ]
    },
    {
      type: 'reflection',
      heading: 'Reflection',
      quote: 'I don\u2019t think a good typeface fights its printing method. I think it learns to want the same things.',
      body: ['The biggest lesson was patience — the type wasn\u2019t finished until it had been wrong on paper four separate times.']
    }
  ]
};
