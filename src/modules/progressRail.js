// progressRail.js — small fixed vertical rail of tick marks, one
// per rendered section, showing which "chapter" of the case
// study is currently in view. Built AFTER caseStudyRenderer has
// drawn the sections, since it reads their data-type attributes.
export function initProgressRail() {
  const rail = document.getElementById('csProgress');
  const sections = document.querySelectorAll('#caseStudyRoot [data-type]');
  if (!rail || !sections.length) return;

  rail.innerHTML = Array.from(sections)
    .map(
      (s, i) => `
      <div class="tick" data-index="${i}">
        <span class="bar"></span>
        <span class="label mono"></span>
      </div>`
    )
    .join('');

  const ticks = rail.querySelectorAll('.tick');
  ticks.forEach((tick, i) => {
    tick.addEventListener('click', () => {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const i = Array.from(sections).indexOf(entry.target);
        if (entry.isIntersecting) {
          ticks.forEach((t) => t.classList.remove('active'));
          ticks[i]?.classList.add('active');
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => io.observe(s));
}
