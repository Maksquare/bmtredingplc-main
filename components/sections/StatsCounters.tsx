"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Phone,
  Factory,
  ArrowUpRight,
  Building2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

export function StatsCounters() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 bg-[#F6EFE2] border-b border-[#E5DEC9]/80"
      aria-labelledby="spotlight-heading"
    >
      {/* Warm central studio aura (Inspo 00:13–00:16) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(200,131,42,0.28),rgba(234,168,79,0.12)_48%,transparent_75%)]"
      />

      <Container size="wide" className="relative z-10">
        {/* Centered Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <h2
            id="spotlight-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715]"
          >
            Built for Builders &amp; Furniture Makers
          </h2>
          <p className="text-sm sm:text-base text-[#3D4A43] leading-relaxed">
            Engineered sheet stability and dependable coordination from Werabe factory floors directly to Addis Ababa job sites.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-extrabold text-[#0B241B] tabular-nums">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-2xs">
              10+ Years Experience
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-2xs">
              200+ Trusted Clients
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#0B241B] text-amber-300 border border-[#0B241B] shadow-2xs">
              100% Quality Graded
            </span>
          </div>
        </div>

        {/* Hub-and-Spoke 3-Column Composition (Inspo 00:14–00:16) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {/* Left Flank: 2 Slightly Angled Cards */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-md lg:-rotate-2 hover:rotate-0 transition-transform duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FBF4EB] text-[#C8832A] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-[#141715]">
                Four Safarian Gauges
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4A43] leading-relaxed">
                Available in 03mm, 06mm, 08mm, and 12mm in 1220 × 2440 mm standard sheets for cabinet backs, doors, and interior partitions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-md lg:rotate-1 hover:rotate-0 transition-transform duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B241B]/10 text-[#0B241B] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-[#141715]">
                200+ Trusted Clients
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4A43] leading-relaxed">
                Long-term supply partner to MIDROC Investment Group, Mina Furniture, Warit Furniture, Classic Furniture, and regional workshops.
              </p>
            </div>
          </div>

          {/* Centerpiece Vertical Display Card */}
          <div className="lg:col-span-4">
            <div className="rounded-[2rem] bg-white p-3.5 shadow-2xl border border-[#E5DEC9]">
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[#0B241B]">
                <Image
                  src="/images/products/plywood-18mm-special.jpg"
                  alt="18mm Special Product Plywood layers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071711] via-[#071711]/35 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C8832A] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Special Product
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-3 text-white">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      bmtradingplc Signature
                    </div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      18mm Plywood
                    </div>
                    <p className="text-xs text-white/80 mt-1">
                      High-density structural panel engineered alongside 16mm Plywood at our Werabe factory.
                    </p>
                  </div>

                  <Link
                    href="/products/plywood?thickness=18mm"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-[#141715] hover:bg-[#FBF4EB] font-bold text-xs transition-colors"
                  >
                    <span>Explore 18mm Specifications</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C8832A]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Flank: 2 Slightly Angled Cards */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-md lg:rotate-2 hover:rotate-0 transition-transform duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FBF4EB] text-[#C8832A] flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-[#141715]">
                10+ Years &amp; 100% Quality
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4A43] leading-relaxed">
                Over a decade manufacturing and inspecting consistent 100% graded sheets from Central Ethiopia, Werabe City.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-md lg:-rotate-1 hover:rotate-0 transition-transform duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B241B]/10 text-[#0B241B] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-[#141715]">
                Direct Sales Lines
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4A43] leading-relaxed tabular-nums">
                Reach our Ayer Tena office on {siteConfig.contact.phoneDisplay} (Call, WhatsApp &amp; Telegram), {siteConfig.contact.secondaryPhoneDisplay}, or {siteConfig.contact.tertiaryPhoneDisplay}.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}