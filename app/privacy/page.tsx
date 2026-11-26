import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} commercial inquiry and quotation services.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 bg-cream py-16 lg:py-24">
        <Section>
          <Container size="narrow">
            <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-cream-border shadow-sm">
              <div className="space-y-2 border-b border-cream-border pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                  Legal Documentation
                </span>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal">
                  Privacy Policy
                </h1>
                <p className="text-xs text-charcoal-subtle">
                  Effective: {siteConfig.name} • Office: {siteConfig.contact.address.full}
                </p>
              </div>

              <div className="space-y-6 text-sm text-charcoal-light leading-relaxed">
                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">1. Information We Collect</h2>
                  <p>
                    When you request a quote or submit an inquiry on {siteConfig.name}, we collect only the contact details and product requirements you provide — such as your name, company name, telephone number, email address, delivery location, and selected Safarian or Plywood specifications.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">2. How We Use Information</h2>
                  <p>
                    Submitted details are used solely to respond to your inquiry, confirm sheet availability across Safarian (03mm, 06mm, 08mm, 12mm) and Plywood (16mm and 18mm special product), and coordinate supply from our {siteConfig.contact.factory.full} factory or Addis Ababa office. We do not sell or rent client contact records to third parties.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">3. Contact for Data Inquiries</h2>
                  <p>
                    To update or remove your inquiry details, contact our Addis Ababa office at {siteConfig.contact.address.full}, call {siteConfig.contact.phoneDisplay}, or email{" "}
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-oak font-medium hover:underline">
                      {siteConfig.contact.email}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}