import React from "react";
import type { Metadata } from "next";
import { Layers, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { products, categories } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductFilterGrid } from "@/components/products/ProductFilterGrid";

export const metadata: Metadata = {
  title: "Products — Safarian & Plywood",
  description:
    "Explore Safarian boards (03mm, 06mm, 08mm, 12mm) and structural Plywood (16mm and 18mm special product) supplied by bmtradingplc.",
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = params?.category || "all";
  const initialSearch = params?.search || "";

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 bg-cream">
        {/* Catalog Header */}
        <section className="relative bg-forest-dark text-cream py-16 lg:py-20 overflow-hidden bg-dark-grain border-b border-forest-light/30">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-oak/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="wide" className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-surface border border-forest-light/40 text-xs font-bold tracking-widest uppercase text-amber-light">
                  <Layers className="w-3.5 h-3.5 text-amber-light" />
                  <span>Direct From Werabe Factory</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  Safarian &amp; Plywood Lineup
                </h1>
                <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                  Focused production across Safarian (03mm, 06mm, 08mm, 12mm) and Plywood (16mm and our signature 18mm special product). Select your thickness to check availability or request a quote.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Button href="/quote" variant="amber" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Quote
                </Button>
                <Button
                  href={`tel:${siteConfig.contact.phone}`}
                  variant="ghost"
                  className="text-cream border border-white/20 hover:bg-white/10"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  {siteConfig.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Filterable Product Catalog */}
        <Section className="py-12 lg:py-16">
          <Container size="wide">
            <ProductFilterGrid
              products={products}
              categories={categories}
              initialCategory={initialCategory}
              initialSearch={initialSearch}
            />
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}