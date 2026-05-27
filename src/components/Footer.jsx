"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
]

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com/tiranekapp", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com/tiranekapp", label: "Facebook" },
  { icon: Mail, href: "mailto:contact@tiranek.com", label: "Email" },
  { icon: LinkedinIcon, href: "https://linkedin.com/tiranekapp", label: "LinkedIn" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const footerRef = useRef(null);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
    });

    tl.fromTo(
      bannerRef.current,
      { clipPath: "inset(8% 4% round 12px)", scale: 1.06 },
      { clipPath: "inset(0% 0% round 0px)", scale: 1, duration: 1.1, ease: "power3.out" }
    ).fromTo(
      contentRef.current.querySelectorAll(".footer-reveal"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="overflow-hidden bg-dark">
      <div ref={bannerRef} className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 36vw, 480px)" }}>
        <img
          src="/images/footer-banner.png"
          alt="Tiranek pitch action"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.55) saturate(1.15)" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 30%, rgba(17,17,17,0.55) 70%, #111111 100%), linear-gradient(to right, rgba(59,240,115,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10 md:px-16 md:pb-14 max-w-7xl mx-auto left-0 right-0">
          <p
            className="footer-reveal text-xs font-bold tracking-[0.22em] uppercase mb-2"
            style={{ color: "#3bf073" }}
          >
            {t("bannerLabel") || "Book Your Pitch"}
          </p>
          <h2
            className="footer-reveal font-display text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
          >
            {t("bannerHeading") || "Where Every Game Begins"}
          </h2>
          <div className="footer-reveal mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group"
              style={{
                background: "#3bf073",
                color: "#0d0d0d",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#3bf073"; }}
            >
              {t("contact") || "Get in Touch"}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="relative bg-dark overflow-hidden">
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-0"
        >
          <span
            className="font-display leading-none tracking-tight whitespace-nowrap"
            style={{ fontSize: "18vw", color: "rgba(255,255,255,0.03)" }}
          >
            TIRANEK
          </span>
        </div>

        <div style={{ height: "2px", background: "linear-gradient(to right, #3bf073, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 pb-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2 md:col-span-2 footer-reveal">
              <img
                src="/images/web-logo-extd-no-bg.png"
                alt="Tiranek"
                className="h-10 w-auto object-contain mb-4"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "#888", maxWidth: "26ch" }}>
                {t("subtitle")}
              </p>

              <div className="flex items-center gap-3 mt-6">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "#888" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3bf073";
                      e.currentTarget.style.color = "#3bf073";
                      e.currentTarget.style.background = "rgba(59,240,115,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "#888";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-reveal">
              <h4
                className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#3bf073" }}
              >
                Pages
              </h4>
              <ul className="space-y-3">
                {pages.slice(0, 4).map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="nav-link text-sm transition-colors duration-200"
                      style={{ color: "#888" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal">
              <h4
                className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#3bf073" }}
              >
                {t("legal")}
              </h4>
              <ul className="space-y-3">
                {pages.slice(4).map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="nav-link text-sm transition-colors duration-200"
                      style={{ color: "#888" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal">
              <h4
                className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#3bf073" }}
              >
                Status
              </h4>
              <div className="flex items-center gap-2">
                <p className="text-sm" style={{ color: "#888" }}>
                  {t("systems")}
                </p>
              </div>
            </div>
          </div>

          <div
            className="footer-reveal flex flex-col sm:flex-row justify-between items-center gap-3 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("copyright")}
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              Built with passion for the game.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
