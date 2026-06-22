"use client";

import { useTranslations } from "next-intl";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const t = useTranslations("AboutUs");

  return (
    <div className="min-h-screen bg-cream">
      <GrainOverlay />
      <CustomCursor />
      <Navbar />

      <main>
        <section className="relative pt-32 px-6 overflow-hidden">
          <div
            className="absolute -top-20 -right-32 w-[640px] h-[640px] opacity-[0.035] pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(45deg, #0d0d0d 0, #0d0d0d 2px, transparent 2px, transparent 18px)",
            }}
          />

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
              <h1 className="font-display text-[clamp(5rem,18vw,13rem)] leading-[0.88] text-navy tracking-tight">
                {t("title1")}
                <br />
                <span className="shimmer-text">{t("title2")}</span>
              </h1>
              <div className="flex items-center justify-center gap-4 bg-navy rounded-md p-8">
                <p className="max-w-4xl text-2xl md:text-2xl text-green font-display tracking-[0.5em]">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl md:text-3xl font-display text-navy mb-6 relative z-10">{t("storyTitle")}</h3>
              <p className="text-navy/70 leading-relaxed relative z-10">{t("storyText")}</p>
            </div>
            <div className="p-8 md:p-12 rounded-3xl bg-white border border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl md:text-3xl font-display text-navy mb-6 relative z-10">{t("missionTitle")}</h3>
              <p className="text-navy/70 leading-relaxed relative z-10">{t("missionText")}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-display text-navy mb-6">{t("whatWeDoTitle")}</h2>
              <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto">{t("whatWeDoText")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-navy rounded-3xl p-8 md:p-12 text-paper relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{ backgroundImage: "radial-gradient(#f4f3ef 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                />
                <div className="w-12 h-12 flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-display mb-4">{t("whatWeDoManagersTitle")}</h3>
                <p className="text-paper/70 leading-relaxed text-lg">{t("whatWeDoManagersText")}</p>
              </div>
              <div className="bg-green rounded-3xl p-8 md:p-12 text-navy relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500 shadow-[0_0_60px_rgba(59,240,115,0.08)]">
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500"
                  style={{ backgroundImage: "radial-gradient(#0d0d0d 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                />
                <div className="w-12 h-12 flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-display mb-4">{t("whatWeDoPlayersTitle")}</h3>
                <p className="text-navy/80 leading-relaxed font-medium text-lg">{t("whatWeDoPlayersText")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-navy mb-10">
          <div className="w-full">
            <div className="max-w-6xl mx-auto rounded-3xl p-8 md:p-16 lg:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(59,240,115,0.15),transparent_50%)] pointer-events-none" />

              <p className="text-lg font-display text-green uppercase tracking-[0.22em] mb-8 relative z-10">
                {t("visionTitle")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-paper leading-tight relative z-10 max-w-4xl mx-auto">
                &ldquo;{t("visionText")}&rdquo;
              </h2>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
            <h3 className="font-display text-4xl md:text-6xl text-navy">{t("teamTitle")}</h3>
            <p className="text-navy/60 font-medium text-lg">{t("teamText")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
