import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Commercial Data Protection",
  description: `Privacy policy and commercial information handling practices for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-forest-dark text-cream py-14 bg-dark-grain border-b border-forest-light/30">
          <Container size="default">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Privacy & Data Policy
            </h1>
            <p className="text-xs sm:text-sm text-cream/70 mt-2">
              Last revised: February 2026 • {siteConfig.name}
            </p>
          </Container>
        </div>

        <Section variant="cream" woodgrain padded="default">
          <Container size="default">
            <div className="bg-white rounded-3xl border border-cream-border p-8 sm:p-12 shadow-sm space-y-6 text-sm text-charcoal-muted leading-relaxed max-w-3xl mx-auto">
              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  1. Information We Collect
                </h2>
                <p>
                  At <strong className="text-charcoal">{siteConfig.name}</strong>, we collect business contact details, email addresses, phone numbers, and structural Bill of Quantities (BOQ) specifications submitted via our online quote forms, telephone inquiries, and central warehouse gate visits.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  2. Purpose of Processing
                </h2>
                <p>
                  Your corporate information is utilized exclusively for generating accurate wholesale proforma invoices, scheduling jobsite flatbed crane deliveries, confirming customs and phytosanitary documentation, and providing after-sales engineering support. We do not sell, rent, or lease contractor lists to any third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  3. Data Security & Storage
                </h2>
                <p>
                  Uploaded specification documents and client records are stored securely on our dedicated cPanel hosting infrastructure in compliance with industry encryption standards. Access is restricted to authorized {siteConfig.name} commercial account managers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  4. Contacting Data Protection Desk
                </h2>
                <p>
                  For inquiries regarding your commercial account records or to request removal from our technical bulletin, please email <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-oak font-semibold">{siteConfig.contact.email}</a>.
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

