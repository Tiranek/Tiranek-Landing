"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function CtaSection() {
  const t = useTranslations("Cta");
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const contentRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "center center",
        scrub: 1.2,
      },
    });

    const chars = watermarkRef.current?.querySelectorAll(".wm-char") || [];

    tl.fromTo(
      chars,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.05, ease: "power1.out" }
    ).fromTo(
      contentRef.current,
      { y: 50, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, ease: "power1.out" },
      "<0.2"
    );

    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;

      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * 0.35;
        gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      }
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      btn?.removeEventListener("mouseleave", onLeave);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const watermarkText = t("watermark");

  return (
    <section ref={sectionRef} className="relative py-16 md:py-36 px-6 bg-ink overflow-hidden">
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display text-[15vw] text-paper/[0.04] whitespace-nowrap leading-none rtl:leading-snug rtl:pb-4 tracking-tight flex">
          {watermarkText.split("").map((char, i) => (
            <span key={i} className="wm-char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>

      <div
        ref={contentRef}
        className="max-w-3xl mx-auto text-center relative z-10"
        style={{ opacity: 0 }}
      >
        <p className="section-label mb-4 md:mb-6">{t("label")}</p>

        <h2 className="font-display text-[clamp(3rem,9vw,7rem)] text-paper uppercase tracking-tight leading-none rtl:leading-snug rtl:pb-2 mb-4 md:mb-6">
          {t("title")}
        </h2>

        <p className="text-base text-muted mb-8 md:mb-12 max-w-sm mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div ref={btnRef} className="inline-block">
          <Link
            href="/contact"
            className="btn-magnetic inline-flex items-center gap-3 px-10 py-5 bg-accent text-ink text-sm font-bold rounded-full hover:bg-paper transition-colors duration-300 group"
          >
            {t("btn")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
