"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import {
  ArrowUpRight,
  Sparkles,
  Factory,
  MapPin,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";
import type { PanelGaugeSpec } from "@/components/products/PanelPrototype3D";
import { partners } from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";

const PanelPrototype3D = dynamic(
  () => import("@/components/products/PanelPrototype3D").then((m) => m.PanelPrototype3D),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <div className="h-[245px] sm:h-[268px] rounded-2xl bg-[#FAF5EB] border border-[#E5DEC9] animate-pulse flex items-center justify-center text-xs font-semibold text-[#5A6961]">
          Initializing 3D panel prototype...
        </div>
        <div className="h-12 rounded-xl bg-[#FCFBF8] border border-[#E5DEC9] animate-pulse" />
      </div>
    ),
  }
);

const SAFARIAN_3D_GAUGES: PanelGaugeSpec[] = [
  { gauge: "03mm", mm: 3, plies: 3, use: "Cabinet backs & drawer bottoms" },
  { gauge: "06mm", mm: 6, plies: 5, use: "Recessed panels & interior linings" },
  { gauge: "08mm", mm: 8, plies: 5, use: "Doors, shelving & shopfit partitions" },
  { gauge: "12mm", mm: 12, plies: 7, use: "Heavy boxes & structural frames" },
];

const PLYWOOD_3D_GAUGES: PanelGaugeSpec[] = [
  { gauge: "16mm", mm: 16, plies: 9, use: "Wardrobes, heavy worktops & millwork" },
  {
    gauge: "18mm",
    mm: 18,
    plies: 11,
    use: "Special Product flagship heavy architecture board",
    special: true,
  },
];

