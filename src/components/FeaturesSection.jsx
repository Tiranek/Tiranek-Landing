"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, MapPin, TrendingUp } from "lucide-react"
import { useEffect, useRef } from "react"

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
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingWordsRef = useRef([])
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      labelRef.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
      }
    )

    gsap.fromTo(
      headingWordsRef.current,
      { y: "105%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
      }
    )

    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%" },
      }
    )

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section id="features" className="md:py-28 py-4 px-6 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="overflow-hidden mb-4">
              <p
                ref={labelRef}
                className="section-label"
                style={{ opacity: 0, transform: "translateY(100%)" }}
              >
                Features
              </p>
            </div>

            <h2 className="font-display leading-none tracking-tight">
              {["Everything", "You Need"].map((word, i) => (
                <span key={i} className="word-wrapper block">
                  <span
                    ref={(el) => { headingWordsRef.current[i] = el }}
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
            Powerful features designed to make sports field booking seamless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="feature-card group p-7 bg-surface rounded-xl border border-border hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] cursor-default relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div className="absolute left-0 top-0 w-0.5 h-0 bg-accent group-hover:h-full transition-all duration-500 ease-out" />

              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-ink group-hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-300">
                  <f.icon className="w-4.5 h-4.5 text-paper group-hover:text-ink transition-colors duration-300" strokeWidth={1.75} />
                </div>
                <span className="font-display text-5xl text-ink/8 group-hover:text-accent/15 transition-colors duration-500 leading-none">
                  {f.num}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
