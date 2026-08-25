"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { LANGS, translations, type Lang } from "@/lib/i18n"

type IconProps = { className?: string }

function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6 9.6l-4.7-1.5c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.7 4.8-1.3A9.9 9.9 0 1 0 12 2zm0 1.8a8.1 8.1 0 0 1 6.9 12.3l-.3.5.8 2.8-2.9-.8-.5.3A8.1 8.1 0 1 1 12 3.8zm-3 3.6c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4 0-.2 0-.3-.1-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4z" />
    </svg>
  )
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

const socials = [
  { name: "Telegram", href: "https://t.me/almarispro", Icon: TelegramIcon },
  { name: "WhatsApp", href: "https://wa.me/34603361813", Icon: WhatsAppIcon },
  { name: "Email", href: "mailto:info@almaris.pro", Icon: MailIcon },
]

const WEB3FORMS_ACCESS_KEY = "088a8a41-b215-4ac2-b899-61a3b2de93cc"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ComingSoon() {
  const [lang, setLang] = useState<Lang>("en")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "invalid" | "submitting" | "success" | "error">("idle")
  const t = translations[lang]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus("invalid")
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          email,
          subject: "ALMARIS — new launch notification signup",
          from_name: "ALMARIS Coming Soon",
          language: lang,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-12">
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,var(--background))]" />
      </div>

      {/* Language switcher */}
      <nav
        aria-label="Language"
        className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-border bg-card/40 p-1 backdrop-blur-sm"
      >
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
              lang === code
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex w-full max-w-xl flex-col items-center text-center">
        {/* Logo */}
        <Image
          src="/images/almaris-logo.svg"
          alt="ALMARIS — private household and errands"
          width={500}
          height={200}
          priority
          className="h-auto w-72 sm:w-96"
        />
        <h1 className="sr-only">ALMARIS</h1>

        {/* Translated tagline */}
        <p className="mt-6 font-sans text-sm tracking-[0.28em] text-muted-foreground uppercase">
          {t.tagline}
        </p>

        {/* Eyebrow */}
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t.eyebrow}
        </span>

        {/* Heading */}
        <h2 className="mt-6 text-balance font-serif text-4xl font-medium leading-tight text-foreground sm:text-5xl">
          {t.heading}
        </h2>

        {/* Body */}
        <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-muted-foreground">
          {t.body}
        </p>

        {/* Email form / success panel */}
        <div className="mt-9 w-full max-w-md">
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center gap-3 rounded-md border border-accent/40 bg-accent/10 px-5 py-4 text-center"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <p className="font-sans text-sm font-medium text-foreground">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  disabled={status === "submitting"}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  placeholder={t.emailPlaceholder}
                  className="h-12 flex-1 rounded-md border border-border bg-input/60 px-4 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12 shrink-0 rounded-md bg-accent px-6 font-sans text-sm font-semibold tracking-wide text-accent-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-60"
                >
                  {status === "submitting" ? t.submitting : t.button}
                </button>
              </div>

              <div className="mt-3 min-h-5 text-sm" role="status" aria-live="polite">
                {status === "invalid" && (
                  <p className="font-sans text-destructive">{t.invalid}</p>
                )}
                {status === "error" && (
                  <p className="font-sans text-destructive">{t.error}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Socials */}
        <div className="mt-10 flex items-center gap-3">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 font-sans text-xs tracking-wide text-muted-foreground/60">
          © {new Date().getFullYear()} ALMARIS. {t.rights}
        </p>
      </div>
    </main>
  )
}
