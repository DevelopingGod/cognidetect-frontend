"use client";

import { useState } from "react";
import { User, ArrowRight } from "lucide-react";
import type { Demographics, LangCode } from "@/lib/types";
import { t } from "@/lib/translations";

interface DemographicsStepProps {
  language: LangCode;
  onSubmit: (data: Demographics) => void;
}

const COUNTRIES = ["India", "USA", "UK", "Canada", "Germany", "China", "Australia", "Other"];

export default function DemographicsStep({ language, onSubmit }: DemographicsStepProps) {
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("India");
  const [education, setEducation] = useState("Undergraduate");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const genders = [
    { value: "Male", label: t("male", language) },
    { value: "Female", label: t("female", language) },
    { value: "Other", label: t("other", language) },
  ];

  const eduLevels = [
    { value: "High School", label: t("highSchool", language) },
    { value: "Undergraduate", label: t("undergraduate", language) },
    { value: "Postgraduate", label: t("postgraduate", language) },
    { value: "PhD", label: t("phd", language) },
  ];

  function validate() {
    const e: Record<string, string> = {};
    if (age < 10 || age > 100) e.age = "Age must be between 10 and 100.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit({ age, gender, country, grade: education });
  }

  return (
    <div className="max-w-xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-purple/30">
          <User size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-black mb-1">{t("demographics", language)}</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Anonymous — no personally identifiable information is stored.
        </p>
      </div>

      <div className="card space-y-5">
        {/* Age */}
        <div>
          <label className="block text-sm font-semibold mb-2">{t("age", language)}</label>
          <input
            type="number"
            min={10}
            max={100}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="input"
          />
          {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2">{t("gender", language)}</label>
          <div className="grid grid-cols-3 gap-2">
            {genders.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  gender === g.value
                    ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                    : "border-[var(--border)] hover:border-brand-purple/40"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold mb-2">{t("country", language)}</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold mb-2">{t("education", language)}</label>
          <div className="grid grid-cols-2 gap-2">
            {eduLevels.map((e) => (
              <button
                key={e.value}
                onClick={() => setEducation(e.value)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  education === e.value
                    ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                    : "border-[var(--border)] hover:border-brand-purple/40"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
      >
        {t("startQuestionnaire", language)}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
