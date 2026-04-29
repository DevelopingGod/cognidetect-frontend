import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "CogniDetect — AI-Powered Psychiatric Screening",
  description:
    "CogniDetect is a DSM-5 aligned AI screening tool for ADHD, Depression, Anxiety, Autism, and SPCD using dual-stream multimodal fusion.",
  keywords: ["mental health", "ADHD", "depression", "anxiety", "autism", "AI screening", "DSM-5"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
