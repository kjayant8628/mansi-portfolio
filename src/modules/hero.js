import gsap from "gsap";

export function initHero() {
  const hero = document.getElementById('hero');
  const geo = document.getElementById('heroGeo');
  if (!hero || !geo) return;

  const ring1 = geo.querySelector('.ring');
  const ring2 = geo.querySelector('.ring2');
  const path = geo.querySelector('path');
  const lines = geo.querySelectorAll('line');
  const figure = hero.querySelector('.hero-figure');
  const manifesto = hero.querySelector('.hero-center-quote');
  const diamonds = hero.querySelectorAll('.diamond-pt');

  // Check prefers-reduced-motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let idleTimeout = null;

  function settleGeometry() {
    if (reducedMotion) return;
    if (ring1) gsap.to(ring1, { x: 0, y: 0, rotation: 0, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    if (ring2) gsap.to(ring2, { x: 0, y: 0, rotation: 0, duration: 1.4, ease: "power3.out", overwrite: "auto" });
    if (path) gsap.to(path, { x: 0, y: 0, duration: 1.0, ease: "power3.out", overwrite: "auto" });
    if (lines.length) gsap.to(lines, { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    if (figure) gsap.to(figure, { x: 0, y: 0, duration: 1.2, ease: "power3.out", overwrite: "auto" });
  }

  hero.addEventListener('pointermove', (e) => {
    if (reducedMotion) return;

    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    // Outer Ring: Subtle translation + clockwise rotational tension
    if (ring1) {
      gsap.to(ring1, {
        x: px * 24,
        y: py * 24,
        rotation: px * 14,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // Inner Ring: Counter-translation + counter-rotational tension
    if (ring2) {
      gsap.to(ring2, {
        x: px * -18,
        y: py * -18,
        rotation: py * -16,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // Diamond Envelope Path: Focused center displacement
    if (path) {
      gsap.to(path, {
        x: px * 12,
        y: py * 12,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // Crosshair Lines: Subtle anchor displacement
    if (lines.length) {
      gsap.to(lines, {
        x: px * 8,
        y: py * 8,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // Figure Silhouette: Inverted background depth layer
    if (figure) {
      gsap.to(figure, {
        x: px * -10,
        y: py * -10,
        duration: 1.0,
        ease: "power2.out",
        overwrite: "auto"
      });
    }

    // Proximity highlighting on crosshairs
    const distFromCenter = Math.hypot(px, py);
    lines.forEach((line) => {
      line.style.stroke = distFromCenter < 0.22 ? 'rgba(99, 120, 255, 0.45)' : 'rgba(244, 244, 242, 0.16)';
    });

    // Reset idle settling timer
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(settleGeometry, 1800);
  });

  hero.addEventListener('pointerleave', () => {
    settleGeometry();
  });

  // Diamond Node Interactions
  diamonds.forEach((diamond) => {
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
      if (geo) {
        geo.style.opacity = '0.35';
        geo.style.transition = 'opacity 0.4s ease';
      }
    });
    manifesto.addEventListener('mouseleave', () => {
      if (geo) {
        geo.style.opacity = '1';
      }
    });
  }
}
