import type { Metadata } from "next";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Focus } from "@/components/sections/Focus";
import { Building } from "@/components/sections/Building";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * The og:image is declared per route rather than left to the root
 * `opengraph-image` convention: the convention emits an extension-less file,
 * which a static host serves with the wrong Content-Type and crawlers reject.
 * `scripts/postbuild.mjs` copies those bytes to /og.png.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "text/markdown": `${site.url}/index.md` },
  },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [`${site.url}/og.png`],
  },
};

export default function Home() {
  return (
    <div id="top" className="relative">
      <SiteHeader />
      <main className="relative z-[2]">
        <Hero />
        <Work />
        <Experience />
        <Focus />
        <Building />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
