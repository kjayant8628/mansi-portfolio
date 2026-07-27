// hero.js — subtle pointer-based parallax on the hero's SVG
// geometry layer. Homepage only.
export function initHero() {
  const hero = document.getElementById('hero');
  const geo = document.getElementById('heroGeo');
  if (!hero || !geo) return;

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    geo.style.transform = `translate(${px * 14}px, ${py * 14}px)`;
  });
}
