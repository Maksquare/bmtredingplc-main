"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  X,
  Layers,
  Database,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function AdminOnboardingTour() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]); // Steps 1 and 2 completed

  useEffect(() => {
    const saved = localStorage.getItem("bmt_admin_onboarding_dismissed");
    if (saved === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("bmt_admin_onboarding_dismissed", "true");
  };

  if (isDismissed) return null;

  const steps = [
    {
      id: 1,
      title: "Certified Timber Catalog Populated",
      desc: "All 7 BS 1088 marine and shuttering products seeded into inventory.",
      href: "/admin/products",
      cta: "View Catalog",
      icon: Layers,
      done: true,
    },
    {
      id: 2,
      title: "Supabase PostgreSQL Database Connected",
      desc: "Live database tables and Row-Level Security verified active.",
      href: "/admin/settings",
      cta: "Verify Database",
      icon: Database,
      done: true,
    },
    {
      id: 3,
      title: "Connect cPanel Storage & SMTP Mail",
      desc: "Configure upload endpoints and mailbox for automated client quotes.",
      href: "/admin/settings",
      cta: "Complete Setup",
      icon: Mail,
      done: false,
    },
  ];

  const progressPercent = Math.round((2 / 3) * 100);

  return (
    <div className="bg-gradient-to-br from-[#0B241B] to-[#071711] text-white rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 relative z-10 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Welcome to {siteConfig.name} Portal</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
            Operations Onboarding Checklist
          </h3>
          <p className="text-xs text-white/70 max-w-xl">
            Complete these 3 essential operational milestones to launch contractor quoting and real-time inventory management.
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss onboarding guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 py-4 space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-white/80">
          <span>Deployment Progress</span>
          <span className="text-amber-300 font-bold">{progressPercent}% Completed</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10 pt-1">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all ${
                step.done
                  ? "bg-white/[0.04] border-emerald-500/30"
                  : "bg-white/[0.08] border-amber-400/50 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${step.done ? "text-emerald-400" : "text-amber-400"}`} />
                  <span className="text-xs font-bold text-white">Step {step.id}</span>
                </div>
                {step.done ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Action Needed
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white tracking-tight">{step.title}</h4>
              <p className="text-[11px] text-white/60 leading-relaxed pt-1 pb-3">{step.desc}</p>

              <Link
                href={step.href}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                  step.done
                    ? "text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
                    : "text-white bg-amber-600 hover:bg-amber-500 shadow-sm"
                }`}
              >
                <span>{step.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
