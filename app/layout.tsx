import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Piazzolla } from "next/font/google";
import { meta } from "@/lib/data";
import "./globals.css";

// Statement-headline serif for case study cards only — a deliberate,
// single-purpose pairing against the site's Geist Sans/Mono system, not a
// site-wide type change.
const piazzolla = Piazzolla({
  subsets: ["latin"],
  variable: "--font-piazzolla",
  style: ["normal", "italic"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${piazzolla.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
