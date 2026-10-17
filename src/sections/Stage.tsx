import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reveals } from "../lib/scroll";

const ROW1 = ["Keynote · Brand Summit", "CMO of the Year", "The Brand Review", "Gold Effie ×3", "Growth Week", "Cannes Shortlist"];
const ROW2 = ["Signal & Noise", "Future of Brand Forum", "Top 40 Under 40", "CMO Council", "Board Advisor", "Author · Belonging Is Owned"];

export default function Stage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      reveals(root.current);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".stage-img", { yPercent: -12 }, {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".stage-frame", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.fromTo(".stage-quote", { yPercent: 20 }, {
          yPercent: -20, ease: "none",
          scrollTrigger: { trigger: ".stage-frame", start: "top bottom", end: "bottom top", scrub: true },
        });
        const tweens = ["m1", "m2"].map((c, i) =>
          gsap.fromTo(`.${c}`, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 40, ease: "none", repeat: -1 }),
        );
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (s) => {
            const v = Math.min(Math.abs(s.getVelocity()) / 350, 6);
            tweens.forEach((t) => {
              t.timeScale(1 + v);
              gsap.to(t, { timeScale: 1, duration: 1.2, overwrite: "auto", delay: 0.1 });
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const row = (items: string[], cls: string) => (
    <div className="overflow-hidden whitespace-nowrap py-3">
      <div className={`${cls} flex w-max`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((t) => (
              <span key={t + k} className="display flex items-center text-[clamp(2rem,5vw,4.5rem)]">
                {t}
                <span className="mx-6 text-accent md:mx-10">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={root} data-chapter="Chapter V · On Stage & In Print" className="bg-canvas">
      <div className="stage-frame relative h-[110svh] overflow-hidden bg-ink">
        <img src="/img/stage.jpg" alt="Amara Voss delivering a keynote to a packed auditorium" className="stage-img absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />
        <div className="stage-quote absolute inset-x-0 bottom-[12svh] px-5 text-canvas md:px-10">
          <p className="label text-accent" data-reveal>Chapter V · On Stage & In Print</p>
          <p className="display mt-4 max-w-5xl text-[clamp(2.2rem,6vw,6rem)]" data-reveal>
            Stop counting impressions. Start counting the ones that <em className="text-accent">stay.</em>
          </p>
          <p className="mt-5 text-canvas/75" data-reveal>Keynote, Brand Summit 2025 · 4,000 in the room</p>
        </div>
      </div>
      <div className="py-12 md:py-20">
        {row(ROW1, "m1")}
        {row(ROW2, "m2")}
      </div>
    </section>
  );
}
