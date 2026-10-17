import { useLayoutEffect, useRef } from "react";
import { gsap, reveals } from "../lib/scroll";

const QUOTES = [
  ["Amara walked into a room of skeptics and left with a standing budget. She makes the case in the language of the CFO and the heart of a poet.", "Daniel Reyes", "CEO, Meridian Group"],
  ["She is the rare CMO who can critique a headline at nine and defend a forecast at ten. Our brand has never been sharper, or more profitable.", "Priya Natarajan", "CFO, Halcyon Health"],
  ["I have hired a lot of marketers. Amara taught my team how to think, not just what to ship. Half of them now run departments of their own.", "Jonas Albrecht", "Founder, Parallel"],
];

export default function Voices() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => reveals(root.current), root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-chapter="Chapter VI · Voices" className="relative overflow-hidden bg-paper px-5 py-28 md:px-10 md:py-40">
      <span aria-hidden className="display pointer-events-none absolute -left-4 -top-10 text-[22rem] leading-none text-accent/20 md:text-[34rem]">“</span>
      <div className="relative mx-auto max-w-6xl">
        <p className="label text-accent" data-reveal>Chapter VI · Voices</p>
        <div className="mt-14 space-y-20 md:space-y-28">
          {QUOTES.map(([q, n, r], i) => (
            <figure key={n} data-reveal className={i % 2 ? "md:ml-auto md:max-w-4xl" : "md:max-w-4xl"}>
              <blockquote className="display text-[clamp(1.6rem,3.4vw,3.2rem)] leading-[1.12]">{q}</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="h-px w-12 bg-accent" />
                <span><b>{n}</b> <span className="text-mute">· {r}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
