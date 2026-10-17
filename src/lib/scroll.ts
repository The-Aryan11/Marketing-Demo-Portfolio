import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

export function initLenis() {
  const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}

export function reveals(scope: Element | null) {
  if (!scope) return;
  gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 56, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay: Number(el.dataset.revealDelay || 0),
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
  });
}

export { gsap, ScrollTrigger };
