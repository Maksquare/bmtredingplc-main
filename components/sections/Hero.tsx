"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Sparkles,
  Factory,
  MapPin,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

const HERO_GAUGES = [
  {
    id: "saf-03",
    product: "Safarian",
    thickness: "03mm",
    special: false,
    use: "Wardrobe back panels, drawer bottoms & interior backing",
    size: "1220 × 2440 mm",
  },
  {
    id: "saf-06",
    product: "Safarian",
    thickness: "06mm",
    special: false,
    use: "Drawer linings, recessed door panels & clean partitions",
    size: "1220 × 2440 mm",
  },
  {
    id: "saf-08",
    product: "Safarian",
    thickness: "08mm",
    special: false,
    use: "Cabinet shelving, doors & precision commercial joinery",
    size: "1220 × 2440 mm",
  },
  {
    id: "saf-12",
    product: "Safarian",
    thickness: "12mm",
    special: false,
    use: "Modular cabinet boxes, shelving frames & sturdy seating",
    size: "1220 × 2440 mm",
  },
  {
    id: "ply-16",
    product: "Plywood",
    thickness: "16mm",
    special: false,
    use: "Structural carpentry, solid tables & heavy storage units",
    size: "1220 × 2440 mm",
  },
  {
    id: "ply-18",
    product: "Plywood",
    thickness: "18mm",
    special: true,
    use: "Signature 18mm Special Product — heavy wardrobe doors, executive desks & structural framing",
    size: "1220 × 2440 mm",
  },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftFloatRef = useRef<HTMLDivElement>(null);
  const rightFloatRef = useRef<HTMLDivElement>(null);
  const centerStageRef = useRef<HTMLDivElement>(null);

  const [selectedGaugeId, setSelectedGaugeId] = useState("ply-18");
  const activeGauge =
    HERO_GAUGES.find((g) => g.id === selectedGaugeId) || HERO_GAUGES[5];

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let isMounted = true;
    let revertFn: (() => void) | undefined;

    import("@/lib/gsap").then(({ getGSAP }) => {
      if (!isMounted || !heroRef.current) return;
      const gsap = getGSAP();

      const ctx = gsap.context(() => {
        if (leftFloatRef.current) {
          gsap.to(leftFloatRef.current, {
            y: -18,
            rotation: -3,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (rightFloatRef.current) {
          gsap.to(rightFloatRef.current, {
            y: -22,
            rotation: 3,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (centerStageRef.current) {
          gsap.fromTo(
            centerStageRef.current,
            { y: 14 },
            {
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            }
          );
        }
      }, heroRef);

      revertFn = () => ctx.revert();
    });

    return () => {
      isMounted = false;
      revertFn?.();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#FCFBF8] pt-10 sm:pt-14 lg:pt-16 pb-14 sm:pb-20 border-b border-[#E5DEC9]/70"
    >
      {/* Inspo Signature Radiant Bottom-Center Studio Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-[radial-gradient(ellipse_80%_65%_at_50%_72%,rgba(234,168,79,0.28),rgba(200,131,42,0.12)_48%,rgba(11,36,27,0.04)_75%,transparent_100%)]"
      />

      <Container size="wide" className="relative z-10">
        {/* Centered Typographic Anchor */}
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Left Floating Card (Inspo 00:01–00:02 symmetry, 1280px+ clear clearance) */}
          <div
            ref={leftFloatRef}
            className="hidden xl:flex flex-col justify-between text-left absolute left-0 top-6 w-56 p-4 rounded-2xl bg-gradient-to-br from-[#0B241B] via-[#103225] to-[#163B2D] text-white shadow-2xl border border-white/15 -rotate-6 transition-transform duration-300 hover:rotate-0 z-20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                Safarian Series
              </span>
              <Layers className="w-4 h-4 text-amber-300" />
            </div>
            <div className="my-3 flex flex-wrap gap-1.5">
              {["03mm", "06mm", "08mm", "12mm"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGaugeId(`saf-${g.replace("mm", "")}`)}
                  className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-[#C8832A] text-white text-[11px] font-bold tabular-nums transition-colors cursor-pointer"
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-white/75 flex items-center justify-between pt-2 border-t border-white/10">
              <span>Werabe Plant</span>
              <span className="font-semibold text-amber-200">4 Calibrated Gauges</span>
            </div>
          </div>

          {/* Right Floating Card */}
          <div
            ref={rightFloatRef}
            className="hidden xl:flex flex-col justify-between text-left absolute right-0 top-8 w-60 p-4 rounded-2xl bg-white text-[#141715] shadow-2xl border border-[#E5DEC9] rotate-6 transition-transform duration-300 hover:rotate-0 z-20"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FBF4EB] text-[#C8832A] border border-[#C8832A]/30">
                <Sparkles className="w-3 h-3" />
                Special Product
              </span>
              <span className="text-[11px] font-bold text-[#0B241B] tabular-nums">
                10+ Years
              </span>
            </div>

            <div className="my-3">
              <div className="font-display text-xl font-extrabold text-[#141715] tracking-tight">
                18mm Plywood
              </div>
              <p className="text-[11px] text-[#5A6961] mt-0.5">
                Flagship sheet thickness + 16mm structural panels
              </p>
            </div>

            {/* Visual Thickness Duo Bar */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5DEC9]/70 text-xs">
              <button
                type="button"
                onClick={() => setSelectedGaugeId("ply-16")}
                className="px-2.5 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#0B241B] hover:text-white font-bold text-center transition-colors cursor-pointer tabular-nums"
              >
                16mm
              </button>
              <button
                type="button"
                onClick={() => setSelectedGaugeId("ply-18")}
                className="px-2.5 py-1.5 rounded-lg bg-[#C8832A] hover:bg-[#AF6F1E] text-white font-bold text-center transition-colors cursor-pointer tabular-nums"
              >
                18mm ★
              </button>
            </div>
          </div>

          {/* Top Pill Badge */}
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-2xs text-xs font-bold text-[#0B241B] mb-5">
              <Factory className="w-3.5 h-3.5 text-[#C8832A]" />
              <span>Werabe Factory • Addis Ababa Office</span>
            </div>

            {/* Monumental Two-Line Display Heading (Inspo signature scale) */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-[-0.03em] text-[#141715] leading-[1.06]">
              Precision Boards.
              <br />
              <span className="text-[#C8832A]">Crafted</span> for Ethiopia.
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#3D4A43] max-w-2xl mx-auto leading-relaxed">
              With <strong className="text-[#141715]">10+ years of experience</strong>,{" "}
              <strong className="text-[#141715]">100% quality inspection</strong>, and{" "}
              <strong className="text-[#141715]">200+ trusted clients</strong>,{" "}
              <strong className="text-[#141715]">{siteConfig.name}</strong> produces calibrated{" "}
              <strong>Safarian (03mm, 06mm, 08mm, 12mm)</strong> and heavy structural{" "}
              <strong>Plywood (16mm &amp; Special 18mm)</strong>.
            </p>
          </div>

          {/* Primary Pill Actions */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#141715] hover:bg-[#0B241B] text-white font-bold text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <span>Request Quote</span>
              <span className="w-8 h-8 rounded-full bg-[#C8832A] text-white flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F4EFE6] text-[#141715] border border-[#E5DEC9] font-bold text-sm shadow-xs transition-all duration-200"
            >
              <span>Browse All Thicknesses</span>
            </Link>
          </div>
        </div>

        {/* Centerpiece Rising Interactive Architectural Panel Showcase (Inspo 00:02–00:04) */}
        <div
          ref={centerStageRef}
          className="mt-10 sm:mt-14 max-w-4xl mx-auto"
        >
          <div className="rounded-[2rem] bg-white p-3 sm:p-4 shadow-[0_24px_60px_-15px_rgba(11,36,27,0.16)] border border-[#E5DEC9]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch rounded-[1.5rem] bg-[#FCFBF8] border border-[#E5DEC9]/70 p-4 sm:p-6">
              {/* Left: Timber Stack Visual Photography */}
              <div className="md:col-span-5 relative min-h-[210px] rounded-2xl overflow-hidden bg-[#0B241B]">
                <Image
                  src={
                    activeGauge.product === "Plywood"
                      ? "/images/products/plywood-18mm-special.jpg"
                      : "/images/products/safarian-main.jpg"
                  }
                  alt={`${activeGauge.product} ${activeGauge.thickness} sheet panel`}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {activeGauge.product} • {activeGauge.thickness}
                  </span>
                  {activeGauge.special && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C8832A] text-white text-[10px] font-extrabold uppercase">
                      <Sparkles className="w-3 h-3" />
                      Special Product
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Interactive Thickness Gauge Switcher */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#5A6961]">
                      Interactive Spec Explorer
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B241B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8832A]" />
                      <span>Ready for Order Scheduling</span>
                    </span>
                  </div>

                  {/* Clickable Thickness Pills with Framer Motion Indicator */}
                  <div className="flex flex-wrap gap-2">
                    {HERO_GAUGES.map((g) => {
                      const active = g.id === activeGauge.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSelectedGaugeId(g.id)}
                          className={`relative px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer tabular-nums ${
                            active
                              ? "text-white border-transparent"
                              : g.special
                              ? "bg-[#FBF4EB] text-[#9A5D12] border-[#C8832A]/40 hover:border-[#C8832A]"
                              : "bg-white text-[#141715] border-[#E5DEC9] hover:border-[#0B241B]/40"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="hero-gauge-active"
                              className={`absolute inset-0 rounded-xl shadow-xs ${
                                g.special ? "bg-[#C8832A]" : "bg-[#0B241B]"
                              }`}
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1">
                            <span>{g.product} {g.thickness}</span>
                            {g.special && <Sparkles className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Spec Readout */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-lg text-[#141715]">
                      {activeGauge.product} ({activeGauge.thickness})
                    </span>
                    <span className="text-xs font-semibold text-[#5A6961] tabular-nums">
                      {activeGauge.size}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3D4A43] leading-relaxed">
                    {activeGauge.use}
                  </p>
                </div>

                {/* Quick Direct Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-3 text-[#3D4A43]">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C8832A]" />
                      Ayer Tena, Shamo Tower 3F
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="inline-flex items-center gap-1.5 font-bold text-[#0B241B] hover:text-[#C8832A] transition-colors tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    <span className="text-[#D8CFC0]">•</span>
                    <Link
                      href={`/quote?product=${encodeURIComponent(
                        activeGauge.product
                      )}&thickness=${encodeURIComponent(activeGauge.thickness)}`}
                      className="font-bold text-[#C8832A] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Select &amp; Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}