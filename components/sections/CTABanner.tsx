"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  MapPin,
  Factory,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";

export function CTABanner() {
  return (
    <section
      className="py-16 sm:py-20 bg-[#FCFBF8] border-t border-[#E5DEC9]/70"
      aria-labelledby="cta-heading"
    >
      <Container size="wide">
        {/* Asymmetric Split Gradient Showcase Card (Inspo 00:23–00:25) */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#FBF4EB] via-[#F4E7D2] to-[#EBD3AF] border border-[#DFC7A3] p-8 sm:p-12 lg:p-14 shadow-lg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#C8832A]/20 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Pill Actions */}
            <div className="lg:col-span-7 space-y-6">
              <h2
                id="cta-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715] leading-[1.08]"
              >
                Start Your Next Build with Reliable Boards.
              </h2>

              <p className="text-sm sm:text-base text-[#2D332F] max-w-xl leading-relaxed">
                Coordinate bulk orders of Safarian (03mm, 06mm, 08mm, 12mm) or Plywood (16mm &amp; Special 18mm) directly with our Addis Ababa sales desk and Werabe manufacturing plant.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#141715] hover:bg-[#0B241B] text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 group"
                >
                  <span>Request a Quote</span>
                  <span className="w-8 h-8 rounded-full bg-[#C8832A] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FCFBF8] text-[#141715] border border-[#D8CFC0] font-bold text-sm shadow-xs transition-colors"
                >
                  <span>Explore Products</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs font-bold text-[#141715]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8832A]" />
                  10+ Years Experience
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8832A]" />
                  200+ Trusted Clients
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8832A]" />
                  100% Quality
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8832A]" />
                  Werabe Factory Direct
                </span>
              </div>
            </div>

            {/* Right Elevated Contact & Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#0B241B] text-white p-6 sm:p-7 shadow-2xl border border-white/10 space-y-5 lg:rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                      Direct Contact Desk
                    </span>
                    <div className="font-display text-lg font-bold text-white">
                      {siteConfig.name} Coordination
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#C8832A] flex items-center justify-center font-display font-black text-white">
                    B
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 text-white/85">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/55 block">
                        Office Address
                      </span>
                      <span className="font-semibold text-white">
                        {siteConfig.contact.address.full}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-white/85">
                    <Factory className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/55 block">
                        Factory Location
                      </span>
                      <span className="font-semibold text-white">
                        {siteConfig.contact.factory.full}
                      </span>
                    </div>
                  </div>
                </div>

                {/* All 3 Phone Numbers + WhatsApp & Telegram */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-xs font-bold text-white tabular-nums">
                      <Phone className="w-4 h-4 text-amber-300" />
                      {siteConfig.contact.phoneDisplay} (Primary)
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-amber-300" />
                  </a>

                  <div className="grid grid-cols-2 gap-2 text-xs tabular-nums">
                    <a
                      href={`tel:${siteConfig.contact.secondaryPhone}`}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-center font-semibold text-white/90 border border-white/10"
                    >
                      {siteConfig.contact.secondaryPhoneDisplay}
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.tertiaryPhone}`}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-center font-semibold text-white/90 border border-white/10"
                    >
                      {siteConfig.contact.tertiaryPhoneDisplay}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={siteConfig.contact.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1982b8] text-white text-xs font-bold transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </a>
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