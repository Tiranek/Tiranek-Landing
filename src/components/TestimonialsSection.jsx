"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

const testimonials = [
  {
    quote: "Tiranek completely changed how our team organizes matches. What used to take hours of calling around now takes 2 minutes on WhatsApp.",
    name: "Badr C.",
    role: "Amateur Team Captain",
    initial: "B",
  },
  {
    quote: "As a field owner, I've seen a 40% increase in bookings since joining Tiranek. The automated WhatsApp booking is a game-changer for my business.",
    name: "Karim A.",
    role: "Sports Complex Manager",
    initial: "K",
    featured: true,
  },
  {
    quote: "The real-time availability feature saves so much time. I can find an open pitch on Friday night instantly, without the usual hassle.",
    name: "Sara B.",
    role: "Football Enthusiast",
    initial: "S",
  },
]

const Stars = () => (
  <div className="flex gap-1 mb-5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 fill-accent" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

export default function TestimonialsSection() {
  const t = useTranslations('Testimonials')
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      labelRef.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%", opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
      }
    )

    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    )

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="py-12 md:py-28 px-6 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="overflow-hidden mb-4">
            <p ref={labelRef} className="section-label" style={{ opacity: 0, transform: "translateY(100%)" }}>
              {t('label')}
            </p>
          </div>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] text-paper uppercase tracking-tight leading-none rtl:leading-snug rtl:pb-2 mb-4"
            style={{ opacity: 0 }}
          >
            {t('title')}
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t_item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`flex flex-col p-8 rounded-xl border ${t_item.featured
                ? "bg-accent border-accent/50"
                : "bg-white/5 border-white/10 hover:border-white/20"
                } transition-all duration-300`}
              style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            >
              <div className={`font-display text-7xl leading-none rtl:leading-snug mb-4 ${t_item.featured ? "text-ink/15" : "text-white/10"}`}>
                "
              </div>

              <Stars />

              <p className={`text-sm leading-relaxed mb-6 flex-1 ${t_item.featured ? "text-ink/80" : "text-white/70"}`}>
                "{t(`items.${i}.quote`)}"
              </p>

              <div className={`flex items-center gap-3 pt-5 border-t ${t_item.featured ? "border-ink/15" : "border-white/10"}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${t_item.featured ? "bg-ink/10 text-ink" : "bg-white/10 text-paper"
                  }`}>
                  {t(`items.${i}.initial`)}
                </div>
                <div>
                  <p className={`text-sm font-bold ${t_item.featured ? "text-ink" : "text-paper"}`}>{t(`items.${i}.name`)}</p>
                  <p className={`text-xs ${t_item.featured ? "text-ink/50" : "text-muted"}`}>{t(`items.${i}.role`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
