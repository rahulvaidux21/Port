import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rahul Vaid — Product & UI/UX Designer",
    template: "%s | Rahul Vaid",
  },
  description:
    "UI/UX Designer with 3+ years designing user-centered digital products at national scale, including UX4G, India's national design system serving 10+ crore users.",
  keywords: [
    "UX Designer",
    "Product Designer",
    "UI Design",
    "Design Systems",
    "UX4G",
    "Accessibility",
    "Gov-tech",
  ],
  authors: [{ name: "Rahul Vaid" }],
  creator: "Rahul Vaid",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rahul Vaid — Designer",
    title: "Rahul Vaid — Product & UI/UX Designer",
    description:
      "UI/UX Designer working on UX4G, India's national design system. Design systems, complex dashboards, and WCAG accessibility at national scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Vaid — Product & UI/UX Designer",
    description:
      "UI/UX Designer working on UX4G, India's national design system. Design systems, complex dashboards, and WCAG accessibility at national scale.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  // Matches --background tokens: hsl(34 40% 97%) light, hsl(20 12% 8%) dark
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#171412" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={bricolage.variable}>
      <body className="grain">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
