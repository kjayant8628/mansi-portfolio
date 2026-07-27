// slider.js — testimonial carousel (homepage).
export function initSlider() {
  const track = document.getElementById('vbSlides');
  const prev = document.getElementById('vbPrev');
  const next = document.getElementById('vbNext');
  if (!track || !prev || !next) return;

  const count = track.querySelectorAll('.vb-slide').length;
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  next.addEventListener('click', () => { index = (index + 1) % count; update(); });
  prev.addEventListener('click', () => { index = (index - 1 + count) % count; update(); });
}
