"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LangCode } from "@/lib/types";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Stethoscope,
  Users,
  Lock,
  FlaskConical,
  HeartPulse,
  MessageSquareWarning,
  Eye,
} from "lucide-react";

// ── Comparison data ──────────────────────────────────────────────────────────

const COMPARE = [
  {
    feature: "Questions grounded in DSM-5 criteria",
    cogni: true,
    llm: false,
  },
  {
    feature: "Deterministic scoring (same input = same output)",
    cogni: true,
    llm: false,
  },
  {
    feature: "Clinically validated by medical professionals",
    cogni: true,
    llm: false,
  },
  {
    feature: "Dual-stream cross-validation (RF + NLP)",
    cogni: true,
    llm: false,
  },
  {
    feature: "Sycophancy — tells users what they want to hear",
    cogni: false,
    llm: true,
    invert: true,
  },
  {
    feature: "Hallucination risk in clinical responses",
    cogni: false,
    llm: true,
    invert: true,
  },
  {
    feature: "Session personalisation that skews neutrality",
    cogni: false,
    llm: true,
    invert: true,
  },
  {
    feature: "Fully anonymous — no account or profile",
    cogni: true,
    llm: false,
  },
  {
    feature: "Structured severity scoring (None / Mild / Moderate / High)",
    cogni: true,
    llm: false,
  },
  {
    feature: "Usability assessed by practising clinicians",
    cogni: true,
    llm: false,
  },
];

const STRENGTHS = [
  {
    icon: <FlaskConical size={20} className="text-brand-purple" />,
    title: "DSM-5 Aligned Questionnaire",
    body: "All 27 screening questions are derived from Diagnostic and Statistical Manual of Mental Disorders (DSM-5) diagnostic criteria — the global standard for psychiatric classification. There is no guesswork: every item maps to a clinically established symptom domain.",
  },
  {
    icon: <Stethoscope size={20} className="text-brand-purple" />,
    title: "Validated by Medical Professionals",
    body: "Two practising medical professionals — including a consulting psychiatrist — reviewed CogniDetectAI's diagnostic output against real patient profiles. They assessed clinical accuracy, DSM-5 alignment, and appropriateness of severity classifications before the system was accepted for publication.",
  },
  {
    icon: <HeartPulse size={20} className="text-brand-purple" />,
    title: "Usability Evaluated in Clinical Context",
    body: "Beyond accuracy, medical practitioners evaluated the system's usability — assessing whether the interface, question phrasing, and result presentation meet standards appropriate for clinical support workflows. The tool was deemed suitable as a first-line screening aid.",
  },
  {
    icon: <Lock size={20} className="text-brand-purple" />,
    title: "Fully Anonymous & Zero Bias",
    body: "No name, email, or identifier is collected. There is no user profile that could influence results over time. Every screening is a fresh, unbiased assessment — in contrast to AI assistants that accumulate personal context and adjust their tone to match user expectations.",
  },
];

const LIMITATIONS = [
  {
    icon: <Eye size={20} className="text-amber-400" />,
    title: "Self-Reporting Honesty",
    body: "The system's accuracy depends on the user answering questions honestly and self-awarely. Individuals who minimise symptoms, lack insight into their condition, or feel stigmatised may provide responses that underrepresent severity.",
    mitigations: [
      "A trusted family member or close friend can take the screening on the user's behalf, answering based on observed day-to-day behaviour.",
      "A consulting psychiatrist or therapist can use CogniDetectAI as a structured intake tool — entering responses based on what the patient communicates in session.",
      "Take it slow. Answers should be considered carefully; rushed or reflexive responses reduce accuracy.",
      "If possible, run two sessions — one by the user and one by someone who knows them well — and compare the outputs.",
    ],
  },
  {
    icon: <MessageSquareWarning size={20} className="text-amber-400" />,
    title: "NLP Interview Requires Detailed Responses",
    body: "The deep-dive interview extracts linguistic signals from written or spoken answers. Very brief responses (under 50 characters) are rejected by the system. Vague, one-word answers reduce the NLP signal quality and may lower the confidence of the final result.",
    mitigations: [
      "Encourage users to describe their experiences in full sentences.",
      "A proxy (relative or clinician) can narrate what they have observed about the patient's behaviour in detail.",
    ],
  },
  {
    icon: <AlertTriangle size={20} className="text-amber-400" />,
    title: "Screening, Not Diagnosis",
    body: "CogniDetectAI is a probabilistic screening system. It identifies risk patterns and severity levels — it does not replace a formal clinical evaluation. A positive screening result should be followed up with a qualified mental health professional.",
    mitigations: [
      "Use CogniDetectAI as a first step — a structured reason to seek professional consultation.",
      "The downloadable PDF report is designed to support that conversation, not replace it.",
    ],
  },
];

