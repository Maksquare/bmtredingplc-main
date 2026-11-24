import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/seed-data";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <Reveal variant="fade-up">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
              Client References
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
              Trusted by Civil Engineers & Commercial Millworkers
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Read how our panel calibration, zero-void core construction, and reliable Addis Ababa dispatch support major projects.
            </p>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {testimonials.map((test) => (
            <StaggerItem key={test.id}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 p-5 sm:p-7 h-full flex flex-col justify-between shadow-2xs hover:shadow-lg hover:border-amber-oak/50 transition-all duration-300 hover:-translate-y-1 relative group">
                <div className="space-y-3.5">
                  {/* Rating Stars and Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cream-surface flex items-center justify-center text-charcoal-subtle group-hover:text-amber-oak group-hover:bg-amber-pale transition-colors duration-200">
                      <Quote className="w-4 h-4 opacity-70" />
                    </div>
                  </div>

                  {/* Project Tag */}
                  {test.project_type && (
                    <span className="inline-block text-[10px] font-semibold text-forest bg-forest/5 px-2.5 py-1 rounded-md border border-forest/10">
                      {test.project_type}
                    </span>
                  )}

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest text-amber-300 font-display font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    {test.client_name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal">
                      {test.client_name}
                    </h4>
                    <p className="text-[11px] text-charcoal-muted">
                      {test.role}, <strong className="text-charcoal font-medium">{test.company}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
