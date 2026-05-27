"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Book your sports field in seconds with our intelligent booking system",
    num: "01",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Get insights into your booking patterns and field usage statistics",
    num: "02",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "Check field availability instantly and get notified of cancellations",
    num: "03",
  },
  {
    icon: MapPin,
    title: "Location Finder",
    description: "Discover and book sports fields near you with integrated maps",
    num: "04",
  },
];

export default function FeaturesSection() {
  const t = useTranslations("Features");
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingWordsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 20%",
        scrub: 1.2,
      },
    });

    tl.fromTo(
      labelRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, ease: "power1.out" }
    )
      .fromTo(
        headingWordsRef.current,
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.15, ease: "power1.out" },
        "<0.1"
      )
      .fromTo(
        cardsRef.current,
        { y: 60, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.15, ease: "power1.out" },
        "<0.2"
      );

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-12 md:py-28 px-6 bg-paper overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="overflow-hidden mb-4">
              <p
                ref={labelRef}
                className="section-label"
                style={{ opacity: 0, transform: "translateY(100%)" }}
              >
                {t("label")}
              </p>
            </div>

            <h2 className="font-display leading-none rtl:leading-snug rtl:pb-2 tracking-tight">
              {[t("title1"), t("title2")].map((word, i) => (
                <span key={i} className="word-wrapper block">
                  <span
                    ref={(el) => {
                      headingWordsRef.current[i] = el;
                    }}
                    className="word-inner text-[clamp(3rem,8vw,6.5rem)] text-ink uppercase"
                    style={{ opacity: 0, transform: "translateY(105%)" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <p className="text-sm text-muted max-w-xs leading-relaxed md:text-right">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="feature-card group p-7 bg-surface rounded-xl border border-border hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] cursor-default relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div className="absolute left-0 top-0 w-0.5 h-0 bg-accent group-hover:h-full transition-all duration-500 ease-out" />

              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-ink group-hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-300">
                  <f.icon
                    className="w-4.5 h-4.5 text-paper group-hover:text-ink transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <span className="font-display text-5xl text-ink/8 group-hover:text-accent/15 transition-colors duration-500 leading-none rtl:leading-snug">
                  {f.num}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-ink mb-2">{t(`items.${f.num}.title`)}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(`items.${f.num}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
