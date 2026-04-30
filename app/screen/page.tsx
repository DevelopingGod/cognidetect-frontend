"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScreeningFlow from "@/components/screening/ScreeningFlow";
import type { LangCode } from "@/lib/types";

export default function ScreenPage() {
  const [language, setLanguage] = useState<LangCode>("en");

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <ScreeningFlow language={language} />
        </div>
      </main>
    </>
  );
}
