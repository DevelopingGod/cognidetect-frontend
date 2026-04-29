import type { LangCode } from "./types";

type TranslationKey =
  | "startScreening"
  | "adminPortal"
  | "learnMore"
  | "language"
  | "darkMode"
  | "lightMode"
  | "next"
  | "back"
  | "submit"
  | "loading"
  | "agree"
  | "iAgree"
  | "backToHome"
  | "consent"
  | "consentTitle"
  | "demographics"
  | "questionnaire"
  | "interview"
  | "results"
  | "age"
  | "gender"
  | "country"
  | "education"
  | "male"
  | "female"
  | "other"
  | "highSchool"
  | "undergraduate"
  | "postgraduate"
  | "phd"
  | "startQuestionnaire"
  | "analyzeResults"
  | "questionOf"
  | "howOften"
  | "never"
  | "rarely"
  | "sometimes"
  | "often"
  | "veryOften"
  | "yesStartInterview"
  | "skipToResults"
  | "generateQuestions"
  | "medicalHistory"
  | "otherSymptom"
  | "recordAnswer"
  | "typeAnswer"
  | "startRecording"
  | "stopRecording"
  | "transcribeAudio"
  | "transcribing"
  | "nextQuestion"
  | "generateAnalysis"
  | "viewDashboard"
  | "diagnosis"
  | "confidence"
  | "severity"
  | "suggestion"
  | "downloadPDF"
  | "newScreening"
  | "adminPassword"
  | "totpCode"
  | "verifyPassword"
  | "verifyOTP"
  | "logout"
  | "saveChanges"
  | "exportCSV"
  | "termsLink"
  | "privacyLink"
  | "disclaimer"
  | "inputMode"
  | "voiceRecorder"
  | "textInput"
  | "analyzing"
  | "pleaseReplyEnglish"
  | "questionnaireComplete";

type Translations = Record<TranslationKey, string>;
type TranslationMap = Record<LangCode, Translations>;

