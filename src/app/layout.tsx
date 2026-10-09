import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./motion.css";
import "./brand.css";
import "./catalogue.css";
import "./live.css";
import { Motion } from "@/components/layout/Motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContact } from "@/components/layout/MobileContact";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  ...pageMetadata(site.title, site.description),
  title: { default: site.title, template: "%s | Lumo Puppies" },
  icons: { icon: "/brand/lumo-icon.png" },
  robots: { index: site.launchReady, follow: site.launchReady },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcfaf6",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        ...(site.url ? { url: site.url } : {}),
        ...(site.logo && site.url
          ? { logo: new URL(site.logo, site.url).href }
          : {}),
      },
      {
        "@type": "WebSite",
        name: site.name,
        inLanguage: "tr-TR",
        ...(site.url ? { url: site.url } : {}),
      },
    ],
  };
  return (
    <html lang="tr">
      <body id="top">
        <a href="#main" className="skip-link">
          {site.ui.skip}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileContact />
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\u003c"),
          }}
        />
      </body>
    </html>
  );
}


