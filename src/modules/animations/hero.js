import { fadeUp, fadeIn, stagger, timeline } from "./utils.js";

export function initHeroAnimation() {

    const tl = timeline();

    tl.add(() => {

        fadeIn(document.querySelector(".hero-grain"), {
            duration: 1.5
        });

    });

    tl.add(() => {

        fadeIn(document.querySelector(".hero-figure"), {
            duration: 1.2
        });

    }, "-=1");

    tl.add(() => {

        fadeIn(document.querySelector(".hero-geo"), {
            duration: 1.6
        });

    }, "-=0.8");

    tl.add(() => {

        stagger(document.querySelectorAll(".corner-text"), {
            y: 12,
            stagger: 0.08
        });

    });

    tl.add(() => {

        fadeUp(document.querySelector(".hero-center-quote"));

    }, "-=0.2");

    tl.add(() => {

        fadeIn(document.querySelector(".hero-mono"), {
            duration: 1
        });

    }, "-=0.6");

    tl.add(() => {

        stagger(document.querySelectorAll(".hero-inner > *"), {
            y: 25,
            stagger: 0.12
        });

    });

}