// header.js — solid header on scroll + mobile nav toggle.
export function initHeader() {
  const header = document.getElementById('siteHeader');
  const menuBtn = document.getElementById('menuBtn');
  const siteNav = document.getElementById('siteNav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('solid', window.scrollY > 40);
  });

  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', () => siteNav.classList.toggle('open'));
    siteNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => siteNav.classList.remove('open'))
    );
  }
}
