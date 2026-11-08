"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const headlineWords = [
    "Architectural",
    "Plywood",
    "&",
    "Engineered",
    "Timber",
    "Solutions",
    "in",
    "Ethiopia.",
  ];

  return (
    <div className="relative overflow-hidden bg-[#071711] text-white pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-white/10">
      {/* High-Resolution Hero Background Image with Editorial Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1920&auto=format&fit=crop"
          alt="bmtredingplc architectural plywood interior and geometric timber wall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 opacity-35"
        />
        {/* Multi-layered Dark Architectural Vignette for Maximum Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071711] via-[#071711]/90 to-[#071711]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071711] via-transparent to-[#071711]/80" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300 backdrop-blur-md shadow-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
              <span className="uppercase tracking-widest text-[11px]">
                Ethiopia&apos;s Direct Importer & Wholesale Stockist
              </span>
            </motion.div>

            {/* Word-by-word animated headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.07 * i,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className={`inline-block mr-2.5 ${
                    word === "Plywood" || word === "Ethiopia."
                      ? "text-amber-400 underline decoration-amber-500/50 decoration-4 underline-offset-8"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Description with High Contrast */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-normal"
            >
              Welcome to <strong className="text-white font-bold">{siteConfig.name}</strong>. Headquartered in Addis Ababa, Ethiopia, we supply certified BS 1088 marine plywood, high-cycle Dynea film-faced shuttering panels, calibrated commercial hardwood veneers, and architectural decorative panels directly to tier-1 civil contractors, commercial builders, and luxury millwork studios.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button
                href="/quote"
                variant="amber"
                size="lg"
                leftIcon={<FileText className="w-5 h-5" />}
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                className="shadow-2xl shadow-amber-950/60 font-bold text-white bg-amber-600 hover:bg-amber-500 border border-amber-400/40 text-base py-3.5"
              >
                Request a Custom Quote
              </Button>

              <Button
                href="/products"
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#0B241B] font-bold backdrop-blur-md transition-all text-base py-3.5"
              >
                Browse Product Catalog
              </Button>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15"
            >
              <div className="flex items-center gap-2.5 text-xs text-white font-semibold">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>BS 1088 Marine Grade</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white font-semibold">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span>25+ Pours Dynea Film</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white font-semibold">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span>Addis Ababa Yard Dispatch</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-End Architectural Showcase Card (FORM AT WOOD Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-[#0B241B]/95 border-2 border-white/20 p-6 sm:p-7 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Architectural Visual Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 mb-5 shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop"
                  alt="Precision calibrated plywood cross-section and grain"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                    Premium Calibrated Veneer
                  </span>
                  <span className="text-[11px] font-bold text-white bg-amber-600 px-2.5 py-1 rounded-md shadow-sm">
                    ±0.2mm Gauge
                  </span>
                </div>
              </div>

              {/* Technical Specification Callout (Inspired by Reference) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Material Specification
                  </span>
                  <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                    Batch 2026/ET
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Thickness Range:</span>
                    <span className="font-bold text-white">4mm – 30mm Calibrated</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Material Core:</span>
                    <span className="font-bold text-white">Gurjan, Keruing & Hardwood</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/70">Core Construction:</span>
                    <span className="font-bold text-emerald-400">100% Solid (Zero Core Voids)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/70">Adhesive Bond:</span>
                    <span className="font-bold text-amber-300">WBP Phenolic (72-hr Boil Test)</span>
                  </div>
                </div>

                {/* Direct Sales Action */}
                <div className="pt-2">
                  <Link
                    href="/quote"
                    className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    <span>Request Spec Sheet & Proforma</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
