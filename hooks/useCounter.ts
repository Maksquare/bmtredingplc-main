"use client";

import { useState, useEffect } from "react";

export function useCounter(target: number, duration = 1800, startOnView = true): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalSteps = 60;
    const stepDuration = duration / totalSteps;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, duration, startOnView]);

  return count;
}

