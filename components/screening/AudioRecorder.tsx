"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2, CheckCircle } from "lucide-react";
import type { LangCode } from "@/lib/types";
import { t } from "@/lib/translations";
import { transcribeAudio } from "@/lib/api";

interface AudioRecorderProps {
  language: LangCode;
  onTranscription: (text: string) => void;
}

type RecordState = "idle" | "recording" | "transcribing" | "done";

export default function AudioRecorder({ language, onTranscription }: AudioRecorderProps) {
  const [state, setState] = useState<RecordState>("idle");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: getSupportedMimeType() });
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        await handleTranscribe(blob);
      };

      mr.start(200);
      mediaRecorderRef.current = mr;
      setState("recording");
    } catch {
      setError("Microphone access denied. Please allow microphone permissions and try again.");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && state === "recording") {
      mediaRecorderRef.current.stop();
      setState("transcribing");
    }
  }

  async function handleTranscribe(blob: Blob) {
    try {
      const result = await transcribeAudio(blob);
      onTranscription(result.text);
      setState("done");
    } catch {
      setError("Transcription failed. Please type your answer instead.");
      setState("idle");
    }
  }

  function reset() {
    setState("idle");
    setError("");
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 py-2">
        {state === "idle" && (
          <button
            onClick={startRecording}
            className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 hover:-translate-y-0.5 transition-all"
          >
            <Mic size={26} className="text-white" />
          </button>
        )}

        {state === "recording" && (
          <button
            onClick={stopRecording}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center recording-pulse hover:-translate-y-0.5 transition-all"
          >
            <Square size={22} className="text-white fill-white" />
          </button>
        )}

        {state === "transcribing" && (
          <div className="w-16 h-16 rounded-full border-2 border-brand-purple/50 flex items-center justify-center">
            <Loader2 size={26} className="text-brand-purple animate-spin" />
          </div>
        )}

        {state === "done" && (
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center">
            <CheckCircle size={26} className="text-emerald-400" />
          </div>
        )}

        <div className="text-center">
          {state === "idle" && (
            <p className="text-sm font-medium">{t("startRecording", language)}</p>
          )}
          {state === "recording" && (
            <div>
              <p className="text-sm font-medium text-red-400 mb-1">{t("stopRecording", language)}</p>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs text-red-400">Recording...</span>
              </div>
            </div>
          )}
          {state === "transcribing" && (
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              {t("transcribing", language)}
            </p>
          )}
          {state === "done" && (
            <div>
              <p className="text-sm font-medium text-emerald-400">Transcription complete!</p>
              <button onClick={reset} className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Record again
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  );
}

function getSupportedMimeType(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}
