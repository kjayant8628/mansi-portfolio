// exhibitionViewer.js — Cinematic Exhibition Inspection Room for Case Studies.
// Transforms inline project imagery into interactive curated presentation boards
// with full-screen architectural inspection, keyboard navigation, and board indexing.
import gsap from 'gsap';

export function initExhibitionViewer(project) {
  const root = document.getElementById('caseStudyRoot');
  if (!root) return;

  // Collect all presentation boards in document order
  const figures = Array.from(root.querySelectorAll('.cs-figure[data-board-src]'));
  if (!figures.length) return;

  const projectTitle = project?.title || document.title || 'Case Study';

  // 1. Build Exhibition Overlay DOM Container if not present
  let overlay = document.getElementById('exhibitionOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'exhibitionOverlay';
    overlay.className = 'exhibition-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="exhibition-backdrop"></div>
      <div class="exhibition-header mono">
        <div class="exhibition-meta">
          <span class="exhibition-idx">BOARD 01 / 01</span>
          <span class="sep">•</span>
          <span class="exhibition-project-title">${escapeHtml(projectTitle.toUpperCase())}</span>
        </div>
        <button class="exhibition-close-btn" id="exhibitionCloseBtn" aria-label="Close Exhibition Room">
          CLOSE <span class="key-hint">[ESC]</span>
        </button>
      </div>
      <div class="exhibition-stage">
        <div class="exhibition-media-frame">
          <img src="" class="exhibition-img" alt="Presentation Board Inspection" />
          <video src="" class="exhibition-video" autoplay loop muted playsinline style="display:none;"></video>
        </div>
        <div class="exhibition-caption-bar">
          <div class="exhibition-caption font-display"></div>
          <div class="exhibition-desc mono"></div>
        </div>
      </div>
      <div class="exhibition-footer mono">
        <button class="exhibition-nav-btn" id="exhibitionPrevBtn" aria-label="Previous Board">← PREV BOARD</button>
        <span class="exhibition-hint">USE ARROW KEYS TO INSPECT BOARDS</span>
        <button class="exhibition-nav-btn" id="exhibitionNextBtn" aria-label="Next Board">NEXT BOARD →</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const backdrop = overlay.querySelector('.exhibition-backdrop');
  const stage = overlay.querySelector('.exhibition-stage');
  const img = overlay.querySelector('.exhibition-img');
  const video = overlay.querySelector('.exhibition-video');
  const idxLabel = overlay.querySelector('.exhibition-idx');
  const captionEl = overlay.querySelector('.exhibition-caption');
  const descEl = overlay.querySelector('.exhibition-desc');
  const closeBtn = overlay.querySelector('#exhibitionCloseBtn');
  const prevBtn = overlay.querySelector('#exhibitionPrevBtn');
  const nextBtn = overlay.querySelector('#exhibitionNextBtn');

  let currentIndex = 0;
  let isOpen = false;

  // 2. Add Board Indexing Pills & Hover Perspective to DOM figures
  figures.forEach((fig, index) => {
    const idxStr = String(index + 1).padStart(2, '0');
    const totalStr = String(figures.length).padStart(2, '0');

    // Add monospaced board plate index if not present
    if (!fig.querySelector('.cs-board-plate')) {
      const plate = document.createElement('div');
      plate.className = 'cs-board-plate mono';
      plate.textContent = `BOARD / ${idxStr}`;
      fig.insertBefore(plate, fig.firstChild);
    }

    // Subtle 3D tilt on mouse move over board
    fig.addEventListener('pointermove', (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = fig.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(fig, {
        rotateX: -py * 6,
        rotateY: px * 6,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    fig.addEventListener('pointerleave', () => {
      gsap.to(fig, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    // Click handler to open Exhibition Inspection Room
    fig.addEventListener('click', (e) => {
      e.preventDefault();
      openExhibition(index);
    });
  });

  // 3. Exhibition View Display Function
  function showBoard(index) {
    if (index < 0) index = figures.length - 1;
    if (index >= figures.length) index = 0;
    currentIndex = index;

    const fig = figures[currentIndex];
    const src = fig.dataset.boardSrc || fig.querySelector('img, video')?.src;
    const type = fig.dataset.boardType || (src?.match(/\.(mp4|webm)$/i) ? 'video' : 'image');
    const caption = fig.dataset.boardCaption || fig.querySelector('figcaption strong')?.textContent || '';
    const desc = fig.dataset.boardDescription || fig.querySelector('figcaption span')?.textContent || '';

    const idxStr = String(currentIndex + 1).padStart(2, '0');
    const totalStr = String(figures.length).padStart(2, '0');
    idxLabel.textContent = `BOARD ${idxStr} / ${totalStr}`;

    if (type === 'video') {
      img.style.display = 'none';
      video.style.display = 'block';
      video.src = src;
    } else {
      video.style.display = 'none';
      img.style.display = 'block';
      img.src = src;
    }

    captionEl.textContent = caption;
    descEl.textContent = desc;
  }

  function openExhibition(index) {
    isOpen = true;
    showBoard(index);
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');

    // Smooth GSAP Entrance Animation
    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    gsap.fromTo(
      stage,
      { opacity: 0, scale: 0.94, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.05 }
    );
  }

  function closeExhibition() {
    if (!isOpen) return;
    isOpen = false;

    gsap.to(stage, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in'
    });

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        video.pause();
        video.src = '';
      }
    });
  }

  // 4. Interactive Wiring & Keyboard Shortcuts
  closeBtn?.addEventListener('click', closeExhibition);
  backdrop?.addEventListener('click', closeExhibition);

  prevBtn?.addEventListener('click', () => {
    showBoard(currentIndex - 1);
    gsap.fromTo(stage, { opacity: 0.8, x: -10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
  });

  nextBtn?.addEventListener('click', () => {
    showBoard(currentIndex + 1);
    gsap.fromTo(stage, { opacity: 0.8, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
  });

  window.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeExhibition();
    if (e.key === 'ArrowLeft') {
      showBoard(currentIndex - 1);
      gsap.fromTo(stage, { opacity: 0.8, x: -10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    }
    if (e.key === 'ArrowRight') {
      showBoard(currentIndex + 1);
      gsap.fromTo(stage, { opacity: 0.8, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    }
  });
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
