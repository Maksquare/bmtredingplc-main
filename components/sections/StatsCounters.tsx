"use client";

import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Truck,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

// Register ScrollTrigger plugin on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statIcons = [
  Award,         // 18+ Years of Supply Reliability
  Layers,        // 120K+ Metric Tons Delivered
  Building2,     // 450+ Major Infrastructure Clients
  CheckCircle2,  // 100% Quality Standard Compliance
];

export function StatsCounters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header scroll reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Stat Cards staggered spring entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 45, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#071711] text-white py-20 lg:py-28 border-y border-white/15"
      aria-labelledby="stats-heading"
    >
      {/* Subtle Background Timber Grain Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <div className="w-full h-full pattern-dark-grain" />
      </div>

      {/* Warm Ambient Gold Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <Container size="wide" className="relative z-10">
        <div className="space-y-12 lg:space-y-16">
          {/* Section Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto space-y-3.5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Verified Supply Scale in Ethiopia
              </span>
            </div>

            <h2
              id="stats-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            >
              Industrial Scale & Measured Reliability
            </h2>

            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
              Consistently supplying the largest high-rise residential towers, highway bridge formwork, and hotel developments across Ethiopia.
            </p>
          </div>

          {/* 4 High-End Counter Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteConfig.stats.map((stat, i) => {
              const Icon = statIcons[i] || Award;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col items-center text-center p-8 sm:p-9 rounded-3xl bg-gradient-to-b from-[#0B241B] to-[#071711] border-2 border-white/15 hover:border-amber-400/60 shadow-2xl transition-all duration-400 hover:-translate-y-1.5 hover:shadow-amber-950/40 overflow-hidden"
                >
                  {/* Top Ambient Gold Highlight Line */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent group-hover:via-amber-400 transition-all duration-500" />

                  {/* Icon Emblem with Soft Glow */}
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-5 shadow-inner group-hover:scale-110 group-hover:bg-amber-500/25 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Ultra-Smooth Counter Number Powered by react-countup */}
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight flex items-center justify-center">
                    <span className="text-white drop-shadow-sm font-sans tabular-nums">
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.4}
                        delay={0.15 * i}
                        separator=","
                        useEasing={true}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    </span>
                    <span className="text-amber-400 font-black text-3xl sm:text-4xl lg:text-5xl ml-1 drop-shadow-xs">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Descriptive Label */}
                  <p className="text-sm sm:text-base font-bold text-white mt-4 max-w-[220px] leading-snug">
                    {stat.label}
                  </p>

                  {/* Bottom Verification Chip */}
                  <div className="mt-4 pt-3.5 border-t border-white/10 w-full flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-300/90 uppercase tracking-widest">
                      Verified Batch Data
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
