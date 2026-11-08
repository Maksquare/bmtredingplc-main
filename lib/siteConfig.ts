/**
 * bmtredingplc - Master Site Configuration
 * 
 * CRITICAL NAMING RULE:
 * The company name is exactly "bmtredingplc".
 * Never split, rewrite, or autocorrect it.
 */

export const siteConfig = {
  name: "bmtredingplc",
  legalName: "bmtredingplc",
  domain: "bmtredingplc.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bmtredingplc.com",
  assetsUrl: process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "https://files.bmtredingplc.com",
  description: "Ethiopia's premier direct importer and wholesale supplier of certified marine plywood, high-cycle film-faced shuttering panels, architectural hardwoods, and engineered timber solutions.",
  tagline: "Architectural Timber & Industrial Plywood Solutions",
  country: "Ethiopia",
  contact: {
    email: "info@bmtredingplc.com",
    salesEmail: "sales@bmtredingplc.com",
    phone: "+251 911 234 567",
    phoneDisplay: "+251 911 234 567",
    landline: "+251 11 667 8900",
    whatsapp: "+251911234567",
    telegram: "bmtredingplc",
    address: {
      street: "Bole Sub-City, Woreda 03, Industrial Commercial Corridor",
      city: "Addis Ababa",
      region: "Addis Ababa",
      country: "Ethiopia",
      full: "Bole Sub-City, Woreda 03, Industrial Commercial Corridor, Addis Ababa, Ethiopia",
    },
    hours: "Monday – Friday: 08:00 – 17:30 | Saturday: 08:30 – 13:00 (EAT)",
  },
  social: {
    linkedin: "https://linkedin.com/company/bmtredingplc",
    facebook: "https://facebook.com/bmtredingplc",
    instagram: "https://instagram.com/bmtredingplc",
    twitter: "https://twitter.com/bmtredingplc",
  },
  stats: [
    { label: "Years of Supply Reliability", value: 18, suffix: "+" },
    { label: "Metric Tons Delivered", value: 120, suffix: "K+" },
    { label: "Major Infrastructure Clients", value: 450, suffix: "+" },
    { label: "Quality Standard Compliance", value: 100, suffix: "%" },
  ],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Applications", href: "/services" },
    { name: "Projects", href: "/gallery" },
    { name: "News & Insights", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
