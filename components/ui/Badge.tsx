import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "amber" | "forest" | "neutral" | "outline" | "success";
  size?: "sm" | "default";
  children: React.ReactNode;
}

export function Badge({
  variant = "neutral",
  size = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantClasses = {
    amber: "bg-amber-pale text-amber-oak border border-amber-light/30 font-semibold",
    forest: "bg-forest/10 text-forest border border-forest/20 font-semibold",
    neutral: "bg-cream-surface text-charcoal-muted border border-cream-border",
    outline: "bg-transparent text-charcoal-muted border border-cream-border",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs rounded-md",
    default: "px-2.5 py-1 text-xs rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

