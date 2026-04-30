"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Type, ChevronRight, Loader2, CheckCircle, Volume2, Brain, ArrowRight } from "lucide-react";
import type { LangCode, NLPQuestion, NLPResult } from "@/lib/types";
import { t } from "@/lib/translations";
import { analyzeNLP } from "@/lib/api";
import AudioRecorder from "@/components/screening/AudioRecorder";

const MIN_LENGTH = 50;

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
  const [showSummary, setShowSummary] = useState(false);
  const speakingRef = useRef(false);

  const total = questions.length;
  const currentQ = questions[index];
  const isLast = index + 1 >= total;
  const progress = total > 0 ? (index / total) * 100 : 0;

  // Auto-read question when index changes
  useEffect(() => {
    if (!showSummary && currentQ?.text) {
      speakQuestion(currentQ.text);
    }
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, showSummary]);

  function speakQuestion(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    speakingRef.current = true;
    utterance.onend = () => { speakingRef.current = false; };
    window.speechSynthesis.speak(utterance);
  }

  async function handleNext() {
    if (answerText.trim().length < MIN_LENGTH) {
      setError(`Please provide a more detailed answer (at least ${MIN_LENGTH} characters).`);
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

      if (isLast) {
        // All questions answered — show summary screen
        setResults(newResults);
        setProbsList(newProbsList);
        setShowSummary(true);
      } else {
        // Silently collect result and advance to next question
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

  // ── End-of-interview summary screen ──────────────────────────────────────
  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md shadow-brand-purple/20">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-black text-xl">Interview Complete</h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {total} response{total !== 1 ? "s" : ""} recorded &mdash; ready to generate your report
            </p>
          </div>
        </div>

        {/* Full progress bar */}
        <div className="progress-bar-track mb-6">
          <div className="progress-bar-fill" style={{ width: "100%" }} />
        </div>

        {/* All Q&A recap */}
        <div className="space-y-3 mb-5">
          {results.map((r, i) => {
            const conf = Math.round(r.confidence * 100);
            const isOk = r.diagnosis === "No Significant Risk" || r.confidence < 0.5;
            return (
              <div key={i} className="card border-brand-purple/20">
                {/* Question + badge row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-brand-purple/15 text-brand-purple text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold leading-snug" style={{ color: "var(--text-muted)" }}>
                      {r.q}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                      isOk
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {r.diagnosis} &middot; {conf}%
                  </span>
                </div>
                {/* Answer */}
                <p className="text-sm italic leading-relaxed ml-7" style={{ color: "var(--text-muted)" }}>
                  &ldquo;{r.a}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-center mb-5" style={{ color: "var(--text-muted)" }}>
          These are intermediate signals &mdash; the final report combines all responses through the Meta-Fusion engine.
        </p>

        <button
          onClick={() => onComplete(results, probsList)}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Brain size={16} />
          Generate Final Report
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // ── Main question view ────────────────────────────────────────────────────
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
        {/* Dot indicators */}
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

      {/* Question card */}
      <div className="card mb-3 border-brand-purple/30">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-brand-purple/20 text-white text-xs font-bold">
            AI
          </div>
          <div className="flex-1">
            <p className="text-base font-medium leading-relaxed pt-1">{currentQ?.text}</p>
          </div>
          <button
            onClick={() => speakQuestion(currentQ?.text ?? "")}
            className="shrink-0 mt-0.5 p-1.5 rounded-lg btn-ghost opacity-60 hover:opacity-100"
            title="Read question aloud"
            aria-label="Read question aloud"
          >
            <Volume2 size={15} />
          </button>
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
          <AudioRecorder language={language} onTranscription={handleTranscription} />
        </div>
      )}

      {/* Text area */}
      <textarea
        className="input resize-none mb-1"
        rows={4}
        placeholder={t("typeAnswer", language)}
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />

      {/* Character counter */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-red-400">{error}</span>
        <span
          className={`text-xs font-mono ml-auto ${
            answerText.trim().length >= MIN_LENGTH ? "text-emerald-400" : ""
          }`}
          style={answerText.trim().length < MIN_LENGTH ? { color: "var(--text-muted)" } : {}}
        >
          {answerText.trim().length}/{MIN_LENGTH}
        </span>
      </div>

      {/* Submit button */}
      <button
        onClick={handleNext}
        disabled={analyzing || answerText.trim().length < MIN_LENGTH}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {analyzing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t("analyzing", language)}
          </>
        ) : isLast ? (
          <>
            <CheckCircle size={16} />
            View Final Results
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
