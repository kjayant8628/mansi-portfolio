// threeDepth.js — Subtle 3D WebGL spatial presentation for project case studies.
// Uses Three.js PerspectiveCamera tilt + lerped mesh plane rotation to create
// layered depth for hero media without distracting particle/shader effects.
import * as THREE from 'three';
import gsap from 'gsap';

export function initThreeDepth(project) {
  const hero = document.querySelector('.cs-hero');
  if (!hero) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Find cover image element or project cover URL
  const imgEl = hero.querySelector('.cs-cover');
  const coverUrl = imgEl?.src || project?.cover;
  if (!coverUrl) return;

  // Create WebGL canvas overlay inside .cs-hero
  let canvas = hero.querySelector('.cs-three-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'cs-three-canvas';
    hero.insertBefore(canvas, hero.firstChild);
  }

  const width = hero.clientWidth || window.innerWidth;
  const height = hero.clientHeight || window.innerHeight;

  // 1. Three.js Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 5;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL init failed, fallback to native CSS image cover:', e);
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Texture & Mesh Setup
  const textureLoader = new THREE.TextureLoader();
  let mesh = null;

  textureLoader.load(
    coverUrl,
    (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Calculate plane size to fit camera frustum with object-fit cover
      const distance = camera.position.z;
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
      const visibleWidth = visibleHeight * camera.aspect;

      // Image aspect ratio adjustment
      const imgAspect = texture.image.width / texture.image.height;
      let planeW = visibleWidth;
      let planeH = visibleHeight;

      if (imgAspect > camera.aspect) {
        planeW = visibleHeight * imgAspect;
      } else {
        planeH = visibleWidth / imgAspect;
      }

      const geometry = new THREE.PlaneGeometry(planeW * 1.15, planeH * 1.15, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Fade out static CSS img element once Three.js canvas is ready for seamless transition
      if (imgEl) {
        imgEl.style.opacity = '0';
        imgEl.style.transition = 'opacity 0.6s ease';
      }
    },
    undefined,
    (err) => {
      console.warn('Three.js texture load fallback:', err);
    }
  );

  // 3. Pointer & Layered Depth Parallax Mechanics
  let targetPx = 0, targetPy = 0;
  let currentPx = 0, currentPy = 0;

  const mainCol = hero.querySelector('.cs-opening-main');
  const colophon = hero.querySelector('.cs-opening-colophon');
  const eyebrow = hero.querySelector('.cs-opening-eyebrow');

  // GSAP quickTo setters for 60fps DOM element depth shifts
  const mainX = mainCol ? gsap.quickTo(mainCol, 'x', { duration: 0.8, ease: 'power2.out' }) : null;
  const mainY = mainCol ? gsap.quickTo(mainCol, 'y', { duration: 0.8, ease: 'power2.out' }) : null;

  const colophonX = colophon ? gsap.quickTo(colophon, 'x', { duration: 0.9, ease: 'power2.out' }) : null;
  const colophonY = colophon ? gsap.quickTo(colophon, 'y', { duration: 0.9, ease: 'power2.out' }) : null;

  const eyebrowX = eyebrow ? gsap.quickTo(eyebrow, 'x', { duration: 0.7, ease: 'power2.out' }) : null;
  const eyebrowY = eyebrow ? gsap.quickTo(eyebrow, 'y', { duration: 0.7, ease: 'power2.out' }) : null;

  function onPointerMove(e) {
    const rect = hero.getBoundingClientRect();
    targetPx = (e.clientX - rect.left) / rect.width - 0.5;
    targetPy = (e.clientY - rect.top) / rect.height - 0.5;
  }

  window.addEventListener('pointermove', onPointerMove);

  // 4. Animation Frame Render Loop
  function renderLoop() {
    requestAnimationFrame(renderLoop);

    // Smooth lerp for camera & mesh position
    currentPx += (targetPx - currentPx) * 0.05;
    currentPy += (targetPy - currentPy) * 0.05;

    // Three.js Camera & Plane Spatial Tilt
    if (mesh) {
      camera.position.x = currentPx * 0.35;
      camera.position.y = -currentPy * 0.35;
      camera.lookAt(0, 0, 0);

      mesh.rotation.x = currentPy * 0.06;
      mesh.rotation.y = currentPx * 0.06;

      renderer.render(scene, camera);
    }

    // Layered Parallax Across DOM Overlays
    if (mainX && mainY) {
      mainX(currentPx * 14);
      mainY(currentPy * 14);
    }

    if (colophonX && colophonY) {
      colophonX(-currentPx * 24);
      colophonY(-currentPy * 24);
    }

    if (eyebrowX && eyebrowY) {
      eyebrowX(currentPx * 8);
      eyebrowY(currentPy * 8);
    }
  }

  renderLoop();

  // 5. Responsive Resize Handling
  function onResize() {
    const w = hero.clientWidth || window.innerWidth;
    const h = hero.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);
}
