"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const testimonials = [
  { index: 0, featured: false },
  { index: 1, featured: true },
  { index: 2, featured: false },
  { index: 3, featured: false },
  { index: 4, featured: false },
  { index: 5, featured: false },
  { index: 6, featured: false },
];

const Stars = ({ featured }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${featured ? "fill-ink/70" : "fill-accent"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

function TestimonialCard({ item, t }) {
  return (
    <div
      className={`testimonial-card flex-shrink-0 w-[260px] xs:w-[290px] sm:w-[320px] md:w-[380px] flex flex-col p-5 sm:p-7 rounded-2xl border ${
        item.featured
          ? "bg-accent border-accent/50 shadow-[0_0_40px_rgba(var(--color-accent-rgb,161,217,117),0.18)]"
          : "bg-white/5 border-white/10 hover:border-accent/30 hover:bg-white/8"
      } transition-all duration-500 cursor-default select-none`}
    >
      <div
        className={`font-display text-6xl leading-none mb-3 ${
          item.featured ? "text-ink/10" : "text-white/8"
        }`}
      >
        "
      </div>

      <Stars featured={item.featured} />

      <p
        className={`text-sm leading-relaxed mb-6 flex-1 ${
          item.featured ? "text-ink/80" : "text-white/70"
        }`}
      >
        "{t(`items.${item.index}.quote`)}"
      </p>

      <div
        className={`flex items-center gap-3 pt-4 border-t ${
          item.featured ? "border-ink/15" : "border-white/10"
        }`}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
            item.featured ? "bg-ink/15 text-ink" : "bg-accent/20 text-accent"
          }`}
        >
          {t(`items.${item.index}.initial`)}
        </div>
        <div>
          <p
            className={`text-sm font-bold leading-tight ${
              item.featured ? "text-ink" : "text-paper"
            }`}
          >
            {t(`items.${item.index}.name`)}
          </p>
          <p className={`text-xs mt-0.5 ${item.featured ? "text-ink/50" : "text-muted"}`}>
            {t(`items.${item.index}.role`)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const trackWrapRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const marqueeRef = useRef({ tween1: null, tween2: null, paused: false });

  // ─── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header: staggered perspective-tilt + fade-up
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: false,
          once: true,
        },
      });

      headerTl
        .fromTo(
          labelRef.current,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          headingRef.current,
          { y: 50, opacity: 0, rotateX: 8 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );

      // Marquee track wrapper: fade + scale in
      gsap.fromTo(
        trackWrapRef.current,
        { opacity: 0, scale: 0.97, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trackWrapRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ─── Marquee animation ────────────────────────────────────────────────────
  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardW = (isMobile ? 290 : 380) + 20; // responsive card width + gap
    const totalCards = testimonials.length;
    const fullWidth = cardW * totalCards;

    // Row 1: scroll left
    const tween1 = gsap.to(track1, {
      x: `-=${fullWidth}`,
      duration: totalCards * 5,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % fullWidth),
      },
    });

    // Row 2: scroll right (starts offset so rows differ)
    gsap.set(track2, { x: -(fullWidth / 2) });
    const tween2 = gsap.to(track2, {
      x: `+=${fullWidth}`,
      duration: totalCards * 5,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % fullWidth),
      },
    });

    marqueeRef.current = { tween1, tween2, paused: false };

    return () => {
      tween1.kill();
      tween2.kill();
    };
  }, []);

  const pauseMarquee = () => {
    const { tween1, tween2, paused } = marqueeRef.current;
    if (!paused) {
      tween1?.pause();
      tween2?.pause();
      marqueeRef.current.paused = true;
    }
  };

  const resumeMarquee = () => {
    const { tween1, tween2, paused } = marqueeRef.current;
    if (paused) {
      // Small delay before resume on touch so users can finish reading
      setTimeout(() => {
        tween1?.resume();
        tween2?.resume();
        marqueeRef.current.paused = false;
      }, 600);
    }
  };

  // doubled arrays for seamless loop
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} id="testimonials" className="py-12 md:py-28 bg-dark overflow-hidden">
      {/* Header */}
      <div className="px-6 text-center mb-12 md:mb-16">
        <div className="overflow-hidden mb-4">
          <p
            ref={labelRef}
            className="section-label"
            style={{ opacity: 0, transform: "translateY(110%)" }}
          >
            {t("label")}
          </p>
        </div>
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2.5rem,7vw,5rem)] text-paper uppercase tracking-tight leading-none rtl:leading-snug rtl:pb-2 mb-4"
          style={{ opacity: 0, transformOrigin: "center bottom" }}
        >
          {t("title")}
        </h2>
        <p ref={subtitleRef} className="text-sm text-muted max-w-sm mx-auto" style={{ opacity: 0 }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Marquee tracks */}
      <div
        ref={trackWrapRef}
        className="relative"
        style={{ opacity: 0 }}
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        onTouchStart={pauseMarquee}
        onTouchEnd={resumeMarquee}
      >
        {/* Edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-56 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--color-dark, #0a0a0a) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-56 z-10"
          style={{
            background: "linear-gradient(to left, var(--color-dark, #0a0a0a) 0%, transparent 100%)",
          }}
        />

        {/* Row 1 — left */}
        <div className="overflow-hidden mb-4">
          <div ref={track1Ref} className="flex gap-5 w-max will-change-transform">
            {row1.map((item, i) => (
              <TestimonialCard key={`r1-${i}`} item={item} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="overflow-hidden">
          <div ref={track2Ref} className="flex gap-5 w-max will-change-transform">
            {row2.map((item, i) => (
              <TestimonialCard key={`r2-${i}`} item={item} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
