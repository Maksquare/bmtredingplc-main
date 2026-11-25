import React from "react";
import { ClipboardList, MessageSquare, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ProcessSteps() {
  const steps = [
    {
      step: "01",
      icon: ClipboardList,
      title: "Choose Your Product & Thickness",
      description:
        "Select Safarian (03mm, 06mm, 08mm, 12mm) or Plywood (16mm or our 18mm Special Product) along with your estimated sheet quantity.",
      highlight: "Safarian & Plywood",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Connect with Our Addis Ababa Office",
      description:
        "Submit your request online or contact our Ayer Tena desk via phone, WhatsApp, or Telegram to confirm warehouse availability and delivery timelines.",
      highlight: "Direct Communication",
    },
    {
      step: "03",
      icon: Truck,
      title: "Dispatch from Werabe Factory",
      description:
        "Arrange scheduled transport directly to your construction site or furniture workshop in Addis Ababa and across Ethiopia.",
      highlight: "Reliable Delivery",
    },
  ];

  return (
    <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <Reveal variant="fade-up">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
              How It Works
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.08}>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
              Straightforward Factory-Direct Supply
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.14}>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              We keep ordering simple so construction sites and furniture workshops get the exact panel thicknesses they need on schedule.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index}>
                <div className="relative bg-white rounded-2xl border border-cream-border/90 p-6 sm:p-7 h-full flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-amber-oak/50 transition-all duration-300 hover:-translate-y-1 group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-oak/45 group-hover:text-amber-oak transition-colors duration-200">
                        {step.step}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-forest/5 group-hover:bg-amber-pale text-forest group-hover:text-amber-oak flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h3 className="font-display text-base sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-cream-border/60 flex items-center gap-1.5 text-xs font-semibold text-amber-oak">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom Action */}
        <Reveal variant="zoom-in" delay={0.18} className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3.5 bg-white rounded-2xl border border-cream-border/90 shadow-sm max-w-full">
            <span className="text-xs sm:text-sm font-semibold text-charcoal px-2 text-center">
              Need Safarian or 18mm Special Plywood for your next project?
            </span>
            <Button
              href="/quote"
              variant="amber"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto font-bold"
            >
              Request a Quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
