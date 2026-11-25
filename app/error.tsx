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
    console.error("[bmtradingplc System Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <header className="bg-forest-dark text-white py-4 px-6 border-b border-forest-light/30 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-oak flex items-center justify-center font-display font-black text-base text-white">
            B
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>
        <Link
          href="/contact"
          className="text-xs font-bold text-amber-light hover:underline flex items-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          {siteConfig.contact.phoneDisplay}
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-oak/5 rounded-full blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center max-w-lg space-y-8 relative z-10">
          <div className="inline-flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-red-50 border-2 border-red-200 text-red-600 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <span className="mt-4 px-3 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-extrabold uppercase tracking-widest border border-red-200">
              Temporary Glitch
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-charcoal tracking-tight">
              We hit a temporary snag loading this page.
            </h1>
            <p className="text-sm text-charcoal-light leading-relaxed">
              Something interrupted the request on our side. Your unsaved draft data has not been cleared, and retrying usually restores normal access immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="amber"
              onClick={() => reset()}
              leftIcon={<RotateCw className="w-4 h-4" />}
              className="w-full sm:w-auto font-bold shadow-md"
            >
              Try Again
            </Button>
            <Button
              href="/"
              variant="outline"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Return Home
            </Button>
            <Button
              href="/products"
              variant="ghost"
              leftIcon={<Layers className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              View Products
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-cream-border shadow-xs space-y-2 text-xs text-charcoal-light">
            <p className="font-semibold text-charcoal flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>Need help immediately?</span>
            </p>
            <p>
              Call our Addis Ababa office on{" "}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-bold text-amber-oak hover:underline"
              >
                {siteConfig.contact.phoneDisplay}
              </a>{" "}
              or{" "}
              <Link href="/contact" className="font-bold text-forest hover:underline">
                send a direct message
              </Link>
              .
            </p>
          </div>
        </Container>
      </main>
    </div>
  );
}