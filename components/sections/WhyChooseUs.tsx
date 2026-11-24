import React from "react";
import { CheckCircle2, ShieldCheck, Truck, Coins, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Zero Core Voids & Certified Adhesives",
      description:
        "Every consignment of BS 1088 marine and shuttering plywood is inspected for solid inner veneers. WBP phenolic resins withstand 72-hour boiling water testing without delamination.",
      badge: "Quality Verified",
    },
    {
      icon: Clock,
      title: "Direct Importer Inventory & Buffer Stock",
      description:
        "As direct importers with large warehouse capacity in Addis Ababa, we eliminate intermediary delays and maintain buffer stock to guarantee uninterrupted concrete casting cycles.",
      badge: "Stock Reliability",
    },
    {
      icon: Coins,
      title: "Wholesale Contractor Pricing",
      description:
        "Container-level purchasing power allows us to offer transparent tiered pricing for commercial developers, general contractors, and architectural joinery shops.",
      badge: "Direct Importer",
    },
    {
      icon: Truck,
      title: "Jobsite Dispatch Across Ethiopia",
      description:
        "Scheduled flatbed delivery coordinated with on-site crane offloading or immediate central warehouse collection to keep your carpenters and formwork crews on schedule.",
      badge: "Yard Logistics",
    },
  ];

  return (
    <Section variant="cream-surface" padded="default" className="py-12 sm:py-16 lg:py-20 border-y border-cream-border/70">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <Reveal variant="fade-up">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
              Material Standards
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
              Why Tier-1 Contractors Depend on Our Panels
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              In heavy civil formwork, naval applications, and architectural millwork, panel defects mean costly delays. We deliver verified panel integrity sheet after sheet.
            </p>
          </Reveal>
        </div>

        {/* 4 Pillars Grid with Tactile Micro-Interactions */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={i}>
                <div className="bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 p-5 sm:p-6 h-full flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-amber-oak/50 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center group-hover:bg-amber-pale transition-colors duration-200">
                        <Icon className="w-5 h-5 text-amber-oak" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted bg-cream-surface px-2 py-0.5 rounded-md">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-charcoal leading-snug group-hover:text-forest transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center gap-2 text-xs font-semibold text-forest">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tested & Certified</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
