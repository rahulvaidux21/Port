import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans, Piazzolla, Instrument_Serif, Caveat } from "next/font/google";
import { meta } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  // Loaded as the variable font rather than a fixed set of weights, so that
  // 600 (SemiBold — what the UX4G case-study Figma frame uses for nearly
  // every heading) is a real weight rather than one the browser synthesises,
  // and so the optical-size axis is available. That frame sets `opsz 14` on
  // every text node; without the axis, DM Sans renders ~1.5% wider than the
  // design and nowrap rows wrap a card early.
  axes: ["opsz"],
});

// Handwritten accent for the UX4G case study's chapter eyebrows ("Part 1",
// "First off", "Problems in the") — taken from that Figma frame, which is
// the only place on the site that uses it.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600"],
});

// Statement-headline serif kept for the case-study detail template, which
// already relies on it — untouched by the landing-page rebuild.
const piazzolla = Piazzolla({
  subsets: ["latin"],
  variable: "--font-piazzolla",
  style: ["normal", "italic"],
  weight: ["500", "600"],
});

// Instrument Serif italic — the exact accent typeface for the one italic
// word inside each landing-page heading in the source Figma design.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["italic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} ${dmSans.variable} ${piazzolla.variable} ${instrumentSerif.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
