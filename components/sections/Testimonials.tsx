import React from "react";
import { Star, Quote, Building2, Anchor, Hammer } from "lucide-react";
import { testimonials } from "@/data/seed-data";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <Section variant="cream" woodgrain padded="default">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Reveal variant="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
              Verified Client Feedback
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
              Trusted by Civil Engineers, Shipwrights & Millworkers
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={0.2}>
            <p className="text-base text-charcoal-muted leading-relaxed">
              Read how our consistent panel calibration, zero-void core integrity, and on-time yard deliveries empower major commercial builds.
            </p>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((test, index) => (
            <StaggerItem key={test.id}>
              <div className="bg-white rounded-3xl border border-cream-border p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-amber-oak/40 transition-all duration-300 relative group">
                <div className="space-y-4">
                  {/* Rating Stars and Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-oak">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-oak text-amber-oak" />
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cream-surface flex items-center justify-center text-charcoal-subtle group-hover:text-amber-oak transition-colors">
                      <Quote className="w-5 h-5 opacity-60" />
                    </div>
                  </div>

                  {/* Project Tag */}
                  {test.project_type && (
                    <span className="inline-block text-[11px] font-semibold text-forest bg-forest/5 px-2.5 py-1 rounded-md">
                      {test.project_type}
                    </span>
                  )}

                  {/* Content */}
                  <p className="text-sm text-charcoal-muted leading-relaxed italic">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-cream-border/60 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-forest-dark text-amber-light font-display font-bold flex items-center justify-center text-base shrink-0 shadow-sm">
                    {test.client_name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-charcoal">
                      {test.client_name}
                    </h4>
                    <p className="text-xs text-charcoal-muted">
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

