"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, FileText } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#071711]/95 backdrop-blur-md border-t border-white/15 px-3 py-2 shadow-2xl safe-area-inset-bottom">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Yard */}
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 transition-all text-white border border-white/10 min-h-[46px]"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Call Yard</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20supply.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#128C7E] hover:bg-[#075E54] active:scale-95 transition-all text-white border border-emerald-400/30 min-h-[46px] shadow-xs"
        >
          <MessageSquare className="w-4 h-4 text-emerald-200 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Request Formal Proforma Quote */}
        <Link
          href="/quote"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 transition-all text-white border border-amber-400/30 min-h-[46px] shadow-sm font-bold"
        >
          <FileText className="w-4 h-4 text-amber-200 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Request Quote</span>
        </Link>
      </div>
    </div>
  );
}
