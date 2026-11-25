import React from "react";
import type { Metadata } from "next";
import { FileText, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/forms/QuoteWizard";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: `Request sheet availability and direct supply coordination for Safarian boards (03mm, 06mm, 08mm, 12mm) and Plywood (16mm & 18mm special product) from ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/quote`,
  },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; thickness?: string; quantity?: string }>;
}) {
  const params = await searchParams;
  const initialProduct = params?.product || "";
  const initialThickness = params?.thickness || "";
  const initialQuantity = params?.quantity || "";

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 bg-cream">
        {/* Header */}
        <section className="relative bg-forest-dark text-cream py-14 lg:py-20 overflow-hidden bg-dark-grain border-b border-forest-light/30">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-oak/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="wide" className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-surface border border-forest-light/40 text-xs font-bold tracking-widest uppercase text-amber-light">
                  <FileText className="w-3.5 h-3.5 text-amber-light" />
                  <span>Direct Supply Coordination</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  Request a Custom Quote
                </h1>
                <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                  Select Safarian (03mm, 06mm, 08mm, 12mm) or Plywood (16mm &amp; 18mm Special Product), tell us your required quantity and destination, and our team will contact you promptly.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs text-cream/85 bg-forest-surface/80 p-4 rounded-2xl border border-forest-light/40">
                <span className="flex items-center gap-2 font-semibold text-amber-light">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{siteConfig.contact.phoneDisplay} (Call / WhatsApp / Telegram)</span>
                </span>
                <span className="flex items-center gap-2 text-cream/75">
                  <MapPin className="w-4 h-4 shrink-0 text-amber-oak" />
                  <span>{siteConfig.contact.address.full}</span>
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Quote Wizard */}
        <Section className="py-12 lg:py-20">
          <Container size="wide">
            <QuoteWizard
              initialProduct={initialProduct}
              initialThickness={initialThickness}
              initialQuantity={initialQuantity}
            />
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}