import { useLayoutEffect, useRef } from "react";
import { gsap, reveals } from "../lib/scroll";

const RULES = [
  ["01", "Start with the one true thing.", "Every great brand is built on a single, defensible truth. Find it before you spend a dollar."],
  ["02", "Brand is the first sales call.", "By the time a buyer meets your rep, the story has already done half the work. Or lost the deal."],
  ["03", "Measure what changes minds.", "Impressions are vanity. Track consideration, preference and the revenue that follows."],
  ["04", "Build teams that outlast campaigns.", "Hire curious, pay for craft, and give people the room to be brave. The work compounds."],
];

export default function Playbook() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => reveals(root.current), root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-chapter="Chapter IV · The Playbook" className="bg-canvas px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="label text-accent" data-reveal>Chapter IV · The Playbook</p>
        <h2 className="display mt-4 max-w-3xl text-[clamp(2.6rem,6.5vw,6.5rem)]" data-reveal>
          Four rules I never break.
        </h2>
        <ul className="mt-16 border-b border-ink/20 md:mt-24">
          {RULES.map(([n, t, d]) => (
            <li key={n} data-reveal tabIndex={0} className="row-sweep grid cursor-default gap-4 border-t border-ink/20 px-2 py-8 md:grid-cols-[6rem_1fr_24rem] md:items-center md:gap-10 md:px-6 md:py-12">
              <span className="label opacity-70">{n}</span>
              <h3 className="display text-[clamp(1.8rem,3.8vw,3.8rem)]">{t}</h3>
              <p className="row-desc text-base leading-relaxed text-mute">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
