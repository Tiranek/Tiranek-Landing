"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import ShadesBackground from "./ShadesBackground";

const AVATAR_COLORS = ["#3bf073", "#0d0d0d", "#1a7a35", "#5adb88"];

export default function HeroSection() {
  const t = useTranslations("Hero");
  const [islandActive, setIslandActive] = useState(false);
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const wordsRef = useRef([]);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      wordsRef.current,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.2, stagger: 0.08, ease: "expo.out" }
    );
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
      "-=0.9"
    );
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
      "-=0.8"
    );

    gsap.to(watermarkRef.current, {
      y: "-15vh",
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.fromTo(
      previewRef.current,
      { y: 140, scale: 0.94, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: previewRef.current,
          start: "top 90%",
          end: "top 25%",
          scrub: 1.2,
        },
      }
    );

    gsap.fromTo(
      ".mobile-preview-animate",
      { x: 100, y: 160, rotate: 10, scale: 0.85, opacity: 0 },
      {
        x: 0,
        y: 0,
        rotate: -2,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: previewRef.current,
          start: "top 80%",
          end: "center 30%",
          scrub: 1.5,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const titleWords = [t("titleWord1"), t("titleWord2")];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-16 pb-10 md:pt-24 md:pb-20 px-4 sm:px-6 overflow-hidden"
    >
      <ShadesBackground />

      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-display text-[18vw] text-ink/[0.035] whitespace-nowrap leading-none rtl:leading-snug rtl:pb-4 tracking-tight">
          {t("watermark") || "BOOK YOUR PITCH"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center pt-12 sm:pt-16 md:pt-24">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 md:mb-8">
            {titleWords.map((word, i) => (
              <span key={i} className="word-wrapper block md:inline-block mr-[0.15em]">
                <span
                  ref={(el) => {
                    wordsRef.current[i] = el;
                  }}
                  className="word-inner font-display text-[clamp(3.5rem,11vw,9.5rem)] text-ink leading-[0.92] rtl:leading-snug rtl:pb-2 tracking-tight uppercase"
                  style={{ opacity: 0, transform: "translateY(110%)" }}
                >
                  {i === titleWords.length - 1 ? (
                    <>
                      <span>{t("titleWord2")}</span>
                      <span className="text-accent">{t("titleWord3")}</span>
                    </>
                  ) : (
                    word
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-muted leading-relaxed mb-6 md:mb-10 max-w-md mx-auto opacity-0"
          >
            {t("subtitle")}
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-10 md:mb-20 opacity-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-ink text-paper text-sm font-semibold rounded-full hover:bg-accent hover:text-ink transition-all duration-300 group w-full sm:w-auto justify-center"
            >
              {t("contactBtn")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["Y", "K", "S", "A"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-paper flex items-center justify-center text-xs font-bold"
                    style={{
                      background: AVATAR_COLORS[i],
                      color: i === 1 ? "#f4f3ef" : "#0d0d0d",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="text-ink font-bold">10K+</span> {t("players")}
              </p>
            </div>
          </div>
        </div>

        <div ref={previewRef} className="relative opacity-0">
          <div className="hidden md:flex items-end gap-0">
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full rounded-[16px] p-[2.5px] bg-gradient-to-tr from-[#9ca3af] via-[#f3f4f6] to-[#6b7280] shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-white/5">
                <div className="relative rounded-[14px] p-3.5 bg-[#0a0a0a] shadow-[inset_0_0_12px_rgba(0,0,0,0.9)]">
                  <div className="relative rounded-[6px] overflow-hidden bg-white border border-[#2d2d2d] flex flex-col shadow-inner">
                    <div className="bg-[#1c1c1e] px-4 py-2 flex items-center justify-between border-b border-white/[0.06] select-none">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E] opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F] opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                      <div className="flex items-center gap-2 bg-[#2c2c2e] rounded-md px-6 py-0.5 border border-white/[0.05] max-w-xs w-full justify-center shadow-sm">
                        <Shield size={9} className="text-[#3bf073]" />
                        <span className="text-[9px] text-white/70 tracking-wide font-sans font-medium">
                          {t("dashboardPreview")}
                        </span>
                      </div>
                      <div className="w-12" />
                    </div>
                    <div className="relative bg-paper">
                      <Image
                        src="/images/preview/dashboard-preview.png"
                        alt="Tiranek dashboard preview"
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        priority
                      />
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
                          mixBlendMode: "overlay",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-center -mt-[3px] select-none pointer-events-none z-0">
                <div
                  className="w-14 h-16 relative shadow-inner"
                  style={{
                    background:
                      "linear-gradient(90deg, #d1d5db 0%, #f3f4f6 30%, #e5e7eb 50%, #d1d5db 70%, #9ca3af 100%)",
                  }}
                >
                  <div
                    className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-7 rounded-full flex items-center justify-center p-[1px]"
                    style={{
                      background: "linear-gradient(180deg, #9ca3af 0%, #f3f4f6 100%)",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#111112] to-[#242426] shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] border border-black/30" />
                  </div>
                </div>

                <div
                  className="w-32 h-[4px] relative rounded-t-sm"
                  style={{
                    background:
                      "linear-gradient(90deg, #b8bbc2 0%, #e5e7eb 15%, #f3f4f6 50%, #d1d5db 85%, #9ca3af 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 0.5px 0 rgba(255,255,255,0.5)",
                  }}
                />
                <div className="w-36 h-1.5 bg-black/10 blur-[2px] rounded-full -mt-[0.5px] opacity-70" />
              </div>
            </div>

            <div
              className="mobile-preview-animate relative flex-shrink-0 w-[160px] sm:w-[190px] md:w-[220px] lg:w-[250px] z-20 -ml-10 sm:-ml-12 md:-ml-16 lg:-ml-20 opacity-0 group/phone transition-all duration-300 animate-fade-up"
              onMouseEnter={() => setIslandActive(true)}
              onMouseLeave={() => setIslandActive(false)}
            >
              <div
                className="relative rounded-[1.2rem] p-[3px] ring-[1px] ring-white/10"
                style={{
                  background:
                    "linear-gradient(135deg, #2d2438 0%, #584b6b 25%, #181320 50%, #584b6b 75%, #2d2438 100%)",
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -1px 2px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  className="relative rounded-[1rem] p-[3px] bg-[#09070c]"
                  style={{
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.95)",
                  }}
                >
                  <div className="relative rounded-[0.8rem] overflow-hidden bg-black ring-[2px] ring-[#070608]">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-[1.5px] bg-[#1c1a20] rounded-full z-40 border-[0.5px] border-white/5 opacity-80" />

                    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-2.5 pb-1 pointer-events-none select-none">
                      <span className="text-white text-[9px] font-semibold tracking-tight leading-none">
                        9:41
                      </span>

                      <div className="flex items-center gap-1">
                        <div className="flex gap-[1px] items-end h-1.5">
                          <div className="w-[1.5px] h-[2.5px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[3.5px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[4.5px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[5.5px] bg-white rounded-[0.5px] opacity-40" />
                        </div>
                        <span className="text-white text-[7px] font-bold tracking-tighter leading-none">
                          5G
                        </span>
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164a.517.517 0 0 0 .668-.049z" />
                          <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.577 1.336c.205.132.48.108.652-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.187 0-2.302.318-3.266.872-.285.166-.322.524-.1.75a.518.518 0 0 0 .736.002A5.474 5.474 0 0 1 8 10c1.077 0 2.074.31 2.91.84a.518.518 0 0 0 .736-.002zM9.02 12.43a.5.5 0 0 0-.02-.75A3.5 3.5 0 0 0 8 11a3.5 3.5 0 0 0-.99.16.5.5 0 0 0-.02.75.52.52 0 0 0 .736 0c.071-.072.164-.13.266-.17A1.5 1.5 0 0 1 8 12c.319 0 .614.1.84.26a.52.52 0 0 0 .736 0z" />
                        </svg>
                        <div className="w-4.5 h-2 border border-white/80 rounded-[3px] p-[1px] flex items-center relative">
                          <div className="h-full w-[90%] bg-white rounded-[1.5px]" />
                          <div className="absolute -right-[1.5px] top-1/2 -translate-y-1/2 w-[1px] h-[2.5px] bg-white rounded-r-[0.5px]" />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-black rounded-full transition-all duration-500 flex items-center justify-between pointer-events-none select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${
                        islandActive ? "w-[88%] h-7 px-3.5" : "w-20 h-4.5 px-2"
                      }`}
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                    >
                      {islandActive ? (
                        <div className="w-full flex items-center justify-between animate-fade-up px-0.5">
                          <div className="flex items-center gap-1">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3bf073] opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3bf073]" />
                            </span>
                            <span className="text-[7.5px] font-bold text-[#3bf073] tracking-wider uppercase font-sans">
                              {t("liveMatch")}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[7.5px] text-white/90 font-semibold font-sans">
                            <span>{t("arena")}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                            <span className="text-[#3bf073] font-mono font-bold">19:00</span>
                          </div>

                          <div className="flex gap-[1px] items-center h-2">
                            <div className="w-[1px] h-1.5 bg-[#3bf073] rounded-full animate-pulse" />
                            <div
                              className="w-[1px] h-2.5 bg-[#3bf073] rounded-full animate-pulse"
                              style={{ animationDelay: "0.15s" }}
                            />
                            <div
                              className="w-[1px] h-1 bg-[#3bf073] rounded-full animate-pulse"
                              style={{ animationDelay: "0.3s" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-center justify-between opacity-50 px-0.5">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#0d1430] to-[#122b5e] border border-white/10 shadow-inner relative overflow-hidden">
                            <div className="absolute top-0.5 left-0.5 w-[1px] h-[1px] bg-white/50 rounded-full" />
                          </div>
                          <div className="w-1 h-1 rounded-full bg-[#0a0a0b]" />
                          <div className="w-2 h-1 rounded-full bg-white/[0.04]" />
                        </div>
                      )}
                    </div>

                    <div className="relative bg-black select-none pointer-events-none">
                      <Image
                        src="/images/preview/mobile.jpeg"
                        alt="Tiranek mobile app preview"
                        width={390}
                        height={844}
                        className="w-full h-auto object-contain block"
                      />
                    </div>

                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.05) 100%)",
                        mixBlendMode: "overlay",
                      }}
                    />

                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-[3px] bg-white/60 rounded-full z-20 shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>
              </div>

              <div
                className="absolute left-[-2px] top-[16%] w-[2px] h-4 rounded-l-[1.5px] z-10 transition-transform duration-300 group-hover/phone:scale-y-110"
                style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }}
              />
              <div
                className="absolute left-[-2px] top-[24%] w-[2px] h-8 rounded-l-[1.5px] z-10 transition-transform duration-300 group-hover/phone:scale-y-105"
                style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }}
              />
              <div
                className="absolute left-[-2px] top-[34%] w-[2px] h-8 rounded-l-[1.5px] z-10 transition-transform duration-300 group-hover/phone:scale-y-105"
                style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }}
              />
              <div
                className="absolute right-[-2px] top-[28%] w-[2px] h-12 rounded-r-[1.5px] z-10 transition-transform duration-300 group-hover/phone:scale-y-105"
                style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }}
              />

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-accent/25 rounded-full blur-2xl pointer-events-none -z-10 mix-blend-screen opacity-70 group-hover/phone:bg-accent/40 group-hover/phone:scale-110 transition-all duration-500" />
            </div>
          </div>

          <div className="flex md:hidden items-end w-full relative pb-6">
            {/* Browser card — takes most of the width */}
            <div className="flex-1 min-w-0 rounded-2xl p-[2px] bg-gradient-to-tr from-[#9ca3af] via-[#f3f4f6] to-[#6b7280] shadow-[0_24px_64px_rgba(0,0,0,0.22)] border border-white/5">
              <div className="rounded-[18px] p-2 bg-[#0a0a0a]">
                {/* Fake browser bar */}
                <div className="bg-[#1c1c1e] rounded-t-[8px] px-3 py-1.5 flex items-center justify-between border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56] opacity-90" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E] opacity-90" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F] opacity-90" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#2c2c2e] rounded px-3 py-0.5 border border-white/[0.05] flex-1 mx-3 justify-center">
                    <Shield size={8} className="text-[#3bf073]" />
                    <span className="text-[8px] text-white/60 tracking-wide font-sans font-medium">
                      {t("dashboardPreview")}
                    </span>
                  </div>
                  <div className="w-10" />
                </div>
                <div className="rounded-b-[8px] overflow-hidden bg-paper">
                  <Image
                    src="/images/preview/dashboard-preview.png"
                    alt="Tiranek dashboard preview"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain block"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Phone mockup — floats over the trailing edge of the browser card */}
            <div
              className="relative flex-shrink-0 w-[110px] xs:w-[130px] z-20 -ml-8 xs:-ml-10 group/phone"
            >
              {/* Outer shell */}
              <div
                className="relative rounded-[1.1rem] p-[3px] ring-[1px] ring-white/10"
                style={{
                  background:
                    "linear-gradient(135deg, #2d2438 0%, #584b6b 25%, #181320 50%, #584b6b 75%, #2d2438 100%)",
                  boxShadow:
                    "inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -1px 2px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  className="relative rounded-[0.9rem] p-[3px] bg-[#09070c]"
                  style={{
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.95)",
                  }}
                >
                  <div className="relative rounded-[0.7rem] overflow-hidden bg-black ring-[2px] ring-[#070608]">
                    {/* Swipe bar */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-[1.5px] bg-[#1c1a20] rounded-full z-40 border-[0.5px] border-white/5 opacity-80" />

                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-2 pb-0.5 pointer-events-none select-none">
                      <span className="text-white text-[7px] font-semibold tracking-tight leading-none">9:41</span>
                      <div className="flex items-center gap-0.5">
                        <div className="flex gap-[1px] items-end h-1.5">
                          <div className="w-[1.5px] h-[2px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[3px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[4px] bg-white rounded-[0.5px]" />
                          <div className="w-[1.5px] h-[5px] bg-white rounded-[0.5px] opacity-40" />
                        </div>
                        <span className="text-white text-[6px] font-bold tracking-tighter leading-none ml-0.5">5G</span>
                        <div className="w-3.5 h-1.5 border border-white/80 rounded-[2px] p-[1px] flex items-center relative ml-0.5">
                          <div className="h-full w-[90%] bg-white rounded-[1px]" />
                          <div className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[1px] h-[2px] bg-white rounded-r-[0.5px]" />
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-black rounded-full w-14 h-3.5 pointer-events-none select-none shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />

                    {/* Screen image */}
                    <div className="relative bg-black select-none pointer-events-none">
                      <Image
                        src="/images/preview/mobile.jpeg"
                        alt="Tiranek mobile app preview"
                        width={390}
                        height={844}
                        className="w-full h-auto object-contain block"
                      />
                    </div>

                    {/* Glass sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.04) 100%)",
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* Home indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[35%] h-[2.5px] bg-white/60 rounded-full z-20" />
                  </div>
                </div>
              </div>

              {/* Side buttons */}
              <div className="absolute left-[-2px] top-[16%] w-[2px] h-3 rounded-l-[1.5px] z-10" style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }} />
              <div className="absolute left-[-2px] top-[24%] w-[2px] h-6 rounded-l-[1.5px] z-10" style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }} />
              <div className="absolute left-[-2px] top-[34%] w-[2px] h-6 rounded-l-[1.5px] z-10" style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }} />
              <div className="absolute right-[-2px] top-[28%] w-[2px] h-9 rounded-r-[1.5px] z-10" style={{ background: "linear-gradient(180deg, #584b6b, #181320)" }} />

              {/* Glow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-accent/25 rounded-full blur-2xl pointer-events-none -z-10 mix-blend-screen opacity-70" />
            </div>

            {/* Bottom ambient glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-accent/15 rounded-full blur-2xl pointer-events-none" />
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-ink/15 rounded-[100%] blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
