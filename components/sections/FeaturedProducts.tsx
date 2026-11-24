import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/seed-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.is_featured).slice(0, 4);

  return (
    <Section variant="cream-surface" padded="default" className="py-12 sm:py-16 lg:py-20 border-t border-cream-border/80">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-2xl space-y-2.5">
            <Reveal variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                Flagship Inventory
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                Core Plywood & Timber Specifications
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                Direct warehouse stock in Addis Ababa available for immediate container pickup or localized flatbed delivery.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade-left" delay={0.2}>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-forest hover:text-amber-oak transition-colors group self-start md:self-auto"
            >
              <span>Explore All Specifications</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Featured Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
