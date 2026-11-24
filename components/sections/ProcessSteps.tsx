import React from "react";
import Link from "next/link";
import { ClipboardList, Calculator, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ProcessSteps() {
  const steps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Submit Specs or Cutting Schedule",
      description:
        "Provide your required thickness (e.g. 18mm), sheet quantities, adhesive rating (WBP / MR), or application. Upload your BOQ directly for immediate review.",
      highlight: "Direct Spec Review",
    },
    {
      step: "02",
      icon: Calculator,
      title: "Receive Stamped Wholesale Proforma",
      description:
        "Our sales desk delivers an official proforma invoice within 2 hours, complete with tiered volume discounts, mill test reports, and transport logistics.",
      highlight: "< 2-Hour Response Time",
    },
    {
      step: "03",
      icon: Truck,
      title: "Central Yard Pickup or Jobsite Dispatch",
      description:
        "Collect directly from our Addis Ababa central warehouse or receive scheduled flatbed delivery with coordinated jobsite crane offloading for zero downtime.",
      highlight: "Prompt Jobsite Delivery",
    },
  ];

  return (
    <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <Reveal variant="fade-up">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
              Procurement Workflow
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
              Fast, Transparent Wholesale Procurement
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              We streamline wholesale procurement so your formwork carpenters and millwork shops never idle waiting for panels.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <div className="relative bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 p-5 sm:p-7 h-full flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-amber-oak/50 transition-all duration-300 hover:-translate-y-1 group">
                  <div>
                    {/* Step Top Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-oak/50 group-hover:text-amber-oak transition-colors duration-200">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-forest/5 group-hover:bg-amber-pale text-forest group-hover:text-amber-oak flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* Step Details */}
                    <div className="space-y-2 mb-4">
                      <h3 className="font-display text-base sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Highlight */}
                  <div className="pt-3 border-t border-cream-border/60 flex items-center gap-1.5 text-xs font-semibold text-amber-oak">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom Fast Action */}
        <Reveal variant="zoom-in" delay={0.25} className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3 bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 shadow-sm max-w-full">
            <span className="text-xs sm:text-sm font-semibold text-charcoal px-2 text-center">
              Have a Bill of Quantities (BOQ) or cutting schedule?
            </span>
            <Button
              href="/quote"
              variant="amber"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto font-bold"
            >
              Request Fast Wholesale Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
