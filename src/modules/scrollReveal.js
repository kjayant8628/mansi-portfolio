// scrollReveal.js — fades/rises any .rv element into place once
// it enters the viewport. Shared by homepage and case-study pages.
export function initScrollReveal(root = document) {
  const targets = root.querySelectorAll('.rv');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); }),
    { threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
}
