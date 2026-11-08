import React from "react";
import { CheckCircle2, ShieldCheck, Truck, Coins, BarChart3, Clock } from "lucide-react";
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
        "Every batch of BS 1088 marine and structural plywood features 100% solid, gap-free inner veneer layers. Fortified with phenolic WBP resins that withstand 72-hour boiling water immersion tests.",
      badge: "Quality Guarantee",
    },
    {
      icon: Clock,
      title: "Direct Importer Supply Reliability",
      description:
        "As primary importers with expansive regional warehouse holdings, we eliminate intermediary supply chains. We guarantee zero stockout interruptions for large-scale ongoing project phases.",
      badge: "Zero Stockouts",
    },
    {
      icon: Coins,
      title: "Competitive Wholesale Pricing",
      description:
        "Direct factory container contracting allows bmtredingplc to offer transparent tier-1 volume discounts for commercial developers, fabrication yards, and regional hardware stockists.",
      badge: "Factory Direct",
    },
    {
      icon: Truck,
      title: "Dedicated Jobsite & Yard Dispatch",
      description:
        "Equipped with dedicated heavy transport fleet logistics, we offer scheduled jobsite crane drop-offs and same-day warehouse gate collections to keep your project on schedule.",
      badge: "Fast Dispatch",
    },
  ];

  return (
    <Section variant="cream-surface" padded="default" className="border-y border-cream-border/70">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal variant="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3.5 py-1.5 rounded-full border border-amber-light/30">
              The {siteConfig.name} Advantage
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
              Why Tier-1 Contractors Rely on Our Supply Chain
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-base text-charcoal-muted leading-relaxed">
              In high-stakes civil concrete casting, naval shipwrighting, and custom architectural millwork, panel failure is not an option. Here is how {siteConfig.name} protects your build integrity.
            </p>
          </Reveal>
        </div>

        {/* 4 Pillars Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl border border-cream-border p-7 h-full flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-amber-oak/40 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-forest/5 text-forest flex items-center justify-center">
                        <Icon className="w-6 h-6 text-amber-oak" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted bg-cream-surface px-2.5 py-1 rounded-md">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-charcoal leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-cream-border/60 flex items-center gap-2 text-xs font-semibold text-forest">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
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

