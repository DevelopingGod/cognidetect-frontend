"use client";

import { useState, useEffect } from "react";
import {
  ClipboardList, Tags, Lightbulb, Database,
  Save, Download, LogOut, Loader2, CheckCircle
} from "lucide-react";
import { fetchAdminConfig, updateAdminConfig, downloadSessions } from "@/lib/api";

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = "questions" | "symptoms" | "suggestions" | "database";

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("questions");
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Editable state
  const [questions, setQuestions] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [s4, setS4] = useState("");
  const [s5, setS5] = useState("");
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    fetchAdminConfig().then((cfg) => {
      setConfig(cfg);
      const q = cfg["questions"] as string[];
      const sym = cfg["symptoms"] as Record<string, string[]>;
      const sug = cfg["suggestions"];
      setQuestions(q?.join("\n") ?? "");
      setS1(sym?.S1?.join(", ") ?? "");
      setS2(sym?.S2?.join(", ") ?? "");
      setS3(sym?.S3?.join(", ") ?? "");
      setS4(sym?.S4?.join(", ") ?? "");
      setS5(sym?.S5?.join(", ") ?? "");
      setSuggestions(JSON.stringify(sug, null, 2));
    }).catch(() => setError("Failed to load config."));
  }, []);

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    setError("");
    try {
      const updated = {
        ...config,
        questions: questions.split("\n").map((q) => q.trim()).filter(Boolean),
        symptoms: {
          ...(config["symptoms"] as Record<string, unknown>),
          S1: s1.split(",").map((s) => s.trim()).filter(Boolean),
          S2: s2.split(",").map((s) => s.trim()).filter(Boolean),
          S3: s3.split(",").map((s) => s.trim()).filter(Boolean),
          S4: s4.split(",").map((s) => s.trim()).filter(Boolean),
          S5: s5.split(",").map((s) => s.trim()).filter(Boolean),
        },
        suggestions: JSON.parse(suggestions),
      };
      await updateAdminConfig(updated);
      setConfig(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError("Save failed. Check JSON syntax in Suggestions.");
    } finally {
      setSaving(false);
    }
  }

  async function handleExport() {
    try {
      const blob = await downloadSessions();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cognidetect_sessions.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Export failed.");
    }
  }

  const tabs = [
    { id: "questions" as Tab, label: "Questions", icon: ClipboardList },
    { id: "symptoms" as Tab, label: "Symptoms", icon: Tags },
    { id: "suggestions" as Tab, label: "Suggestions", icon: Lightbulb },
    { id: "database" as Tab, label: "Database", icon: Database },
  ];

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={28} className="text-brand-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black">Admin Dashboard</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Manage CogniDetectAI configuration
          </p>
        </div>
        <button onClick={onLogout} className="btn-ghost flex items-center gap-2 text-sm">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 border"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-brand-gradient text-white shadow-md"
                  : "hover:bg-brand-purple/10"
              }`}
              style={activeTab !== tab.id ? { color: "var(--text-muted)" } : {}}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="card min-h-[300px]">
        {activeTab === "questions" && (
          <div>
            <h3 className="font-semibold mb-1">Questionnaire (27 DSM-5 Questions)</h3>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              One question per line. The order determines the feature columns used by the Random Forest.
            </p>
            <textarea
              className="input resize-none font-mono text-xs"
              rows={14}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />
          </div>
        )}

        {activeTab === "symptoms" && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-1">NLP Symptom Categories</h3>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              Comma-separated symptom keywords for each category.
            </p>
            {[
              { label: "S1 — Attention / ADHD", value: s1, set: setS1 },
              { label: "S2 — Mood / Depression", value: s2, set: setS2 },
              { label: "S3 — Anxiety", value: s3, set: setS3 },
              { label: "S4 — Social Communication", value: s4, set: setS4 },
              { label: "S5 — Restricted / Repetitive", value: s5, set: setS5 },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold mb-1.5">{f.label}</label>
                <textarea
                  className="input resize-none text-sm"
                  rows={2}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "suggestions" && (
          <div>
            <h3 className="font-semibold mb-1">Clinical Suggestions</h3>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              JSON object. Keys: disorder name → Mild / Moderate / High.
            </p>
            <textarea
              className="input resize-none font-mono text-xs"
              rows={14}
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
            />
          </div>
        )}

        {activeTab === "database" && (
          <div className="flex flex-col items-center justify-center h-48 gap-4 text-center">
            <Database size={36} className="text-brand-purple opacity-50" />
            <div>
              <h3 className="font-semibold mb-1">Export Session Data</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Download all screening sessions as a CSV file.
              </p>
              <button
                onClick={handleExport}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={16} />
                Download Database CSV
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save button (not shown on database tab) */}
      {activeTab !== "database" && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle size={16} />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      )}
    </div>
  );
}
