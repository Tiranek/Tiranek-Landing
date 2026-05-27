"use client";

import { useTranslations } from "next-intl";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import { Link } from "@/i18n/routing";

const tiers = [
  { label: "Starter", price: "??", lines: [4, 3, 3] },
  { label: "Pro", price: "??", lines: [4, 4, 3], featured: true },
  { label: "Enterprise", price: "??", lines: [4, 3, 4] },
];

function GhostLine({ w = "full" }) {
  return <div className={`h-2.5 rounded-full bg-current opacity-10 w-${w}`} />;
}

function GhostCard({ label, price, lines, featured }) {
  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col gap-5 select-none overflow-hidden
        ${featured
          ? "bg-navy text-paper border-2 border-green/30 shadow-[0_0_60px_rgba(59,240,115,0.08)]"
          : "bg-white border border-border text-navy"
        }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-[10px] font-bold text-green uppercase tracking-widest">
          Popular
        </div>
      )}

      <div
        className={`text-[10px] font-bold uppercase tracking-[0.22em] ${featured ? "text-green" : "text-muted"}`}
      >
        {label}
      </div>
      <div className="flex items-end gap-1.5">
        <span className="font-display text-5xl leading-none opacity-15">{price}</span>
        <span className="text-xs font-semibold opacity-20 mb-1">/mo</span>
      </div>

      <div className="flex flex-col gap-3 pt-2 border-t border-current/10">
        {lines.map((count, gi) => (
          <div key={gi} className="flex flex-col gap-1.5">
            {Array.from({ length: count }).map((_, li) => (
              <GhostLine key={li} w={li === 0 ? "full" : li % 2 === 0 ? "4/6" : "5/6"} />
            ))}
          </div>
        ))}
      </div>

      <div className={`mt-2 h-11 rounded-xl opacity-10 ${featured ? "bg-green" : "bg-navy"}`} />

      <div className="absolute inset-0 backdrop-blur-[3px] rounded-3xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center
          ${featured ? "bg-green/10 border border-green/20" : "bg-ink/5 border border-ink/10"}`}
        >
          <svg
            className={`w-4 h-4 ${featured ? "text-green" : "text-ink/40"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const t = useTranslations("Pricing");

  return (
    <div className="min-h-screen bg-cream">
      <GrainOverlay />
      <CustomCursor />
      <Navbar />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 border-t border-border" />
      </section>

      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((tier) => (
              <GhostCard key={tier.label} {...tier} />
            ))}
          </div>

          <p className="text-center text-xs text-muted/60 uppercase tracking-[0.2em] font-semibold mt-6">
            Plans are locked. Check back soon
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-navy rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#f4f3ef 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />

            <div>
              <p className="text-[10px] font-bold text-green uppercase tracking-[0.22em] mb-3">
                While you wait
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-paper leading-tight mb-4">
                {t("desc").split("—")[0].trim()}
              </h2>
              <p className="text-sm text-paper/50 leading-relaxed">{t("desc")}</p>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="flex items-center justify-between px-6 py-4 bg-green text-navy font-bold rounded-2xl hover:bg-paper transition-all duration-300 text-sm uppercase tracking-wide group active:scale-[0.98]"
              >
                <span>Get notified first</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <Link
                href="/"
                className="flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 text-paper/70 hover:text-paper rounded-2xl transition-all duration-300 text-sm font-semibold border border-white/10 group"
              >
                <span>Back to Home</span>
                <svg
                  className="w-4 h-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
