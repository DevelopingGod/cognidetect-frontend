"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landing/Hero";
import ConditionCards from "@/components/landing/ConditionCards";
import HowItWorks from "@/components/landing/HowItWorks";
import ResearchSection from "@/components/landing/ResearchSection";
import Footer from "@/components/Footer";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

export default function LandingPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />

      <main className="pt-16 page-enter">
        <Hero language={language} />
        <ConditionCards />
        <HowItWorks />
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

      <Footer />
    </>
  );
}
