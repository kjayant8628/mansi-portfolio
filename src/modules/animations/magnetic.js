import gsap from "gsap";

export function initMagnetic() {

    const magnets = document.querySelectorAll("[data-magnetic]");

    magnets.forEach(button => {

        const arrow = button.querySelector(".arrow");

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button slightly
            gsap.to(button, {
                x: x * 0.18,
                y: y * 0.18,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto"
            });

            // Arrow moves a little more
            if (arrow) {
                gsap.to(arrow, {
                    x: x * 0.28,
                    y: y * 0.28,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

        });

        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.55,
                ease: "elastic.out(1,0.4)"
            });

            if (arrow) {
                gsap.to(arrow, {
                    x: 0,
                    y: 0,
                    duration: 0.55,
                    ease: "elastic.out(1,0.4)"
                });
            }

        });

    });

}