export default function NoveltyPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen px-4 sm:px-6 pt-24 pb-12 page-enter">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-purple/20">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Why CogniDetectAI Works</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Clinical validation · Novel architecture · Honest limitations
            </p>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--text-muted)" }}>
          In a world where general-purpose AI assistants answer any health question with confident fluency,
          CogniDetectAI takes a deliberately different approach — one grounded in clinical science,
          validated by practitioners, and designed to be honest rather than satisfying.
        </p>

        {/* ── Section 1: Clinical validation ────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-brand-gradient" />
            <h2 className="text-2xl font-black">Clinically Validated</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="card border-brand-purple/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-purple/15 flex items-center justify-center">
                  <Stethoscope size={18} className="text-brand-purple" />
                </div>
                <h3 className="font-bold">Medical Accuracy Review</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Two practising medical professionals — including a consulting psychiatrist — independently
                reviewed CogniDetectAI&apos;s diagnostic outputs against known clinical profiles. They assessed
                whether the system&apos;s disorder indicators, severity classifications, and suggestions
                aligned with established psychiatric practice before accepting the research for publication.
              </p>
            </div>

            <div className="card border-brand-purple/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-purple/15 flex items-center justify-center">
                  <Users size={18} className="text-brand-purple" />
                </div>
                <h3 className="font-bold">Usability Assessment</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Medical practitioners separately evaluated the system&apos;s usability — the clarity of questions,
                the appropriateness of AI interview phrasing, and whether the result presentation was
                meaningful in a clinical support context. CogniDetectAI was found suitable as a structured
                first-line screening aid for clinical intake workflows.
              </p>
            </div>
          </div>

          <div
            className="px-5 py-4 rounded-xl border text-sm"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <span className="font-semibold text-brand-purple">INSECT-2026 Publication: </span>
            <span style={{ color: "var(--text-muted)" }}>
              The CogniDetectAI system was accepted and published at the IEEE International Conference on
              Intelligent and Sustainable Electronics and Computing Technologies (INSECT-2026), May 2026,
              following peer review. This includes review of the clinical methodology, model architecture,
              dataset construction, and evaluation protocol.
            </span>
          </div>
        </section>

        {/* ── Section 2: Strengths ───────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-brand-gradient" />
            <h2 className="text-2xl font-black">What Makes It Strong</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-sm">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: vs LLMs comparison ─────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full bg-brand-gradient" />
            <h2 className="text-2xl font-black">Why Not Just Ask an LLM?</h2>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Tools like Gemini, ChatGPT, and similar conversational AI assistants are designed with one
            primary objective: to be maximally helpful and engaging to the user. In consumer health
            contexts, this creates structural problems that make them unsuitable for psychiatric screening.
          </p>

          {/* LLM problem cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: "Sycophancy",
                body: "General LLMs learn to produce responses the user finds satisfying. In mental health contexts, a user who minimises their struggles will receive reassurance. A user who exaggerates will receive validation. Neither response is clinically honest.",
              },
              {
                title: "Hallucination",
                body: "LLMs generate text that sounds plausible, not text that is provably correct. Clinical misinformation — confidently delivered — is dangerous in psychiatric contexts where users may be vulnerable and seeking guidance.",
              },
              {
                title: "No Clinical Grounding",
                body: "General-purpose LLMs have no enforced DSM-5 alignment, no validated scoring methodology, and no accountability structure. Their answers vary between sessions and are not reproducible in the way a structured diagnostic tool must be.",
              },
            ].map((c) => (
              <div key={c.title} className="card border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={16} className="text-red-400 shrink-0" />
                  <h3 className="font-bold text-sm">{c.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="card overflow-hidden p-0">
            <div
              className="grid grid-cols-3 px-5 py-3 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}
            >
              <span>Feature</span>
              <span className="text-center text-brand-purple">CogniDetectAI</span>
              <span className="text-center" style={{ color: "var(--text-muted)" }}>General LLMs</span>
            </div>
            {COMPARE.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-5 py-3 text-sm items-center"
                style={{
                  borderBottom: i < COMPARE.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{row.feature}</span>
                <span className="flex justify-center">
                  {row.cogni === !row.invert ? (
                    <CheckCircle size={17} className="text-emerald-400" />
                  ) : (
                    <XCircle size={17} className="text-red-400" />
                  )}
                </span>
                <span className="flex justify-center">
                  {row.llm === !row.invert ? (
                    <CheckCircle size={17} className="text-emerald-400" />
                  ) : (
                    <XCircle size={17} className="text-red-400" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Impact ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-brand-gradient" />
            <h2 className="text-2xl font-black">Why This Matters</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { stat: "1 in 5", label: "people globally live with a mental health disorder" },
              { stat: "70%+", label: "of cases go undiagnosed or untreated in low-access regions" },
              { stat: "10–20 yrs", label: "average delay between symptom onset and first treatment" },
              { stat: "$0", label: "cost barrier — CogniDetectAI is completely free to use" },
            ].map((s) => (
              <div key={s.label} className="card text-center py-5">
                <div className="text-2xl font-black gradient-text mb-2">{s.stat}</div>
                <div className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Access to psychiatric evaluation is constrained by cost, geography, stigma, and availability.
            CogniDetectAI was built to close that gap at the first-contact stage — offering a clinically
            grounded, anonymous, multilingual screening that gives individuals and their families
            a structured starting point for seeking professional help. It does not replace clinicians.
            It ensures more people reach one.
          </p>
        </section>

        {/* ── Section 5: Limitations & Mitigations ──────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 rounded-full" style={{ background: "#F59E0B" }} />
            <h2 className="text-2xl font-black">Known Limitations & How to Work Around Them</h2>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Scientific integrity demands honesty about constraints. These limitations are known,
            studied, and — in most cases — addressable through deliberate use of the system.
          </p>

          <div className="space-y-5">
            {LIMITATIONS.map((lim) => (
              <div key={lim.title} className="card border-amber-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    {lim.icon}
                  </div>
                  <h3 className="font-bold">{lim.title}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {lim.body}
                </p>
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{ backgroundColor: "var(--bg-surface)", borderLeft: "3px solid #667eea" }}
                >
                  <p className="font-semibold mb-2 text-brand-purple text-xs uppercase tracking-wide">
                    Mitigations
                  </p>
                  <ul className="space-y-1.5">
                    {lim.mitigations.map((m, i) => (
                      <li key={i} className="flex gap-2" style={{ color: "var(--text-muted)" }}>
                        <span className="text-brand-purple shrink-0 mt-0.5">·</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final note ─────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-6 py-8 text-center mb-8"
          style={{ background: "linear-gradient(135deg, rgba(102,126,234,0.12), rgba(118,75,162,0.12))", border: "1px solid rgba(102,126,234,0.25)" }}
        >
          <ShieldCheck size={32} className="text-brand-purple mx-auto mb-4" />
          <h3 className="text-xl font-black mb-3">Built to Be Honest, Not Comfortable</h3>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            CogniDetectAI was not built to give reassuring answers. It was built to give
            clinically grounded ones. If that means flagging risk indicators that feel uncomfortable,
            that is not a flaw — it is the point. Early, honest detection is what separates a tool
            that actually helps from one that merely feels helpful.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/screen" className="btn-primary inline-flex items-center gap-2">
              Start Free Screening →
            </Link>
            <Link href="/team" className="btn-secondary inline-flex items-center gap-2">
              Meet the Team
            </Link>
          </div>
        </div>

      </div>
    </main>
    <Footer />
    </>
  );
}
