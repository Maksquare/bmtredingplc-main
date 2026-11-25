import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { ToastProvider } from "@/lib/toast-context";
import { OfflineBanner } from "@/components/system/OfflineBanner";
import { CookieConsent } from "@/components/system/CookieConsent";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0B241B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Safarian Boards & Structural Plywood`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "bmtradingplc",
    "Safarian board Ethiopia",
    "Safarian 03mm 06mm 08mm 12mm",
    "18mm plywood special product",
    "16mm plywood Ethiopia",
    "plywood manufacturer Werabe",
    "plywood supplier Addis Ababa Ayer Tena",
    "Midroc construction plywood supplier",
    "Mina Furniture Warit Classic Furniture board supplier",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Safarian Boards & Structural Plywood`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Safarian Boards & Structural Plywood`,
    description: siteConfig.description,
    creator: "@bmtradingplc",
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
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.phone,
            contactType: "sales",
            areaServed: "ET",
            availableLanguage: ["en", "am"],
          },
          {
            "@type": "ContactPoint",
            telephone: siteConfig.contact.secondaryPhone,
            contactType: "customer service",
            areaServed: "ET",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.city,
          addressCountry: "ET",
        },
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.facebook,
          siteConfig.social.instagram,
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#factory`,
        name: `${siteConfig.name} Manufacturing Plant`,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/products/plywood-18mm-special.jpg`,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.factory.city,
          addressRegion: siteConfig.contact.factory.region,
          addressCountry: "ET",
        },
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-cream text-charcoal pb-16 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#0B241B] focus:text-white focus:font-bold focus:text-xs focus:shadow-xl"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <OfflineBanner />
          {children}
          <CookieConsent />
          <MobileBottomBar />
        </ToastProvider>
      </body>
    </html>
  );
}
