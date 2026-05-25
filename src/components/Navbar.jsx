"use client"

import { gsap } from "gsap"
import { ChevronDown, Globe } from "lucide-react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const links = [
  { labelKey: "features", href: "/#features" },
  { labelKey: "howItWorks", href: "/#how-it-works" },
  { labelKey: "testimonials", href: "/#testimonials" },
]

const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' }
]

export default function Navbar() {
  const t = useTranslations('Navbar')
  const locale = useLocale()
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

  const changeLocale = (nextLocale) => {
    router.replace(pathname, { locale: nextLocale })
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
          <Link href="/" onClick={handleLogoClick} className="flex items-center group">
            <img
              src="/images/logo-no-bg.png"
              alt="Tiranek"
              className={`h-12 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${!scrolled && pathname === '/' ? '' : ''}`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {!isContactPage && links.map(({ labelKey, href }) => {
              const label = t(labelKey)
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

          <div className="hidden md:flex items-center gap-4">
            <div className="relative group/lang">
              <button
                className={`flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${scrolled ? "text-accent hover:text-paper" : "text-ink hover:text-accent"
                  }`}
              >
                <Globe className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>{locale}</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover/lang:rotate-180" strokeWidth={2.5} />
              </button>

              <div className="absolute top-full right-0 mt-2 w-32 opacity-0 translate-y-2 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:pointer-events-auto transition-all duration-300 bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl flex flex-col p-1 z-50">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => changeLocale(loc.code)}
                    className={`text-left px-3 py-2 text-xs font-semibold tracking-wide rounded-lg transition-colors duration-200 ${locale === loc.code
                      ? "bg-accent/10 text-accent"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 shadow-sm active:scale-95 ${scrolled
                ? "bg-accent text-ink hover:bg-paper hover:text-[#0d0d0d] shadow-[0_4px_14px_rgba(59,240,115,0.25)]"
                : "bg-ink text-paper hover:bg-accent hover:text-ink"
                }`}
            >
              {t('bookNow')}
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
            {links.map(({ labelKey, href }) => {
              const label = t(labelKey)
              return (
                <Link
                  key={labelKey}
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

          <div className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 px-2 font-bold">Language</p>
            <div className="grid grid-cols-2 gap-2">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => {
                    changeLocale(loc.code)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${locale === loc.code
                    ? "bg-accent/10 border-accent/30 text-accent"
                    : "bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <span className="text-sm font-semibold">{loc.label}</span>
                  {locale === loc.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mobile-link w-full py-4 bg-accent hover:bg-paper text-ink hover:text-ink text-center font-bold rounded-full transition-colors uppercase tracking-wider text-sm mt-2 shadow-[0_4px_14px_rgba(59,240,115,0.2)]"
          >
            {t('bookNow')}
          </Link>
        </div>
      )}
    </>
  )
}
