export type LangCode = "en" | "hi" | "mr" | "de" | "zh-CN";

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
];

export interface Demographics {
  age: number;
  gender: string;
  country: string;
  grade: string;
}

export interface NLPQuestion {
  text: string;
  cat: string;
}

export interface NLPResult {
  q: string;
  a: string;
  analysis: string;
  diagnosis: string;
  confidence: number;
}

export interface FinalResult {
  diagnosis: string;
  confidence: number;
  severity: string;
  suggestion: string;
  all_probs: Record<string, number>;
  method: string;
}

export interface SymptomSelection {
  selected: string[];
  duration: string;
}

export interface SymptomSelections {
  S1: SymptomSelection;
  S2: SymptomSelection;
  S3: SymptomSelection;
  S4: SymptomSelection;
  S5: SymptomSelection;
  custom: string;
}

export interface SymptomData {
  [category: string]: { symptoms: string[]; duration: string };
}

export type ScreeningStep =
  | "consent"
  | "demographics"
  | "questionnaire"
  | "transition"
  | "nlp_setup"
  | "interview"
  | "results";

export interface ScreeningState {
  step: ScreeningStep;
  language: LangCode;
  demographics: Demographics | null;
  questionnaireResponses: number[];
  currentQIndex: number;
  rfProbs: Record<string, number> | null;
  detectedConditions: string[];
  nlpQuestions: NLPQuestion[] | null;
  nlpAnswers: Record<number, string>;
  nlpResults: NLPResult[];
  nlpProbsList: number[][];
  currentNLPIndex: number;
  finalResult: FinalResult | null;
  sessionSaved: boolean;
  medicalHistory: string[];
  symptomSelections: SymptomSelections;
  skippedNLP: boolean;
}

export const INITIAL_SYMPTOM_SELECTIONS: SymptomSelections = {
  S1: { selected: [], duration: "" },
  S2: { selected: [], duration: "" },
  S3: { selected: [], duration: "" },
  S4: { selected: [], duration: "" },
  S5: { selected: [], duration: "" },
  custom: "",
};

export const SCORE_LABELS: Record<number, string> = {
  0: "Never",
  1: "Rarely",
  2: "Sometimes",
  3: "Often",
  4: "Very Often",
};

export const DURATION_OPTIONS = [
  "past few days",
  "past week",
  "past 2 weeks",
  "past month",
  "past few months",
];

export const MED_HISTORY_OPTIONS = [
  "Migraine",
  "Thyroid Disorder",
  "Insomnia",
  "Anemia",
  "Epilepsy",
  "Rheumatoid Arthritis",
];

export const SEVERITY_COLORS: Record<string, string> = {
  None: "badge-success",
  Mild: "badge-purple",
  Moderate: "badge-warning",
  High: "badge-error",
};
