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
      number: "01",
      icon: ClipboardList,
      title: "Submit Specifications or Cutting List",
      description:
        "Tell us your required thickness (e.g. 18mm), sheet quantities, glue specifications (WBP / MR), or application. Upload your BOQ or tender schedules directly.",
      highlight: "Instant Spec Review",
    },
    {
      number: "02",
      icon: Calculator,
      title: "Receive Tiered Wholesale Quote",
      description:
        "Our sales desk delivers a formal proforma within 2 hours with tiered volume discounts, certified test reports, and estimated container or truckload logistics costs.",
      highlight: "2-Hour Response Time",
    },
    {
      number: "03",
      icon: Truck,
      title: "Yard Dispatch & Jobsite Crane Offloading",
      description:
        "Pick up immediately from our central industrial warehouse, or receive direct jobsite delivery coordinated with crane drop-offs to keep formwork carpenters working.",
      highlight: "Same-Day Dispatch",
    },
  ];

  return (
    <Section variant="cream" woodgrain padded="default">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Reveal variant="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
              Contractor Workflow
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
              From Inquiry to Jobsite in 3 Seamless Steps
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-base text-charcoal-muted leading-relaxed">
              We streamline wholesale procurement so you never have construction crews idling due to timber shortages.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <div className="relative bg-white rounded-3xl border border-cream-border p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-amber-oak/40 transition-all duration-300 group">
                  {/* Step Number Top Pill */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-4xl font-extrabold text-amber-oak/60 group-hover:text-amber-oak transition-colors">
                      {step.number}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-forest/5 group-hover:bg-amber-pale text-forest group-hover:text-amber-oak flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-forest transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-charcoal-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Highlight */}
                  <div className="pt-4 border-t border-cream-border/60 flex items-center gap-2 text-xs font-semibold text-amber-oak">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <Reveal variant="zoom-in" delay={0.3} className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 bg-white rounded-2xl border border-cream-border shadow-md">
            <span className="text-sm font-semibold text-charcoal px-3">
              Ready to submit your Bill of Quantities (BOQ)?
            </span>
            <Button
              href="/quote"
              variant="amber"
              size="default"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Step 1: Request Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

