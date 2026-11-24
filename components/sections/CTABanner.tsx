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
  Truck,
} from "lucide-react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

export function CTABanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          "-=0.3"
        );
      }

      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.35"
        );
      }

      if (chipsRef.current) {
        tl.fromTo(
          chipsRef.current.children,
          { opacity: 0, y: 14, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "back.out(1.5)" },
          "-=0.25"
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden bg-[#071711] text-white py-14 sm:py-20 lg:py-24 border-t border-white/15"
      aria-labelledby="cta-heading"
    >
      {/* Background Architectural Texture with Deep Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1920&auto=format&fit=crop"
          alt="Architectural plywood grain texture"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071711] via-[#071711]/95 to-[#071711]" />
      </div>

      <Container size="default" className="relative z-10 text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
        {/* Status Tag */}
        <div ref={badgeRef} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="uppercase tracking-widest text-[10px] font-bold">
              Direct Importer • Addis Ababa Wholesale Supply Yard
            </span>
          </div>
        </div>

        {/* Architectural Headline */}
        <h2
          ref={headlineRef}
          id="cta-heading"
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]"
        >
          Secure Calibrated Timber & Plywood for Your Next Commercial Project.
        </h2>

        {/* Factual Subtitle */}
        <p
          ref={paragraphRef}
          className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed"
        >
          Partner directly with <strong className="text-white font-semibold">{siteConfig.name}</strong>. Certified BS 1088 marine panels, Dynea 120g/m² shuttering plywood, and architectural joinery boards with verified test reports and prompt dispatch across Ethiopia.
        </p>

        {/* Trust Specification Chips */}
        <div
          ref={chipsRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Zero Core Voids</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-white">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Dynea 120g/m² Film</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-white">
            <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Flatbed Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-white">
            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Proforma in &lt; 2 Hours</span>
          </div>
        </div>

        {/* High-Impact Actions with Mobile Optimization */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3"
        >
          {/* Primary Quote CTA */}
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center gap-2 min-h-[46px] px-6 text-sm rounded-xl font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all duration-200 shadow-lg shadow-amber-950/60 border border-amber-400/30 active:scale-98"
          >
            <FileText className="w-4 h-4 text-amber-100" />
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 text-amber-100 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20wholesale%20supply%20in%20Ethiopia.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 text-sm rounded-xl font-bold bg-[#128C7E] hover:bg-[#075E54] text-white transition-all duration-200 shadow-md border border-emerald-400/30 active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 text-xs sm:text-sm rounded-xl font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-amber-300 transition-all duration-200 active:scale-98"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call: {siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
