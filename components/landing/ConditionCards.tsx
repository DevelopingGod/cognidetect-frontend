"use client";

import { Brain, Heart, Zap, Users, MessageCircle } from "lucide-react";

const conditions = [
  {
    icon: Zap,
    name: "ADHD",
    full: "Attention Deficit Hyperactivity Disorder",
    desc: "Persistent patterns of inattention, hyperactivity, and impulsivity that interfere with daily functioning.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    icon: Heart,
    name: "Depression",
    full: "Major Depressive Disorder",
    desc: "Persistent low mood, loss of interest, and reduced energy that significantly impacts quality of life.",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
  },
  {
    icon: Brain,
    name: "Anxiety",
    full: "Generalised Anxiety Disorder",
    desc: "Excessive, uncontrollable worry about multiple life domains accompanied by physical symptoms.",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.25)",
  },
  {
    icon: Users,
    name: "Autism",
    full: "Autism Spectrum Disorder (ASD)",
    desc: "Challenges in social communication and interaction, alongside restricted or repetitive behaviours.",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
  },
  {
    icon: MessageCircle,
    name: "SPCD",
    full: "Social Pragmatic Communication Disorder",
    desc: "Difficulty using verbal and non-verbal communication for social purposes without ASD-specific behaviours.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
  },
];

export default function ConditionCards() {
  return (
    <section id="conditions" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-purple mx-auto mb-4">What We Screen For</div>
          <h2 className="section-title">
            Five Conditions,{" "}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            CogniDetect uses DSM-5 aligned criteria to screen for the five most
            common neurodevelopmental and mood disorders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {conditions.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.name}
                className="card-hover group relative overflow-hidden"
                style={{ borderColor: c.border }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: c.color }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: c.bg }}
                  >
                    <Icon size={20} style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{c.name}</h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: c.bg, color: c.color }}
                      >
                        DSM-5
                      </span>
                    </div>
                    <p
                      className="text-xs mb-2 font-medium"
                      style={{ color: c.color }}
                    >
                      {c.full}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {c.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Differentiator card */}
          <div className="card sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center p-8 border-dashed">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 shadow-lg shadow-brand-purple/30">
              <Brain size={26} className="text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">
              Differential Diagnosis
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              The AI automatically distinguishes between ASD and SPCD using the
              DSM-5 logic tree — a clinically significant differentiation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
