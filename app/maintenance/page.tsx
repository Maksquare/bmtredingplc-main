"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, PhoneCall, MessageSquare, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState(42 * 60 + 15); // 42 minutes 15 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-[#071711] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Timber Grain Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 pattern-dark-grain" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-charcoal font-black flex items-center justify-center font-display">
            B
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white">
            {siteConfig.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Scheduled Catalog Upgrade</span>
        </div>
      </header>

      {/* Card Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto my-auto py-8">
        <div className="bg-[#0B241B] rounded-3xl border border-white/20 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6">
          {/* Maintenance Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-500/30 inline-block">
              Scheduled Inventory Maintenance
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Upgrading Timber Fleet & Pricing Engines
            </h1>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md mx-auto">
              We are currently synchronizing our Ethiopian warehouse yard stocks, lot test certificates, and contractor dispatch schedules to serve you better.
            </p>
          </div>

          {/* Estimated Resumption Timer */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-xs mx-auto space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">
              Estimated Service Resumption In:
            </span>
            <div className="font-mono text-2xl font-black text-amber-300 tracking-wider">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>

          {/* Emergency / Dispatch Channels */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-white/80 block">
              Direct Yard Dispatch Continues Uninterrupted:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Yard Desk</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20need%20urgent%20timber%20supply%20during%20maintenance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold border border-emerald-400/30 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-white/40 pt-2 border-t border-white/10">
            Physical Addis Ababa central warehouse gates remain open for contractor collection: Mon–Fri 08:00–17:30.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-white/40 max-w-5xl mx-auto w-full pb-2">
        © {new Date().getFullYear()} {siteConfig.name} • Certified Timber & Structural Plywood Logistics
      </footer>
    </div>
  );
}
