"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (href?.startsWith("#") && href.length > 1) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          setMobileMenuOpen(false)
        }
      }
    }

    const handleScroll = () => setScrolled(window.scrollY > 20)

    document.addEventListener("click", handleAnchorClick)
    window.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center">
              <span className="text-green-vivid font-black text-lg tracking-tighter">T</span>
            </div>
            <span className="text-xl font-black text-navy tracking-tight">Tiranek</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="nav-link text-sm font-medium text-navy/70 hover:text-navy transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="nav-link text-sm font-medium text-navy/70 hover:text-navy transition-colors"
            >
              How it Works
            </a>
            <Link
              href="/contact"
              className="nav-link text-sm font-medium text-navy/70 hover:text-navy transition-colors"
            >
              Contact
            </Link>
            {/* <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold text-navy hover:text-green-dark transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-green-dark transition-all duration-300"
              >
                Get Started
              </Link>
            </div> */}
          </div>

          <button
            className="md:hidden text-navy p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-5 space-y-4">
            <a
              href="#features"
              className="block text-sm font-medium text-navy/70 hover:text-navy transition-colors py-1"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-sm font-medium text-navy/70 hover:text-navy transition-colors py-1"
            >
              How it Works
            </a>
            <Link
              href="/contact"
              className="block text-sm font-medium text-navy/70 hover:text-navy transition-colors py-1"
            >
              Contact
            </Link>
            {/* <Link
              href="/login"
              className="block text-sm font-medium text-navy/70 hover:text-navy transition-colors py-1"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="block w-full px-5 py-3 text-center bg-navy text-white text-sm font-semibold rounded-xl hover:bg-green-dark transition-all"
            >
              Get Started
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  )
}
