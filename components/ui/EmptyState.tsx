import React from "react";
import Link from "next/link";
import { PackageSearch, FolderPlus, ArrowRight, RotateCcw, LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  title,
  description,
  icon: Icon = PackageSearch,
  badge,
  primaryAction,
  secondaryAction,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "bg-white rounded-3xl border border-cream-border text-center flex flex-col items-center justify-center transition-all",
        compact ? "p-6 sm:p-8 space-y-3.5" : "p-8 sm:p-14 space-y-5 shadow-xs",
        className
      )}
    >
      {/* Icon Badge */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-forest/5 text-amber-oak flex items-center justify-center shadow-inner border border-forest/10">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-forest/75" />
        </div>
        {badge && (
          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
            {badge}
          </span>
        )}
      </div>

      {/* Copy */}
      <div className="max-w-md space-y-1.5 mx-auto">
        <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {secondaryAction && (
            <Button
              variant="secondary"
              size="sm"
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              {secondaryAction.label}
            </Button>
          )}

          {primaryAction && (
            <Button
              variant="amber"
              size="sm"
              href={primaryAction.href}
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon || <ArrowRight className="w-4 h-4" />}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
