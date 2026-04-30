"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

interface HeroProps {
  language: LangCode;
}

export default function Hero({ language }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(102,126,234,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102,126,234,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-sm font-medium mb-8 animate-fade-in">
          <Zap size={14} />
          <span>DSM-5 Aligned · NLP + ML · Multi-Stream AI</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-slide-up">
          <span className="gradient-text">AI-Powered</span>
          <br />
          <span>Psychiatric Screening</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ color: "var(--text-muted)" }}
        >
          CogniDetectAI fuses structured questionnaires with real-time speech
          analysis to screen for{" "}
          <span className="text-brand-purple font-semibold">
            ADHD, Depression, Anxiety, Autism,
          </span>{" "}
          and{" "}
          <span className="text-brand-purple font-semibold">SPCD</span> — in
          five languages.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <Link href="/screen" className="btn-primary flex items-center gap-2 text-base">
            {t("startScreening", language)}
            <ArrowRight size={18} />
          </Link>
          <a href="#how-it-works" className="btn-secondary text-base">
            {t("learnMore", language)}
          </a>
        </div>

        {/* Disclaimer pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm animate-fade-in"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <ShieldCheck size={15} className="text-brand-purple shrink-0" />
          <span>{t("disclaimer", language)}</span>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { value: "5", label: "Conditions Screened" },
            { value: "27", label: "DSM-5 Questions" },
            { value: "4", label: "AI Guardrail Layers" },
            { value: "5", label: "Languages" },
          ].map((stat) => (
            <div key={stat.label} className="card text-center py-4">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
