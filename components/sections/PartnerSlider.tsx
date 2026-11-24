"use client";

import React from "react";
import { Building2, Award, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PartnerSlider() {
  const companies = [
    {
      name: "MIDROC Investment Group",
      category: "Real Estate & Civil Works",
      initials: "MIG",
      icon: Building2,
    },
    {
      name: "Afro-Tsion Construction",
      category: "General Contractor Grade 1",
      initials: "ATC",
      icon: Factory,
    },
    {
      name: "Flintstone Engineering",
      category: "Commercial Infrastructure",
      initials: "FE",
      icon: Building2,
    },
    {
      name: "Varnero Construction",
      category: "High-Rise Concrete Structures",
      initials: "VC",
      icon: Building2,
    },
    {
      name: "Sunshine Construction",
      category: "Civil Infrastructure & Roads",
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
      category: "Industrial Engineering",
      initials: "SC",
      icon: Factory,
    },
    {
      name: "Yotek Construction PLC",
      category: "Structural Formwork & Slabs",
      initials: "YC",
      icon: Building2,
    },
    {
      name: "Dynea Surface Solutions",
      category: "Phenolic Chemistry Partner",
      initials: "DYN",
      icon: ShieldCheck,
    },
    {
      name: "Bureau Veritas Standards",
      category: "Independent QA Inspection",
      initials: "BV",
      icon: Award,
    },
  ];

  // Double the list for continuous infinite loop
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="bg-[#0B241B] text-white py-10 sm:py-12 border-y border-white/15 overflow-hidden relative">
      <Container size="wide" className="mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
              Direct Supply Network
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Supplying Ethiopia&apos;s Leading Construction & Joinery Firms
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/80 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 self-start md:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>450+ Active Infrastructure Sites Supplied</span>
          </div>
        </div>
      </Container>

      {/* Smooth Infinite Marquee Wrapper with Fade Edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0B241B] to-transparent z-10 pointer-events-none" />

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0B241B] to-transparent z-10 pointer-events-none" />

        {/* Ticker Row */}
        <div className="animate-marquee flex gap-4 sm:gap-6 items-center">
          {marqueeItems.map((company, index) => {
            const Icon = company.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/40 py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl sm:rounded-2xl transition-all duration-200 shrink-0 cursor-default group"
              >
                {/* Monogram Badge */}
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 font-display font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {company.initials}
                </div>

                <div className="flex flex-col min-w-max">
                  <span className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
                    {company.name}
                  </span>
                  <span className="text-[10px] text-white/60">
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