export function ProductCategories() {
  const [safarianGauge, setSafarianGauge] = useState("12mm");
  const [plywoodGauge, setPlywoodGauge] = useState("18mm");

  return (
    <section className="relative py-16 sm:py-24 bg-[#FAF5EB] border-b border-[#E5DEC9]/80 overflow-hidden">
      {/* Subtle warm radial glow behind the 2x2 grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(234,168,79,0.22),transparent_72%)]"
      />

      <Container size="wide" className="relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715]">
            Focused Panel Engineering.
          </h2>
          <p className="text-sm sm:text-base text-[#3D4A43] leading-relaxed">
            Inspect real proportional 3D board prototypes for every Safarian and structural Plywood gauge calibrated in our Werabe facility.
          </p>
        </div>

        {/* 2x2 Architectural Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Safarian 4 Thicknesses Interactive 3D Prototype */}
          <div className="rounded-[2rem] bg-white p-6 sm:p-8 border border-[#E5DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141715]">
                  Safarian Boards (03mm – 12mm)
                </h3>
                <p className="text-xs sm:text-sm text-[#3D4A43] mt-1">
                  Interactive 3D thickness specimen across all four calibrated gauges.
                </p>
              </div>
              <Link
                href={`/products/safarian?thickness=${encodeURIComponent(safarianGauge)}`}
                className="w-9 h-9 rounded-full bg-[#F4EFE6] hover:bg-[#0B241B] text-[#141715] hover:text-white flex items-center justify-center shrink-0 transition-colors"
                aria-label={`View Safarian ${safarianGauge} specifications`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <PanelPrototype3D
              variant="safarian"
              gauges={SAFARIAN_3D_GAUGES}
              selectedGauge={safarianGauge}
              onSelectGauge={setSafarianGauge}
              heightClass="h-[245px] sm:h-[268px]"
            />

            <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#E5DEC9]/70 text-xs">
              <span className="text-[#5A6961] font-medium">
                1220 × 2440 mm • Multi-ply precision finish
              </span>
              <Link
                href={`/products/safarian?thickness=${encodeURIComponent(safarianGauge)}`}
                className="font-bold text-[#9A5D12] hover:text-[#0B241B] inline-flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Inspect {safarianGauge} Spec</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Plywood 16mm & 18mm Special Product Interactive 3D Prototype */}
          <div className="rounded-[2rem] bg-white p-6 sm:p-8 border border-[#E5DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#9A5D12] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8832A]" />
                  <span>Flagship Special Product</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141715]">
                  Plywood 16mm &amp; Special 18mm
                </h3>
                <p className="text-xs sm:text-sm text-[#3D4A43] mt-1">
                  Drag to inspect heavy cross-laminated plies and 18mm structural density.
                </p>
              </div>
              <Link
                href={`/products/plywood?thickness=${encodeURIComponent(plywoodGauge)}`}
                className="w-9 h-9 rounded-full bg-[#F4EFE6] hover:bg-[#C8832A] text-[#141715] hover:text-white flex items-center justify-center shrink-0 transition-colors"
                aria-label={`View Plywood ${plywoodGauge} Special Product`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <PanelPrototype3D
              variant="plywood"
              gauges={PLYWOOD_3D_GAUGES}
              selectedGauge={plywoodGauge}
              onSelectGauge={setPlywoodGauge}
              heightClass="h-[245px] sm:h-[268px]"
            />

            <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#E5DEC9]/70 text-xs">
              <span className="text-[#5A6961] font-medium">
                High-pressure hardwood bond • Structural load rated
              </span>
              <Link
                href={`/products/plywood?thickness=${encodeURIComponent(plywoodGauge)}`}
                className="font-bold text-[#9A5D12] hover:text-[#0B241B] inline-flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Inspect {plywoodGauge} Spec</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Factory & Commercial Office */}
          <div className="rounded-[2rem] bg-white p-6 sm:p-8 border border-[#E5DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141715]">
                Factory &amp; Commercial Office
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4A43] mt-1">
                Direct supply from Werabe production to Addis Ababa order coordination.
              </p>
            </div>

            <div className="relative pt-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
              <div className="rounded-2xl bg-[#0B241B] text-white p-5 shadow-md flex flex-col justify-between gap-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <Factory className="w-5 h-5 text-[#EAA84F]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                    Manufacturing
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-base text-white">
                    {siteConfig.contact.factory.full}
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    Primary board pressing &amp; bulk dispatch hub
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#8E540E] text-white p-5 shadow-md flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <MapPin className="w-5 h-5 text-amber-200" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                    Head Office
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-base text-white">
                    Addis Ababa, Ayer Tena
                  </div>
                  <div className="text-xs text-white/95 mt-1">
                    Shamo Tower, 3rd Floor • {siteConfig.contact.phoneDisplay}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Experience, 100% Quality & Verified Client Network */}
          <div className="rounded-[2rem] bg-white p-6 sm:p-8 border border-[#E5DEC9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141715]">
                  Measured Track Record
                </h3>
                <p className="text-xs sm:text-sm text-[#3D4A43] mt-1">
                  Proven capacity and 100% quality inspection trusted across Ethiopia.
                </p>
              </div>
              <Link
                href="/about"
                className="w-9 h-9 rounded-full bg-[#F4EFE6] hover:bg-[#0B241B] text-[#141715] hover:text-white flex items-center justify-center shrink-0 transition-colors"
                aria-label="Learn more about bmtradingplc"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#FCFBF8] border border-[#E5DEC9]/80 p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5A6961]">
                    <Award className="w-3.5 h-3.5 text-[#C8832A] shrink-0" />
                    <span>Experience</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#141715] mt-1 tabular-nums">
                    <CountUp end={10} duration={1.8} enableScrollSpy scrollSpyOnce />
                    <span className="text-[#C8832A]">+</span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5A6961]">
                    Years Experience
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5DEC9]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5A6961]">
                    <Users className="w-3.5 h-3.5 text-[#0B241B] shrink-0" />
                    <span>Client Base</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#141715] mt-1 tabular-nums">
                    <CountUp end={200} duration={2.0} enableScrollSpy scrollSpyOnce />
                    <span className="text-[#C8832A]">+</span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#5A6961]">
                    Trusted Clients
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B241B] text-white border border-[#0B241B]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EAA84F] shrink-0" />
                    <span>Quality</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">
                    <CountUp end={100} duration={1.9} enableScrollSpy scrollSpyOnce />
                    <span className="text-[#EAA84F]">%</span>
                  </div>
                  <div className="text-[11px] font-semibold text-white/80">
                    Sheet Inspection
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex -space-x-2">
                  {partners.slice(0, 4).map((p) => (
                    <PartnerLogoBadge
                      key={p.id}
                      logoUrl={p.logo_url}
                      name={p.name}
                      initials={p.initials}
                      size="sm"
                      className="ring-2 ring-white"
                    />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B241B]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8832A]" />
                  Active Ethiopian Supply
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
