"use client"

import CustomCursor from "@/components/CustomCursor"
import Footer from "@/components/Footer"
import GrainOverlay from "@/components/GrainOverlay"
import Navbar from "@/components/Navbar"
import { useTranslations } from "next-intl"
import { useState } from "react"

const ContactInfo = ({ icon, label, value, href }) => (
  <a
    href={href || "#"}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className="flex items-start gap-4 group"
  >
    <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green/20 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-white uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-medium text-white group-hover:text-green transition-colors">{value}</p>
    </div>
  </a>
)

export default function ContactPage() {
  const t = useTranslations('Contact')
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || t('errorDefault'))
        setStatus("error")
        return
      }

      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      setErrorMsg(t('errorNetwork'))
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <GrainOverlay />
      <CustomCursor />
      <Navbar />

      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-green-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-green-light border border-green-mid rounded-full px-4 py-1.5 text-xs font-semibold text-green mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
            {t('help')}
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-navy mb-5 animate-fade-up-delay-1">
            {t('title1')}
            <span className="shimmer-text">{t('title2')}</span>
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed animate-fade-up-delay-2">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6 animate-fade-up-delay-2">
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h2 className="font-display text-2xl mb-2">{t('infoTitle')}</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {t('infoDesc')}
              </p>

              <div className="space-y-6">
                <ContactInfo
                  href="mailto:contact@tiranek.ma"
                  label={t('emailLabel')}
                  value="contact@tiranek.ma"
                  icon={
                    <svg className="w-5 h-5 text-green-vivid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
              </div>

              <div className="mt-12 dot-grid opacity-20 rounded-xl h-24" />
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-navy uppercase tracking-widest">{t('quickAnswers')}</h3>
              {[
                { q: t('q1'), a: t('a1') },
                { q: t('q2'), a: t('a2') },
                { q: t('q3'), a: t('a3') },
              ].map(({ q, a }) => (
                <div key={q} className="border-t border-border pt-4 first:border-0 first:pt-0">
                  <p className="text-sm font-semibold text-navy mb-1">{q}</p>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 animate-fade-up-delay-3">
            <div className="bg-white border border-border rounded-2xl p-8 md:p-10 shadow-sm">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mb-5 animate-scale-in">
                    <svg className="w-8 h-8 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl text-navy mb-3">{t('successTitle')}</h2>
                  <p className="text-muted text-sm leading-relaxed max-w-sm mb-8">
                    {t('successDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-green-dark transition-all duration-300 cursor-pointer"
                  >
                    {t('sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl text-navy mb-1">{t('formTitle')}</h2>
                  <p className="text-sm text-muted mb-8">{t('formRequired')}</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                          {t('nameLabel')}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder={t('namePlaceholder')}
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cream border border-border rounded-xl text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                          {t('emailLabel2')}
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder={t('emailPlaceholder')}
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cream border border-border rounded-xl text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                        {t('subjectLabel')}
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder={t('subjectPlaceholder')}
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream border border-border rounded-xl text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-navy uppercase tracking-widest mb-2">
                        {t('messageLabel')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder={t('messagePlaceholder')}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream border border-border rounded-xl text-sm text-navy placeholder:text-muted/60 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-red-600">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 bg-navy text-white text-sm font-bold rounded-xl hover:bg-green-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t('btnLoading')}
                        </>
                      ) : (
                        <>
                          {t('btnSubmit')}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
