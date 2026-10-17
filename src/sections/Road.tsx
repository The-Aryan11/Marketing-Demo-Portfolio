import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

const STOPS = [
  { year: "2009", co: "Northbeam Agency", role: "Associate Strategist", story: "Learned the craft the hard way: 80 pitches, 11 wins, and a lifelong allergy to vague briefs.", win: "First Gold Effie" },
  { year: "2013", co: "Lumen Foods", role: "Head of Brand", story: "Took a 60-year-old pantry staple and made it the most-shared snack of a generation.", win: "+212% awareness" },
  { year: "2017", co: "Halcyon Health", role: "VP Brand & Growth", story: "Rebuilt a clinical, forgettable brand around one human word: care. Trials followed.", win: "NPS 41 → 78" },
  { year: "2021", co: "Parallel", role: "SVP Marketing", story: "Scaled a 12-person team to 90 and a startup to category leader in 30 months.", win: "5× ARR" },
  { year: "2024", co: "Meridian Group", role: "Chief Marketing Officer", story: "Unified brand and demand under one roof. The board now reads marketing like a P&L.", win: "$310M pipeline" },
];

export default function Road() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const dist = () => t.scrollWidth - window.innerWidth;
        gsap.set(wrap.current, { overflowX: "hidden" });
        gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (s) => {
              if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
            },
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-chapter="Chapter II · The Road" className="relative bg-paper py-24 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0">
      <div className="px-5 md:px-10">
        <p className="label text-accent">Chapter II · The Road</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,6vw,5.6rem)]">Five rooms. <em>One through-line.</em></h2>
      </div>
      <div ref={wrap} className="mt-10 overflow-x-auto md:mt-12">
        <div ref={track} className="flex w-max flex-col gap-6 px-5 md:flex-row md:gap-8 md:px-10 md:pr-[10vw]">
          {STOPS.map((s, i) => (
            <article
              key={s.year}
              data-hot
              className="flex w-[calc(100vw-2.5rem)] flex-col justify-between rounded-[2rem] border border-ink/15 bg-canvas p-7 md:h-[48svh] md:w-[34vw] md:min-w-[400px] md:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="display outline-text text-[clamp(4rem,8vw,7.5rem)] leading-none text-ink">{s.year}</span>
                <span className="label text-mute">0{i + 1}/05</span>
              </div>
              <div className="mt-8">
                <p className="label text-accent">{s.role}</p>
                <h3 className="display mt-2 text-4xl md:text-5xl">{s.co}</h3>
                <p className="mt-4 max-w-md text-lg leading-snug text-mute">{s.story}</p>
                <p className="mt-6 inline-block rounded-full bg-ink px-4 py-2 text-sm font-bold text-canvas">{s.win}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mx-5 mt-10 hidden h-px bg-ink/20 md:mx-10 md:block">
        <div ref={bar} className="h-[3px] origin-left -translate-y-px bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}
