"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTABanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Ambient lighting subtle breathing loop
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.28,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Pixel-Perfect Scroll Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Eyebrow badge entry
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -24, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.8)",
          }
        );
      }

      // Headline entry
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // Subtitle paragraph entry
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.35"
        );
      }

      // Trust chips entry
      if (chipsRef.current) {
        tl.fromTo(
          chipsRef.current.children,
          { opacity: 0, y: 16, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // CTA Buttons entry with springy back ease
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 28, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.25"
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden bg-[#071711] text-white py-20 lg:py-28 border-t-2 border-amber-500/20"
      aria-labelledby="cta-heading"
    >
      {/* 1. High-Resolution Architectural Timber Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1920&auto=format&fit=crop"
          alt="Architectural plywood grain texture"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        {/* Architectural Multi-layer Dark Gradient Vignettes for Pristine Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071711] via-[#071711]/92 to-[#071711]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071711] via-transparent to-[#071711]" />
      </div>

      {/* 2. GSAP-animated Ambient Gold/Amber Glow Orb */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-r from-amber-500/20 via-amber-600/15 to-emerald-600/15 rounded-full blur-[130px] pointer-events-none z-0"
      />

      {/* 3. Subtle Architectural Grid Accent Lines (FORM AT WOOD Geometric aesthetic) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="w-full h-full pattern-dark-grain" />
      </div>

      <Container size="default" className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        {/* Top Eyebrow Pill */}
        <div ref={badgeRef} className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0B241B] border-2 border-amber-400/50 text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            <span className="uppercase tracking-widest text-[11px]">
              Direct Importer • Addis Ababa Wholesale Supply Yard
            </span>
          </div>
        </div>

        {/* High-Contrast Architectural Headline */}
        <h2
          ref={headlineRef}
          id="cta-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]"
        >
          <span className="block">Ready to Secure Calibrated Plywood</span>
          <span className="block text-amber-400 drop-shadow-sm mt-1">
            for Your Next Commercial Build in Ethiopia?
          </span>
        </h2>

        {/* Crisp Subtitle */}
        <p
          ref={paragraphRef}
          className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Partner directly with <strong className="text-white font-bold">{siteConfig.name}</strong>. We supply certified BS 1088 marine panels, Dynea 120g/m² film-faced shuttering plywood, and architectural joinery boards with verified boiling-water-proof test reports and prompt flatbed dispatch across Addis Ababa and surrounding regions.
        </p>

        {/* Trust Specification Chips */}
        <div
          ref={chipsRef}
          className="flex flex-wrap items-center justify-center gap-3 pt-1"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Zero Core Voids Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dynea 120g/m² Phenolic Film</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Flatbed Jobsite Drop-Off</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Stamped Proforma in &lt; 2 Hours</span>
          </div>
        </div>

        {/* High-Impact Actions with Pixel-Perfect Contrast */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* 1. Request Custom Quote (Primary Gold CTA) */}
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center gap-2.5 h-13 px-8 text-base rounded-xl font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all duration-200 shadow-2xl shadow-amber-950/70 border border-amber-400/40 w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileText className="w-5 h-5 text-amber-100" />
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 text-amber-100 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* 2. WhatsApp Direct (Enterprise Green Pill) */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtredingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20wholesale%20supply%20in%20Ethiopia.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 h-13 px-7 text-base rounded-xl font-bold bg-[#128C7E] hover:bg-[#075E54] text-white transition-all duration-200 shadow-xl shadow-black/40 border border-emerald-400/30 w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-5 h-5 text-emerald-200" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* 3. Direct Phone Call to Central Yard */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center justify-center gap-2.5 h-13 px-6 text-sm sm:text-base rounded-xl font-bold bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white hover:text-amber-300 transition-all duration-200 backdrop-blur-md shadow-lg w-full sm:w-auto hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="w-6 h-6 rounded-md bg-amber-500/30 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>Call: {siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
