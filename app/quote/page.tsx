import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/forms/QuoteWizard";

export const metadata: Metadata = {
  title: "Request a Formal Wholesale Quote | Plywood Supply",
  description: `Submit your Bill of Quantities or panel requirements to ${siteConfig.name} for official proforma pricing, container discounts, and scheduled jobsite logistics.`,
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialProduct = resolvedParams?.product || "";

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-forest-dark text-cream py-14 lg:py-18 bg-dark-grain border-b border-forest-light/30 text-center relative">
          <Container size="default">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                Direct Wholesale Pricing
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Request a Formal Project Quotation
              </h1>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                Complete the 3-step specification form below to receive competitive container or bundle pricing from <strong className="text-white font-semibold">{siteConfig.name}</strong>.
              </p>
            </div>
          </Container>
        </div>

        {/* Wizard Section */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="default">
            <QuoteWizard initialProduct={initialProduct} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

