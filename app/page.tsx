"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import ConditionCards from "@/components/landing/ConditionCards";
import HowItWorks from "@/components/landing/HowItWorks";
import PipelineSection from "@/components/landing/PipelineSection";
import ResearchSection from "@/components/landing/ResearchSection";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

export default function LandingPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />

      <main className="pt-16">
        <Hero language={language} />
        <ConditionCards />
        <HowItWorks />
        <PipelineSection />
        <ResearchSection />

        {/* Final CTA section */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="badge-purple mx-auto mb-6">Ready to begin?</div>
            <h2 className="text-4xl font-black mb-4">
              Take the <span className="gradient-text">Free Screening</span>
            </h2>
            <p className="mb-8 text-lg" style={{ color: "var(--text-muted)" }}>
              Complete anonymously in 10–15 minutes. Supports English, Hindi,
              Marathi, German, and Mandarin Chinese.
            </p>
            <Link href="/screen" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
              {t("startScreening", language)}
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-10 px-4"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-bold text-lg gradient-text mb-1">CogniDetect</div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                AI-Powered Psychiatric Screening · INSECT-2026
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm" style={{ color: "var(--text-muted)" }}>
              <Link href="/terms" className="hover:text-brand-purple transition-colors">
                {t("termsLink", language)}
              </Link>
              <Link href="/privacy" className="hover:text-brand-purple transition-colors">
                {t("privacyLink", language)}
              </Link>
              <a
                href="https://www.linkedin.com/in/sankalp-indish/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-purple transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              © 2026 Sankalp Indish & Team · Not a medical device
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
