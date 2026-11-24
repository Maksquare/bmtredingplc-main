import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/seed-data";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function ProductCategories() {
  return (
    <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-2xl space-y-2.5">
            <Reveal variant="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                Product Categories
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                Engineered Timber Panels for Civil & Architectural Work
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={0.2}>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                Direct wholesale supply of certified marine, film-faced shuttering, commercial hardwood, and composite panels.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade-left" delay={0.2}>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-forest hover:text-amber-oak transition-colors group self-start md:self-auto"
            >
              <span>View All 7 Product Lines</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Reveal>
        </div>

        {/* Categories Grid */}
        <StaggerContainer
          staggerDelay={0.07}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col h-full bg-white rounded-xl sm:rounded-2xl border border-cream-border/80 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-oak/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]"
              >
                {/* Visual Architectural Timber Preview */}
                <div className="relative aspect-[16/10] w-full bg-charcoal overflow-hidden">
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                      {cat.product_count} Specs
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors mb-1.5 leading-snug">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="pt-3 border-t border-cream-border/60 flex items-center justify-between text-xs font-semibold text-forest group-hover:text-amber-oak transition-colors">
                    <span>Explore Specifications</span>
                    <div className="w-6 h-6 rounded-full bg-cream-surface group-hover:bg-amber-oak group-hover:text-white flex items-center justify-center transition-all duration-200">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}

          {/* Custom Orders Callout Card */}
          <StaggerItem>
            <div className="flex flex-col h-full bg-[#071711] text-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-white/20 justify-between relative overflow-hidden group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white leading-snug">
                  Container Direct & Custom Gauge Sizing
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Direct full-container shipping or custom CNC tongue-and-groove milling for major institutional and residential developments across Ethiopia.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center w-full py-2.5 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all duration-200 gap-2 border border-amber-400/30 active:scale-95"
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
