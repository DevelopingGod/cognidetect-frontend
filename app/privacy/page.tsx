"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LangCode } from "@/lib/types";

const sections = [
  {
    title: "1. Overview",
    content:
      "CogniDetectAI is designed with privacy as a core principle. This policy explains what data we collect, how it is used, and what protections are in place. We collect only what is strictly necessary to provide the screening service.",
  },
  {
    title: "2. Data We Collect",
    content:
      "We collect the following anonymised information during a screening session: (a) Demographic data — age range, gender (self-reported), country, and education level. (b) Questionnaire responses — 27 frequency-scale answers (0–4). (c) NLP interview text — typed or transcribed spoken responses to AI-generated questions. (d) Screening results — probabilistic disorder indicators and severity ratings.",
  },
  {
    title: "3. Data We Do NOT Collect",
    content:
      "We do NOT collect: your name, email address, phone number, IP address, device identifiers, location beyond country-level, facial data, video, or any other personally identifiable information. CogniDetectAI is designed to be fully anonymous.",
  },
  {
    title: "4. Audio Data",
    content:
      "If you choose the voice input mode, your audio is processed locally on the server by OpenAI Whisper. The audio file is automatically and permanently deleted within 5 minutes of transcription. Audio is not transmitted to any third-party ASR service. Only the resulting text transcript is retained as part of your session record.",
  },
  {
    title: "5. How Data Is Used",
    content:
      "Session data is used for: (a) Producing your screening result within the current session. (b) Research and system improvement by the development team. (c) Aggregate statistical analysis to evaluate model performance. No data is sold, licensed, or shared with third parties for commercial purposes.",
  },
  {
    title: "6. Data Storage",
    content:
      "Session records are stored in an SQLite database on the server infrastructure hosting the CogniDetectAI backend. Data is stored without personally identifiable fields and is accessible only to authorised administrators via the 2FA-protected admin panel.",
  },
  {
    title: "7. Data Retention",
    content:
      "Session records are retained for the duration of the research project. Users may request deletion of their session by contacting the administrator. Since sessions are anonymous, deletion requests should include the approximate date and time of the session.",
  },
  {
    title: "8. Third-Party Services",
    content:
      "CogniDetectAI uses Google Translate API for multilingual UI translation. Text sent to Google Translate may be subject to Google's Privacy Policy. This applies only to UI labels and question text, not to your personal responses. We do not transmit your NLP answers to Google Translate.",
  },
  {
    title: "9. Cookies & Tracking",
    content:
      "CogniDetectAI does not use cookies for tracking or advertising. The application may use browser session storage to maintain state during your active screening session. This data is cleared when you close your browser tab.",
  },
  {
    title: "10. Security",
    content:
      "Access to the admin panel and raw session data is protected by two-factor authentication (password + TOTP). The backend API uses HTTPS in production. Audio files are auto-deleted. We follow reasonable security practices appropriate for an academic final-year project.",
  },
  {
    title: "11. Your Rights",
    content:
      "You have the right to: know what data is held about you, request deletion of your data, and withdraw from the screening at any time. Since all data is anonymised, we cannot directly identify your specific records without additional information from you.",
  },
  {
    title: "12. Children's Privacy",
    content:
      "CogniDetectAI is not designed for or directed at children under 18 years of age. We do not knowingly collect data from minors. If you believe a minor has used this tool without supervision, please contact us.",
  },
  {
    title: "13. Changes to This Policy",
    content:
      "This privacy policy may be updated as the project evolves. We will note the effective date at the top of this page. Continued use constitutes acceptance of the updated policy.",
  },
  {
    title: "14. Contact",
    content:
      "For privacy-related enquiries, please contact the lead developer via LinkedIn: linkedin.com/in/sankalp-indish/",
  },
];

export default function PrivacyPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen px-4 sm:px-6 pt-24 pb-12 page-enter">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Privacy Policy</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Last updated: January 2026 · CogniDetectAI v1.0
              </p>
            </div>
          </div>

          {/* Key highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: "🔒", title: "Fully Anonymous", desc: "No name, email, or ID collected" },
              { icon: "🎙️", title: "Audio Auto-Deleted", desc: "Within 5 minutes of processing" },
              { icon: "🚫", title: "No Third-Party Sale", desc: "Data never sold or licensed" },
            ].map((h) => (
              <div key={h.title} className="card text-center py-5">
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="font-semibold text-sm mb-1">{h.title}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {h.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
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
