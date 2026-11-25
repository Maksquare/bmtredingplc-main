"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#FCFBF8]/95 backdrop-blur-xl border-t border-[#E5DEC9] px-3 py-2 shadow-[0_-8px_24px_rgba(20,23,21,0.08)] safe-area-inset-bottom">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Office */}
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-white hover:bg-[#F4EFE6] active:scale-95 transition-all text-[#141715] border border-[#E5DEC9] min-h-[46px]"
        >
          <Phone className="w-4 h-4 text-[#C8832A] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight tabular-nums">
            {siteConfig.contact.phoneDisplay}
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20would%20like%20to%20inquire%20about%20Safarian%20and%20Plywood%20supply.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-[#128C7E] hover:bg-[#075E54] active:scale-95 transition-all text-white min-h-[46px] shadow-2xs"
        >
          <MessageSquare className="w-4 h-4 text-emerald-100 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Request Quote */}
        <Link
          href="/quote"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-[#141715] hover:bg-[#0B241B] active:scale-95 transition-all text-white min-h-[46px] shadow-sm font-bold"
        >
          <ArrowUpRight className="w-4 h-4 text-[#EAA84F] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Request Quote</span>
        </Link>
      </div>
    </div>
  );
}