"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Demographics,
  FinalResult,
  LangCode,
  NLPQuestion,
  NLPResult,
  ScreeningStep,
  SymptomSelections,
} from "@/lib/types";
import { INITIAL_SYMPTOM_SELECTIONS } from "@/lib/types";
import {
  fetchConfig,
  analyzeQuestionnaire,
  getNLPQuestions,
  runMetaFusion,
  saveSession,
} from "@/lib/api";
import type { AppConfig } from "@/lib/api";

import ConsentStep from "./steps/ConsentStep";
import DemographicsStep from "./steps/DemographicsStep";
import QuestionnaireStep from "./steps/QuestionnaireStep";
import TransitionStep from "./steps/TransitionStep";
import NLPSetupStep from "./steps/NLPSetupStep";
import InterviewStep from "./steps/InterviewStep";
import ResultsStep from "./steps/ResultsStep";

interface ScreeningFlowProps {
  language: LangCode;
}

const STEP_LABELS: Record<ScreeningStep, string> = {
  consent: "Consent",
  demographics: "Info",
  questionnaire: "Questions",
  transition: "Review",
  nlp_setup: "Symptoms",
  interview: "Interview",
  results: "Results",
};

const STEP_ORDER: ScreeningStep[] = [
  "consent", "demographics", "questionnaire", "transition",
  "nlp_setup", "interview", "results",
];

