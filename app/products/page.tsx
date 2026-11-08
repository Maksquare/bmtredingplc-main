import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { products, categories } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFilterGrid } from "@/components/products/ProductFilterGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Plywood & Timber Products Catalog | Wholesale Specifications",
  description: `Browse certified marine plywood, Dynea film-faced shuttering panels, calibrated commercial joinery sheets, and engineered blockboard from ${siteConfig.name}.`,
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || "all";

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Header Banner */}
        <div className="bg-forest-dark text-cream py-14 lg:py-20 bg-dark-grain border-b border-forest-light/30 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                Direct Importer Inventory
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Plywood & Engineered Timber Catalog
              </h1>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
                Explore our full line of calibrated plywood, structural formwork panels, and specialized acoustic boards. Filter by grade, glue bond, or industry application.
              </p>
            </div>
          </Container>
        </div>

        {/* Filter & Grid Section */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <ProductFilterGrid
              initialProducts={products}
              categories={categories}
              initialCategory={initialCategory}
            />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

