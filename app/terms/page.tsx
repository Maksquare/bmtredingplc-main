import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Supply & Quotation | Commercial Guidelines",
  description: `Commercial terms of timber and plywood supply, dispatch conditions, and warranty specifications for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <div className="bg-forest-dark text-cream py-14 bg-dark-grain border-b border-forest-light/30">
          <Container size="default">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Terms of Timber Supply & Proforma Conditions
            </h1>
            <p className="text-xs sm:text-sm text-cream/70 mt-2">
              Standard Commercial Conditions • {siteConfig.name}
            </p>
          </Container>
        </div>

        <Section variant="cream" woodgrain padded="default">
          <Container size="default">
            <div className="bg-white rounded-3xl border border-cream-border p-8 sm:p-12 shadow-sm space-y-6 text-sm text-charcoal-muted leading-relaxed max-w-3xl mx-auto">
              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  1. Quotation Validity
                </h2>
                <p>
                  All written proforma quotations issued by <strong className="text-charcoal">{siteConfig.name}</strong> remain valid for 14 calendar days from the date of transmission, subject to ongoing container availability and international ocean freight adjustments.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  2. Quality Standards & Verification
                </h2>
                <p>
                  Products supplied under the BS 1088 marine specification conform to strict boiling-water-proof (WBP) phenol-formaldehyde adhesive requirements. Clients are entitled to verify batch lot numbers and mill test certificates prior to gate dispatch.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  3. Jobsite Dispatch & Offloading
                </h2>
                <p>
                  Delivery dates provided are estimated in good faith. The client is responsible for ensuring clear and unobstructed access for heavy flatbed commercial vehicles and coordinating crane or forklift equipment at the designated jobsite drop point.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-charcoal">
                  4. Inspection & Claims
                </h2>
                <p>
                  Consignments must be visually inspected upon offloading. Any claims regarding transit damage, sheet count discrepancy, or thickness variance must be lodged in writing with our logistics department within 48 hours of delivery.
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

