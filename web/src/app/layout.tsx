import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Preksha Barjatya | AI Engineer",
  description:
    "Portfolio of Preksha Barjatya - AI Engineer specializing in Retrieval-Augmented Generation (RAG), LangChain/LangGraph agentic workflows, and FastAPI backend systems. Featuring a live LangGraph agent that tours the site for you.",
  openGraph: {
    title: "Preksha Barjatya | AI Engineer",
    description:
      "AI Engineer building RAG applications, LangGraph agents, and FastAPI backends.",
    url: "https://www.prekshaa.tech",
    siteName: "Preksha Barjatya",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
