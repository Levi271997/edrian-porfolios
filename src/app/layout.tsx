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
  metadataBase: new URL("https://levi271997.github.io/edrian-porfolios/"),
  title: {
    default: "Edrian — Video Editor & Graphic Designer",
    template: "%s — Edrian",
  },
  description:
    "Portfolio of Edrian, a freelance video editor and graphic designer in the Philippines making video ads, UGC edits, AI videos and static ad graphics.",
  keywords: [
    "video editor",
    "graphic designer",
    "video ads",
    "UGC editor",
    "AI video",
    "freelancer Philippines",
    "portfolio",
  ],
  openGraph: {
    title: "Edrian — Video Editor & Graphic Designer",
    description:
      "Video ads, UGC edits, AI videos and ad graphics from a freelance editor and designer in the Philippines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edrian — Video Editor & Graphic Designer",
    description:
      "Video ads, UGC edits, AI videos and ad graphics from a freelance editor and designer in the Philippines.",
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
