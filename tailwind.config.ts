import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // rgb(var(--color-x) / <alpha-value>) — the channel-triplet format
        // Tailwind needs for opacity modifiers (bg-accent/25, border-paper/15,
        // etc.) to actually work against a CSS-variable-backed color.
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        },
        editor: {
          border: "rgb(var(--color-editor-border) / <alpha-value>)",
        },
        hairline: "rgb(var(--color-hairline) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          border: "rgb(var(--color-accent-border) / <alpha-value>)",
          glow: "rgb(var(--color-accent-glow) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        // DM Sans (free Google Font) carries everything — headings and body
        // alike, one family site-wide rather than a display/body pair.
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        // Reserved for a single italic accent word inside a heading (e.g.
        // "What I can *help* with") — case-study template also uses this.
        serif: ["var(--font-piazzolla)", "Georgia", "serif"],
        // Instrument Serif italic — the exact accent typeface used for one
        // italic word inside each landing-page heading in the source Figma.
        // Kept separate from `serif` (Piazzolla) so the case-study template,
        // which already relies on `font-serif`, is untouched.
        "instrument-serif": ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
