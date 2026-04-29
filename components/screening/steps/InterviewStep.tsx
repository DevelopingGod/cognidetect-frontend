"use client";

import { useState } from "react";
import { Mic, Type, ChevronRight, Loader2, CheckCircle } from "lucide-react";
import type { LangCode, NLPQuestion, NLPResult } from "@/lib/types";
import { t } from "@/lib/translations";
import { analyzeNLP } from "@/lib/api";
import AudioRecorder from "@/components/screening/AudioRecorder";

interface InterviewStepProps {
  language: LangCode;
  questions: NLPQuestion[];
  onComplete: (results: NLPResult[], probsList: number[][]) => void;
}

export default function InterviewStep({
  language,
  questions,
  onComplete,
}: InterviewStepProps) {
  const [index, setIndex] = useState(0);
  const [inputMode, setInputMode] = useState<"voice" | "text">("text");
  const [answerText, setAnswerText] = useState("");
  const [results, setResults] = useState<NLPResult[]>([]);
  const [probsList, setProbsList] = useState<number[][]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const total = questions.length;
  const progress = total > 0 ? (index / total) * 100 : 0;
  const currentQ = questions[index];

  async function handleNext() {
    if (answerText.trim().length < 3) {
      setError("Please provide a meaningful answer before proceeding.");
      return;
    }
    setError("");
    setAnalyzing(true);

    try {
      const res = await analyzeNLP(answerText, currentQ.cat);
      const newResult: NLPResult = {
        q: currentQ.text,
        a: answerText,
        analysis: res.analysis,
        diagnosis: res.diagnosis,
        confidence: res.confidence,
      };
      const newResults = [...results, newResult];
      const newProbsList = [...probsList, res.probs];

      if (index + 1 >= total) {
        onComplete(newResults, newProbsList);
      } else {
        setResults(newResults);
        setProbsList(newProbsList);
        setAnswerText("");
        setIndex((i) => i + 1);
      }
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function handleTranscription(text: string) {
    setAnswerText(text);
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-black text-xl">{t("interview", language)}</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {t("questionOf", language, { current: index + 1, total })}
          </p>
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i < index
                  ? "bg-emerald-400"
                  : i === index
                  ? "bg-brand-purple scale-125"
                  : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar-track mb-6">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <div className="card mb-5 border-brand-purple/30">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-brand-purple/20 text-white text-xs font-bold">
            AI
          </div>
          <p className="text-base font-medium leading-relaxed pt-1">{currentQ?.text}</p>
        </div>
      </div>

      {/* English note */}
      <div
        className="text-xs px-3 py-2 rounded-lg mb-5 border"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        {t("pleaseReplyEnglish", language)}
      </div>

      {/* Input mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setInputMode("voice")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
            inputMode === "voice"
              ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
              : "border-[var(--border)] hover:border-brand-purple/40"
          }`}
        >
          <Mic size={15} />
          {t("voiceRecorder", language)}
        </button>
        <button
          onClick={() => setInputMode("text")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
            inputMode === "text"
              ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
              : "border-[var(--border)] hover:border-brand-purple/40"
          }`}
        >
          <Type size={15} />
          {t("textInput", language)}
        </button>
      </div>

      {/* Voice recorder */}
      {inputMode === "voice" && (
        <div className="card mb-4">
          <AudioRecorder
            language={language}
            onTranscription={handleTranscription}
          />
        </div>
      )}

      {/* Text area — always visible for editing */}
      <textarea
        className="input resize-none mb-2"
        rows={4}
        placeholder={t("typeAnswer", language)}
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      <button
        onClick={handleNext}
        disabled={analyzing || answerText.trim().length < 3}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {analyzing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t("analyzing", language)}
          </>
        ) : index + 1 >= total ? (
          <>
            <CheckCircle size={16} />
            {t("generateAnalysis", language)}
          </>
        ) : (
          <>
            {t("nextQuestion", language)}
            <ChevronRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}
