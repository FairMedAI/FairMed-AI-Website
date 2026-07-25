import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "FairMed AI - Auditing Bias in Medical AI",
    template: "%s | FairMed AI",
  },
  description:
    "Leakage-aware, skin-tone stratified evaluation of dermatology AI. Open code, open data.",
  openGraph: {
    title: "FairMed AI",
    description: "Auditing bias in medical AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("fairmed-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);else if(window.matchMedia("(prefers-color-scheme:dark)").matches)document.documentElement.setAttribute("data-theme","dark")}catch(e){}`}
        </Script>
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
