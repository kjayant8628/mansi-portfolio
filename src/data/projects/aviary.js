export default {
  slug: 'aviary',
  title: 'Aviary',
  discipline: ['3D Visualization'],
  year: 2024,
  featured: true,
  sections: [
    { type: 'hero', tagline: 'A speculative architectural render series, with each structure modelled to resonate at the frequency of a specific bird call.',
      meta: [{ label: 'Discipline', value: '3D Visualization' }, { label: 'Year', value: '2024' }, { label: 'Role', value: 'Modeling, Lookdev, Render' }] },
    { type: 'brief', heading: 'The Brief', body: ['A self-initiated series asking whether a building\u2019s form could be derived directly from sound rather than site or program.'] },
    { type: 'research', heading: 'Research', layout: 'media-right', mediaLabel: 'Sound Wave Studies',
      body: ['Twelve bird calls were converted into waveform data, then extruded into rough volumetric studies as a starting geometry.'] },
    { type: 'process', heading: 'Process', layout: 'media-left', mediaLabel: 'Model Iterations',
      body: ['Each volume was refined in Blender, keeping the waveform\u2019s proportions legible even after architectural detailing was added.'] },
    {
      type: 'custom',
      heading: 'Material Tests',
      layout: 'grid',
      mediaCount: 3,
      mediaLabel: 'Substance Studies',
      body: ['A project-specific step: material and lighting studies in Substance Painter to find surfaces that read as both stone and instrument.']
    },
    { type: 'exploration', heading: 'Exploration', layout: 'media-right', mediaLabel: 'Lookdev Passes',
      body: ['Lookdev passes tested how the structures read at dawn, midday and dusk lighting — dawn read as intended: quiet, resonant.'] },
    { type: 'development', heading: 'Development', layout: 'media-left', mediaLabel: 'Final Renders',
      body: ['Twelve final renders were composited across a single continuous landscape, so the series reads as one place, not twelve.'] },
    { type: 'outcome', heading: 'Final Outcome', layout: 'full-bleed', mediaLabel: 'Series, 12 Structures',
      body: ['A twelve-piece render series exhibited as a continuous scroll rather than individual images.'] },
    { type: 'reflection', heading: 'Reflection', quote: 'It sits somewhere between a building and an instrument.',
      body: ['Letting sound dictate form removed a lot of decisions that would otherwise have been aesthetic guesswork.'] }
  ]
};
