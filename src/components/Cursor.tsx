import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ring.current!;
    el.style.opacity = "1";
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const hot = (e.target as HTMLElement)?.closest("a,button,[data-hot]");
      gsap.to(el, { scale: hot ? 2.4 : 1, duration: 0.35, overwrite: "auto" });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-white opacity-0 mix-blend-difference"
    />
  );
}
