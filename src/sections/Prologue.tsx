import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

const TEXT =
  "Marketing is not a megaphone. It is the quiet art of making people feel a brand was made for them — and then proving it in revenue, quarter after quarter.";
const ACCENT = new Set(["megaphone.", "made", "revenue,"]);

export default function Prologue() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".word", {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=1500", scrub: true, pin: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-chapter="Prologue" className="flex min-h-[100svh] items-center bg-canvas px-5 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-8 text-accent">Prologue</p>
        <p className="display text-[clamp(2rem,5.6vw,5.6rem)] leading-[1.06]">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className={`word inline-block pr-[0.25em] ${ACCENT.has(w) ? "italic text-accent" : ""}`}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
