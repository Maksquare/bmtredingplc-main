"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PartnerLogoBadgeProps {
  logoUrl?: string;
  name: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Renders a partner organization's logo on a clean white surface frame with
 * graceful fallback to monogram initials if the image fails to load.
 */
export function PartnerLogoBadge({
  logoUrl,
  name,
  initials,
  size = "md",
  className,
}: PartnerLogoBadgeProps) {
  const [failed, setFailed] = useState(false);

  const sizeClasses = {
    sm: "h-9 min-w-[2.5rem] px-2 rounded-lg",
    md: "h-12 min-w-[3.25rem] px-2.5 py-1.5 rounded-xl",
    lg: "h-14 min-w-[4rem] px-3 py-2 rounded-xl",
  }[size];

  const imgClasses = {
    sm: "h-6 w-auto max-w-[82px]",
    md: "h-8 sm:h-9 w-auto max-w-[116px]",
    lg: "h-10 w-auto max-w-[140px]",
  }[size];

  const dims = {
    sm: { width: 82, height: 24 },
    md: { width: 116, height: 36 },
    lg: { width: 140, height: 40 },
  }[size];

  if (!logoUrl || failed) {
    return (
      <div
        className={cn(
          sizeClasses,
          "bg-amber-oak/15 border border-amber-oak/35 text-amber-oak font-display font-bold text-xs flex items-center justify-center shrink-0",
          className
        )}
      >
        {initials || name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={cn(
        sizeClasses,
        "bg-white border border-black/10 shadow-xs flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105",
        className
      )}
    >
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={dims.width}
        height={dims.height}
        unoptimized={!logoUrl.startsWith("/")}
        onError={() => setFailed(true)}
        className={cn(imgClasses, "object-contain select-none")}
      />
    </div>
  );
}
