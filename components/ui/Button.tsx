"use client";

import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "amber" | "secondary" | "outline" | "ghost" | "dark" | "danger";
  size?: "xs" | "sm" | "default" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  disabledReason?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      loadingText,
      disabledReason,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      target,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const variantClasses = {
      primary:
        "bg-forest text-cream hover:bg-forest-light shadow-sm active:scale-[0.98] border border-forest-light/40 hover:shadow-md hover:border-amber-oak/40 focus-visible:ring-forest",
      amber:
        "bg-amber-600 text-white hover:bg-amber-500 shadow-md shadow-amber-900/20 active:scale-[0.98] font-bold border border-amber-400/30 hover:shadow-lg hover:shadow-amber-900/30 focus-visible:ring-amber-500",
      secondary:
        "bg-cream-surface text-charcoal hover:bg-cream-border border border-cream-border active:scale-[0.98] hover:shadow-xs focus-visible:ring-charcoal",
      outline:
        "bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-cream active:scale-[0.98] hover:shadow-sm focus-visible:ring-forest",
      ghost:
        "bg-transparent text-charcoal hover:bg-cream-surface hover:text-forest active:scale-[0.98] focus-visible:ring-forest",
      dark:
        "bg-charcoal text-cream hover:bg-charcoal-light border border-charcoal-light shadow-sm active:scale-[0.98] hover:shadow-md focus-visible:ring-charcoal",
      danger:
        "bg-red-700 text-white hover:bg-red-600 shadow-sm active:scale-[0.98] border border-red-500/40 hover:shadow-md focus-visible:ring-red-600",
    };

    const sizeClasses = {
      xs: "min-h-[32px] px-2.5 text-[11px] rounded-lg gap-1",
      sm: "min-h-[40px] px-3.5 text-xs rounded-lg gap-1.5",
      default: "min-h-[44px] px-5 text-sm rounded-xl gap-2",
      lg: "min-h-[50px] px-7 text-base rounded-xl gap-2.5",
    };

    const baseClasses = cn(
      "group relative inline-flex items-center justify-center font-medium transition-all duration-150 select-none overflow-hidden",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "motion-reduce:transition-none motion-reduce:transform-none",
      isDisabled
        ? "opacity-55 cursor-not-allowed pointer-events-auto shadow-none"
        : "cursor-pointer",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const content = (
      <>
        {/* Subtle Specular Light Sweep Animation on Hover */}
        {!isDisabled && (
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out motion-reduce:hidden"
            aria-hidden="true"
          />
        )}

        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />}
        {!isLoading && leftIcon && (
          <span className="shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}

        <span className="truncate">
          {isLoading && loadingText ? loadingText : children}
        </span>

        {!isLoading && rightIcon && (
          <span className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </>
    );

    // If disabled with a reason, wrap with tooltip container
    const buttonElement = (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        title={disabledReason || (typeof children === "string" ? children : undefined)}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick(e);
        }}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );

    // Render as Next.js Link when href is provided
    if (href && !isDisabled) {
      return (
        <Link
          href={href}
          target={target}
          className={baseClasses}
          title={typeof children === "string" ? children : undefined}
        >
          {content}
        </Link>
      );
    }

    if (disabledReason && isDisabled) {
      return (
        <span
          className="relative inline-flex group/tooltip"
          tabIndex={0}
          role="note"
          aria-label={disabledReason}
        >
          {buttonElement}
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-2.5 py-1 text-[11px] font-medium text-white bg-charcoal/95 rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 transition-opacity z-50">
            {disabledReason}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-charcoal/95" />
          </span>
        </span>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";