export default function ScreeningFlow({ language }: ScreeningFlowProps) {
  const [step, setStep] = useState<ScreeningStep>("consent");
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [demographics, setDemographics] = useState<Demographics | null>(null);
  const [rfAnswers, setRfAnswers] = useState<number[]>([]);
  const [rfProbs, setRfProbs] = useState<Record<string, number>>({});
  const [detected, setDetected] = useState<string[]>([]);
  const [nlpQuestions, setNLPQuestions] = useState<NLPQuestion[]>([]);
  const [nlpResults, setNLPResults] = useState<NLPResult[]>([]);
  const [nlpProbsList, setNLPProbsList] = useState<number[][]>([]);
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [symptomSelections, setSymptomSelections] = useState<SymptomSelections>(INITIAL_SYMPTOM_SELECTIONS);
  const [medHistory, setMedHistory] = useState<string[]>([]);
  const [analyzingQ, setAnalyzingQ] = useState(false);
  const [loadingNLPQ, setLoadingNLPQ] = useState(false);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch(() => setConfigError(true));
  }, []);

  const progressIndex = STEP_ORDER.indexOf(step);
  const progressPct = STEP_ORDER.length > 1
    ? (progressIndex / (STEP_ORDER.length - 1)) * 100
    : 0;

  // ── Step handlers ──────────────────────────────────────────────────────────

  async function handleQuestionnaireComplete(responses: number[]) {
    setRfAnswers(responses);
    setAnalyzingQ(true);
    try {
      const res = await analyzeQuestionnaire(responses);
      setRfProbs(res.rf_probs);
      setDetected(res.detected);
      setStep("transition");
    } catch {
      // Still proceed even if analysis fails
      setStep("transition");
    } finally {
      setAnalyzingQ(false);
    }
  }

  async function handleNLPSetupSubmit(
    selections: SymptomSelections,
    medHist: string[]
  ) {
    setSymptomSelections(selections);
    setMedHistory(medHist);
    setLoadingNLPQ(true);

    try {
      const flags = {
        s1: selections.S1.selected.length > 0,
        s2: selections.S2.selected.length > 0,
        s3: selections.S3.selected.length > 0,
        s4: selections.S4.selected.length > 0,
        s5: selections.S5.selected.length > 0,
      };
      const qs = await getNLPQuestions(flags, selections.custom || undefined);
      setNLPQuestions(qs);
      setStep("interview");
    } catch {
      setStep("interview");
    } finally {
      setLoadingNLPQ(false);
    }
  }

  async function handleInterviewComplete(
    results: NLPResult[],
    probsList: number[][]
  ) {
    setNLPResults(results);
    setNLPProbsList(probsList);
    await finalize(probsList, results);
  }

  async function handleSkipNLP() {
    await finalize([], []);
  }

  async function finalize(probsList: number[][], currentNlpResults: NLPResult[] = []) {
    try {
      const res = await runMetaFusion(rfProbs, probsList);
      setFinalResult(res);

      // Save session in background — use the directly passed results, not stale state
      if (demographics) {
        saveSession(
          demographics,
          rfAnswers,
          rfProbs,
          currentNlpResults.length ? currentNlpResults : null,
          res.diagnosis,
          symptomSelections
        ).catch(() => {});
      }
    } catch {
      // Fallback minimal result so user doesn't get stuck
      setFinalResult({
        diagnosis: "No Significant Risk",
        confidence: 0.5,
        severity: "None",
        suggestion: "Please consult a qualified mental health professional for a formal assessment.",
        all_probs: { ADHD: 0.01, Depression: 0.01, Anxiety: 0.01, Autism: 0.01 },
        method: "Fallback",
      });
    }
    setStep("results");
  }

  function reset() {
    setStep("consent");
    setDemographics(null);
    setRfAnswers([]);
    setRfProbs({});
    setDetected([]);
    setNLPQuestions([]);
    setNLPResults([]);
    setNLPProbsList([]);
    setFinalResult(null);
    setSymptomSelections(INITIAL_SYMPTOM_SELECTIONS);
    setMedHistory([]);
  }

  if (configError) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">Could not connect to the AI backend.</p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Please ensure the backend is running and{" "}
          <code className="text-brand-purple">NEXT_PUBLIC_API_URL</code> is configured.
        </p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-brand-purple/30 border-t-brand-purple animate-spin mx-auto mb-4" />
          <p style={{ color: "var(--text-muted)" }}>Initialising CogniDetectAI...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Top progress bar (only after consent) */}
      {step !== "consent" && step !== "results" && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {STEP_ORDER.filter((s) => s !== "consent").map((s, i) => {
              const idx = STEP_ORDER.indexOf(s);
              const current = STEP_ORDER.indexOf(step);
              return (
                <div
                  key={s}
                  className={`text-xs font-medium transition-colors ${
                    idx <= current ? "text-brand-purple" : ""
                  }`}
                  style={idx > current ? { color: "var(--text-muted)" } : {}}
                >
                  {STEP_LABELS[s]}
                </div>
              );
            })}
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      {/* Step renderer */}
      {step === "consent" && (
        <ConsentStep
          language={language}
          onAgree={() => setStep("demographics")}
          onBack={() => (window.location.href = "/")}
        />
      )}

      {step === "demographics" && (
        <DemographicsStep
          language={language}
          onSubmit={(data) => { setDemographics(data); setStep("questionnaire"); }}
        />
      )}

      {step === "questionnaire" && (
        <QuestionnaireStep
          language={language}
          questions={config.questions}
          onComplete={handleQuestionnaireComplete}
          isAnalyzing={analyzingQ}
        />
      )}

      {step === "transition" && (
        <TransitionStep
          language={language}
          detected={detected}
          onStartInterview={() => setStep("nlp_setup")}
          onSkip={handleSkipNLP}
        />
      )}

      {step === "nlp_setup" && (
        <NLPSetupStep
          language={language}
          symptomOptions={config.symptoms}
          onSubmit={handleNLPSetupSubmit}
          loading={loadingNLPQ}
        />
      )}

      {step === "interview" && (
        <InterviewStep
          language={language}
          questions={nlpQuestions}
          onComplete={handleInterviewComplete}
        />
      )}

      {step === "results" && finalResult && demographics && (
        <ResultsStep
          language={language}
          finalResult={finalResult}
          demographics={demographics}
          rfAnswers={rfAnswers}
          nlpResults={nlpResults}
          symptomSelections={symptomSelections}
          medHistory={medHistory}
          onNewScreening={reset}
        />
      )}
    </div>
  );
}
