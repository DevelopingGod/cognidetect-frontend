"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, ClipboardList } from "lucide-react";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";
import { translateTexts } from "@/lib/api";

const SCORE_OPTIONS = [
  { value: 0, key: "never" as const },
  { value: 1, key: "rarely" as const },
  { value: 2, key: "sometimes" as const },
  { value: 3, key: "often" as const },
  { value: 4, key: "veryOften" as const },
];

interface QuestionnaireStepProps {
  language: LangCode;
  questions: string[];
  onComplete: (responses: number[]) => void;
  isAnalyzing: boolean;
}

export default function QuestionnaireStep({
  language,
  questions,
  onComplete,
  isAnalyzing,
}: QuestionnaireStepProps) {
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [translatedQ, setTranslatedQ] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [lastTranslatedIdx, setLastTranslatedIdx] = useState(-1);

  const total = questions.length;
  const progress = total > 0 ? (index / total) * 100 : 0;

  // Translate current question on demand
  async function ensureTranslated(idx: number) {
    if (language === "en" || idx === lastTranslatedIdx) return;
    setTranslating(true);
    try {
      const [trans] = await translateTexts([questions[idx]], language);
      setTranslatedQ(trans);
      setLastTranslatedIdx(idx);
    } catch {
      setTranslatedQ(questions[idx]);
    } finally {
      setTranslating(false);
    }
  }

  const questionText =
    language !== "en" && translatedQ && lastTranslatedIdx === index
      ? translatedQ
      : questions[index] ?? "";

  // Trigger translation when index changes or language changes
  if (language !== "en" && lastTranslatedIdx !== index && !translating) {
    ensureTranslated(index);
  }

  function handleNext() {
    if (selected === null) return;
    const newResponses = [...responses, selected];

    if (index + 1 >= total) {
      onComplete(newResponses);
    } else {
      setResponses(newResponses);
      setSelected(null);
      setIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (index === 0) return;
    const prev = responses.slice(0, -1);
    setResponses(prev);
    setSelected(null);
    setIndex((i) => i - 1);
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-purple/15 flex items-center justify-center">
          <ClipboardList size={20} className="text-brand-purple" />
        </div>
        <div>
          <h2 className="font-black text-xl">{t("questionnaire", language)}</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {t("questionOf", language, { current: index + 1, total })}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar-track mb-8">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div className="card mb-6 min-h-[120px]">
        {translating ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <Loader2 size={16} className="animate-spin" />
            <span>{t("loading", language)}</span>
          </div>
        ) : (
          <p className="text-lg font-medium leading-relaxed">{questionText}</p>
        )}
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-8">
        {SCORE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all text-center ${
              selected === opt.value
                ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/30"
                : "border-[var(--border)] hover:border-brand-purple/50 hover:bg-brand-purple/10"
            }`}
          >
            {t(opt.key, language)}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handleBack}
          disabled={index === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
          {t("back", language)}
        </button>
        <button
          onClick={handleNext}
          disabled={selected === null || isAnalyzing}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t("analyzing", language)}
            </>
          ) : index + 1 >= total ? (
            <>
              {t("analyzeResults", language)}
              <ChevronRight size={18} />
            </>
          ) : (
            <>
              {t("next", language)}
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
