"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Brain, Sun, Moon, Globe, Shield, Menu, X, ExternalLink } from "lucide-react";
import { LANGUAGES, type LangCode } from "@/lib/types";

interface NavbarProps {
  language: LangCode;
  onLanguageChange: (lang: LangCode) => void;
}

const NAV_LINKS = [
  { label: "Why CogniDetectAI", href: "/novelty" },
  { label: "Team", href: "/team" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo → home */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMenuOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-md group-hover:shadow-brand-purple/40 transition-shadow">
                <Brain className="w-4.5 h-4.5 text-white" size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight gradient-text">CogniDetectAI</span>
            </Link>

            {/* Desktop centre nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  className="px-3 py-1.5 rounded-lg text-sm btn-ghost font-medium whitespace-nowrap">
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1.5">
              {/* Language selector */}
              <div className="relative">
                <button onClick={() => { setLangOpen((v) => !v); setMenuOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg btn-ghost text-sm"
                  aria-label="Select language">
                  <Globe size={15} />
                  <span>{currentLang.flag}</span>
                  <span className="hidden sm:inline">{currentLang.label}</span>
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border shadow-xl z-20 overflow-hidden animate-fade-in"
                      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                      {LANGUAGES.map((lang) => (
                        <button key={lang.code}
                          onClick={() => { onLanguageChange(lang.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                            language === lang.code ? "text-brand-purple font-semibold" : "hover:bg-brand-purple/10"
                          }`}>
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {language === lang.code && <span className="ml-auto text-brand-purple">✓</span>}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme toggle */}
              {mounted && (
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg btn-ghost" aria-label="Toggle theme">
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                </button>
              )}

              {/* Admin — desktop only, subtle */}
              <Link href="/admin" className="hidden md:flex p-2 rounded-lg btn-ghost opacity-40 hover:opacity-100" aria-label="Admin">
                <Shield size={16} />
              </Link>

              {/* Hamburger — mobile only */}
              <button onClick={() => { setMenuOpen((v) => !v); setLangOpen(false); }}
                className="md:hidden p-2 rounded-lg btn-ghost" aria-label="Menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)} />

          {/* Menu panel */}
          <div className="fixed top-16 left-0 right-0 z-40 md:hidden border-b shadow-2xl animate-fade-in"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-brand-purple/10 hover:text-brand-purple"
                  style={{ color: "var(--text-muted)" }}>
                  {l.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px my-2" style={{ backgroundColor: "var(--border)" }} />

              {/* CTA */}
              <Link href="/screen" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 btn-primary w-full text-sm py-2.5">
                Start Screening →
              </Link>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/sankalp-indish/" target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-brand-purple/10 hover:text-brand-purple"
                style={{ color: "var(--text-muted)" }}>
                LinkedIn <ExternalLink size={13} />
              </a>

              {/* Admin */}
              <Link href="/admin" onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-brand-purple/10 opacity-50 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}>
                Admin Portal
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
