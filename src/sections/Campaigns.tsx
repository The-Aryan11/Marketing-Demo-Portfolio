import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll";

const CASES = [
  {
    brand: "Lumen Foods",
    title: "The Unlaunch",
    story: "We teased a product that didn’t exist yet. Two million people joined a waitlist to be first to something they couldn’t describe.",
    pre: "+", val: 212, suf: "%", metric: "brand awareness in 90 days",
    stats: [["2.1M", "waitlist sign-ups"], ["38M", "organic views"], ["$0", "paid launch media"]],
    d: "M20,250 C80,245 110,230 160,200 S250,140 310,110 S430,50 580,28",
  },
  {
    brand: "Halcyon Health",
    title: "Hello, Doctor",
    story: "A rebrand that replaced stock-photo stethoscopes with real clinicians telling real stories. Trust became the growth channel.",
    pre: "+", val: 38, suf: "%", metric: "trial-to-paid conversion",
    stats: [["41→78", "net promoter score"], ["−27%", "cost per acquisition"], ["14", "industry awards"]],
    d: "M20,240 C70,238 120,220 170,190 S260,170 320,130 S470,100 580,60",
  },
  {
    brand: "Meridian Group",
    title: "Own the Quarter",
    story: "Brand and demand finally in one room. One calendar, one story, one number the CFO believes. The pipeline compounded.",
    pre: "$", val: 310, suf: "M", metric: "pipeline created in 12 months",
    stats: [["3.1×", "marketing-sourced revenue"], ["92%", "forecast accuracy"], ["1", "unified team"]],
    d: "M20,255 C100,250 150,245 200,215 S280,170 340,120 S470,40 580,16",
  },
];

export default function Campaigns() {
  const root = useRef<HTMLElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dot = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    const lens = paths.current.map((p) => p?.getTotalLength() ?? 0);
    paths.current.forEach((p, i) => {
      if (p) {
        p.style.strokeDasharray = `${lens[i]}`;
        p.style.strokeDashoffset = `${lens[i]}`;
      }
    });
    let current = 0;
    const draw = (P: number) => {
      const idx = Math.min(2, Math.floor(P * 3));
      const local = Math.min(1, (P * 3 - idx) / 0.85);
      const e = gsap.parseEase("power2.out")(Math.max(0, local));
      paths.current.forEach((p, i) => {
        if (!p) return;
        p.style.opacity = i === idx ? "1" : "0";
        p.style.strokeDashoffset = `${lens[i] * (1 - (i === idx ? e : i < idx ? 1 : 0))}`;
      });
      const pt = paths.current[idx]!.getPointAtLength(lens[idx] * e);
      dot.current?.setAttribute("cx", `${pt.x}`);
      dot.current?.setAttribute("cy", `${pt.y}`);
      const c = CASES[idx];
      if (num.current) num.current.textContent = `${c.pre}${Math.round(c.val * e)}${c.suf}`;
      if (idx !== current) {
        current = idx;
        setStep(idx);
      }
    };
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (s) => draw(s.progress),
        });
        draw(0);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => draw(0.99));
    }, root);
    return () => ctx.revert();
  }, []);

  const c = CASES[step];

  return (
    <section ref={root} data-chapter="Chapter III · Three Campaigns" className="relative flex h-[100svh] flex-col justify-center bg-canvas px-5 pt-20 md:px-10 md:pt-24">
      <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-2 md:items-center md:gap-14">
        <div>
          <p className="label mb-3 text-accent">Chapter III · Three Campaigns</p>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-5 text-canvas md:p-8">
            <div className="flex items-baseline justify-between">
              <span ref={num} className="display text-[clamp(3.4rem,8vw,7.5rem)] leading-none">{c.pre}0{c.suf}</span>
              <span className="label text-canvas/60">{c.metric}</span>
            </div>
            <svg viewBox="0 0 600 280" className="mt-2 h-[26svh] w-full md:h-[34svh]" role="img" aria-label={`Growth chart for ${c.brand}`} preserveAspectRatio="none">
              {[60, 120, 180, 240].map((y) => (
                <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.12" />
              ))}
              {CASES.map((cs, i) => (
                <path
                  key={cs.title}
                  ref={(el) => { paths.current[i] = el; }}
                  d={cs.d}
                  fill="none"
                  stroke="oklch(0.72 0.19 33)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <circle ref={dot} r="9" cx="20" cy="250" fill="oklch(0.965 0.014 85)" stroke="oklch(0.72 0.19 33)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="mt-2 flex gap-2">
              {CASES.map((_, i) => (
                <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-accent" : "bg-canvas/20"}`} />
              ))}
            </div>
          </div>
        </div>

        <div key={step} className="step-in">
          <p className="label text-mute">0{step + 1} / 03 · {c.brand}</p>
          <h2 className="display mt-3 text-[clamp(2.6rem,6vw,5.8rem)]">{c.title}</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-mute md:text-lg">{c.story}</p>
          <dl className="mt-6 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/20 pt-5">
            {c.stats.map(([v, l]) => (
              <div key={l}>
                <dt className="display text-2xl md:text-4xl">{v}</dt>
                <dd className="mt-1 text-xs leading-tight text-mute md:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
