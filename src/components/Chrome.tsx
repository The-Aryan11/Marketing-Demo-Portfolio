import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, lenis } from "../lib/scroll";

export function Chrome() {
  const bar = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState("Prologue");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (s) => {
          if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
          setSolid(s.scroll() > window.innerHeight * 0.6);
        },
      }),
    );
    gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((el) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (s) => s.isActive && setChapter(el.dataset.chapter || ""),
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#contact", { duration: 2.4 });
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
        <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-10 ${
          solid ? "bg-canvas/85 backdrop-blur-md" : ""
        }`}
      >
        <a href="#top" className="display text-2xl" aria-label="Amara Voss">
          A<span className="text-accent">.</span>V
        </a>
        <p className="label hidden text-mute md:block" aria-live="polite">
          <span className="mr-3 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
          {chapter}
        </p>
        <a
          href="#contact"
          onClick={go}
          className="btn-pill bg-ink text-canvas hover:bg-accent"
        >
          Let’s talk
        </a>
      </header>
    </>
  );
}
