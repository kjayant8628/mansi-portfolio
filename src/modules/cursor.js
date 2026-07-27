// cursor.js — custom cursor dot + label ring.
// Any element with data-cursor="view|open|explore|next" gets
// a labeled ring on hover. Used identically on every page.
const LABELS = { view: 'VIEW', open: 'OPEN', explore: 'EXPLORE', next: 'NEXT' };

export function initCursor() {
  const cur = document.querySelector('.cur');
  const ring = document.querySelector('.cur-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('[data-cursor]').forEach((el) => {
    const label = LABELS[el.dataset.cursor] || '';
    el.addEventListener('mouseenter', () => { ring.classList.add('big'); ring.textContent = label; });
    el.addEventListener('mouseleave', () => { ring.classList.remove('big'); ring.textContent = ''; });
  });
}
