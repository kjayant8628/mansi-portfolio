// clock.js — live "AVAILABLE / BY APPOINTMENT" status in the header.
export function initClock() {
  const el = document.getElementById('clock');
  if (!el) return;

  function update() {
    const h = new Date().getHours();
    const open = h >= 9 && h < 19;
    el.textContent = open ? 'AVAILABLE' : 'BY APPOINTMENT';
  }
  update();
  setInterval(update, 60000);
}
