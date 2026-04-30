"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { LangCode } from "@/lib/types";

export default function AdminPage() {
  const [language, setLanguage] = useState<LangCode>("en");
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6">
        {authenticated ? (
          <div className="max-w-3xl mx-auto pt-8">
            <AdminDashboard onLogout={() => setAuthenticated(false)} />
          </div>
        ) : (
          <AdminLogin onSuccess={() => setAuthenticated(true)} />
        )}
      </main>
    </>
  );
}
