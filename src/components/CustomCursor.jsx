"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out" });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 1.4, borderColor: "#ffffff", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.3, background: "#ffffff", duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "#ffffff", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, background: "#ffffff", duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);

    const refresh = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    refresh();
    const t = setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
