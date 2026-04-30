"use client";

import { useState } from "react";
import { Users, Linkedin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LangCode } from "@/lib/types";

interface TeamMember {
  name: string;
  role: string;
  detail: string;
  linkedin: string;
  isLead?: boolean;
  avatar: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Sankalp Indish",
    role: "Lead Developer & Team Lead",
    detail:
      "Complete end-to-end AI in SDLC — designed and implemented the dual-stream AI pipeline (Random Forest + Mental-BERT), FastAPI backend, Next.js frontend, meta-fusion inference engine, and all API endpoints. Responsible for deployment and maintenance of all models. Drafted the complete research paper with self-made diagrams. Research paper: 3% AI-generated content, 5% plagiarism score.",
    linkedin: "https://linkedin.com/in/sankalp-indish/",
    isLead: true,
    avatar: "SI",
  },
  {
    name: "Dr. Monika Dangore",
    role: "Research Supervisor & Project Mentor",
    detail:
      "Provided academic guidance, clinical domain expertise, and research supervision throughout the project. Developed pilot dataset for RF-model with evaluation. Researched and drafted DSM-5 Aligned Questionnaire.",
    linkedin: "#",
    avatar: "MD",
  },
  {
    name: "Aishwarya Borse",
    role: "Research Contributor",
    detail:
      "Responsible for project diagrams, report and presentation edits, and the documentation component of the research paper.",
    linkedin: "#",
    avatar: "AB",
  },
  {
    name: "Rashi Madne",
    role: "Research Contributor",
    detail:
      "Authored the Version 1 project paper and conducted the literature survey that underpins the research background and related works section.",
    linkedin: "#",
    avatar: "RM",
  },
];

export default function TeamPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen px-4 sm:px-6 pt-24 pb-12 page-enter">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <Users size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Our Team</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                IEEE INSECT-2026 · CogniDetectAI Research Group
              </p>
            </div>
          </div>

          {/* Publication note */}
          <div
            className="px-5 py-4 rounded-xl border mb-8 text-sm"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              CogniDetectAI was developed as a Bachelor of Engineering final-year project and published at the{" "}
              <span className="text-brand-purple font-semibold">
                IEEE International Conference on Intelligent and Sustainable Electronics and Computing Technologies (INSECT-2026)
              </span>
              , May 2026.
            </p>
          </div>

          <div className="space-y-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className={`card flex gap-4 ${member.isLead ? "border-brand-purple/30" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                    member.isLead ? "bg-brand-gradient text-white" : "bg-brand-purple/15 text-brand-purple"
                  }`}
                >
                  {member.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold">{member.name}</h2>
                        {member.isLead && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-purple/15 text-brand-purple">
                            <Star size={10} />
                            Lead
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-brand-purple">{member.role}</p>
                    </div>
                    {member.linkedin !== "#" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 rounded-lg btn-ghost opacity-60 hover:opacity-100"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {member.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
