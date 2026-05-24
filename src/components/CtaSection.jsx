"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function CtaSection() {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const contentRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      watermarkRef.current?.querySelectorAll(".wm-char"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    )

    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    )

    const btn = btnRef.current
    if (!btn) return

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120

      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * 0.35
        gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.4, ease: "power2.out" })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" })
      }
    }

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" })
    }

    window.addEventListener("mousemove", onMove)
    btn.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      btn?.removeEventListener("mouseleave", onLeave)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const watermarkText = "GET STARTED"

  return (
    <section
      ref={sectionRef}
      className="relative py-36 px-6 bg-ink overflow-hidden"
    >
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-display text-[15vw] text-paper/[0.04] whitespace-nowrap leading-none tracking-tight flex">
          {watermarkText.split("").map((char, i) => (
            <span key={i} className="wm-char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10" style={{ opacity: 0 }}>
        <p className="section-label mb-6">Get Started Today</p>

        <h2 className="font-display text-[clamp(3rem,9vw,7rem)] text-paper uppercase tracking-tight leading-none mb-6">
          Ready to Get Started?
        </h2>

        <p className="text-base text-muted mb-12 max-w-sm mx-auto leading-relaxed">
          Join thousands of sports enthusiasts booking their perfect game time
        </p>

        <div ref={btnRef} className="inline-block">
          <Link
            href="/contact"
            className="btn-magnetic inline-flex items-center gap-3 px-10 py-5 bg-accent text-ink text-sm font-bold rounded-full hover:bg-paper transition-colors duration-300 group"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
