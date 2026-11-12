import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { caveat, dmSans, instrumentSerif, piazzolla } from "./fonts/fonts";
import { meta } from "@/lib/data";
import "./globals.css";

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
