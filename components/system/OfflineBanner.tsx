"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

function subscribeNetwork(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getNetworkSnapshot() {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

function getServerNetworkSnapshot() {
  return true;
}

export function OfflineBanner() {
  const isOnline = useSyncExternalStore(
    subscribeNetwork,
    getNetworkSnapshot,
    getServerNetworkSnapshot
  );
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      queueMicrotask(() => setWasOffline(true));
      return;
    }

    const timer = setTimeout(() => {
      setWasOffline(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOnline]);

  if (isOnline && !wasOffline) return null;

  return (
    <aside
      role="status"
      aria-live="assertive"
      className="fixed top-0 inset-x-0 z-[120] pointer-events-none flex justify-center p-3 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="pointer-events-auto rounded-full px-4 py-2 text-xs font-semibold shadow-xl backdrop-blur-xl border flex items-center gap-2.5 transition-all">
        {!isOnline ? (
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
            <span>Connection restored! Live timber inventory synchronized.</span>
          </div>
        )}
      </div>
    </aside>
  );
}
