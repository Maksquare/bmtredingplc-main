"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function getGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return gsap;
}

export { ScrollTrigger };

/**
 * Check if the user has requested reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth GSAP scroll-triggered entrance for a single container or element.
 */
export function smoothFadeUp(
  target: gsap.DOMTarget,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    trigger?: gsap.DOMTarget;
    start?: string;
  } = {}
) {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  getGSAP();
  const {
    y = 36,
    duration = 0.8,
    delay = 0,
    ease = "power3.out",
    trigger = target,
    start = "top 88%",
  } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Smooth staggered reveal for children elements.
 */
export function smoothStagger(
  targets: gsap.DOMTarget,
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    ease?: string;
    trigger?: gsap.DOMTarget;
    start?: string;
  } = {}
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  getGSAP();
  const {
    stagger = 0.08,
    y = 30,
    duration = 0.75,
    ease = "power2.out",
    trigger = targets,
    start = "top 86%",
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

