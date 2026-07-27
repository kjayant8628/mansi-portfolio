import { revealOnScroll } from "./utils.js";

export function initFeaturedAnimation() {

    const cards = document.querySelectorAll(".featured-item");

    cards.forEach(card => {

        revealOnScroll(card, {
            y: 70,
            duration: 1
        });

    });

}