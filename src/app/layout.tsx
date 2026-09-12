import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arunx.xyz"),
  title: {
    default: "Arun Kumar | Cybersecurity Student & Developer",
    template: "%s | Arun Kumar",
  },
  description:
    "Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.",
  keywords: [
    "Arun Kumar",
    "cybersecurity student",
    "cybersecurity portfolio",
    "developer portfolio",
    "BCA student",
    "Linux",
    "networking",
    "ethical hacking",
    "secure development",
    "arun-codex",
    "India",
  ],
  authors: [{ name: "Arun Kumar", url: "https://arunx.xyz" }],
  creator: "Arun Kumar",
  publisher: "Arun Kumar",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/images/profile.png", sizes: "32x32", type: "image/png" },
      { url: "/images/profile.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/profile.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunx.xyz/",
    siteName: "Arun Kumar Portfolio",
    title: "Arun Kumar | Cybersecurity Student & Developer",
    description:
      "Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arun Kumar — Cybersecurity Student & Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Kumar | Cybersecurity Student & Developer",
    description:
      "Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.",
    creator: "@itz_arun_1806",
    images: [
      {
        url: "/images/og-image.png",
        alt: "Arun Kumar — Cybersecurity Student & Developer Portfolio",
      },
    ],
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
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://arunx.xyz/#website",
        "url": "https://arunx.xyz/",
        "name": "Arun Kumar Portfolio",
        "description":
          "Personal portfolio of Arun Kumar — BCA student and cybersecurity-focused developer from India.",
        "publisher": {
          "@id": "https://arunx.xyz/#person",
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://arunx.xyz/#profilepage",
        "url": "https://arunx.xyz/",
        "name": "Arun Kumar | Cybersecurity Student & Developer",
        "isPartOf": {
          "@id": "https://arunx.xyz/#website",
        },
        "mainEntity": {
          "@id": "https://arunx.xyz/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://arunx.xyz/#person",
        "name": "Arun Kumar",
        "alternateName": "arun-codex",
        "url": "https://arunx.xyz/",
        "image": "https://arunx.xyz/images/profile.png",
        "jobTitle": "Cybersecurity Student & Developer",
        "description":
          "Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.",
        "email": "arun.cyberx@gmail.com",
        "nationality": {
          "@type": "Country",
          "name": "India",
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Bachelor of Computer Applications (BCA)",
        },
        "sameAs": [
          "https://github.com/arun-codex",
          "https://www.linkedin.com/in/arun-codex/",
          "https://x.com/itz_arun_1806",
        ],
        "knowsAbout": [
          "Cybersecurity",
          "Linux System Administration",
          "Computer Networking",
          "Ethical Hacking Fundamentals",
          "Secure Software Development",
          "C Programming",
          "Python",
          "JavaScript",
          "TypeScript",
          "Next.js",
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Introduction to Generative AI",
            "credentialCategory": "Certification",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Google",
            },
            "url": "https://www.skills.google/public_profiles/28c98619-745d-4f60-ac6e-900f1f52afff/badges/21915333",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
