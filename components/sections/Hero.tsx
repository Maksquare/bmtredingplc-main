"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
          "-=0.4"
        );
      }

      if (trustRef.current) {
        tl.fromTo(
          trustRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );
      }

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-[#071711] text-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28 border-b border-white/10"
    >
      {/* Background Architectural Timber Visual with Deep Natural Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1920&auto=format&fit=crop"
          alt="bmtradingplc architectural timber and structural plywood"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071711] via-[#071711]/92 to-[#071711]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071711] via-transparent to-[#071711]/80" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Authentic Commercial & Engineering Positioning */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Architectural Status Tag (Refined, no AI pulse gimmicks) */}
            <div ref={badgeRef}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="uppercase tracking-widest text-[11px] font-bold">
                  Wholesale Timber & Plywood Yard • Addis Ababa
                </span>
              </div>
            </div>

            {/* Editorial Headline with Restrained Contrast */}
            <h1
              ref={headlineRef}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Certified Plywood & Architectural Timber for High-Spec Construction.
            </h1>

            {/* Factual, Grounded Description */}
            <p
              ref={descRef}
              className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl leading-relaxed font-normal"
            >
              Direct importer and wholesale distributor in Ethiopia. We stock certified{" "}
              <span className="text-white font-medium">BS 1088 marine plywood</span>, high-cycle{" "}
              <span className="text-white font-medium">Dynea 120g/m² film-faced shuttering</span>, and calibrated joinery hardwoods. Stamped proforma invoices and mill test certificates supplied within hours.
            </p>

            {/* CTA Buttons with Micro-interactions */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <Button
                href="/quote"
                variant="amber"
                size="lg"
                leftIcon={<FileText className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-xl shadow-amber-950/60 font-bold text-white bg-amber-600 hover:bg-amber-500 border border-amber-400/30 text-sm sm:text-base py-3.5"
              >
                Request a Formal Quote
              </Button>

              <Button
                href="/products"
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/5 hover:bg-white text-white hover:text-[#0B241B] font-bold backdrop-blur-md transition-all duration-200 text-sm sm:text-base py-3.5"
              >
                Browse All Specifications
              </Button>
            </div>

            {/* Micro Trust Indicators - Clean & Informative */}
            <div
              ref={trustRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-white/15"
            >
              <div className="flex items-center gap-2.5 text-xs text-white/90 font-medium">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>BS 1088 Marine Grade</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90 font-medium">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span>Dynea Phenolic Film</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90 font-medium">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-amber-300 shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span>Addis Ababa Yard Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Precision Technical Specification Card */}
          <div ref={cardRef} className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#0B241B] border border-white/20 p-5 sm:p-6 shadow-2xl backdrop-blur-xl group hover:border-amber-400/40 transition-colors duration-300">
              {/* Product Preview Image with Grain Framing */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 mb-4 shadow-md bg-black">
                <Image
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop"
                  alt="Calibrated hardwood veneer cross-section"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                    Calibrated Core Timber
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white bg-amber-600 px-2 py-0.5 rounded shadow-xs">
                    ±0.2mm Gauge
                  </span>
                </div>
              </div>

              {/* Technical Data Snapshot */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Stock Verification
                  </span>
                  <span className="text-[11px] font-semibold text-white/70">
                    Addis Ababa Central Yard
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Available Thickness:</span>
                    <span className="font-semibold text-white">4mm to 30mm Calibrated</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Core Species:</span>
                    <span className="font-semibold text-white">Gurjan, Keruing & Hardwood</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Core Quality:</span>
                    <span className="font-semibold text-emerald-400">100% Solid (Zero Core Voids)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Bonding Resin:</span>
                    <span className="font-semibold text-amber-300">WBP Phenolic (72-hr Boil Test)</span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    href="/quote"
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all duration-200 group/btn"
                  >
                    <span>Request Spec Sheet & Wholesale Price</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
