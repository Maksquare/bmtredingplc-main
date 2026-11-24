"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, RotateCw, PhoneCall, ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "./Button";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => Promise<void> | void;
  backHref?: string;
  backLabel?: string;
  className?: string;
  compact?: boolean;
  showSupportLink?: boolean;
}

export function ErrorState({
  title = "Unable to Load Timber Specifications",
  message = "A temporary connection interruption occurred while fetching real-time yard catalog data. No data has been lost.",
  onRetry,
  backHref = "/",
  backLabel = "Return to Safety",
  className,
  compact = false,
  showSupportLink = true,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    try {
      setIsRetrying(true);
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "rounded-3xl border border-red-200/80 bg-red-50/60 text-center flex flex-col items-center justify-center transition-all",
        compact ? "p-6 space-y-3" : "p-8 sm:p-12 space-y-5 shadow-xs",
        className
      )}
    >
      {/* Icon Badge */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-100/90 text-red-600 flex items-center justify-center shadow-inner border border-red-200">
        <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      {/* Message Copy */}
      <div className="max-w-md space-y-2 mx-auto">
        <h3 className="font-display text-lg sm:text-xl font-bold text-red-950 tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-red-900/80 leading-relaxed">
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <Button
            variant="amber"
            size="sm"
            onClick={handleRetry}
            isLoading={isRetrying}
            leftIcon={!isRetrying && <RotateCw className="w-3.5 h-3.5" />}
          >
            <span>{isRetrying ? "Retrying Connection..." : "Try Again"}</span>
          </Button>
        )}

        {backHref && (
          <Button
            variant="secondary"
            size="sm"
            href={backHref}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            {backLabel}
          </Button>
        )}
      </div>

      {showSupportLink && (
        <div className="pt-3 border-t border-red-200/60 text-xs text-red-900/70 flex items-center justify-center gap-2">
          <span>Need immediate yard assistance?</span>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="font-bold text-red-900 hover:text-red-950 inline-flex items-center gap-1 underline underline-offset-2"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Call {siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      )}
    </div>
  );
}
