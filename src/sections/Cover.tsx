import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

export default function Cover() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".c-line > span", { yPercent: 110 }, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.14, delay: 0.3 });
      gsap.fromTo(".c-portrait", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut", delay: 0.1 });
      gsap.fromTo(".c-img", { scale: 1.35 }, { scale: 1, duration: 2.2, ease: "expo.out", delay: 0.1 });
      gsap.fromTo(".c-fade", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 1.1, ease: "power3.out" });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".c-sub", { clipPath: "inset(0% 0% 100% 0%)", y: 60 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1700", scrub: 1, pin: true, anticipatePin: 1 },
        });
        tl.to(".c-l1", { xPercent: -16, ease: "none" }, 0)
          .to(".c-l2", { xPercent: 10, ease: "none" }, 0)
          .to(".c-l3", { xPercent: -8, ease: "none" }, 0)
          .to(".c-title", { opacity: 0, ease: "none", duration: 0.45 }, 0.25)
          .to(".c-wrap", { scale: 1.18, yPercent: -3, ease: "none" }, 0)
          .to(".c-cue", { opacity: 0, duration: 0.2 }, 0)
          .to(".c-sub", { clipPath: "inset(0% 0% 0% 0%)", y: 0, ease: "none", duration: 0.45 }, 0.5)
          .to({}, { duration: 0.2 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} data-chapter="Prologue" className="relative h-[100svh] w-full overflow-hidden">
      <div className="c-fade absolute left-5 top-24 z-10 md:left-10 md:top-20">
        <p className="label text-mute">Portfolio 2026 · Demo</p>
      </div>

      <div className="c-wrap absolute bottom-0 right-0 top-[18svh] z-0 w-[78vw] md:bottom-auto md:right-[6vw] md:top-[12svh] md:h-[78svh] md:w-auto md:aspect-[3/4]">
        <div className="c-portrait h-full w-full overflow-hidden rounded-t-[2rem] md:rounded-[2rem]">
          <img src="/img/portrait.jpg" alt="Amara Voss, Chief Marketing Officer" className="c-img h-full w-full object-cover object-top" />
        </div>
      </div>

      <div className="c-title absolute inset-x-0 top-[30svh] z-10 px-5 md:top-[16svh] md:px-10">
        <h1 className="display text-[clamp(3.1rem,9.4vw,10rem)] md:text-[clamp(3.2rem,6.2vw,13.2vh)] md:leading-[0.92]">
          <span className="c-l1 mask-line c-line"><span>Attention</span></span>
          <span className="c-l2 mask-line c-line"><span>is rented.</span></span>
          <span className="c-l3 mask-line c-line"><span><em className="text-accent">Belonging</em></span></span>
          <span className="c-l3 mask-line c-line"><span>is owned.</span></span>
        </h1>
      </div>

      <div className="c-sub absolute inset-x-0 bottom-[10svh] z-10 px-5 md:bottom-[14svh] md:px-10">
        <p className="display max-w-[16ch] text-[clamp(2.2rem,5.2vw,5.4rem)] md:max-w-[15ch]">
          Fifteen years. Four brands. <span className="text-accent">One conviction.</span>
        </p>
        <p className="mt-6 max-w-sm text-base text-mute md:text-lg">
          Amara Voss is a Chief Marketing Officer who builds brands people join, not just buy.
        </p>
      </div>

      <div className="c-fade c-cue absolute bottom-6 left-5 z-10 flex items-center gap-3 md:left-10">
        <span className="label">Scroll to begin the story</span>
        <span className="block h-10 w-px animate-pulse bg-ink" />
      </div>
      <div className="c-fade absolute bottom-6 right-5 z-10 hidden text-right md:right-10 md:block">
        <p className="label">Chief Marketing Officer</p>
        <p className="text-sm text-mute">Meridian Group · New York</p>
      </div>
    </section>
  );
}
