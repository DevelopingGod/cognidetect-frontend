import type {
  Demographics,
  FinalResult,
  LangCode,
  NLPQuestion,
  NLPResult,
  SymptomSelections,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7860";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(err);
  }
  return res.json() as Promise<T>;
}

// ── Config ────────────────────────────────────────────────────────────────────

export interface AppConfig {
  questions: string[];
  symptoms: Record<string, string[]>;
  nlp_questions: Record<string, string>;
}

export async function fetchConfig(): Promise<AppConfig> {
  return request<AppConfig>("/api/config");
}

// ── Translation ───────────────────────────────────────────────────────────────

export async function translateTexts(
  texts: string[],
  targetLang: LangCode
): Promise<string[]> {
  if (targetLang === "en") return texts;
  const data = await request<{ translated: string[] }>("/api/translate", {
    method: "POST",
    body: JSON.stringify({ texts, target_lang: targetLang }),
  });
  return data.translated;
}

// ── Questionnaire ─────────────────────────────────────────────────────────────

export interface QuestionnaireResult {
  rf_probs: Record<string, number>;
  detected: string[];
}

export async function analyzeQuestionnaire(
  responses: number[]
): Promise<QuestionnaireResult> {
  return request<QuestionnaireResult>("/api/questionnaire/analyze", {
    method: "POST",
    body: JSON.stringify({ responses }),
  });
}

// ── NLP Questions ─────────────────────────────────────────────────────────────

export async function getNLPQuestions(
  flags: { s1: boolean; s2: boolean; s3: boolean; s4: boolean; s5: boolean },
  customSymptom?: string
): Promise<NLPQuestion[]> {
  const data = await request<{ questions: NLPQuestion[] }>(
    "/api/nlp/questions",
    {
      method: "POST",
      body: JSON.stringify({ ...flags, custom_symptom: customSymptom || null }),
    }
  );
  return data.questions;
}

// ── NLP Analysis ──────────────────────────────────────────────────────────────

export interface NLPAnalysisResult {
  diagnosis: string;
  confidence: number;
  probs: number[];
  analysis: string;
}

export async function analyzeNLP(
  text: string,
  category?: string
): Promise<NLPAnalysisResult> {
  return request<NLPAnalysisResult>("/api/nlp/analyze", {
    method: "POST",
    body: JSON.stringify({ text, category: category || null }),
  });
}

// ── Audio ─────────────────────────────────────────────────────────────────────

export async function transcribeAudio(
  audioBlob: Blob
): Promise<{ text: string; speech_rate: number | null }> {
  const type = audioBlob.type || "audio/webm";
  const ext = type.includes("ogg") ? "ogg" : type.includes("mp4") || type.includes("m4a") ? "mp4" : "webm";
  const formData = new FormData();
  formData.append("file", audioBlob, `recording.${ext}`);

  const res = await fetch(`${BASE}/api/audio/transcribe`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

// ── Inference ─────────────────────────────────────────────────────────────────

export async function runMetaFusion(
  rfProbs: Record<string, number>,
  nlpProbsList: number[][]
): Promise<FinalResult> {
  return request<FinalResult>("/api/inference/fuse", {
    method: "POST",
    body: JSON.stringify({ rf_probs: rfProbs, nlp_probs_list: nlpProbsList }),
  });
}

// ── Session ───────────────────────────────────────────────────────────────────

export async function saveSession(
  demographics: Demographics,
  rfAnswers: number[],
  rfRisk: Record<string, number>,
  nlpData: NLPResult[] | null,
  finalDiagnosis: string,
  symptomSelections: SymptomSelections
): Promise<void> {
  const symptomData: Record<string, { symptoms: string[]; duration: string }> =
    {};
  if (symptomSelections.S1.selected.length)
    symptomData["Attention / ADHD"] = {
      symptoms: symptomSelections.S1.selected,
      duration: symptomSelections.S1.duration,
    };
  if (symptomSelections.S2.selected.length)
    symptomData["Mood / Depression"] = {
      symptoms: symptomSelections.S2.selected,
      duration: symptomSelections.S2.duration,
    };
  if (symptomSelections.S3.selected.length)
    symptomData["Anxiety"] = {
      symptoms: symptomSelections.S3.selected,
      duration: symptomSelections.S3.duration,
    };
  if (symptomSelections.S4.selected.length)
    symptomData["Social Communication"] = {
      symptoms: symptomSelections.S4.selected,
      duration: symptomSelections.S4.duration,
    };
  if (symptomSelections.S5.selected.length)
    symptomData["Restricted / Repetitive"] = {
      symptoms: symptomSelections.S5.selected,
      duration: symptomSelections.S5.duration,
    };

  await request("/api/session/save", {
    method: "POST",
    body: JSON.stringify({
      user_data: { ...demographics, symptom_data: symptomData, med_hist: [] },
      rf_answers: rfAnswers,
      rf_risk: rfRisk,
      nlp_data: nlpData,
      final_diagnosis: finalDiagnosis,
    }),
  });
}

// ── Report ────────────────────────────────────────────────────────────────────

export async function generateReport(
  demographics: Demographics,
  rfData: { responses: number[]; questions?: string[] },
  nlpData: NLPResult[],
  finalResult: FinalResult,
  symptomSelections: SymptomSelections,
  medicalHistory: string[]
): Promise<Blob> {
  const symptomData: Record<string, { symptoms: string[]; duration: string }> =
    {};
  if (symptomSelections.S1.selected.length)
    symptomData["Attention / ADHD"] = {
      symptoms: symptomSelections.S1.selected,
      duration: symptomSelections.S1.duration,
    };
  if (symptomSelections.S2.selected.length)
    symptomData["Mood / Depression"] = {
      symptoms: symptomSelections.S2.selected,
      duration: symptomSelections.S2.duration,
    };
  if (symptomSelections.S3.selected.length)
    symptomData["Anxiety"] = {
      symptoms: symptomSelections.S3.selected,
      duration: symptomSelections.S3.duration,
    };
  if (symptomSelections.S4.selected.length)
    symptomData["Social Communication"] = {
      symptoms: symptomSelections.S4.selected,
      duration: symptomSelections.S4.duration,
    };
  if (symptomSelections.S5.selected.length)
    symptomData["Restricted / Repetitive"] = {
      symptoms: symptomSelections.S5.selected,
      duration: symptomSelections.S5.duration,
    };

  const res = await fetch(`${BASE}/api/report/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_data: {
        ...demographics,
        symptom_data: symptomData,
        med_hist: medicalHistory,
      },
      rf_data: rfData,
      nlp_data: nlpData,
      final_result: finalResult,
    }),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.blob();
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export async function adminVerifyPassword(password: string): Promise<boolean> {
  try {
    await request("/api/admin/verify-password", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    return true;
  } catch {
    return false;
  }
}

export async function adminVerifyTOTP(code: string): Promise<boolean> {
  try {
    await request("/api/admin/verify-totp", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    return true;
  } catch {
    return false;
  }
}

export async function fetchAdminConfig(): Promise<Record<string, unknown>> {
  return request("/api/admin/config");
}

export async function updateAdminConfig(
  config: Record<string, unknown>
): Promise<void> {
  await request("/api/admin/config", {
    method: "PUT",
    body: JSON.stringify({ config }),
  });
}

export async function downloadSessions(): Promise<Blob> {
  const res = await fetch(`${BASE}/api/admin/sessions`);
  if (!res.ok) throw new Error(res.statusText);
  return res.blob();
}
