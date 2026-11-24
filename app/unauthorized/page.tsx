"use client";

import React from "react";
import Link from "next/link";
import { ShieldX, Lock, ArrowLeft, ArrowRight, Building2, HelpCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#071711] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Timber Grain Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 pattern-dark-grain" />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs font-semibold group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Website</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/15">
          <ShieldX className="w-3.5 h-3.5 text-red-400" />
          <span>Access Restricted</span>
        </div>
      </header>

      {/* Card Container */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-[#0B241B] rounded-3xl border border-white/20 p-6 sm:p-9 shadow-2xl backdrop-blur-xl text-center space-y-6">
          {/* Lock Badge */}
          <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          {/* Copy */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/30 inline-block">
              403 • Authorization Required
            </span>
            <h1 className="font-display text-2xl font-black text-white tracking-tight">
              Administrative Area
            </h1>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm mx-auto">
              This inventory console and contractor RFQ workspace requires verified staff credentials under the{" "}
              <strong className="text-white font-semibold">@{siteConfig.domain}</strong> organization directory.
            </p>
          </div>

          {/* Quick Staff Login CTA */}
          <div className="pt-2 flex flex-col gap-3">
            <Button
              href="/auth/login"
              variant="amber"
              size="lg"
              className="w-full font-bold shadow-lg shadow-amber-950/60"
              rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Sign In to Staff Account
            </Button>

            <Button
              href="/"
              variant="secondary"
              size="default"
              className="w-full text-white bg-white/10 hover:bg-white/15 border-white/15"
              leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
            >
              Return to Catalog
            </Button>
          </div>

          {/* Security Notice */}
          <div className="pt-3 border-t border-white/10 text-[10px] text-white/50 space-y-1">
            <p>Session telemetry logged from Addis Ababa Operational Gateways.</p>
            <p>If you believe you should have access, contact your yard supervisor.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-white/40 max-w-5xl mx-auto w-full pb-2">
        © {new Date().getFullYear()} {siteConfig.name} • Internal Enterprise Portal
      </footer>
    </div>
  );
}
