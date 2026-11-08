import React from "react";
import { partners } from "@/data/seed-data";
import { Container } from "@/components/ui/Container";

export function PartnerStrip() {
  return (
    <div className="bg-cream-surface/70 border-y border-cream-border/60 py-10">
      <Container size="wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal-muted block">
              Global Material Standards
            </span>
            <span className="font-display text-sm font-bold text-charcoal">
              Certified Technical Partners & Testing Authorities
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-cream-border shadow-xs hover:border-amber-oak/40 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-amber-oak" />
                <span className="text-xs font-semibold text-charcoal">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

