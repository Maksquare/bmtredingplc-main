import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "amber" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "default" | "lg";
  isLoading?: boolean;
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
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      target,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        "bg-forest text-cream hover:bg-forest-light shadow-sm active:translate-y-[1px] border border-forest-light/40",
      amber:
        "bg-amber-oak text-white hover:bg-amber-hover shadow-md shadow-amber-oak/20 active:translate-y-[1px] font-semibold",
      secondary:
        "bg-cream-surface text-charcoal hover:bg-cream-border border border-cream-border active:translate-y-[1px]",
      outline:
        "bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-cream active:translate-y-[1px]",
      ghost:
        "bg-transparent text-charcoal hover:bg-cream-surface hover:text-forest",
      dark:
        "bg-charcoal text-cream hover:bg-charcoal-light border border-charcoal-light shadow-sm active:translate-y-[1px]",
    };

    const sizeClasses = {
      sm: "h-9 px-3.5 text-xs rounded-lg gap-1.5",
      default: "h-11 px-5 text-sm rounded-xl gap-2",
      lg: "h-13 px-7 text-base rounded-xl gap-2.5",
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-oak",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} target={target} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

