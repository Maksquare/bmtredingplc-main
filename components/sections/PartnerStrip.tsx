import React from "react";
import { partners } from "@/data/seed-data";
import { Container } from "@/components/ui/Container";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";

export function PartnerStrip() {
  return (
    <div className="bg-cream-surface/70 border-y border-cream-border/60 py-10">
      <Container size="wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal-muted block">
              Selected Partners
            </span>
            <span className="font-display text-sm font-bold text-charcoal">
              Organizations We Supply Across Ethiopia
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="group flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/95 border border-cream-border shadow-xs hover:border-amber-oak/40 transition-all"
              >
                <PartnerLogoBadge
                  logoUrl={partner.logo_url}
                  name={partner.name}
                  initials={partner.initials}
                  size="sm"
                />
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