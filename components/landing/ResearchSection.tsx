"use client";

import { BookOpen, Award, Users2, ExternalLink } from "lucide-react";

const authors = [
  {
    name: "Sankalp Indish",
    role: "Team Lead & Principal Developer",
    note: "Complete end-to-end AI in SDLC — deployment, model maintenance, and full research paper authorship with self-made diagrams. Architecting the system with continuous maintenance and updates.",
    primary: true,
  },
  {
    name: "Dr. Monika Dangore",
    role: "Research Supervisor & Project Mentor",
    note: "Academic supervision, clinical methodology review, pilot dataset development for RF-model with evaluation, drafting the DSM-5 Aligned Questionnaire and IEEE INSECT-2026 submission guidance.",
    primary: false,
  },
  {
    name: "Aishwarya Borse",
    role: "Research Contributor",
    note: "Project diagrams, report and presentation edits, and documentation.",
    primary: false,
  },
  {
    name: "Rashi Madne",
    role: "Research Contributor",
    note: "Version 1 project paper and literature survey.",
    primary: false,
  },
];

export default function ResearchSection() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-purple mx-auto mb-4">Peer-Reviewed Research</div>
          <h2 className="section-title">
            Published at <span className="gradient-text">IEEE INSECT-2026</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            CogniDetectAI was developed as a BE final-year project and accepted for publication at the
            IEEE International Conference on Intelligent and Sustainable Electronics and Computing Technologies, May 2026.
          </p>
        </div>

        {/* Paper citation card */}
        <div className="card border-brand-purple/40 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gradient" />
          <div className="flex items-start gap-4 pt-2">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/15 flex items-center justify-center shrink-0">
              <BookOpen size={22} className="text-brand-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="badge-purple">Conference Paper</span>
                <span className="badge-purple">2026</span>
                <span className="badge-purple">AI · Mental Health</span>
              </div>
              <h3 className="font-bold text-lg mb-1 leading-snug">
                CogniDetectAI: An AI-Powered Clinical Decision Support System for
                Psychiatric Screening Using Dual-Stream Multimodal Fusion
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Sankalp Indish, Dr. Monika Dangore, Aishwarya Borse, Rashi Madne
              </p>
              <div
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg font-medium"
                style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
              >
                <Award size={14} className="text-brand-purple" />
                <span>IEEE INSECT-2026 — Intelligent &amp; Sustainable Electronics and Computing Technologies · May 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Authors */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Users2 size={18} className="text-brand-purple" />
            <h3 className="font-bold text-lg">Authors</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {authors.map((author) => (
              <div
                key={author.name}
                className={`card transition-all ${
                  author.primary
                    ? "border-brand-purple/50 bg-brand-purple/5"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      author.primary
                        ? "bg-brand-gradient text-white shadow-md shadow-brand-purple/30"
                        : "bg-brand-purple/15 text-brand-purple"
                    }`}
                  >
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{author.name}</span>
                      {author.primary && (
                        <span className="badge-purple text-[10px]">Lead Developer</span>
                      )}
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {author.role}
                    </div>
                    {author.note && (
                      <div
                        className="text-xs mt-1.5 leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {author.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key figures */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "5", label: "Disorder Classes" },
            { value: "27", label: "Clinical Questions" },
            { value: "~600MB", label: "Model Payload" },
            { value: "5 lang", label: "Multilingual" },
          ].map((s) => (
            <div key={s.label} className="card text-center">
              <div className="text-xl font-black gradient-text">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
