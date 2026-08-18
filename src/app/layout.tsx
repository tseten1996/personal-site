import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Tenzing Sherpa",
    "software engineer",
    "senior software engineer",
    "backend engineer",
    "full stack engineer",
    "Java engineer",
    "Spring Boot",
    "Kafka",
    "event-driven architecture",
    "React",
    "TypeScript",
    "Angular",
    "Python",
    "FastAPI",
    "distributed systems",
    "developer tooling",
    "AI engineering",
    "agentic systems",
    "Los Angeles",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/og.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_US",
    firstName: "Tenzing",
    lastName: "Sherpa",
    username: site.githubHandle,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0d" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Person + WebSite structured data. Only fields that are actually known. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      description: site.tagline,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/og.png`,
      sameAs: [site.github, site.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of California, Santa Barbara",
      },
      worksFor: { "@type": "Organization", name: "Arch Capital Group" },
      knowsAbout: site.knowsAbout,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — ${site.role}`,
      description: site.description,
      inLanguage: "en-US",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
