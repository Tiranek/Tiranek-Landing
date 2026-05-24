"use client"

import { gsap } from "gsap"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const links = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const isContactPage = pathname === "/contact"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        const timer = setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: "smooth" })
          }
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname])

  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return
    if (mobileOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, scale: 0.95, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
      )
      gsap.fromTo(
        menu.querySelectorAll(".mobile-link"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power3.out", delay: 0.08 }
      )
    }
  }, [mobileOpen])

  const handleLinkClick = (e, href) => {
    const hashIndex = href.indexOf("#")
    if (hashIndex !== -1) {
      const hash = href.substring(hashIndex)
      if (pathname === "/") {
        e.preventDefault()
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
          window.history.pushState(null, "", hash)
        }
        setMobileOpen(false)
      }
    }
  }

  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.history.pushState(null, "", "/")
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled
          ? "top-4 w-[92%] max-w-5xl rounded-full bg-[#0d0d0d]/85 backdrop-blur-xl border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.35)] py-2 px-6"
          : "top-0 w-full bg-transparent border-b border-transparent py-6 px-6 lg:px-8"
          }`}
      >
        <div className="flex justify-between items-center h-12 w-full">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${scrolled ? "bg-accent scale-100 group-hover:rotate-12" : "bg-ink group-hover:rotate-12"
              }`}>
              <span className={`font-display text-lg font-bold leading-none select-none transition-colors duration-500 ${scrolled ? "text-ink" : "text-paper"
                }`}>T</span>
            </div>
            <span
              className={`font-display text-xl tracking-wider transition-colors duration-500 font-bold select-none ${scrolled ? "text-paper" : "text-ink"
                }`}
            >
              TIRANEK
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {!isContactPage && links.map(({ label, href }) => {
              const cls = `relative px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${scrolled
                ? "text-paper/70 hover:text-paper"
                : "text-ink/60 hover:text-ink"
                } group/item`

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className={cls}
                >
                  {label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-300 group-hover/item:w-[60%]`} />
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 shadow-sm active:scale-95 ${scrolled
                ? "bg-accent text-ink hover:bg-paper hover:text-[#0d0d0d] shadow-[0_4px_14px_rgba(59,240,115,0.25)]"
                : "bg-ink text-paper hover:bg-accent hover:text-ink"
                }`}
            >
              Book Now
            </Link>
          </div>

          {!isContactPage && (
            <button
              className={`md:hidden flex items-center justify-center p-2 rounded-full transition-all duration-300 ${scrolled
                ? "text-paper hover:bg-white/10"
                : "text-ink hover:bg-ink/5"
                }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center relative gap-1.5">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-1" : ""
                  }`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-1" : ""
                  }`} />
              </div>
            </button>
          )}
        </div>
      </nav>

      {mobileOpen && !isContactPage && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-x-4 top-20 z-40 bg-[#0d0d0d]/90 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 flex flex-col gap-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col gap-4">
            {links.map(({ label, href }) => {
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => {
                    handleLinkClick(e, href)
                    setMobileOpen(false)
                  }}
                  className="mobile-link py-2 font-display text-2xl text-paper/80 hover:text-accent transition-colors tracking-wide uppercase border-b border-white/5"
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mobile-link w-full py-4 bg-accent hover:bg-paper text-ink hover:text-ink text-center font-bold rounded-full transition-colors uppercase tracking-wider text-sm mt-2 shadow-[0_4px_14px_rgba(59,240,115,0.2)]"
          >
            Book Now
          </Link>
        </div>
      )}
    </>
  )
}
