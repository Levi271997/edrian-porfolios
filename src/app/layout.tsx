import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Sora({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Inter({
  variable: "--ff-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edrianvale.com"),
  title: {
    default: "Edrian Vale — Video Editor & Graphic Designer",
    template: "%s — Edrian Vale",
  },
  description:
    "Portfolio of Edrian Vale, a video editor and graphic designer cutting brand films, motion graphics and identity systems for studios, labels and founders.",
  keywords: [
    "video editor",
    "graphic designer",
    "motion graphics",
    "brand identity",
    "color grading",
    "portfolio",
  ],
  openGraph: {
    title: "Edrian Vale — Video Editor & Graphic Designer",
    description:
      "Brand films, motion graphics and identity systems from a one-person post house.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edrian Vale — Video Editor & Graphic Designer",
    description:
      "Brand films, motion graphics and identity systems from a one-person post house.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
