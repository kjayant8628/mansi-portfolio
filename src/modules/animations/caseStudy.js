import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initCaseStudyAnimation() {
  const root = document.getElementById("caseStudyRoot");
  if (!root) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Ensure dynamic aperture curtain overlay exists
  let curtain = document.getElementById("pageTransitionCurtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.id = "pageTransitionCurtain";
    curtain.className = "page-transition-curtain active";
    document.body.appendChild(curtain);
  } else {
    curtain.classList.add("active");
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Unclip aperture curtain from center outward to reveal private design room (<600ms)
  tl.to(curtain, {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.55,
    onComplete: () => {
      curtain.remove();
    }
  });

  // 2. Scale project cover image into place (visual identity continuity)
  const cover = root.querySelector(".cs-hero-cover img, .cs-media img");
  if (cover) {
    tl.fromTo(
      cover,
      { scale: 1.08, filter: "brightness(0.7)" },
      { scale: 1.0, filter: "brightness(1)", duration: 0.65 },
      "-=0.55"
    );
  }

  // 3. Editorial title & metadata reveal
  const meta = root.querySelector(".cs-meta, .meta-row");
  const title = root.querySelector("h1, .cs-title");

  if (meta) {
    tl.fromTo(
      meta,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.45"
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.45"
    );
  }

  // 4. Chapter Section Header Reveals
  const sectionHeads = root.querySelectorAll(".cs-section-head");
  sectionHeads.forEach((head) => {
    gsap.fromTo(
      head.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: head,
          start: "top 85%"
        }
      }
    );
  });

  // 5. Progressive Image Reveal (Mask / Unclip + Scale)
  const figures = root.querySelectorAll(".cs-figure, .cs-media");
  figures.forEach((fig) => {
    if (fig.classList.contains("cs-cover")) return; // Skip cover

    gsap.fromTo(
      fig,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: fig,
          start: "top 85%"
        }
      }
    );

    const img = fig.querySelector("img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.06 },
        {
          scale: 1.0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: fig,
            start: "top 85%"
          }
        }
      );
    }
  });

  // 6. Subtle Parallax on Full-Bleed & Large Media
  const parallaxMedia = root.querySelectorAll(
    ".layout-full .cs-media, .layout-full-bleed .cs-media"
  );
  parallaxMedia.forEach((media) => {
    gsap.to(media, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: media,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });

  // 7. Editorial Pull Quote Reveal
  const quotes = root.querySelectorAll(
    ".layout-quote blockquote, .cs-section[data-type='reflection'] blockquote"
  );
  quotes.forEach((quote) => {
    gsap.fromTo(
      quote,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%"
        }
      }
    );
  });

  // 8. Process Cards Elevation & Number Animation
  const cards = root.querySelectorAll(".cs-card");
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      }
    );
  });
}