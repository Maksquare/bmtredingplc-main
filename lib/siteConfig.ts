/**
 * bmtradingplc - Master Site Configuration
 *
 * CRITICAL NAMING RULE:
 * The company name is exactly "bmtradingplc".
 * Never split, rewrite, or autocorrect it.
 */

export const siteConfig = {
  name: "bmtradingplc",
  legalName: "bmtradingplc",
  domain: "bmtradingplc.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bmtradingplc.com",
  assetsUrl: process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "https://files.bmtradingplc.com",
  description:
    "Over 10 years supplying Safarian boards (03mm, 06mm, 08mm, 12mm) and precision Plywood (16mm and 18mm special product) from our Werabe factory and Addis Ababa office.",
  tagline: "Safarian Boards & Structural Plywood Solutions",
  country: "Ethiopia",
  contact: {
    email: "info@bmtradingplc.com",
    salesEmail: "sales@bmtradingplc.com",
    phone: "+251911247821",
    phoneDisplay: "0911 247 821",
    secondaryPhone: "+251911221261",
    secondaryPhoneDisplay: "0911 221 261",
    tertiaryPhone: "+251910953373",
    tertiaryPhoneDisplay: "0910 953 373",
    whatsapp: "+251911247821",
    telegram: "+251911247821",
    telegramUrl: "https://t.me/+251911247821",
    address: {
      street: "Ayer Tena, Shamo Tower, 3rd Floor",
      city: "Addis Ababa",
      region: "Addis Ababa",
      country: "Ethiopia",
      full: "Addis Ababa, Ayer Tena, Shamo Tower, 3rd Floor",
    },
    factory: {
      city: "Werabe City",
      region: "Central Ethiopia",
      country: "Ethiopia",
      full: "Central Ethiopia, Werabe City",
    },
    hours: "Monday – Saturday: 08:30 – 17:30 (EAT)",
  },
  social: {
    linkedin: "https://linkedin.com/company/bmtradingplc",
    facebook: "https://facebook.com/bmtradingplc",
    instagram: "https://instagram.com/bmtradingplc",
    twitter: "https://twitter.com/bmtradingplc",
  },
  stats: [
    { label: "Years of Industry Experience", value: 10, suffix: "+" },
    { label: "Trusted Clients Served", value: 200, suffix: "+" },
    { label: "Quality Standards", value: 100, suffix: "%" },
  ],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
