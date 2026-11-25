"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.65,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = { opacity: 0 };
      if (variant === "fade-up") fromVars = { opacity: 0, y: 32 };
      else if (variant === "fade-down") fromVars = { opacity: 0, y: -32 };
      else if (variant === "fade-left") fromVars = { opacity: 0, x: -32 };
      else if (variant === "fade-right") fromVars = { opacity: 0, x: 32 };
      else if (variant === "zoom-in") fromVars = { opacity: 0, scale: 0.94, y: 16 };
      else fromVars = { opacity: 0 };

      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          immediateRender: false,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.09,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      Array.from(el.children).forEach((child) => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "none";
      });
      return;
    }

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: staggerDelay,
          immediateRender: false,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
