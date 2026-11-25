"use client";

import React from "react";
import { partners } from "@/data/seed-data";
import { Container } from "@/components/ui/Container";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";

export function PartnerSlider() {
  return (
    <section className="bg-white py-10 sm:py-12 border-b border-[#E5DEC9]/70">
      <Container size="wide">
        <div className="text-center space-y-6">
          <p className="text-xs sm:text-sm font-semibold text-[#5A6961]">
            Trusted by leading Ethiopian developers &amp; furniture makers — part of{" "}
            <strong className="text-[#141715]">200+ active client partnerships</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {partners.map((company) => (
              <div
                key={company.id}
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FCFBF8] hover:bg-white border border-[#E5DEC9]/80 hover:border-[#C8832A]/50 shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <PartnerLogoBadge
                  logoUrl={company.logo_url}
                  name={company.name}
                  initials={company.initials}
                  size="md"
                />
                <div className="min-w-0 text-left">
                  <div className="font-display font-bold text-xs sm:text-sm text-[#141715] truncate group-hover:text-[#C8832A] transition-colors">
                    {company.name}
                  </div>
                  <div className="text-[11px] text-[#5A6961] truncate">
                    {company.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}