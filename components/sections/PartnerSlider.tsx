"use client";

import React from "react";
import { Building2, Award, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PartnerSlider() {
  const companies = [
    {
      name: "MIDROC Investment Group",
      category: "Flagship Real Estate & Industrial",
      initials: "MIG",
      icon: Building2,
    },
    {
      name: "Afro-Tsion Construction",
      category: "Grade 1 General Contractor",
      initials: "ATC",
      icon: Factory,
    },
    {
      name: "Flintstone Engineering",
      category: "Civil & Commercial Infrastructure",
      initials: "FE",
      icon: Building2,
    },
    {
      name: "Varnero Construction",
      category: "Commercial High-Rise Builders",
      initials: "VC",
      icon: Building2,
    },
    {
      name: "Sunshine Construction",
      category: "Major Infrastructure & Civil Works",
      initials: "SC",
      icon: Factory,
    },
    {
      name: "Rama Construction PLC",
      category: "Grade 1 Building Contractor",
      initials: "RC",
      icon: Building2,
    },
    {
      name: "Satcon Construction",
      category: "Industrial & Concrete Engineering",
      initials: "SC",
      icon: Factory,
    },
    {
      name: "Yotek Construction PLC",
      category: "Civil Works & Structural Slabs",
      initials: "YC",
      icon: Building2,
    },
    {
      name: "Dynea Surface Solutions",
      category: "Phenolic Film Chemistry Partner",
      initials: "DYN",
      icon: ShieldCheck,
    },
    {
      name: "Bureau Veritas Standards",
      category: "Independent QA Inspection Authority",
      initials: "BV",
      icon: Award,
    },
  ];

  // Double the list for a seamless, continuous infinite loop
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="bg-[#0B241B] text-white py-12 border-y border-white/15 overflow-hidden relative">
      <Container size="wide" className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              Trusted Across Ethiopia
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Contractors & Enterprise Clients Sourced from bmtredingplc
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/80 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Over 450+ Active Construction Sites Supplied</span>
          </div>
        </div>
      </Container>

      {/* Smooth Infinite Marquee Wrapper with Edge Fade Gradients */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B241B] to-transparent z-10 pointer-events-none" />

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B241B] to-transparent z-10 pointer-events-none" />

        {/* Ticker Row */}
        <div className="animate-marquee flex gap-6 items-center">
          {marqueeItems.map((company, index) => {
            const Icon = company.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400/50 py-3.5 px-6 rounded-2xl transition-all duration-300 shrink-0 shadow-sm cursor-default group"
              >
                {/* Monogram Emblem */}
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-display font-black text-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {company.initials}
                </div>

                <div className="flex flex-col min-w-max">
                  <span className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {company.name}
                  </span>
                  <span className="text-[11px] font-medium text-white/70">
                    {company.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

