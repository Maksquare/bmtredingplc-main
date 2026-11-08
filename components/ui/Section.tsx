import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "cream" | "cream-surface" | "forest" | "charcoal";
  woodgrain?: boolean;
  padded?: "none" | "sm" | "default" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  variant = "cream",
  woodgrain = false,
  padded = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const variantClasses = {
    cream: "bg-[#F8F5F0] text-[#141715]",
    "cream-surface": "bg-[#EFEAE0] text-[#141715]",
    forest: "bg-[#0B241B] text-[#F8F5F0]",
    charcoal: "bg-[#071711] text-[#F8F5F0]",
  };

  const padClasses = {
    none: "",
    sm: "py-10 md:py-16",
    default: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  const patternClass = woodgrain
    ? variant === "forest" || variant === "charcoal"
      ? "pattern-dark-grain"
      : "pattern-timber-grain"
    : "";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        padClasses[padded],
        patternClass,
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

