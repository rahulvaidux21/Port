import localFont from "next/font/local";

/* Self-hosted fonts. These are the exact woff2 files Google Fonts serves for
   the same requests the site used to make through next/font/google; they are
   committed here so a build never depends on reaching Google. (A Netlify
   build once failed because Google answered its build servers with a font
   URL next/font couldn't parse.) Only the subsets the site preloaded are
   kept. Each variable font is one file covering its whole weight range.
   To refresh a file, re-download it from Google Fonts with the same family,
   axes and subset. */

// DM Sans, variable with the optical-size axis. The UX4G Figma frame sets
// `opsz 14` on every text node, and 600 (SemiBold) has to be a real weight,
// not a synthesised one, or headings render wider than the design.
export const dmSans = localFont({
  src: "./dm-sans-latin-normal.woff2",
  weight: "100 1000",
  style: "normal",
  variable: "--font-dm-sans",
  display: "swap",
});

// Handwritten accent for the UX4G case study's chapter eyebrows.
export const caveat = localFont({
  src: "./caveat-latin-normal.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
});

// Statement-headline serif for the case-study detail template.
export const piazzolla = localFont({
  src: [
    { path: "./piazzolla-latin-normal.woff2", weight: "500 600", style: "normal" },
    { path: "./piazzolla-latin-italic.woff2", weight: "500 600", style: "italic" },
  ],
  variable: "--font-piazzolla",
  display: "swap",
});

// The italic accent word inside each landing-page heading.
export const instrumentSerif = localFont({
  src: "./instrument-serif-latin-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

// Noto Sans — the Survey Setu product typeface, for its type specimen only.
// Latin and Devanagari are separate files, so they're two families used
// together (see `notoSans` below); the browser falls through to the
// Devanagari one glyph by glyph.
const notoSansLatin = localFont({
  src: "./noto-sans-latin-normal.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-noto-latin",
  display: "swap",
  preload: false,
});

const notoSansDevanagari = localFont({
  src: "./noto-sans-devanagari-normal.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

/** Class that sets Noto Sans (Latin, then Devanagari) on an element. */
export const notoSans = `${notoSansLatin.variable} ${notoSansDevanagari.variable} [font-family:var(--font-noto-latin),var(--font-noto-devanagari),system-ui,sans-serif]`;
