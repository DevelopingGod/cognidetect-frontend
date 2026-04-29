"use client";

import { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

interface ConsentStepProps {
  language: LangCode;
  onAgree: () => void;
  onBack: () => void;
}

const points = [
  {
    icon: CheckCircle2,
    color: "text-brand-purple",
    title: "Purpose",
    body: "This application is a research prototype designed to screen for potential cognitive disorder patterns using Artificial Intelligence.",
  },
  {
    icon: AlertTriangle,
    color: "text-amber-400",
    title: "Not a Diagnostic Tool",
    body: "Results are probabilistic indicators only. They do NOT constitute a medical diagnosis. Only a qualified psychiatrist can provide a formal diagnosis.",
  },
  {
    icon: ShieldAlert,
    color: "text-emerald-400",
    title: "Data Privacy",
    body: "Audio files are automatically deleted after processing. No personally identifiable information is stored permanently.",
  },
  {
    icon: AlertTriangle,
    color: "text-red-400",
    title: "Emergency Clause",
    body: "If you are experiencing suicidal thoughts or a mental health crisis, do NOT use this tool. Contact emergency services immediately.",
  },
];

export default function ConsentStep({ language, onAgree, onBack }: ConsentStepProps) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);

  function handleProceed() {
    if (!agreed) {
      setError(true);
      return;
    }
    onAgree();
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-purple/30">
          <ShieldAlert size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2">{t("consentTitle", language)}</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Please read carefully before proceeding.
        </p>
      </div>

      <div className="card mb-6 space-y-5">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className={`mt-0.5 shrink-0 ${p.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="font-semibold mb-1">{p.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {p.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer mb-6 group">
        <div
          onClick={() => { setAgreed((v) => !v); setError(false); }}
          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            agreed
              ? "bg-brand-purple border-brand-purple"
              : error
              ? "border-red-500"
              : "border-[var(--border)] group-hover:border-brand-purple/60"
          }`}
        >
          {agreed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`text-sm leading-relaxed ${error ? "text-red-400" : ""}`}>
          {t("agree", language)}
        </span>
      </label>
      {error && (
        <p className="text-red-400 text-xs mb-4">You must agree before proceeding.</p>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ArrowLeft size={16} />
          {t("backToHome", language)}
        </button>
        <button onClick={handleProceed} className="btn-primary flex-1 flex items-center justify-center gap-2">
          {t("iAgree", language)}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
