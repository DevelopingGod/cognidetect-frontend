"use client";

import { useState } from "react";
import { Settings2, ArrowRight, Loader2 } from "lucide-react";
import type { LangCode, SymptomSelections, DURATION_OPTIONS, MED_HISTORY_OPTIONS } from "@/lib/types";
import { INITIAL_SYMPTOM_SELECTIONS } from "@/lib/types";
import { t } from "@/lib/translations";

const DURATION_OPTS = [
  "past few days", "past week", "past 2 weeks", "past month", "past few months",
];
const MED_OPTS = [
  "Migraine", "Thyroid Disorder", "Insomnia", "Anemia", "Epilepsy", "Rheumatoid Arthritis",
];

interface SymptomGroup {
  key: "S1" | "S2" | "S3" | "S4" | "S5";
  label: string;
  options: string[];
}

interface NLPSetupStepProps {
  language: LangCode;
  symptomOptions: Record<string, string[]>;
  onSubmit: (selections: SymptomSelections, medHistory: string[]) => void;
  loading: boolean;
}

export default function NLPSetupStep({
  language,
  symptomOptions,
  onSubmit,
  loading,
}: NLPSetupStepProps) {
  const [selections, setSelections] = useState<SymptomSelections>(INITIAL_SYMPTOM_SELECTIONS);
  const [medHistory, setMedHistory] = useState<string[]>([]);

  const groups: SymptomGroup[] = [
    { key: "S1", label: "S1 – Focus & Attention Patterns", options: symptomOptions.S1 ?? [] },
    { key: "S2", label: "S2 – Mood & Energy Patterns", options: symptomOptions.S2 ?? [] },
    { key: "S3", label: "S3 – Stress & Restlessness Patterns", options: symptomOptions.S3 ?? [] },
    { key: "S4", label: "S4 – Social Interaction Patterns", options: symptomOptions.S4 ?? [] },
    { key: "S5", label: "S5 – Routine & Behavioural Patterns", options: symptomOptions.S5 ?? [] },
  ];

  function toggleSymptom(group: "S1" | "S2" | "S3" | "S4" | "S5", item: string) {
    setSelections((prev) => {
      const current = prev[group].selected;
      const updated = current.includes(item)
        ? current.filter((s) => s !== item)
        : [...current, item];
      return { ...prev, [group]: { ...prev[group], selected: updated } };
    });
  }

  function setDuration(group: "S1" | "S2" | "S3" | "S4" | "S5", duration: string) {
    setSelections((prev) => ({ ...prev, [group]: { ...prev[group], duration } }));
  }

  function toggleMed(item: string) {
    setMedHistory((prev) =>
      prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-purple/15 flex items-center justify-center">
          <Settings2 size={20} className="text-brand-purple" />
        </div>
        <div>
          <h2 className="font-black text-xl">{t("interview", language)}</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Select any symptoms you have been experiencing recently.
          </p>
        </div>
      </div>

      {/* Medical history */}
      <div className="card mb-5">
        <h3 className="font-semibold mb-3 text-sm">{t("medicalHistory", language)}</h3>
        <div className="flex flex-wrap gap-2">
          {MED_OPTS.map((m) => (
            <button
              key={m}
              onClick={() => toggleMed(m)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                medHistory.includes(m)
                  ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                  : "border-[var(--border)] hover:border-brand-purple/40"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Symptom groups */}
      {groups.map((g) => (
        <div key={g.key} className="card mb-4">
          <h3 className="font-semibold mb-3 text-sm">{g.label}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {g.options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleSymptom(g.key, opt)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all capitalize ${
                  selections[g.key].selected.includes(opt)
                    ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                    : "border-[var(--border)] hover:border-brand-purple/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {selections[g.key].selected.length > 0 && (
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>
                Duration of these symptoms:
              </label>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(g.key, d)}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-all ${
                      selections[g.key].duration === d
                        ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                        : "border-[var(--border)] hover:border-brand-purple/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Custom symptom */}
      <div className="card mb-6">
        <h3 className="font-semibold mb-3 text-sm">{t("otherSymptom", language)}</h3>
        <input
          type="text"
          className="input"
          placeholder="e.g., Joint pain, constant headaches..."
          value={selections.custom}
          onChange={(e) =>
            setSelections((prev) => ({ ...prev, custom: e.target.value }))
          }
        />
      </div>

      <button
        onClick={() => onSubmit(selections, medHistory)}
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t("loading", language)}
          </>
        ) : (
          <>
            {t("generateQuestions", language)}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}
