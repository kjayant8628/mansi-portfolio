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
    let backdrop = document.getElementById('navBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'navBackdrop';
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    menuBtn.setAttribute('aria-expanded', 'false');

    function openNav() {
      siteNav.classList.add('open');
      backdrop.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      const firstLink = siteNav.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeNav() {
      siteNav.classList.remove('open');
      backdrop.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleNav() {
      if (siteNav.classList.contains('open')) {
        closeNav();
        menuBtn.focus();
      } else {
        openNav();
      }
    }

    menuBtn.addEventListener('click', toggleNav);
    backdrop.addEventListener('click', () => {
      closeNav();
      menuBtn.focus();
    });

    siteNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', closeNav)
    );

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeNav();
        menuBtn.focus();
      }
    });
  }
}
