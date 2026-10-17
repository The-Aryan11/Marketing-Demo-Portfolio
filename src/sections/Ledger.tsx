import { useLayoutEffect, useRef } from "react";
import { gsap, reveals } from "../lib/scroll";

const STATS = [
  { pre: "$", val: 1.2, dec: 1, suf: "B", label: "Revenue influenced across four brands" },
  { pre: "", val: 312, dec: 0, suf: "%", label: "Pipeline growth in three years at Meridian" },
  { pre: "", val: 78, dec: 0, suf: " NPS", label: "Up from 41 after the Halcyon rebrand" },
  { pre: "", val: 6.4, dec: 1, suf: "×", label: "Return on paid media, sustained for 8 quarters" },
];

export default function Ledger() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      reveals(root.current);
      gsap.utils.toArray<HTMLElement>(".stat").forEach((el) => {
        const s = STATS[Number(el.dataset.i)];
        const num = el.querySelector<HTMLElement>(".num")!;
        const line = el.querySelector<HTMLElement>(".line")!;
        const fmt = (v: number) => `${s.pre}${v.toFixed(s.dec)}${s.suf}`;
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        const o = { v: 0 };
        gsap.to(o, {
          v: s.val,
          duration: 2.2,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onStart: () => (num.textContent = fmt(0)),
          onUpdate: () => (num.textContent = fmt(o.v)),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-chapter="Chapter I · The Ledger" className="grain relative bg-ink px-5 py-32 text-canvas md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <p className="label text-accent" data-reveal>Chapter I · The Ledger</p>
        <h2 className="display mt-6 max-w-4xl text-[clamp(2.6rem,7vw,7rem)]" data-reveal>
          Receipts, <em className="text-accent">not</em> adjectives.
        </h2>
        <div className="mt-20 grid gap-x-16 gap-y-16 md:mt-28 md:grid-cols-2">
          {STATS.map((s, i) => (
            <div key={i} className="stat" data-i={i}>
              <div className="line mb-6 h-px origin-left bg-canvas/40" />
              <p className="num display text-[clamp(4rem,10vw,9rem)] leading-none">
                {s.pre}{s.val.toFixed(s.dec)}{s.suf}
              </p>
              <p className="mt-4 max-w-xs text-lg text-canvas/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
