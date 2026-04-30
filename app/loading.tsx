export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Pulsing logo ring */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-xl shadow-brand-purple/30">
          <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
              d="M16 10 C14.5 10 12 10.5 10.5 12.5 C9 14.5 9 17 10 18.5 C10.8 19.7 12 20.5 13 21"/>
            <path stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
              d="M16 10 C17.5 10 20 10.5 21.5 12.5 C23 14.5 23 17 22 18.5 C21.2 19.7 20 20.5 19 21"/>
            <path stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
              d="M13 21 Q13 23.5 16 23.5 Q19 23.5 19 21"/>
            <line x1="16" y1="10" x2="16" y2="23" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
            <path stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"
              d="M11.5 14.5 Q13.5 15.5 12.5 18"/>
            <path stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"
              d="M20.5 14.5 Q18.5 15.5 19.5 18"/>
          </svg>
        </div>
        {/* Spinning ring around logo */}
        <div className="absolute -inset-1.5 rounded-[18px] border-2 border-transparent border-t-brand-purple animate-spin opacity-60" />
      </div>

      <div className="text-center">
        <p className="font-black text-lg gradient-text tracking-tight">CogniDetectAI</p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Loading…</p>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "var(--border)" }}>
        <div
          className="h-full bg-brand-gradient"
          style={{ animation: "loading-bar 1.2s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
