import gsap from "gsap";
import { timeline } from "./utils.js";

export function initHeroAnimation() {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const tl = timeline({ defaults: { ease: "power3.out" } });

    // 1. Film Grain & Background Figure Fade
    tl.fromTo(
        ".hero-grain",
        { opacity: 0 },
        { opacity: 0.35, duration: 1.2 }
    )
    .fromTo(
        ".hero-figure",
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.4 },
        "-=0.9"
    );

    // 2. Geometry Construction Draw & Rings Reveal
    const geoLines = document.querySelectorAll("#heroGeo line, #heroGeo path");
    const geoRings = document.querySelectorAll("#heroGeo .ring, #heroGeo .ring2");
    const diamonds = document.querySelectorAll("#heroGeo .diamond-pt");

    if (geoLines.length) {
        tl.fromTo(
            geoLines,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, stagger: 0.1 },
            "-=1.0"
        );
    }

    if (geoRings.length) {
        tl.fromTo(
            geoRings,
            { opacity: 0, scale: 0.88 },
            { opacity: 1, scale: 1, duration: 1.4, stagger: 0.15 },
            "-=1.0"
        );
    }

    if (diamonds.length) {
        tl.fromTo(
            diamonds,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)" },
            "-=0.8"
        );
    }

    // 3. Editorial Corner Quotes Stagger
    tl.fromTo(
        ".corner-text",
        { opacity: 0, y: 15 },
        { opacity: 0.65, y: 0, duration: 0.8, stagger: 0.08 },
        "-=0.6"
    );

    // 4. Center Manifesto Quote Reveal
    tl.fromTo(
        ".hero-center-quote",
        { opacity: 0, y: 20 },
        { opacity: 0.85, y: 0, duration: 1.0 },
        "-=0.5"
    );

    // 5. Watermark Monogram
    tl.fromTo(
        ".hero-mono",
        { opacity: 0, y: 15 },
        { opacity: 0.25, y: 0, duration: 0.8 },
        "-=0.6"
    );

    // 6. Title Typography Editorial Rise Mask
    const titleWords = document.querySelectorAll("h1.title b");
    if (titleWords.length) {
        tl.fromTo(
            titleWords,
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.1, stagger: 0.14, ease: "power3.out" },
            "-=0.6"
        );
    }

    // 7. Subtitle & Action CTAs
    tl.fromTo(
        ".hero-sub",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
    )
    .fromTo(
        ".hero-actions .btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        "-=0.6"
    );
}