import { useLayoutEffect, useRef } from "react";
import { gsap, reveals } from "../lib/scroll";
import { Magnetic } from "../components/Magnetic";

export default function Epilogue() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      reveals(root.current);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".epi-big", { y: 20 }, {
          y: 0, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} data-chapter="Epilogue" className="grain relative overflow-hidden bg-ink px-5 pb-10 pt-28 text-canvas md:px-10 md:pt-40">
      <p className="label text-accent" data-reveal>Epilogue</p>
      <div className="epi-big mt-6">
        <h2 className="display max-w-5xl whitespace-normal text-[clamp(2.5rem,5.8vw,5.8rem)] leading-[1.05] tracking-tight">
          Let’s write the <em className="text-accent italic font-normal">next</em> chapter.
        </h2>
      </div>
      <div className="mt-16 flex flex-col gap-10 md:mt-24 md:flex-row md:items-end md:justify-between">
        <div data-reveal>
          <p className="max-w-md text-lg text-canvas/75">
            Open to board roles, advisory work and the right CEO conversation. Brands with a true thing worth saying, find me.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-bold">
            <li><a className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent" href="https://www.linkedin.com/">LinkedIn</a></li>
            <li><a className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent" href="mailto:hello@amaravoss.example?subject=Resume%20request">Download CV</a></li>
            <li><a className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent" href="mailto:press@amaravoss.example">Press kit</a></li>
          </ul>
        </div>
        <Magnetic>
          <a href="mailto:hello@amaravoss.example" className="btn-pill bg-canvas px-10 py-6 text-lg text-ink hover:bg-accent hover:text-canvas md:text-2xl">
            hello@amaravoss.example <span aria-hidden>→</span>
          </a>
        </Magnetic>
      </div>
      <footer className="mt-24 flex flex-col justify-between gap-2 border-t border-canvas/20 pt-6 text-sm text-canvas/60 md:flex-row">
        <span>© 2026 Bespoke Portfolios</span>
        <span>Demo portfolio — the person, brands and results shown are fictional.</span>
      </footer>
    </section>
  );
}
