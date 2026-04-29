"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Download, RotateCcw, Home, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import type { FinalResult, LangCode, NLPResult, Demographics, SymptomSelections } from "@/lib/types";
import { SEVERITY_COLORS } from "@/lib/types";
import { t } from "@/lib/translations";
import { generateReport } from "@/lib/api";

interface ResultsStepProps {
  language: LangCode;
  finalResult: FinalResult;
  demographics: Demographics;
  rfAnswers: number[];
  nlpResults: NLPResult[];
  symptomSelections: SymptomSelections;
  medHistory: string[];
  onNewScreening: () => void;
}

const BAR_COLOR_MAP: Record<string, string> = {
  ADHD: "#F59E0B",
  Depression: "#EF4444",
  Anxiety: "#8B5CF6",
  Autism: "#10B981",
  "No Significant Risk": "#10B981",
};

export default function ResultsStep({
  language,
  finalResult,
  demographics,
  rfAnswers,
  nlpResults,
  symptomSelections,
  medHistory,
  onNewScreening,
}: ResultsStepProps) {
  const [downloading, setDownloading] = useState(false);

  const chartData = Object.entries(finalResult.all_probs).map(([name, value]) => ({
    name,
    value: Math.round(value * 100),
    fill: BAR_COLOR_MAP[name] ?? "#667eea",
  }));

  const isHealthy = finalResult.diagnosis === "No Significant Risk";
  const sevClass = SEVERITY_COLORS[finalResult.severity] ?? "badge-purple";

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await generateReport(
        demographics,
        { responses: rfAnswers },
        nlpResults,
        finalResult,
        symptomSelections,
        medHistory
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CogniDetect_Report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isHealthy
            ? "bg-emerald-500/15 border-2 border-emerald-500/30"
            : "bg-amber-500/15 border-2 border-amber-500/30"
        }`}>
          {isHealthy ? (
            <CheckCircle size={32} className="text-emerald-400" />
          ) : (
            <AlertTriangle size={32} className="text-amber-400" />
          )}
        </div>
        <h2 className="text-2xl font-black mb-1">{t("results", language)}</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Method: {finalResult.method}
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>
            {t("diagnosis", language)}
          </div>
          <div className={`text-sm font-bold ${isHealthy ? "text-emerald-400" : "text-amber-400"}`}>
            {finalResult.diagnosis}
          </div>
        </div>
        <div className="card text-center">
          <div className="text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>
            {t("confidence", language)}
          </div>
          <div className="text-sm font-bold gradient-text">
            {(finalResult.confidence * 100).toFixed(1)}%
          </div>
        </div>
        <div className="card text-center">
          <div className="text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>
            {t("severity", language)}
          </div>
          <div className={`badge ${sevClass} mx-auto text-xs`}>
            {finalResult.severity}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-6">
        <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          Probability Profile
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Probability"]}
              contentStyle={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Suggestion */}
      <div className={`card mb-6 border-${isHealthy ? "emerald" : "amber"}-500/30`}>
        <h3 className="font-semibold mb-2 text-sm">{t("suggestion", language)}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {finalResult.suggestion}
        </p>
      </div>

      {/* Disclaimer */}
      <div
        className="text-xs px-4 py-3 rounded-xl border mb-6 leading-relaxed"
        style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <strong>Disclaimer:</strong> This assessment is an AI-generated screening
        result and does NOT constitute a medical diagnosis. Please consult a
        qualified mental health professional for a formal evaluation.
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {downloading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download size={16} />
              {t("downloadPDF", language)}
            </>
          )}
        </button>
        <button
          onClick={onNewScreening}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw size={16} />
          {t("newScreening", language)}
        </button>
        <a href="/" className="btn-ghost flex items-center gap-2">
          <Home size={16} />
        </a>
      </div>
    </div>
  );
}
