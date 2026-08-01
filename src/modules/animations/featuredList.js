import gsap from "gsap";
import { revealOnScroll } from "./utils.js";
import { setHeroCanvasMedia } from "../hero.js";

export function initFeaturedAnimation() {
  const cards = document.querySelectorAll(".feat-row");
  if (!cards.length) return;

  cards.forEach((card) => {
    revealOnScroll(card, {
      y: 60,
      duration: 1
    });
  });

  // Floating Image Preview Container
  let preview = document.getElementById("featPreview");
  if (!preview) {
    preview = document.createElement("div");
    preview.id = "featPreview";
    preview.className = "feat-preview";
    preview.innerHTML = `<img src="" alt="Project Preview" />`;
    document.body.appendChild(preview);
  }

  const previewImg = preview.querySelector("img");
  let px = 0, py = 0;

  window.addEventListener("pointermove", (e) => {
    px = e.clientX;
    py = e.clientY;
    if (preview.classList.contains("active")) {
      gsap.to(preview, {
        x: px,
        y: py,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  });

  const heroCanvas = document.getElementById("heroCanvas");
  const heroCanvasTag = heroCanvas?.querySelector(".hero-canvas-tag");

  cards.forEach((row) => {
    const cover = row.dataset.cover;
    const previewUrl = row.dataset.previewUrl || cover;
    const previewType = row.dataset.previewType || "image";
    const projectTitle = row.dataset.title || "";

    row.addEventListener("mouseenter", () => {
      // 1. Floating cursor preview
      if (cover && !window.matchMedia("(max-width: 900px)").matches) {
        if (previewImg.src !== cover) {
          previewImg.src = cover;
        }
        preview.classList.add("active");
        gsap.set(preview, { x: px, y: py });
      }

      // 2. Hero Canvas Binding
      if (heroCanvas && previewUrl) {
        setHeroCanvasMedia(previewUrl, previewType);
        if (heroCanvasTag && projectTitle) {
          heroCanvasTag.textContent = `PROJECT PREVIEW / ${projectTitle.toUpperCase()}`;
        }
        heroCanvas.classList.add("active-preview");
      }
    });

    row.addEventListener("mouseleave", () => {
      preview.classList.remove("active");

      // Reset Hero Canvas
      if (heroCanvas) {
        heroCanvas.classList.remove("active-preview");
        if (heroCanvasTag) {
          heroCanvasTag.textContent = "STUDIO CANVAS / 01";
        }
      }
    });

    // Outgoing transition to Case Study ("Private Design Room Entry")
    row.addEventListener("click", (e) => {
      const href = row.getAttribute("href");
      if (!href) return;

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      e.preventDefault();

      // Row visual feedback into transition
      row.style.borderColor = "var(--accent)";
      const name = row.querySelector(".name");
      if (name) {
        name.style.transform = "translateX(24px)";
        name.style.color = "var(--accent)";
      }

      if (preview) preview.classList.remove("active");

      // Dynamic aperture curtain overlay
      let curtain = document.getElementById("pageTransitionCurtain");
      if (!curtain) {
        curtain = document.createElement("div");
        curtain.id = "pageTransitionCurtain";
        curtain.className = "page-transition-curtain";
        document.body.appendChild(curtain);
      }

      requestAnimationFrame(() => {
        curtain.classList.add("active");
      });

      // Rapid, seamless navigation within 450ms
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  });
}