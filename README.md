# CogniDetectAI — The AI-Powered Psychiatric Screening System

> **Final Year BE (Computer Engineering) Project** · IEEE INSECT-2026  
> *IEEE International Conference on Intelligent and Sustainable Electronics and Computing Technologies · May 2026*  
> MMIT, Lohegaon, Pune

[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?logo=vercel)](https://cognidetectai-ssi-be.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-HuggingFace%20Spaces-yellow?logo=huggingface)](https://sankalp-indish-cognidetect.hf.space/health)
[![Backend - API DOCS](https://img.shields.io/badge/Backend-HuggingFace%20Spaces-green?logo=huggingface)](https://sankalp-indish-cognidetect.hf.space/docs)
[![Not a Medical Device](https://img.shields.io/badge/Not%20a%20Medical%20Device-Important-orange)]()

---

## What is CogniDetectAI?

CogniDetectAI is a **dual-stream multimodal AI clinical decision support system** designed to screen for potential cognitive and psychiatric disorder patterns. It combines a structured DSM-5 questionnaire analysed by Random Forest classifiers with a deep-dive AI interview analysed by a fine-tuned Mental-BERT transformer. The outputs of both streams are fused by a trained meta-fusion model to produce a final probabilistic screening result.

The system screens for five primary conditions — **ADHD, Depression, Anxiety, Autism Spectrum Disorder (ASD)**, and **Social Pragmatic Communication Disorder (SPCD)** as a differential — and assigns a severity level of **None, Mild, Moderate, or High**.

CogniDetectAI was clinically validated by two practising medical professionals, including a consulting psychiatrist, and accepted for peer-reviewed publication at IEEE INSECT-2026.

> **Disclaimer:** CogniDetectAI is a screening tool, not a diagnostic device. Results are probabilistic indicators only and do not constitute a medical diagnosis. Always consult a qualified mental health professional.

---
## Prerequisites
- Node.js ≥ 18.17
- Python 3.10+
- npm or yarn
---
## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [AI Models](#ai-models)
4. [System Flow — End to End](#system-flow--end-to-end)
5. [Component Interaction Map](#component-interaction-map)
6. [Backend — API Reference](#backend--api-reference)
7. [Frontend — Page Structure](#frontend--page-structure)
8. [Database Schema](#database-schema)
9. [NLP Inference Pipeline](#nlp-inference-pipeline)
10. [Meta-Fusion Engine](#meta-fusion-engine)
11. [Audio Processing Pipeline](#audio-processing-pipeline)
12. [Admin Portal](#admin-portal)
13. [Deployment](#deployment)
14. [Repository Structure](#repository-structure)
15. [Team](#team)

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        USER (Browser)                              │
│              Next.js 15 · Vercel · Dark/Light Theme                │
└───────────────────────────────┬────────────────────────────────────┘
                                │ HTTPS REST (JSON / FormData)
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│               FastAPI Backend · HF Spaces Docker                   │
│                        Port 8501                                   │
│                                                                    │
│   ┌─────────────────────┐       ┌──────────────────────────────┐  │
│   │   STREAM A           │       │   STREAM B                   │  │
│   │   Random Forest      │       │   Mental-BERT NLP            │  │
│   │                      │       │                              │  │
│   │  27 DSM-5 questions  │       │  AI interview (typed/voice)  │  │
│   │  Likert 0–4 scale    │       │  Whisper ASR (voice → text)  │  │
│   │  6 RF .pkl models    │       │  Guardrail pipeline          │  │
│   │  → disorder probs    │       │  → disorder probs per Q      │  │
│   └──────────┬──────────┘       └────────────┬─────────────────┘  │
│              │  RF vector (4-dim)             │  NLP vectors (N×4) │
│              └──────────────┬─────────────────┘                   │
│                             ▼                                      │
│              ┌──────────────────────────┐                          │
│              │   META-FUSION ENGINE     │                          │
│              │   model_meta_fusion.pkl  │                          │
│              │   RF 60% + NLP 40%       │                          │
│              │   → diagnosis + severity │                          │
│              └──────────────────────────┘                          │
│                             │                                      │
│              ┌──────────────┴──────────────┐                       │
│              │         SQLite DB           │  PDF Report (fpdf2)   │
│              │       cognidetect.db        │  CSV Export           │
│              └─────────────────────────────┘                       │
└────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.3.9 | React framework, App Router, SSR/CSR |
| **React** | 19 | UI component tree |
| **TypeScript** | 5 | Type safety across all components |
| **Tailwind CSS** | 3.4 | Utility-first styling, custom purple theme |
| **next-themes** | latest | Dark / light mode via CSS variables |
| **lucide-react** | latest | Icon library (Brain, Shield, Globe, etc.) |
| **Recharts** | latest | Probability bar charts in result cards |
| **Web Speech API** | Native | Text-to-speech (TTS) for reading questions aloud |
| **MediaRecorder API** | Native | Browser audio capture → WebM/Opus blob |
| **Vercel** | — | Hosting, CI/CD on push, global CDN |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | latest | REST API framework, async endpoints |
| **Python** | 3.10 | Runtime |
| **PyTorch** | 2.x | Mental-BERT model inference |
| **Transformers (HuggingFace)** | 4.x | `AutoTokenizer`, `AutoModelForSequenceClassification` |
| **scikit-learn** | latest | Random Forest classifiers, meta-fusion model |
| **OpenAI Whisper** | `base` | Speech-to-text transcription |
| **TextBlob** | latest | Sentiment analysis for NLP guardrails |
| **deep-translator** | latest | Google Translate API wrapper (multilingual UI) |
| **fpdf2** | latest | PDF screening report generation |
| **pyotp** | latest | TOTP two-factor authentication |
| **SQLite + pandas** | stdlib / latest | Session persistence, CSV export |
| **Hugging Face Spaces** | Docker SDK | Backend hosting, containerised deployment |
| **uvicorn** | latest | ASGI server |

### DevOps & Infrastructure
| Tool | Purpose |
|---|---|
| **Vercel** | Frontend deployment — automatic CI/CD on GitHub push |
| **Hugging Face Spaces (Docker)** | Backend containerised deployment — auto-rebuild on push |
| **GitHub** | Source control for frontend |
| **HF Git Remote** | Source control for backend (HF Spaces git endpoint) |

---

## AI Models

### 1. Random Forest Risk Classifier — `models/RF_risk.pkl`
- **Type:** Multi-label `RandomForestClassifier` (scikit-learn)
- **Input:** 27-feature vector of Likert-scale responses (0–4), named per DSM-5 symptom domain:
  - `ADHD_Q1–Q7` (7 features) — Focus & Attention domain
  - `ASD_Q1–Q6` (6 features) — Social / Communication domain
  - `SPCD_Q1–Q4` (4 features) — Social Pragmatic Communication domain
  - `DEP_Q1–Q5` (5 features) — Mood & Energy domain
  - `ANX_Q1–Q5` (5 features) — Stress & Anxiety domain
- **Output:** 5-dimensional binary risk vector `[ADHD, ASD, SPCD, DEP, ANX]`
- **Purpose:** Primary disorder detection gate — determines which conditions exceed risk threshold

### 2. Severity Classifiers — `models/rf_*.pkl`
Five independent RF severity models, one per condition:

| File | Condition | Output Classes |
|---|---|---|
| `rf_ADHD_sev.pkl` | ADHD | None / Mild / Moderate / High |
| `rf_ASD_sev.pkl` | Autism Spectrum Disorder | None / Mild / Moderate / High |
| `rf_SPCD_sev.pkl` | Social Pragmatic Communication Disorder | None / Mild / Moderate / High |
| `rf_DEP_sev.pkl` | Depression | None / Mild / Moderate / High |
| `rf_ANX_sev.pkl` | Anxiety | None / Mild / Moderate / High |

### 3. Mental-BERT — `models/mental_bert_model/`
- **Base:** `bert-base-uncased` fine-tuned on a mental health clinical text corpus
- **Task:** Multi-class sequence classification
- **Input:** Tokenised text response (max 128 tokens, truncated/padded)
- **Output:** Softmax probability vector over 4 classes — `[ADHD, Depression, Anxiety, Autism]`
- **Confidence threshold:** If `max(probs) < 0.45`, result is overridden to `No Significant Risk`
- **Device:** CPU inference (`fp16=False`) on HF Spaces free tier

### 4. Meta-Fusion Model — `models/model_meta_fusion.pkl`
- **Type:** Trained scikit-learn classifier (probabilistic output via `predict_proba`)
- **Input:** 8-dimensional concatenated feature vector — `[RF_4dim ‖ NLP_mean_4dim]`
- **Output:** Final probability vector over 4 disorder classes
- **Fallback:** If the `.pkl` model encounters a feature mismatch, a weighted average is computed: `RF × 0.60 + NLP_mean × 0.40`

### 5. OpenAI Whisper — `base` model
- **Task:** Automatic speech recognition (ASR)
- **Input:** Audio file (`.webm`, `.ogg`, `.mp4`, or `.wav`)
- **Output:** Transcribed text + per-segment timestamps
- **Configuration:** `language="en"`, `fp16=False`
- **Bonus signal:** Words-per-minute (WPM) computed from segment timestamps:
  - `< 110 WPM` → Slow speech — possible psychomotor retardation (Depression indicator)
  - `> 160 WPM` → Fast speech — possible Anxiety / ADHD indicator
- **Privacy:** Audio file deleted immediately after transcription via `os.unlink(tmp_path)`

---

## System Flow — End to End

```
STEP 1: DEMOGRAPHIC INTAKE
  User enters → age range, gender, country, education level
  Stored in frontend state; sent to backend only at session save.

STEP 2: DSM-5 QUESTIONNAIRE (Stream A begins)
  27 questions, Likert scale 0–4 (Never → Very Often)
  Organised into 5 neutral symptom categories:
    S1 — Focus & Attention Patterns    (Q1–Q7,   maps to ADHD)
    S2 — Mood & Energy Patterns        (Q8–Q12,  maps to ASD)
    S3 — Stress & Restlessness         (Q13–Q16, maps to SPCD)
    S4 — Social Interaction Patterns   (Q17–Q21, maps to Depression)
    S5 — Routine & Behavioural         (Q22–Q27, maps to Anxiety)

  → POST /api/questionnaire/analyze
  Backend: RF_risk.pkl predicts 5-bit binary risk vector
           Domain-score thresholds applied as fallback
  Returns: { rf_probs, detected[] }

STEP 3: SYMPTOM FLAG RESOLUTION
  Frontend maps rf_probs → boolean flags { S1, S2, S3, S4, S5 }
  Optional: user types a free-text custom symptom
    → POST /api/nlp/questions (with custom_symptom field)
    Mental-BERT classifies custom text → maps to nearest flag

  → POST /api/nlp/questions (with symptom flags)
  Backend DSM-5 logic tree selects question set:
    S1 active → questions A + E  (ADHD + Anxiety comorbidity rule)
    S2 active → questions D + E  (Depression + Anxiety comorbidity rule)
    S3 active → question E       (Anxiety only)
    S4 + S5   → question B       (ASD — social AND rigidity present)
    S4 only   → question C       (SPCD — social only, no rigidity)
    S5 only   → question B       (ASD — rigidity without social flags)
    None      → General wellbeing question (healthy-patient fallback)

STEP 4: NLP DEEP-DIVE INTERVIEW (Stream B begins)
  For each question served (typically 1–3 questions):
    a. TTS reads question aloud (Browser speechSynthesis API)
    b. User types answer (minimum 50 characters enforced)
       OR speaks (MediaRecorder → WebM/Opus blob)
    c. If voice: POST /api/audio/transcribe → Whisper → transcript
       transcript auto-fills the text box
    d. POST /api/nlp/analyze { text, category }
    e. 6-layer guardrail pipeline runs (see NLP section below)
    f. All responses collected silently; a summary of all Q&A analyses is shown after the final question before proceeding to the report.

STEP 5: META-FUSION — FINAL INFERENCE
  Frontend collects:
    rf_probs       → 4-dim probability dict  (from Step 2)
    nlp_probs_list → list of 4-dim arrays    (one per Step 4 question)

  → POST /api/inference/fuse
  Backend:
    nlp_vector   = mean(nlp_probs_list, axis=0)
    combined     = concat(rf_vector, nlp_vector)   # shape: (8,)
    final_probs  = meta_model.predict_proba(combined)
    diagnosis    = labels[argmax(final_probs)]
    if max(final_probs) < 0.35 → "No Significant Risk"
    severity     = High / Moderate / Mild / None
    suggestions  = config.json lookup by [diagnosis][severity]

STEP 6: RESULT DISPLAY
  Frontend renders:
    - Primary diagnosis + confidence percentage
    - Severity badge (colour-coded)
    - Recharts bar chart — all disorder probabilities
    - Clinical suggestions (loaded from config.json at runtime)
    - Method label: "Meta-Fusion Algorithmic AI Process"

STEP 7: SESSION SAVE + PDF DOWNLOAD
  → POST /api/session/save    — anonymised record → cognidetect.db
  → POST /api/report/generate — FPDF2 generates 3-page PDF:
      Page 1:  Demographics + Final Assessment + Suggestions
      Page 2:  Annexure 1 — All 27 questionnaire Q&A (score labels)
      Page 3:  Annexure 2 — NLP interview transcript + analysis strings
```

---

## Component Interaction Map

```
frontend/
│
├── app/page.tsx                    Landing page
├── app/screen/page.tsx             Screening orchestrator
│   │
│   ├── components/screening/
│   │   ├── ScreeningFlow.tsx     Step state machine (1 → 2 → 3 → 4 → 5 → 6)
│   │   │
│   │   ├── steps/
│   │   │   ├── ConsentStep.tsx           Consent + disclaimer
│   │   │   ├── DemographicsStep.tsx     Age, gender, country, education
│   │   │   ├── QuestionnaireStep.tsx   27-question Likert survey
│   │   │   │    └── POST /api/questionnaire/analyze
│   │   │   ├── NLPSetupStep.tsx        Custom symptom text input
│   │   │   │    └── POST /api/nlp/questions
│   │   │   ├── InterviewStep.tsx       AI deep-dive interview
│   │   │   │    ├── TTS: window.speechSynthesis.speak()
│   │   │   │    ├── STT: MediaRecorder → POST /api/audio/transcribe
│   │   │   │    └── POST /api/nlp/analyze  (per question)
│   │   │   └── ResultsStep.tsx         Final result + PDF download
│   │   │        ├── POST /api/inference/fuse
│   │   │        ├── POST /api/session/save
│   │   │        └── POST /api/report/generate
│   │   │
│   │   └── ui/
│   │       ├── ProgressBar.tsx
│   │       ├── QuestionCard.tsx
│   │       └── ResultCard.tsx
│   │
│   └── lib/
│       ├── api.ts              All fetch() wrappers to FastAPI
│       ├── types.ts            TypeScript interfaces + LangCode
│       └── translations.ts     Static UI string map (5 languages)
│
├── components/
│   ├── Navbar.tsx              Fixed top nav; hamburger on mobile
│   ├── Footer.tsx              Shared footer (all pages)
│   └── landing/
│       ├── Hero.tsx
│       ├── ConditionCards.tsx
│       ├── HowItWorks.tsx
│       └── ResearchSection.tsx
│
└── app/
    ├── novelty/page.tsx        Why CogniDetectai vs general LLMs
    ├── team/page.tsx           Team members + roles
    ├── terms/page.tsx          Terms & Conditions
    ├── privacy/page.tsx        Privacy Policy
    ├── admin/page.tsx          2FA-protected admin portal
    ├── loading.tsx             Route-level loading animation (Next.js)
    ├── layout.tsx              Root layout, metadata, favicon
    └── globals.css             CSS variables, shared component classes


backend/
│
├── api.py                      FastAPI app + all endpoints + PDF logic
├── inference_engine.py         ClinicalAI class + DSM-5 logic tree
├── audio_processing.py         AudioAnalyzer — Whisper wrapper + WPM
├── database_manager.py         SQLite init / save / CSV export
├── config.json                 Questions, NLP questions, suggestions
│                               (runtime-editable via admin portal)
│
└── models/
    ├── RF_risk.pkl
    ├── rf_ADHD_sev.pkl
    ├── rf_ASD_sev.pkl
    ├── rf_SPCD_sev.pkl
    ├── rf_DEP_sev.pkl
    ├── rf_ANX_sev.pkl
    ├── model_meta_fusion.pkl
    └── mental_bert_model/
        ├── config.json
        ├── pytorch_model.bin
        ├── tokenizer_config.json
        └── vocab.txt
```

---

## Backend — API Reference

Base URL: `https://<your-hf-space>.hf.space`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check — confirms models loaded |
| `GET` | `/api/config` | Returns questions, symptoms, NLP questions from `config.json` |
| `POST` | `/api/translate` | Translates UI text array to target language via Google Translate |
| `POST` | `/api/questionnaire/analyze` | Runs `RF_risk.pkl` on 27 Likert responses; returns disorder probabilities |
| `POST` | `/api/nlp/questions` | DSM-5 logic tree: symptom flags → targeted question set |
| `POST` | `/api/nlp/analyze` | Mental-BERT inference on a single text response |
| `POST` | `/api/audio/transcribe` | Whisper ASR — audio file → transcript + WPM |
| `POST` | `/api/inference/fuse` | Meta-fusion: RF + NLP vectors → final diagnosis + severity |
| `POST` | `/api/session/save` | Persists anonymised session to SQLite |
| `POST` | `/api/report/generate` | Generates 3-page PDF report (fpdf2) |
| `POST` | `/api/admin/verify-password` | Step 1 of admin 2FA — password check |
| `POST` | `/api/admin/verify-totp` | Step 2 of admin 2FA — TOTP check (pyotp) |
| `GET` | `/api/admin/config` | Returns full `config.json` to admin panel |
| `PUT` | `/api/admin/config` | Overwrites `config.json` (question / suggestion editing) |
| `GET` | `/api/admin/sessions` | Exports all sessions as CSV download |

---

## Frontend — Page Structure

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing — Hero, condition cards, pipeline diagram, research |
| `/screen` | `app/screen/page.tsx` | Full 6-step screening wizard |
| `/novelty` | `app/novelty/page.tsx` | Clinical validation, vs-LLM comparison table, known limitations |
| `/team` | `app/team/page.tsx` | Team members, roles, LinkedIn links |
| `/terms` | `app/terms/page.tsx` | Terms & Conditions (11 sections) |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy (14 sections) |
| `/admin` | `app/admin/page.tsx` | Password + TOTP → session export + config editor |

**Multilingual Support:** English · Hindi (`hi`) · Marathi (`mr`) · German (`de`) · Mandarin Chinese (`zh-CN`)  
Static UI strings translated via `lib/translations.ts`; dynamic content (questions, suggestions) translated at runtime via `/api/translate` (Google Translate).

---

## Database Schema

**File:** `cognidetect.db` (SQLite)  
**Table:** `user_sessions`

| Column | Type | Description |
|---|---|---|
| `id` | `INTEGER PK` | Auto-increment row ID |
| `timestamp` | `TEXT` | `YYYY-MM-DD HH:MM:SS` |
| `age` | `INTEGER` | Age range (self-reported) |
| `gender` | `TEXT` | Self-reported gender |
| `country` | `TEXT` | Country of user |
| `grade` | `TEXT` | Education level |
| `questionnaire_answers` | `TEXT` | Serialised list of 27 Likert responses |
| `questionnaire_risk_score` | `TEXT` | Serialised RF probability dict |
| `nlp_q_and_a` | `TEXT` | Pipe-separated `Q: ... A: ...` transcript |
| `nlp_diagnosis` | `TEXT` | Final NLP question diagnosis label |
| `final_diagnosis` | `TEXT` | Meta-fusion final diagnosis label |

No PII — no name, email, IP address, or device identifier is collected or stored at any point.

---

## NLP Inference Pipeline

Every text response passes through a **6-layer guardrail pipeline** before reaching Mental-BERT. This prevents keyword bias from producing false positives on benign phrasing.

```
Text Input
    │
    ▼
[GUARDRAIL 1] Lexical Negation Check  (short answers < 30 words)
    │  Explicit denials ("no", "I am fine", "not struggle")
    │  → No Significant Risk (conf: 0.90–0.95)
    │  Short-circuits all further processing
    │
    ▼
[GUARDRAIL 2] Physical / Medical Ailment Check
    │  Physical keywords present (pain, arthritis, migraine, thyroid...)
    │  AND no cognitive keywords present (worry, anxious, sad, focus...)
    │  AND question category is "General"
    │  → No Significant Risk (conf: 0.85)
    │
    ▼
[GUARDRAIL 3] Sentiment Gate  (TextBlob polarity)
    │  polarity > 0.25 → No Significant Risk (conf: 0.95)
    │
    ▼
[GUARDRAIL 4] Negation + Sentiment Combined Gate
    │  negation word present AND polarity > 0.05
    │  → No Significant Risk (conf: 0.90)
    │
    ▼
[GUARDRAIL 5] Context-Aware Diagnosis
    │  question_category provided AND polarity < 0.10
    │  Category → Disorder mapping:
    │    A → ADHD       D → Depression    E → Anxiety
    │    B → Autism     C → SPCD
    │  → Contextual diagnosis (conf: 0.85 + |sentiment|/2)
    │
    ▼
[GUARDRAIL 6] Mental-BERT Inference  (final fallback)
    │  tokenise → BERT forward pass → softmax probs[4]
    │  if max(probs) < 0.45 → No Significant Risk
    │  else → { diagnosis, confidence, probs[4], analysis_string }
    │
    ▼
Output: { diagnosis, confidence, probs[4], analysis }
```

---

## Meta-Fusion Engine

```python
# Conceptual representation of ClinicalAI.run_meta_fusion()

rf_vector  = [P(ADHD), P(Depression), P(Anxiety), P(Autism)]  # Stream A
nlp_vector = mean([probs_q1, probs_q2, ..., probs_qN], axis=0) # Stream B mean

combined = concat(rf_vector, nlp_vector)  # shape: (8,)

# PRIMARY — trained meta-fusion .pkl model
final_probs = meta_model.predict_proba(combined.reshape(1, -1))[0]

# FALLBACK — if .pkl fails (feature mismatch)
final_probs = rf_vector * 0.60 + nlp_vector * 0.40

# Decision boundary
if max(final_probs) < 0.35:
    diagnosis = "No Significant Risk"
    confidence = 1.0 - max(final_probs)
else:
    diagnosis  = labels[argmax(final_probs)]
    confidence = max(final_probs)

# Severity mapping
severity = "High"     if confidence > 0.80
severity = "Moderate" if 0.50 <= confidence <= 0.80
severity = "Mild"     if confidence < 0.50
severity = "None"     if diagnosis == "No Significant Risk"
```

---

## Audio Processing Pipeline

```
User clicks Record
    │
    ▼
Browser MediaRecorder API captures microphone
    ├── Chrome / Edge  →  audio/webm;codecs=opus
    ├── Firefox        →  audio/ogg;codecs=opus
    └── Safari         →  audio/mp4
    │
    ▼
Frontend (lib/api.ts) assembles FormData
    └── Filename set from content-type:
        "ogg" → recording.ogg  |  "mp4/m4a" → recording.mp4
        "wav" → recording.wav  |  default   → recording.webm
    │
    ▼
POST /api/audio/transcribe  (multipart/form-data)
    │
    ▼
Backend detects suffix from content_type header
    └── Writes to named tempfile with correct extension
    │
    ▼
Whisper base model
    └── model.transcribe(path, language="en", fp16=False)
    └── Extracts: text, segments[].end  (timestamps)
    │
    ▼
WPM calculation
    └── words / duration_seconds × 60
    ├── < 110 WPM → "Slow (Possible Depression Indicator)"
    └── > 160 WPM → "Fast (Possible Anxiety/ADHD Indicator)"
    │
    ▼
os.unlink(tmp_path)   ← audio file permanently deleted
    │
    ▼
Return: { text, speech_rate }
    └── text auto-fills the interview answer box
```

---

## Admin Portal

Access at `/admin` — protected by **two-factor authentication**:

1. **Step 1 — Password:** Checked against `ADMIN_PASSWORD` environment variable (HF Spaces secret), falling back to `config.json → admin_password`
2. **Step 2 — TOTP:** 6-digit time-based OTP verified via `pyotp.TOTP(secret).verify(code)` against `TOTP_SECRET` environment variable

**Setup (HF Spaces):**
1. Go to your HF Space → **Settings** → **Variables and secrets**
2. Add secret `ADMIN_PASSWORD` = your chosen password
3. Add secret `TOTP_SECRET` = a base32 string (e.g. `JBSWY3DPEHPK3PXP`)
4. Open **Google Authenticator** → `+` → **Enter a setup key** → paste the same base32 string

**Admin capabilities:**
- Export all screening sessions as CSV (`GET /api/admin/sessions`)
- View and live-edit `config.json` — questions, NLP interview questions, clinical suggestions per condition and severity level
- All config changes take effect immediately without any redeploy

---

## Deployment

### Frontend — Vercel

```bash
cd frontend
git add .
git commit -m "your message"
git push origin main
# Vercel auto-deploys on every push to main
```

Environment variable required in Vercel dashboard:
```
NEXT_PUBLIC_API_URL = https://<your-hf-space>.hf.space
```

### Backend — Hugging Face Spaces (Docker)

```bash
# From repository root
git add api.py inference_engine.py audio_processing.py database_manager.py config.json
git commit -m "your message"
git push https://huggingface.co/spaces/<username>/cognidetect-api main
# HF Space rebuilds Docker container automatically
```

Required secrets in HF Spaces settings:
```
ADMIN_PASSWORD = <your-admin-password>
TOTP_SECRET    = <your-base32-totp-secret>
```

The Space exposes port `8501`. All question text, NLP questions, and clinical suggestions are controlled by `config.json` at runtime — editable live through the admin portal without any redeploy.

---
## Local Development

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
npm run dev
```
**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload

⚠️ ffmpeg required for voice transcription
Whisper (used by /api/audio/transcribe) requires ffmpeg to decode .webm audio recorded by the browser. Without it, voice input will return a 500 error.
Windows: Download from https://www.gyan.dev/ffmpeg/builds/ → extract → add C:\ffmpeg\bin to your system PATH.
macOS: brew install ffmpeg
Linux: sudo apt install ffmpeg
Verify: ffmpeg -version in a new terminal.
```
---
## Repository Structure

```
CogniDetectAI/
│
├── frontend/                       Next.js 15 application
│   ├── app/
│   │   ├── layout.tsx              Root layout, metadata, favicon SVG
│   │   ├── loading.tsx             Route-level loading animation
│   │   ├── globals.css             CSS variables + shared component classes
│   │   ├── page.tsx                Landing page
│   │   ├── screen/page.tsx         Screening wizard (6 steps)
│   │   ├── novelty/page.tsx        Why CogniDetectAI — clinical validation
│   │   ├── team/page.tsx           Team members and roles
│   │   ├── terms/page.tsx          Terms & Conditions
│   │   ├── privacy/page.tsx        Privacy Policy
│   │   └── admin/page.tsx          Admin portal (2FA protected)
│   ├── components/
│   │   ├── Navbar.tsx              Fixed navbar with mobile hamburger
│   │   ├── Footer.tsx              Shared footer (all pages)
│   │   ├── landing/                Landing page section components
│   │   └── screening/              Wizard steps + UI sub-components
│   ├── lib/
│   │   ├── api.ts                  All FastAPI fetch() wrappers
│   │   ├── types.ts                Shared TypeScript interfaces
│   │   └── translations.ts         Static multilingual string map
│   ├── public/
│   │   └── favicon.svg             Purple gradient brain icon
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── package.json
│
├── models/                         Trained ML model files
│   ├── RF_risk.pkl
│   ├── rf_ADHD_sev.pkl
│   ├── rf_ASD_sev.pkl
│   ├── rf_SPCD_sev.pkl
│   ├── rf_DEP_sev.pkl
│   ├── rf_ANX_sev.pkl
│   ├── model_meta_fusion.pkl
│   └── mental_bert_model/
│
├── api.py                          FastAPI application (15 endpoints + PDF)
├── inference_engine.py             ClinicalAI class + DSM-5 logic tree
├── audio_processing.py             Whisper ASR wrapper + WPM detection
├── database_manager.py             SQLite session management + CSV export
├── config.json                     Runtime configuration (admin-editable)
├── requirements.txt                Python dependencies
└── README.md
```
**Note:** The frontend and backend are two separate Git repositories. The tree above reflects the consolidated local development folder only. The frontend is hosted on GitHub → Vercel; the backend is hosted on Hugging Face Spaces Git → Docker.
---

## Team

| Name | Role |
|---|---|
| **Sankalp Indish** | Lead Developer & Team Lead — complete end-to-end SDLC; designed and implemented the dual-stream AI pipeline (Random Forest + Mental-BERT), FastAPI backend, Next.js frontend, meta-fusion inference engine, and all 15 API endpoints. Model deployment and maintenance. Complete research paper with self-made diagrams. Paper: 3% AI-generated content, 5% plagiarism score. |
| **Dr. Monika Dangore** | Research Supervisor & Project Mentor — academic guidance, clinical domain expertise, DSM-5 methodology review, and supervision throughout the project. Ensured alignment with psychiatric screening standards for INSECT-2026 submission. |
| **Aishwarya Borse** | Research Contributor — project diagrams, report and presentation edits, and the documentation component of the research paper. |
| **Rashi Madne** | Research Contributor — authored the Version 1 project paper and conducted the literature survey that underpins the research background and related works section. |

**Institution:** MMIT — Marathwada Mitra Mandal's Institute of Technology, Lohegaon, Pune  
**Publication:** IEEE INSECT-2026 — International Conference on Intelligent and Sustainable Electronics and Computing Technologies · May 2026

---

*CogniDetectAI is provided for research and educational purposes only. It is not a certified medical device and must not be used as a substitute for professional psychiatric evaluation.*
