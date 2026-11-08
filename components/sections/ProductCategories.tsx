import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Shield, Sparkles } from "lucide-react";
import { categories } from "@/data/seed-data";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function ProductCategories() {
  return (
    <Section variant="cream" woodgrain padded="default">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <Reveal variant="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                Product Classifications
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
                Engineered Timber Panels for Every Industry
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-base text-charcoal-muted leading-relaxed">
                From high-pour concrete formwork to ultra-clean joinery sheets, explore our comprehensive range of industrial-grade plywood and composite panel solutions.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade-left" delay={0.2}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold text-sm text-forest hover:text-amber-oak transition-colors group"
            >
              <span>View All 7 Product Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Categories Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map((cat, index) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-cream-border/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-oak/50 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Visual Architectural Timber Preview */}
                <div className="relative aspect-[16/9] w-full bg-charcoal overflow-hidden group/img">
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {cat.product_count} Specs
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    {/* Category Title */}
                    <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-forest transition-colors mb-2 leading-snug">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-4 border-t border-cream-border/60 flex items-center justify-between text-xs font-semibold text-forest group-hover:text-amber-oak transition-colors">
                    <span>Explore Technical Specs</span>
                    <div className="w-7 h-7 rounded-full bg-cream-surface group-hover:bg-amber-oak group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}

          {/* Custom Orders Card */}
          <StaggerItem>
            <div className="flex flex-col h-full bg-gradient-to-br from-[#071711] to-[#0B241B] text-white rounded-2xl p-6 shadow-xl border-2 border-white/20 justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Custom Thickness & Bulk Container Orders?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  We supply custom CNC-sized, tongue-and-groove, or calibrated container orders for large-scale infrastructure projects across Ethiopia.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all gap-2 border border-amber-400/30"
                >
                  <span>Request Custom Sizing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </Section>
  );
}

