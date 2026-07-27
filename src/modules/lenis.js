import Lenis from "lenis";

let lenis;

export function initLenis() {

  if (lenis) return lenis;

  lenis = new Lenis({
    autoRaf: true,
    duration: 1.2
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}