"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t pt-12 pb-6 px-4 sm:px-6"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-black text-xl gradient-text mb-2">CogniDetectAI</div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
              An AI-powered clinical decision support system for psychiatric screening
              using dual-stream multimodal fusion. DSM-5 aligned. Clinically validated.
            </p>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                📍 MMIT, Lohegaon, Pune
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                🏛️ IEEE INSECT-2026 · May 2026
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Why CogniDetectAI", href: "/novelty" },
                { label: "Our Team", href: "/team" },
                { label: "Start Screening", href: "/screen" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="hover:text-brand-purple transition-colors"
                    style={{ color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Legal & Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-brand-purple transition-colors" style={{ color: "var(--text-muted)" }}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-purple transition-colors" style={{ color: "var(--text-muted)" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sankalp-indish/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-brand-purple transition-colors" style={{ color: "var(--text-muted)" }}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ backgroundColor: "var(--border)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
          <p>© 2026 Sankalp Indish, Dr. Monika Dangore, Aishwarya Borse &amp; Rashi Madne</p>
          <p className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <span className="px-2 py-0.5 rounded-full border text-[10px] font-medium" style={{ borderColor: "var(--border)" }}>
              Not a medical device
            </span>
            <span>Final Year (BE-Computer Engg.) Project</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
