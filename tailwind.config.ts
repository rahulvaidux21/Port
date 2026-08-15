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
        // UX4G case-study ramp — see the --cs-* block in globals.css. Light
        // values are the Figma frame's own; dark re-points each role at a
        // calmer step so the brand colours don't glare on a near-black page.
        cs: {
          blue: "rgb(var(--cs-blue) / <alpha-value>)",
          "blue-ink": "rgb(var(--cs-blue-ink) / <alpha-value>)",
          violet: "rgb(var(--cs-violet) / <alpha-value>)",
          "violet-deep": "rgb(var(--cs-violet-deep) / <alpha-value>)",
          red: "rgb(var(--cs-red) / <alpha-value>)",
          "red-fill": "rgb(var(--cs-red-fill) / <alpha-value>)",
          "red-ink": "rgb(var(--cs-red-ink) / <alpha-value>)",
          "red-surface": "rgb(var(--cs-red-surface) / <alpha-value>)",
          "red-border": "rgb(var(--cs-red-border) / <alpha-value>)",
          green: "rgb(var(--cs-green) / <alpha-value>)",
          "green-ink": "rgb(var(--cs-green-ink) / <alpha-value>)",
          "green-surface": "rgb(var(--cs-green-surface) / <alpha-value>)",
          "green-wash": "rgb(var(--cs-green-wash) / <alpha-value>)",
          "green-deep": "rgb(var(--cs-green-deep) / <alpha-value>)",
          ink: "rgb(var(--cs-ink) / <alpha-value>)",
          body: "rgb(var(--cs-body) / <alpha-value>)",
          chip: "rgb(var(--cs-chip) / <alpha-value>)",
          panel: "rgb(var(--cs-panel) / <alpha-value>)",
          plum: "rgb(var(--cs-plum) / <alpha-value>)",
          slate: "rgb(var(--cs-slate) / <alpha-value>)",
          "brand-from": "rgb(var(--cs-brand-from) / <alpha-value>)",
          "brand-to": "rgb(var(--cs-brand-to) / <alpha-value>)",
          "brand-deep": "rgb(var(--cs-brand-deep) / <alpha-value>)",
          device: "rgb(var(--cs-device) / <alpha-value>)",
          wall: "rgb(var(--cs-wall) / <alpha-value>)",
          "tl-yellow": "rgb(var(--cs-tl-yellow) / <alpha-value>)",
          "tl-cyan": "rgb(var(--cs-tl-cyan) / <alpha-value>)",
          "tl-teal": "rgb(var(--cs-tl-teal) / <alpha-value>)",
          "tl-orange": "rgb(var(--cs-tl-orange) / <alpha-value>)",
          "tl-pillar": "rgb(var(--cs-tl-pillar) / <alpha-value>)",
          "tl-label": "rgb(var(--cs-tl-label) / <alpha-value>)",
        },
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
        // Handwritten accent — UX4G case-study chapter eyebrows only.
        caveat: ["var(--font-caveat)", "cursive"],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        // Responsive radius scale — see the --r-* block in globals.css.
        chip: "var(--r-chip)",
        card: "var(--r-card)",
        plate: "var(--r-plate)",
        tile: "var(--r-tile)",
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
