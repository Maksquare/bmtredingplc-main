import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { products } from "@/data/seed-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.is_featured).slice(0, 4);

  return (
    <Section variant="cream-surface" padded="default" className="border-t border-cream-border/80">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <Reveal variant="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                Flagship Inventory
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
                Featured Industrial Timber Specifications
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-base text-charcoal-muted leading-relaxed">
                Direct warehouse stock available for immediate container loading and localized flatbed truck dispatch.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade-left" delay={0.2}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold text-sm text-forest hover:text-amber-oak transition-colors group"
            >
              <span>Explore All Specifications</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Featured Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

