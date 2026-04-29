"use client";

import { useState } from "react";
import { Shield, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { adminVerifyPassword, adminVerifyTOTP } from "@/lib/api";

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [step, setStep] = useState<"password" | "totp">("password");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePasswordSubmit() {
    if (!password) { setError("Password is required."); return; }
    setLoading(true);
    setError("");
    const ok = await adminVerifyPassword(password);
    setLoading(false);
    if (ok) {
      setStep("totp");
    } else {
      setError("Incorrect password.");
    }
  }

  async function handleTOTPSubmit() {
    if (totpCode.length !== 6) { setError("Enter a 6-digit code."); return; }
    setLoading(true);
    setError("");
    const ok = await adminVerifyTOTP(totpCode);
    setLoading(false);
    if (ok) {
      onSuccess();
    } else {
      setError("Invalid code. Wait for it to refresh and try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-purple/30">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black mb-1">Admin Portal</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {step === "password" ? "Step 1 — Password" : "Step 2 — Authenticator Code"}
          </p>
        </div>

        <div className="card">
          {step === "password" ? (
            <>
              <label className="block text-sm font-semibold mb-2">Admin Password</label>
              <div className="relative mb-4">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input pr-10"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

              <button
                onClick={handlePasswordSubmit}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Verify Password
              </button>
            </>
          ) : (
            <>
              <div
                className="text-xs px-3 py-2.5 rounded-lg mb-4 border"
                style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Open <strong>Google Authenticator</strong> or <strong>Authy</strong> and enter the 6-digit code for CogniDetect.
              </div>

              <label className="block text-sm font-semibold mb-2">6-Digit Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="input text-center text-2xl tracking-widest font-mono mb-4"
                placeholder="000000"
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleTOTPSubmit()}
              />

              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

              <button
                onClick={handleTOTPSubmit}
                disabled={loading || totpCode.length !== 6}
                className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Verify OTP
              </button>

              <button
                onClick={() => { setStep("password"); setError(""); setTotpCode(""); }}
                className="btn-ghost w-full text-sm flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="btn-ghost text-sm flex items-center justify-center gap-1 mx-auto">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
