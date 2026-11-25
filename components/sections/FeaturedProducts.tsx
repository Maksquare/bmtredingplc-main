import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/seed-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.is_featured);

  return (
    <Section variant="cream" padded="default" className="py-16 sm:py-24 bg-[#FCFBF8] border-b border-[#E5DEC9]/70">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 max-w-5xl mx-auto">
          <div className="max-w-2xl space-y-2.5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715]">
              Our Complete Board Lineup
            </h2>
            <p className="text-sm sm:text-base text-[#3D4A43] leading-relaxed">
              Select a thickness directly from Safarian (03mm–12mm) or Plywood (16mm and 18mm Special Product) to review full specifications and request supply.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#0B241B] hover:text-[#C8832A] transition-colors group shrink-0"
          >
            <span>Open Interactive Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}