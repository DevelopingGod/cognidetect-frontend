"use client";

import { CheckCircle, Mic, BarChart3, ArrowRight } from "lucide-react";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

interface TransitionStepProps {
  language: LangCode;
  detected: string[];
  onStartInterview: () => void;
  onSkip: () => void;
}

export default function TransitionStep({
  language,
  detected,
  onStartInterview,
  onSkip,
}: TransitionStepProps) {
  const hasDetected = detected.length > 0;

  return (
    <div className="max-w-xl mx-auto animate-slide-up text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
        hasDetected
          ? "bg-amber-500/15 border-2 border-amber-500/30"
          : "bg-emerald-500/15 border-2 border-emerald-500/30"
      }`}>
        <CheckCircle size={36} className={hasDetected ? "text-amber-400" : "text-emerald-400"} />
      </div>

      <h2 className="text-2xl font-black mb-3">{t("questionnaireComplete", language)}</h2>

      {hasDetected ? (
        <div className="card border-amber-500/30 mb-8 text-left">
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            We noticed preliminary indicators that align with possibilities of:
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {detected.map((d) => (
              <span key={d} className="badge-warning">{d}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            This is a preliminary check only — not a diagnosis. Complete the AI
            interview below for higher accuracy and better context.
          </p>
        </div>
      ) : (
        <div className="card border-emerald-500/30 mb-8 text-left">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Based on your questionnaire, we didn&apos;t find significant risk
            indicators at this stage. You may still complete the AI interview
            for a thorough assessment.
          </p>
        </div>
      )}

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Would you like to perform the Deep-Dive AI Interview for higher accuracy?{" "}
        <span className="font-semibold text-brand-purple">(Recommended)</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStartInterview}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Mic size={18} />
          {t("yesStartInterview", language)}
        </button>
        <button
          onClick={onSkip}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <BarChart3 size={16} />
          {t("skipToResults", language)}
        </button>
      </div>
    </div>
  );
}
