import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans, Piazzolla, Instrument_Serif } from "next/font/google";
import { meta } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
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
      className={`${GeistMono.variable} ${dmSans.variable} ${piazzolla.variable} ${instrumentSerif.variable}`}
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
