import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Supply",
  description: `General commercial supply terms for Safarian and Plywood supplied by ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 bg-cream py-16 lg:py-24">
        <Section>
          <Container size="narrow">
            <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-cream-border shadow-sm">
              <div className="space-y-2 border-b border-cream-border pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                  Commercial Terms
                </span>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal">
                  Terms of Supply
                </h1>
                <p className="text-xs text-charcoal-subtle">
                  {siteConfig.name} • Office: {siteConfig.contact.address.full}
                </p>
              </div>

              <div className="space-y-6 text-sm text-charcoal-light leading-relaxed">
                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">1. Product Scope</h2>
                  <p>
                    {siteConfig.name} supplies Safarian boards (03mm, 06mm, 08mm, 12mm) and Plywood sheets (16mm and 18mm special product) subject to active manufacturing schedules in Central Ethiopia, Werabe City and order confirmation from our Addis Ababa office.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">2. Quote Requests &amp; Confirmations</h2>
                  <p>
                    Online inquiries and quote requests initiate direct communication with our sales team via telephone, WhatsApp, or email. Confirmed quantities, pickup arrangements, and delivery schedules are finalized directly with our Ayer Tena office.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">3. Storage &amp; Handling Guidance</h2>
                  <p>
                    Customers are advised to store all Safarian and Plywood sheets horizontally on level supports in a dry, covered environment protected from direct moisture exposure prior to fabrication or installation.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-display font-bold text-charcoal">4. Direct Contact</h2>
                  <p>
                    For supply questions, call {siteConfig.contact.phoneDisplay}, {siteConfig.contact.secondaryPhoneDisplay}, or {siteConfig.contact.tertiaryPhoneDisplay}.
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