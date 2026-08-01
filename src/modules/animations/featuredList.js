import { revealOnScroll } from "./utils.js";

export function initFeaturedAnimation() {

    const cards = document.querySelectorAll(".feat-row");

    cards.forEach(card => {

        revealOnScroll(card, {
            y: 70,
            duration: 1
        });

    });

}