"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Mail } from "lucide-react"

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)

const FacebookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
)

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
)

export default function Footer() {
  const t = useTranslations('Footer')
  const footerRef = useRef(null)
  const wordmarkRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="bg-paper border-t border-border py-14 px-6 overflow-hidden relative">
      <div
        ref={wordmarkRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden opacity-0"
      >
        <span className="font-display text-[18vw] text-ink/[0.04] leading-none rtl:leading-snug tracking-tight whitespace-nowrap">
          TIRANEK
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center mb-4">
              <img src="/images/web-logo-extd-no-bg.png" alt="Tiranek" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-[18ch]">
              {t('subtitle')}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase tracking-[0.18em] mb-4">{t('legal')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('contact'), href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="nav-link text-sm text-muted hover:text-ink transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase tracking-[0.18em] mb-4">{t('socials')}</h4>
            <div className="flex items-center gap-4">
              {[
                { icon: InstagramIcon, href: "https://instagram.com/tiranekapp" },
                { icon: FacebookIcon, href: "https://facebook.com/tiranekapp" },
                { icon: Mail, href: "mailto:contact@tiranek.com" },
                { icon: LinkedinIcon, href: "https://linkedin.com/tiranekapp" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">{t('copyright')}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-xs text-muted">{t('systems')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
