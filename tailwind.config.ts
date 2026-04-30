import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#667eea",
          violet: "#764ba2",
        },
        dark: {
          base: "#0D0D1A",
          surface: "#13131F",
          card: "#1A1A2E",
          hover: "#1E1E38",
          border: "#2A2A4A",
        },
        light: {
          base: "#F8F7FF",
          surface: "#FFFFFF",
          card: "#F0EEFF",
          hover: "#E8E4FF",
          border: "#DDD8FF",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #7a8ff5 0%, #8a5cb8 100%)",
        "dark-grid":
          "radial-gradient(ellipse at top, #13131F 0%, #0D0D1A 100%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
