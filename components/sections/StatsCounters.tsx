"use client";

import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import {
  Building2,
  CheckCircle2,
  Award,
  Layers,
} from "lucide-react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

const statIcons = [
  Award,         // Years of Supply Reliability
  Layers,        // Metric Tons Delivered
  Building2,     // Major Infrastructure Clients
  CheckCircle2,  // Quality Standard Compliance
];

export function StatsCounters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      // 1. Header scroll reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Stat Cards staggered spring entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 84%",
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
      className="relative overflow-hidden bg-[#071711] text-white py-12 sm:py-16 lg:py-24 border-y border-white/15"
      aria-labelledby="stats-heading"
    >
      <Container size="wide" className="relative z-10">
        <div className="space-y-8 sm:space-y-12">
          {/* Section Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto space-y-2.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 shadow-2xs">
                Verified Supply Data
              </span>
            </div>

            <h2
              id="stats-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
            >
              Wholesale Timber Scale & Measured Reliability
            </h2>

            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
              Consistently supplying the largest high-rise towers, civil bridge formwork, and hotel developments across Ethiopia.
            </p>
          </div>

          {/* 4 Counter Cards: Compact 2x2 grid on mobile, 4-col on desktop */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            {siteConfig.stats.map((stat, i) => {
              const Icon = statIcons[i] || Award;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col items-center text-center p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0B241B] to-[#071711] border border-white/15 hover:border-amber-400/50 shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Top Ambient Gold Highlight Line */}
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all duration-500" />

                  {/* Icon Emblem */}
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 sm:mb-4 shadow-inner group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Number Counter */}
                  <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center">
                    <span className="text-white tabular-nums">
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.2}
                        delay={0.1 * i}
                        separator=","
                        useEasing={true}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    </span>
                    <span className="text-amber-400 font-black text-xl sm:text-3xl lg:text-4xl ml-0.5">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Descriptive Label */}
                  <p className="text-[11px] sm:text-xs font-semibold text-white/90 mt-2 sm:mt-3 leading-snug">
                    {stat.label}
                  </p>

                  {/* Verification Indicator */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 w-full flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-300/80 uppercase tracking-wider">
                      Batch Verified
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
