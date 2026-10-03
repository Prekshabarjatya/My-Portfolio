import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { contact } from "@/data/portfolio";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Serif for the opening scene's headline only. Everything else stays in one
// grotesk family.
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "Preksha Barjatya – AI Engineer in Indore | RAG & LangGraph";
const DESCRIPTION =
  "Preksha Barjatya is an AI engineer in Indore building RAG apps, multi-agent LangGraph workflows and FastAPI backends. Projects, case study and resume.";

// The social preview image comes from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(contact.website),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Preksha Barjatya",
  authors: [{ name: "Preksha Barjatya", url: contact.website }],
  creator: "Preksha Barjatya",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Preksha Barjatya",
    locale: "en_IN",
    type: "profile",
    firstName: "Preksha",
    lastName: "Barjatya",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
