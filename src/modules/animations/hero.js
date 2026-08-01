import gsap from "gsap";
import { timeline } from "./utils.js";

export function initHeroAnimation() {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const tl = timeline({ defaults: { ease: "power3.out" } });

    // 1. Film Grain & Background Figure
    tl.fromTo(
        ".hero-grain",
        { opacity: 0 },
        { opacity: 0.35, duration: 0.8 }
    )
    .fromTo(
        ".hero-figure",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.0 },
        "-=0.6"
    );

    // 2. Blueprint Construction Sequence (<2.2s total)
    const geoContainer = document.getElementById("heroGeo");
    const geoLines = document.querySelectorAll("#heroGeo line");
    const geoPath = document.querySelector("#heroGeo path");
    const geoRings = document.querySelectorAll("#heroGeo .ring, #heroGeo .ring2");
    const diamonds = document.querySelectorAll("#heroGeo .diamond-pt");

    if (geoContainer) {
        tl.fromTo(geoContainer, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.8");
    }

    // Crosshairs draw themselves (Blueprint Line Draw)
    if (geoLines.length) {
        tl.fromTo(
            geoLines,
            { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 },
            { opacity: 1, strokeDashoffset: 0, duration: 0.75, stagger: 0.12, ease: "power2.inOut" },
            "-=0.3"
        );
    }

    // Diamond envelope path draws itself
    if (geoPath) {
        tl.fromTo(
            geoPath,
            { opacity: 0, strokeDasharray: 1200, strokeDashoffset: 1200 },
            { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
            "-=0.6"
        );
    }

    // Outer & inner rings unroll progressively
    if (geoRings.length) {
        tl.fromTo(
            geoRings,
            { opacity: 0, scale: 0.92, strokeDasharray: 1600, strokeDashoffset: 1600 },
            { opacity: 1, scale: 1, strokeDashoffset: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" },
            "-=0.6"
        );
    }

    // Diamond nodes emerge with crisp stagger
    if (diamonds.length) {
        tl.fromTo(
            diamonds,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2)" },
            "-=0.5"
        );
    }

    // Clear strokeDash properties when sequence finishes so cursor interaction operates cleanly
    tl.add(() => {
        const allSvgEls = document.querySelectorAll("#heroGeo line, #heroGeo path, #heroGeo circle");
        allSvgEls.forEach(el => {
            el.style.strokeDasharray = "";
            el.style.strokeDashoffset = "";
        });
    });

    // 3. Editorial Title Typography Mask Reveal (Typeset into Position)
    const titleWords = document.querySelectorAll("h1.title b");
    if (titleWords.length) {
        tl.fromTo(
            titleWords,
            { y: "110%", opacity: 0, letterSpacing: "0.04em" },
            { y: "0%", opacity: 1, letterSpacing: "-0.03em", duration: 1.0, stagger: 0.14, ease: "power3.out" },
            "-=0.5"
        );
    }

    // 4. Center Manifesto Quote Reveal (Positioned After Title)
    tl.fromTo(
        ".hero-center-quote",
        { opacity: 0, y: 18 },
        { opacity: 0.85, y: 0, duration: 0.7 },
        "-=0.3"
    );

    // 5. Corner Editorial Quotes
    tl.fromTo(
        ".corner-text",
        { opacity: 0, y: 15 },
        { opacity: 0.65, y: 0, duration: 0.6, stagger: 0.06 },
        "-=0.5"
    );

    // 6. Watermark Monogram
    tl.fromTo(
        ".hero-mono",
        { opacity: 0, y: 15 },
        { opacity: 0.25, y: 0, duration: 0.6 },
        "-=0.5"
    );

    // 7. Subtitle & Action CTAs
    tl.fromTo(
        ".hero-sub",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
    )
    .fromTo(
        ".hero-actions .btn",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.5"
    );
}