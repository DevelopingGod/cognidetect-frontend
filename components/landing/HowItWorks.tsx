"use client";

import { ClipboardList, Mic, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Answer the Questionnaire",
    subtitle: "Stream A — Structured",
    desc: "27 DSM-5 aligned questions scored on a 5-point frequency scale. A Random Forest classifier evaluates your responses and flags potential risk domains.",
    detail: "Questions · Random Forest · Risk Flags",
  },
  {
    number: "02",
    icon: Mic,
    title: "Voice & Text Interview",
    subtitle: "Stream B — Unstructured",
    desc: "AI-generated follow-up questions based on your symptom flags. Answer by voice or text. Whisper transcribes, Mental-BERT analyses sentiment and content.",
    detail: "Whisper ASR · Mental-BERT · 4 Guardrails",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Fusion Report",
    subtitle: "Meta-Fusion Ensemble",
    desc: "A trained Meta-Fusion model combines both streams (RF 60% + NLP 40%) to produce a final diagnosis, severity rating, and personalised suggestions.",
    detail: "Meta-Fusion · Severity · PDF Report",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-purple mx-auto mb-4">The Process</div>
          <h2 className="section-title">
            How <span className="gradient-text">CogniDetect</span> Works
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A dual-stream AI pipeline combining structured questionnaires with
            natural language understanding for higher accuracy.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
            style={{ background: "linear-gradient(90deg, transparent, #667eea55, #764ba255, transparent)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {/* Step icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-xl shadow-brand-purple/30">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-black shadow-md">
                      {step.number}
                    </div>
                  </div>

                  <div className="card w-full">
                    <div className="badge-purple mb-3 mx-auto">{step.subtitle}</div>
                    <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                      {step.desc}
                    </p>
                    <div
                      className="text-xs font-mono px-3 py-2 rounded-lg"
                      style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
                    >
                      {step.detail}
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-6 text-brand-purple opacity-50">
                      <ArrowRight size={24} className="rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
