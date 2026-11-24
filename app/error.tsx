"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home, PhoneCall, Layers, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client-side error to internal telemetry or console
    console.error("[Application Runtime Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream bg-timber-grain flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="max-w-2xl w-full mx-auto my-auto space-y-6 text-center">
        {/* Error Badge */}
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-300/40 inline-block">
            500 • Operational Service Interruption
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-charcoal tracking-tight">
            Something Unexpected Occurred
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-lg mx-auto">
            The page encountered a temporary processing glitch while communicating with the catalog services. Our technical team has been notified.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Button
            variant="amber"
            size="lg"
            onClick={() => reset()}
            leftIcon={<RotateCw className="w-4 h-4" />}
          >
            Try Refreshing Page
          </Button>

          <Button
            variant="primary"
            size="lg"
            href="/"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Return to Homepage
          </Button>

          <Button
            variant="secondary"
            size="lg"
            href="/products"
            leftIcon={<Layers className="w-4 h-4" />}
          >
            Browse Catalog
          </Button>
        </div>

        {/* Assistance Card */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-cream-border text-xs text-charcoal-muted space-y-2 max-w-md mx-auto shadow-xs">
          <div className="flex items-center justify-center gap-1.5 font-bold text-charcoal">
            <PhoneCall className="w-3.5 h-3.5 text-forest" />
            <span>Direct Commercial Desk Support:</span>
          </div>
          <p>
            For urgent structural timber orders or contract consignments in Addis Ababa, reach our sales engineers at{" "}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="text-forest font-bold underline underline-offset-2"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-charcoal-subtle pt-8">
        © {new Date().getFullYear()} {siteConfig.name} • Certified Timber & Structural Plywood Logistics
      </footer>
    </div>
  );
}
