"use client";

import { Shield, GitMerge, Brain, Trees } from "lucide-react";

const guardrails = [
  {
    id: "G1",
    title: "Sentiment & Negation",
    desc: "TextBlob analyses polarity. High positive sentiment immediately flags no risk.",
  },
  {
    id: "G2",
    title: "Lexical Negation Override",
    desc: "Direct denials ('No', 'I am fine') override model predictions for short answers.",
  },
  {
    id: "G3",
    title: "Physical Ailment Filter",
    desc: "Mentions of purely physical conditions are excluded from psychiatric inference.",
  },
  {
    id: "G4",
    title: "Mental-BERT Inference",
    desc: "Fine-tuned BERT classifier (4 classes) provides fallback probabilistic diagnosis.",
  },
];

export default function PipelineSection() {
  return (
    <section
      id="pipeline"
      className="py-24 px-4 sm:px-6"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="badge-purple mx-auto mb-4">Under the Hood</div>
          <h2 className="section-title">
            The <span className="gradient-text">Dual-Stream Pipeline</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            CogniDetect&apos;s inference engine combines classical machine learning
            with transformer-based NLP, connected by a trained Meta-Fusion
            ensemble.
          </p>
        </div>

        {/* Pipeline visual */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
          {/* Stream A */}
          <div className="card border-amber-500/25">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <Trees size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-sm">Stream A</div>
                <div className="text-xs text-amber-400">Structured Input</div>
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              27 DSM-5 questions → Random Forest classifiers → Probability
              vector (ADHD, Depression, Anxiety, Autism)
            </p>
            <div className="space-y-2">
              {["RF_risk.pkl", "rf_ADHD_sev.pkl", "rf_DEP_sev.pkl", "rf_ANX_sev.pkl", "rf_ASD_sev.pkl"].map(
                (m) => (
                  <div
                    key={m}
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}
                  >
                    {m}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Fusion */}
          <div className="card border-brand-purple/40 flex flex-col items-center justify-center text-center lg:-my-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 shadow-lg shadow-brand-purple/30">
              <GitMerge size={24} className="text-white" />
            </div>
            <h3 className="font-bold mb-2">Meta-Fusion</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Trained ensemble model combines both streams
            </p>
            <div className="flex gap-3 justify-center mb-4">
              <div className="badge-purple">RF × 0.6</div>
              <div className="badge-purple">NLP × 0.4</div>
            </div>
            <div
              className="text-xs font-mono px-3 py-2 rounded-lg w-full"
              style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}
            >
              model_meta_fusion.pkl
            </div>
          </div>

          {/* Stream B */}
          <div className="card border-purple-500/25">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <Brain size={18} className="text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-sm">Stream B</div>
                <div className="text-xs text-purple-400">Unstructured Input</div>
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Voice / text responses → Whisper ASR → 4-layer guardrails →
              Mental-BERT classification
            </p>
            <div className="space-y-2">
              {["mental_bert_model/", "tfidf_vectorizer.pkl", "model_base_nlp.pkl", "Whisper (base)", "TextBlob Guardrails"].map(
                (m) => (
                  <div
                    key={m}
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}
                  >
                    {m}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Shield size={18} className="text-brand-purple" />
            <h3 className="font-bold text-lg">4-Layer Clinical Guardrails</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guardrails.map((g) => (
              <div key={g.id} className="card-hover">
                <div className="badge-purple mb-3">{g.id}</div>
                <h4 className="font-semibold mb-2 text-sm">{g.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
