import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nawf.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nawfal — Software Engineer",
    template: "%s — nawf.dev",
  },
  description:
    "Full-stack developer building web platforms, POS systems, and automation tools.",
  openGraph: {
    type: "website",
    siteName: "nawf.dev",
    title: "Nawfal — Software Engineer",
    description:
      "Full-stack developer building web platforms, POS systems, and automation tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawfal — Software Engineer",
    description:
      "Full-stack developer building web platforms, POS systems, and automation tools.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
