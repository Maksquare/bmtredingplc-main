"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, Check, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("bmtradingplc_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bmtradingplc_cookie_consent",
        JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
      );
    }
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bmtradingplc_cookie_consent",
        JSON.stringify({ ...preferences, timestamp: Date.now() })
      );
    }
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bmtradingplc_cookie_consent",
        JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })
      );
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-white border border-cream-border rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-pale text-amber-oak flex items-center justify-center shrink-0 border border-amber-oak/20">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="font-display font-bold text-sm text-charcoal">
            Cookie & Engineering Privacy
          </h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            We use technical cookies to store custom quote specifications and optimize timber catalog loading speeds across Ethiopia.
          </p>

          {showPreferences && (
            <div className="pt-2 pb-1 space-y-2 border-t border-cream-border/60 text-xs text-charcoal">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-medium">Strictly Necessary (Session, RFQ & Auth)</span>
                <input type="checkbox" checked disabled className="accent-forest" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-medium">Catalog Performance Analytics</span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="accent-amber-oak"
                />
              </label>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-2">
            {!showPreferences ? (
              <>
                <Button variant="amber" size="sm" onClick={handleAcceptAll} className="text-xs py-1.5 px-3 min-h-[34px]">
                  Accept All
                </Button>
                <Button variant="outline" size="sm" onClick={handleRejectNonEssential} className="text-xs py-1.5 px-3 min-h-[34px]">
                  Essential Only
                </Button>
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="text-xs text-charcoal-subtle hover:text-charcoal underline ml-1"
                >
                  Customize
                </button>
              </>
            ) : (
              <>
                <Button variant="amber" size="sm" onClick={handleSaveCustom} className="text-xs py-1.5 px-3 min-h-[34px]">
                  Save Settings
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowPreferences(false)} className="text-xs py-1.5 px-3 min-h-[34px]">
                  Back
                </Button>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRejectNonEssential}
          className="text-charcoal-subtle hover:text-charcoal p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
