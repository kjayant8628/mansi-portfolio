// main.js — homepage entry point.
// Every behavior lives in its own module; this file only wires
// them up. Delete or swap any single line without touching the
// others.
import './styles/main.css';

import { initCursor } from './modules/cursor.js';
import { initHeader } from './modules/header.js';
import { initHero } from './modules/hero.js';
import { initClock } from './modules/clock.js';
import { initSlider } from './modules/slider.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initFeaturedList } from './modules/featuredList.js';
import { initLenis } from './modules/lenis.js';
import { initHeroAnimation } from "./modules/animations/hero.js";
import { initFeaturedAnimation } from "./modules/animations/featuredList.js";
import { initMagnetic } from "./modules/animations/magnetic.js";

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.remove("light");

    initLenis();

    initCursor();
    initHeader();

    initHero();
    initFeaturedList();

    initClock();
    initSlider();
    initScrollReveal();

    // Animations LAST
    initHeroAnimation();
    initFeaturedAnimation();
    initMagnetic();

});
