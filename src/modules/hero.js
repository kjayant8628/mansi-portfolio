export function initHero() {
  const hero = document.getElementById('hero');
  const geo = document.getElementById('heroGeo');
  const figure = hero?.querySelector('.hero-figure');
  const manifesto = hero?.querySelector('.hero-center-quote');
  const diamonds = hero?.querySelectorAll('.diamond-pt');
  const lines = hero?.querySelectorAll('#heroGeo line, #heroGeo path');

  if (!hero || !geo) return;

  // Pointer-based multi-layer geometry response
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    // Layer 1: SVG Geometry
    geo.style.transform = `translate(${px * 16}px, ${py * 16}px)`;

    // Layer 2: Inverted Figure Silhouette Parallax
    if (figure) {
      figure.style.transform = `translate(${px * -8}px, ${py * -8}px)`;
    }

    // Construction Line & Diamond Proximity Highlighting
    const distFromCenter = Math.hypot(px, py);
    const lineOpacity = Math.max(0.12, 0.45 - distFromCenter * 0.5);

    lines?.forEach((line) => {
      line.style.stroke = distFromCenter < 0.25 ? 'rgba(99, 120, 255, 0.45)' : 'rgba(244, 244, 242, 0.16)';
    });
  });

  // Diamond Node Interactions
  diamonds?.forEach((diamond) => {
    diamond.addEventListener('mouseenter', () => {
      diamond.style.transform = 'scale(1.8) rotate(45deg)';
      diamond.style.fill = '#6378FF';
      diamond.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), fill 0.3s ease';
    });
    diamond.addEventListener('mouseleave', () => {
      diamond.style.transform = 'scale(1) rotate(45deg)';
      diamond.style.fill = diamond.getAttribute('fill') || '#F4F4F2';
    });
  });

  // Manifesto Focus Response
  if (manifesto) {
    manifesto.addEventListener('mouseenter', () => {
      geo.style.opacity = '0.35';
      geo.style.transition = 'opacity 0.4s ease';
    });
    manifesto.addEventListener('mouseleave', () => {
      geo.style.opacity = '1';
    });
  }
}
