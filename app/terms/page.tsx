"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LangCode } from "@/lib/types";

const sections = [
  {
    title: "1. Purpose of This Tool",
    content:
      "CogniDetectAI is an AI-powered final-year BE project designed to screen for potential cognitive and psychiatric disorder patterns. It was developed and published at the IEEE International Conference on Intelligent and Sustainable Electronics and Computing Technologies (INSECT-2026), May 2026.",
  },
  {
    title: "2. Not a Medical or Diagnostic Device",
    content:
      "The results produced by CogniDetectAI are probabilistic screening indicators only. They do NOT constitute a medical diagnosis, clinical assessment, or therapeutic recommendation. Only a qualified psychiatrist, clinical psychologist, or licensed mental health professional can provide a formal diagnosis. CogniDetectAI explicitly does not replace professional clinical judgement.",
  },
  {
    title: "3. Eligibility",
    content:
      "This tool is intended for adults aged 18 years and above. Minors should only use this tool under the direct supervision of a parent, guardian, or licensed healthcare professional. By proceeding, you confirm that you meet this requirement.",
  },
  {
    title: "4. Informed Consent",
    content:
      "Before beginning a screening session, users must explicitly acknowledge and consent to the terms outlined on the consent screen. This includes understanding the screening-only nature of the tool, the audio processing and automatic deletion policy, and the AI limitations.",
  },
  {
    title: "5. Emergency Clause",
    content:
      "If you are currently experiencing suicidal ideation, a mental health crisis, or any emergency, do NOT use this tool. Contact emergency services in your country immediately. In India, call iCall: 9152987821. In the USA, call 988 (Suicide & Crisis Lifeline).",
  },
  {
    title: "6. AI Limitations",
    content:
      "CogniDetectAI uses Random Forest classifiers and a fine-tuned Mental-BERT transformer model. These models may produce errors, false positives, or false negatives. Accuracy is not guaranteed. Model outputs are statistical and should be interpreted only as preliminary indicators.",
  },
  {
    title: "7. Data Collection & Storage",
    content:
      "CogniDetectAI collects anonymised session data including: age range, gender, country, education level, questionnaire responses, NLP interview text, and final diagnosis indicators. No names, email addresses, phone numbers, or any personally identifiable information are collected or stored.",
  },
  {
    title: "8. Audio Data",
    content:
      "If you choose the voice input mode, your audio is processed locally by the Whisper ASR model. Audio files are automatically and permanently deleted within 5 minutes of processing. Audio is never transmitted to or stored on third-party servers.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "The developers, researchers, and affiliated institution accept no liability for decisions made based on CogniDetectAI screening results. The tool is provided as-is for research and educational purposes only. Users assume all responsibility for how they interpret and act upon the results.",
  },
  {
    title: "10. Intellectual Property",
    content:
      "CogniDetectAI, its source code, trained models, and associated research are the intellectual property of Sankalp Indish and the research team. Published under the INSECT-2026 conference proceedings.",
  },
  {
    title: "11. Changes to These Terms",
    content:
      "These terms may be updated at any time. Continued use of the tool constitutes acceptance of the current terms.",
  },
];

export default function TermsPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen px-4 sm:px-6 pt-24 pb-12 page-enter">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <Scale size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Terms & Conditions</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Last updated: January 2026 · CogniDetectAI v1.0
              </p>
            </div>
          </div>

          <div
            className="px-5 py-4 rounded-xl border mb-8 text-sm"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <strong className="text-amber-400">Important:</strong>{" "}
            <span style={{ color: "var(--text-muted)" }}>
              CogniDetectAI is a research screening tool and is NOT a substitute for
              professional medical advice, diagnosis, or treatment. Always seek the
              advice of a qualified healthcare provider.
            </span>
          </div>

          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.title} className="card">
                <h2 className="font-bold mb-2">{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
