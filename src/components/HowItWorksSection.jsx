"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

const steps = [
  {
    num: "01",
    title: "WhatsApp Initiation",
    desc: "Message the field directly from WhatsApp to get started instantly.",
  },
  {
    num: "02",
    title: "Tiranek Assistant",
    desc: "Our bot guides you through city, field, and time slot selection.",
  },
  {
    num: "03",
    title: "Confirm & Pay",
    desc: "Receive a clear invoice and pay securely in seconds.",
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const stepRefs = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subRef.current, start: "top 88%" },
        }
      )

      gsap.fromTo(
        stepRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: stepRefs.current[0],
            start: "top 85%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="how-it-works" className="bg-dark py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="overflow-hidden mb-4">
            <p ref={labelRef} className="section-label" style={{ opacity: 0, transform: "translateY(100%)" }}>
              How it Works
            </p>
          </div>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-paper uppercase tracking-tight leading-none mb-5"
            style={{ opacity: 0 }}
          >
            Three Simple Steps
          </h2>
          <p ref={subRef} className="text-sm text-muted max-w-sm mx-auto" style={{ opacity: 0 }}>
            From WhatsApp message to confirmed booking in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el }}
              className="bg-dark p-10 flex flex-col gap-6 group hover:bg-white/[0.03] transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <span
                className="font-display text-[5rem] leading-none font-bold select-none"
                style={{ color: "#1e1e1e", WebkitTextStroke: "1px #3bf07330", transition: "color 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.WebkitTextStroke = "1px #3bf073" }}
                onMouseLeave={(e) => { e.currentTarget.style.WebkitTextStroke = "1px #3bf07330" }}
              >
                {step.num}
              </span>

              <div>
                <h3 className="font-display text-xl text-paper uppercase tracking-wide mb-3 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-auto h-px bg-white/5 group-hover:bg-accent/30 transition-colors duration-300" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
