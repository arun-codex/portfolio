import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arun Kumar | Cybersecurity Enthusiast & Developer",
  description:
    "BCA student building practical cybersecurity skills through Linux labs, networking experiments, secure development, and hands-on technical projects. Open to internship opportunities.",
  keywords: [
    "Arun Kumar",
    "cybersecurity",
    "portfolio",
    "BCA student",
    "web developer",
    "Linux",
    "internship",
    "security",
  ],
  authors: [{ name: "Arun Kumar" }],
  creator: "Arun Kumar",
  metadataBase: new URL("https://arunsingh.xyz"),
  icons: {
    icon: "/images/profile.png",
    apple: "/images/profile.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunsingh.xyz",
    siteName: "Arun Kumar Portfolio",
    title: "Arun Kumar | Cybersecurity Enthusiast & Developer",
    description:
      "BCA student building practical cybersecurity skills through Linux labs, networking experiments, and hands-on technical projects.",
    images: [
      {
        url: "/images/profile.png",
        width: 800,
        height: 800,
        alt: "Arun Kumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Kumar | Cybersecurity Enthusiast & Developer",
    description:
      "BCA student building practical cybersecurity skills. Open to internship opportunities.",
    creator: "@itz_arun_1806",
    images: ["/images/profile.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arun Kumar",
    url: "https://arunsingh.xyz",
    email: "arun.cyberx@gmail.com",
    jobTitle: "BCA Student & Cybersecurity Enthusiast",
    sameAs: [
      "https://github.com/arun-codex",
      "https://www.linkedin.com/in/arun-codex/",
      "https://x.com/itz_arun_1806",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
