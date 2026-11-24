"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOffline = () => {
      setIsOffline(true);
      setWasOffline(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      // Keep online confirmation for 4 seconds
      const timer = setTimeout(() => {
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline && !wasOffline) return null;

  return (
    <aside
      role="status"
      aria-live="assertive"
      className="fixed top-0 inset-x-0 z-[120] pointer-events-none flex justify-center p-3 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="pointer-events-auto rounded-full px-4 py-2 text-xs font-semibold shadow-xl backdrop-blur-xl border flex items-center gap-2.5 transition-all">
        {isOffline ? (
          <div className="bg-amber-950/90 text-amber-200 border-amber-500/40 flex items-center gap-2 px-3 py-1 rounded-full">
            <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Offline Mode • Viewing cached specifications. Form submissions will queue.</span>
            <button
              onClick={() => window.location.reload()}
              className="ml-2 underline text-amber-100 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-950/90 text-emerald-200 border-emerald-500/40 flex items-center gap-2 px-3 py-1 rounded-full">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connection restored! Live timber inventory and pricing synchronized.</span>
          </div>
        )}
      </div>
    </aside>
  );
}
