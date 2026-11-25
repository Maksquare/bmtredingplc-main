"use client";

import React from "react";
import Link from "next/link";
import { Wrench, PhoneCall, MessageSquare, Send, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-forest-dark text-cream relative overflow-hidden bg-dark-grain">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-oak/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-light/20 rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10 border-b border-white/10 py-5 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-oak flex items-center justify-center font-display font-black text-lg text-white">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white">
                {siteConfig.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400">
                Safarian &amp; Plywood • Ethiopia
              </span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <Container size="narrow" className="text-center max-w-2xl space-y-8">
          <div className="inline-flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-forest-surface border-2 border-amber-oak/40 text-amber-light flex items-center justify-center shadow-2xl">
              <Wrench className="w-10 h-10" />
            </div>
            <span className="mt-4 px-3.5 py-1 rounded-full bg-amber-oak/20 border border-amber-oak/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
              Scheduled Maintenance
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              We&apos;re updating the {siteConfig.name} portal.
            </h1>
            <p className="text-sm sm:text-base text-cream/80 leading-relaxed max-w-xl mx-auto">
              Our website is undergoing a brief update. Our Addis Ababa office at Ayer Tena (Shamo Tower, 3rd Floor) and Werabe factory remain open for phone, WhatsApp, and Telegram inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              href={`tel:${siteConfig.contact.phone}`}
              variant="amber"
              leftIcon={<PhoneCall className="w-4 h-4" />}
              className="w-full sm:w-auto font-bold shadow-lg"
            >
              Call {siteConfig.contact.phoneDisplay}
            </Button>
            <Button
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              variant="outline"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              className="w-full sm:w-auto border-emerald-400/40 text-emerald-300 hover:bg-emerald-950/50"
            >
              WhatsApp Desk
            </Button>
            <Button
              href={siteConfig.contact.telegramUrl}
              variant="outline"
              leftIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto border-sky-400/40 text-sky-300 hover:bg-sky-950/50"
            >
              Telegram
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-cream/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Office: {siteConfig.contact.address.full}</span>
            </span>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 text-cream/50 hover:text-amber-300 transition-colors"
            >
              <span>Staff Admin Access</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}