"use client"

import { gsap } from "gsap"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export default function PageTransition() {
  const pathname = usePathname()
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    gsap.set(overlay, {
      display: "flex",
      pointerEvents: "auto",
      y: "0%",
      opacity: 1,
    })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none", display: "none" })
      },
    })

    tl.to(overlay, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.15,
    })

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#0d0d0d] z-[99999] flex flex-col items-center justify-center select-none pointer-events-none"
      style={{ display: "none" }}
    >
      <div className="flex flex-col items-center">
        <span className="font-display text-5xl tracking-[0.2em] text-[#3bf073] animate-pulse">
          TIRANEK
        </span>
        <div className="w-24 h-[2px] bg-[#3bf073]/20 mt-5 overflow-hidden rounded-full relative">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#3bf073] rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  )
}
