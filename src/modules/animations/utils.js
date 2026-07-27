import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
/**
 * Fade + move upward
 */
export function fadeUp(
    target,
    {
        y = 40,
        duration = 0.9,
        ease = "power3.out",
        delay = 0
    } = {}
) {

    if (!target) return;

    gsap.fromTo(
        target,
        {
            opacity: 0,
            y
        },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease
        }
    );

}


/**
 * Simple fade
 */
export function fadeIn(
    target,
    {
        duration = 0.8,
        ease = "power2.out",
        delay = 0
    } = {}
) {

    if (!target) return;

    gsap.fromTo(
        target,
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration,
            delay,
            ease
        }
    );

}


/**
 * Animate multiple elements
 */
export function stagger(
    targets,
    {
        y = 30,
        duration = 0.8,
        stagger = 0.12,
        ease = "power3.out"
    } = {}
) {

    const elements = Array.from(targets);

    if (!elements.length) return;

    gsap.fromTo(
        targets,
        {
            opacity: 0,
            y
        },
        {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease
        }
    );

}


/**
 * Image reveal
 */
export function revealImage(
    target,
    {
        scale = 1.08,
        duration = 1.2,
        ease = "power3.out"
    } = {}
) {

    if (!target) return;

    gsap.fromTo(
        target,
        {
            opacity: 0,
            scale
        },
        {
            opacity: 1,
            scale: 1,
            duration,
            ease
        }
    );

}

export function revealOnScroll(
    target,
    {
        y = 60,
        duration = 1,
        start = "top 85%",
        ease = "power3.out"
    } = {}
) {

    if (!target) return;

    gsap.fromTo(
        target,
        {
            opacity: 0,
            y
        },
        {
            opacity: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
                trigger: target,
                start
            }
        }
    );

}


/**
 * Generic timeline creator
 */
export function timeline(options = {}) {
    return gsap.timeline(options);
}