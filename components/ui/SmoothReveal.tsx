"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";

export interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-scale" | "fade-left" | "fade-right" | "clip-up" | "stagger";
  delay?: number;
  duration?: number;
  yOffset?: number;
  stagger?: number;
  start?: string;
  as?: React.ElementType;
}

export function SmoothReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.75,
  yOffset = 30,
  stagger = 0.08,
  start = "top 88%",
  as: Component = "div",
}: SmoothRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const gsap = getGSAP();
    const ctx = gsap.context(() => {
      if (variant === "stagger") {
        const targets = el.children;
        gsap.fromTo(
          targets,
          { opacity: 0, y: yOffset, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else if (variant === "fade-scale") {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95, y: yOffset / 2 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration,
            delay,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else if (variant === "clip-up") {
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else if (variant === "fade-left") {
        gsap.fromTo(
          el,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else if (variant === "fade-right") {
        gsap.fromTo(
          el,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        // fade-up
        gsap.fromTo(
          el,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, yOffset, stagger, start]);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}

