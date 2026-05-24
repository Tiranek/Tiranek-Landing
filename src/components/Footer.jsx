"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Footer() {
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
        <span className="font-display text-[18vw] text-ink/[0.04] leading-none tracking-tight whitespace-nowrap">
          TIRANEK
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
                <span className="font-display text-ink text-lg leading-none">T</span>
              </div>
              <span className="font-display text-xl tracking-wider text-ink">TIRANEK</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-[18ch]">
              Making sports field booking simple and accessible for everyone.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-ink uppercase tracking-[0.18em] mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="nav-link text-sm text-muted hover:text-ink transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">© 2026 Tiranek. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <p className="text-xs text-muted">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