const translations: TranslationMap = {
  en: {
    startScreening: "Begin Screening",
    adminPortal: "Admin Portal",
    learnMore: "Learn More",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    next: "Next",
    back: "Back",
    submit: "Submit",
    loading: "Loading...",
    agree: "I have read and agree to the terms above.",
    iAgree: "I Agree & Wish to Proceed",
    backToHome: "Back to Home",
    consent: "Informed Consent",
    consentTitle: "Informed Consent & Research Disclaimer",
    demographics: "Patient Information",
    questionnaire: "Clinical Questionnaire",
    interview: "Deep Dive Interview",
    results: "Final Report",
    age: "Age",
    gender: "Gender",
    country: "Country",
    education: "Education Level",
    male: "Male",
    female: "Female",
    other: "Other",
    highSchool: "High School",
    undergraduate: "Undergraduate",
    postgraduate: "Postgraduate",
    phd: "PhD",
    startQuestionnaire: "Start Questionnaire",
    analyzeResults: "Analyze Results",
    questionOf: "Question {current} of {total}",
    howOften: "How often does this apply to you?",
    never: "Never",
    rarely: "Rarely",
    sometimes: "Sometimes",
    often: "Often",
    veryOften: "Very Often",
    yesStartInterview: "Yes, Start Interview",
    skipToResults: "Skip — Show Results",
    generateQuestions: "Generate Personalised Questions",
    medicalHistory: "Previous Medical Conditions (if any)",
    otherSymptom: "Other Symptom (e.g., Joint pain, constant headaches)",
    recordAnswer: "Record Answer",
    typeAnswer: "Type your answer here...",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    transcribeAudio: "Transcribe Audio",
    transcribing: "Transcribing...",
    nextQuestion: "Next Question",
    generateAnalysis: "Generate Preliminary Analysis",
    viewDashboard: "View Final Dashboard",
    diagnosis: "Diagnosis",
    confidence: "Confidence",
    severity: "Severity",
    suggestion: "Recommendation",
    downloadPDF: "Download PDF Report",
    newScreening: "New Screening",
    adminPassword: "Admin Password",
    totpCode: "6-Digit Authenticator Code",
    verifyPassword: "Verify Password",
    verifyOTP: "Verify OTP",
    logout: "Logout",
    saveChanges: "Save Changes",
    exportCSV: "Download Database CSV",
    termsLink: "Terms & Conditions",
    privacyLink: "Privacy Policy",
    disclaimer:
      "This tool is a screening aid only. Not a substitute for professional diagnosis.",
    inputMode: "Input Mode",
    voiceRecorder: "Voice Recorder",
    textInput: "Text Input",
    analyzing: "Analysing...",
    pleaseReplyEnglish:
      "Please reply in English so the AI can accurately analyse your response.",
    questionnaireComplete: "Questionnaire Complete!",
  },
  hi: {
    startScreening: "स्क्रीनिंग शुरू करें",
    adminPortal: "एडमिन पोर्टल",
    learnMore: "और जानें",
    language: "भाषा",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    next: "अगला",
    back: "वापस",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",
    agree: "मैंने उपरोक्त शर्तें पढ़ी और सहमत हूँ।",
    iAgree: "मैं सहमत हूँ और आगे बढ़ना चाहता/चाहती हूँ",
    backToHome: "होम पर वापस",
    consent: "सूचित सहमति",
    consentTitle: "सूचित सहमति और अनुसंधान अस्वीकरण",
    demographics: "रोगी की जानकारी",
    questionnaire: "क्लिनिकल प्रश्नावली",
    interview: "गहन साक्षात्कार",
    results: "अंतिम रिपोर्ट",
    age: "आयु",
    gender: "लिंग",
    country: "देश",
    education: "शिक्षा स्तर",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    highSchool: "हाई स्कूल",
    undergraduate: "स्नातक",
    postgraduate: "स्नातकोत्तर",
    phd: "पीएचडी",
    startQuestionnaire: "प्रश्नावली शुरू करें",
    analyzeResults: "परिणाम विश्लेषण करें",
    questionOf: "प्रश्न {current} / {total}",
    howOften: "यह आप पर कितनी बार लागू होता है?",
    never: "कभी नहीं",
    rarely: "शायद ही कभी",
    sometimes: "कभी-कभी",
    often: "अक्सर",
    veryOften: "बहुत अक्सर",
    yesStartInterview: "हाँ, साक्षात्कार शुरू करें",
    skipToResults: "छोड़ें — परिणाम दिखाएँ",
    generateQuestions: "व्यक्तिगत प्रश्न बनाएँ",
    medicalHistory: "पिछली चिकित्सा स्थितियाँ (यदि कोई हो)",
    otherSymptom: "अन्य लक्षण",
    recordAnswer: "उत्तर रिकॉर्ड करें",
    typeAnswer: "यहाँ अपना उत्तर टाइप करें...",
    startRecording: "रिकॉर्डिंग शुरू करें",
    stopRecording: "रिकॉर्डिंग रोकें",
    transcribeAudio: "ऑडियो ट्रांसक्राइब करें",
    transcribing: "ट्रांसक्राइब हो रहा है...",
    nextQuestion: "अगला प्रश्न",
    generateAnalysis: "प्रारंभिक विश्लेषण करें",
    viewDashboard: "अंतिम डैशबोर्ड देखें",
    diagnosis: "निदान",
    confidence: "आत्मविश्वास",
    severity: "गंभीरता",
    suggestion: "सिफारिश",
    downloadPDF: "PDF रिपोर्ट डाउनलोड करें",
    newScreening: "नई स्क्रीनिंग",
    adminPassword: "एडमिन पासवर्ड",
    totpCode: "6-अंकीय प्रमाणक कोड",
    verifyPassword: "पासवर्ड सत्यापित करें",
    verifyOTP: "OTP सत्यापित करें",
    logout: "लॉगआउट",
    saveChanges: "परिवर्तन सहेजें",
    exportCSV: "डेटाबेस CSV डाउनलोड करें",
    termsLink: "नियम और शर्तें",
    privacyLink: "गोपनीयता नीति",
    disclaimer: "यह उपकरण केवल स्क्रीनिंग सहायक है। पेशेवर निदान का विकल्प नहीं।",
    inputMode: "इनपुट मोड",
    voiceRecorder: "वॉइस रिकॉर्डर",
    textInput: "टेक्स्ट इनपुट",
    analyzing: "विश्लेषण हो रहा है...",
    pleaseReplyEnglish: "कृपया अंग्रेजी में उत्तर दें ताकि AI सटीक विश्लेषण कर सके।",
    questionnaireComplete: "प्रश्नावली पूरी हुई!",
  },
  mr: {
    startScreening: "स्क्रीनिंग सुरू करा",
    adminPortal: "अॅडमिन पोर्टल",
    learnMore: "अधिक जाणून घ्या",
    language: "भाषा",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    next: "पुढे",
    back: "मागे",
    submit: "सादर करा",
    loading: "लोड होत आहे...",
    agree: "मी वरील अटी वाचल्या आणि मान्य केल्या आहेत.",
    iAgree: "मी सहमत आहे आणि पुढे जाऊ इच्छितो/इच्छिते",
    backToHome: "मुख्यपृष्ठावर परत",
    consent: "माहितीपूर्ण संमती",
    consentTitle: "माहितीपूर्ण संमती आणि संशोधन अस्वीकरण",
    demographics: "रुग्णाची माहिती",
    questionnaire: "क्लिनिकल प्रश्नावली",
    interview: "सखोल मुलाखत",
    results: "अंतिम अहवाल",
    age: "वय",
    gender: "लिंग",
    country: "देश",
    education: "शिक्षण स्तर",
    male: "पुरुष",
    female: "महिला",
    other: "इतर",
    highSchool: "हायस्कूल",
    undergraduate: "पदवी",
    postgraduate: "पदव्युत्तर",
    phd: "पीएचडी",
    startQuestionnaire: "प्रश्नावली सुरू करा",
    analyzeResults: "निकाल विश्लेषण करा",
    questionOf: "प्रश्न {current} / {total}",
    howOften: "हे तुम्हाला किती वेळा लागू होते?",
    never: "कधीच नाही",
    rarely: "क्वचितच",
    sometimes: "कधीकधी",
    often: "अनेकदा",
    veryOften: "खूप वेळा",
    yesStartInterview: "होय, मुलाखत सुरू करा",
    skipToResults: "वगळा — निकाल दाखवा",
    generateQuestions: "वैयक्तिक प्रश्न तयार करा",
    medicalHistory: "मागील वैद्यकीय परिस्थिती (असल्यास)",
    otherSymptom: "इतर लक्षण",
    recordAnswer: "उत्तर रेकॉर्ड करा",
    typeAnswer: "येथे तुमचे उत्तर टाइप करा...",
    startRecording: "रेकॉर्डिंग सुरू करा",
    stopRecording: "रेकॉर्डिंग थांबवा",
    transcribeAudio: "ऑडिओ ट्रान्सक्राइब करा",
    transcribing: "ट्रान्सक्राइब होत आहे...",
    nextQuestion: "पुढील प्रश्न",
    generateAnalysis: "प्राथमिक विश्लेषण करा",
    viewDashboard: "अंतिम डॅशबोर्ड पहा",
    diagnosis: "निदान",
    confidence: "आत्मविश्वास",
    severity: "तीव्रता",
    suggestion: "शिफारस",
    downloadPDF: "PDF अहवाल डाउनलोड करा",
    newScreening: "नवीन स्क्रीनिंग",
    adminPassword: "अॅडमिन पासवर्ड",
    totpCode: "6-अंकी प्रमाणक कोड",
    verifyPassword: "पासवर्ड सत्यापित करा",
    verifyOTP: "OTP सत्यापित करा",
    logout: "लॉगआउट",
    saveChanges: "बदल जतन करा",
    exportCSV: "डेटाबेस CSV डाउनलोड करा",
    termsLink: "नियम व अटी",
    privacyLink: "गोपनीयता धोरण",
    disclaimer: "हे साधन केवळ स्क्रीनिंग सहाय्यक आहे. व्यावसायिक निदानाचा पर्याय नाही.",
    inputMode: "इनपुट मोड",
    voiceRecorder: "व्हॉइस रेकॉर्डर",
    textInput: "मजकूर इनपुट",
    analyzing: "विश्लेषण होत आहे...",
    pleaseReplyEnglish: "कृपया इंग्रजीत उत्तर द्या जेणेकरून AI अचूक विश्लेषण करू शकेल.",
    questionnaireComplete: "प्रश्नावली पूर्ण झाली!",
  },
  de: {
    startScreening: "Screening beginnen",
    adminPortal: "Admin-Portal",
    learnMore: "Mehr erfahren",
    language: "Sprache",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    next: "Weiter",
    back: "Zurück",
    submit: "Einreichen",
    loading: "Wird geladen...",
    agree: "Ich habe die obigen Bedingungen gelesen und stimme zu.",
    iAgree: "Ich stimme zu und möchte fortfahren",
    backToHome: "Zurück zur Startseite",
    consent: "Einverständniserklärung",
    consentTitle: "Einverständniserklärung und Forschungsverzicht",
    demographics: "Patienteninformationen",
    questionnaire: "Klinischer Fragebogen",
    interview: "Tiefeninterview",
    results: "Abschlussbericht",
    age: "Alter",
    gender: "Geschlecht",
    country: "Land",
    education: "Bildungsniveau",
    male: "Männlich",
    female: "Weiblich",
    other: "Andere",
    highSchool: "Gymnasium",
    undergraduate: "Bachelor",
    postgraduate: "Master",
    phd: "Promotion",
    startQuestionnaire: "Fragebogen starten",
    analyzeResults: "Ergebnisse analysieren",
    questionOf: "Frage {current} von {total}",
    howOften: "Wie oft trifft dies auf Sie zu?",
    never: "Nie",
    rarely: "Selten",
    sometimes: "Manchmal",
    often: "Oft",
    veryOften: "Sehr oft",
    yesStartInterview: "Ja, Interview starten",
    skipToResults: "Überspringen — Ergebnisse anzeigen",
    generateQuestions: "Personalisierte Fragen generieren",
    medicalHistory: "Frühere Erkrankungen (falls vorhanden)",
    otherSymptom: "Anderes Symptom",
    recordAnswer: "Antwort aufnehmen",
    typeAnswer: "Antwort hier eingeben...",
    startRecording: "Aufnahme starten",
    stopRecording: "Aufnahme stoppen",
    transcribeAudio: "Audio transkribieren",
    transcribing: "Wird transkribiert...",
    nextQuestion: "Nächste Frage",
    generateAnalysis: "Voranalyse generieren",
    viewDashboard: "Abschluss-Dashboard anzeigen",
    diagnosis: "Diagnose",
    confidence: "Konfidenz",
    severity: "Schweregrad",
    suggestion: "Empfehlung",
    downloadPDF: "PDF-Bericht herunterladen",
    newScreening: "Neues Screening",
    adminPassword: "Admin-Passwort",
    totpCode: "6-stelliger Authentifizierungscode",
    verifyPassword: "Passwort überprüfen",
    verifyOTP: "OTP überprüfen",
    logout: "Abmelden",
    saveChanges: "Änderungen speichern",
    exportCSV: "Datenbank-CSV herunterladen",
    termsLink: "Nutzungsbedingungen",
    privacyLink: "Datenschutzrichtlinie",
    disclaimer:
      "Dieses Tool ist nur ein Screening-Hilfsmittel. Kein Ersatz für eine professionelle Diagnose.",
    inputMode: "Eingabemodus",
    voiceRecorder: "Sprachrekorder",
    textInput: "Texteingabe",
    analyzing: "Analysiere...",
    pleaseReplyEnglish:
      "Bitte antworten Sie auf Englisch, damit die KI Ihre Antwort genau analysieren kann.",
    questionnaireComplete: "Fragebogen abgeschlossen!",
  },
  "zh-CN": {
    startScreening: "开始筛查",
    adminPortal: "管理员入口",
    learnMore: "了解更多",
    language: "语言",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    next: "下一步",
    back: "返回",
    submit: "提交",
    loading: "加载中...",
    agree: "我已阅读并同意上述条款。",
    iAgree: "我同意并希望继续",
    backToHome: "返回主页",
    consent: "知情同意",
    consentTitle: "知情同意书和研究免责声明",
    demographics: "患者信息",
    questionnaire: "临床问卷",
    interview: "深度访谈",
    results: "最终报告",
    age: "年龄",
    gender: "性别",
    country: "国家",
    education: "教育程度",
    male: "男",
    female: "女",
    other: "其他",
    highSchool: "高中",
    undergraduate: "本科",
    postgraduate: "研究生",
    phd: "博士",
    startQuestionnaire: "开始问卷",
    analyzeResults: "分析结果",
    questionOf: "第 {current} 题，共 {total} 题",
    howOften: "这种情况多久发生一次？",
    never: "从不",
    rarely: "很少",
    sometimes: "有时",
    often: "经常",
    veryOften: "非常频繁",
    yesStartInterview: "是的，开始访谈",
    skipToResults: "跳过——显示结果",
    generateQuestions: "生成个性化问题",
    medicalHistory: "既往病史（如有）",
    otherSymptom: "其他症状",
    recordAnswer: "录制回答",
    typeAnswer: "在此输入您的回答...",
    startRecording: "开始录音",
    stopRecording: "停止录音",
    transcribeAudio: "转录音频",
    transcribing: "转录中...",
    nextQuestion: "下一个问题",
    generateAnalysis: "生成初步分析",
    viewDashboard: "查看最终仪表板",
    diagnosis: "诊断",
    confidence: "置信度",
    severity: "严重程度",
    suggestion: "建议",
    downloadPDF: "下载PDF报告",
    newScreening: "新筛查",
    adminPassword: "管理员密码",
    totpCode: "6位验证码",
    verifyPassword: "验证密码",
    verifyOTP: "验证OTP",
    logout: "退出登录",
    saveChanges: "保存更改",
    exportCSV: "下载数据库CSV",
    termsLink: "条款和条件",
    privacyLink: "隐私政策",
    disclaimer: "此工具仅为筛查辅助工具，不能替代专业诊断。",
    inputMode: "输入方式",
    voiceRecorder: "语音录制",
    textInput: "文字输入",
    analyzing: "分析中...",
    pleaseReplyEnglish: "请用英语回答，以便AI准确分析您的回答。",
    questionnaireComplete: "问卷完成！",
  },
};

export function t(key: TranslationKey, lang: LangCode, vars?: Record<string, string | number>): string {
  let str = translations[lang]?.[key] ?? translations.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}

export default translations;
