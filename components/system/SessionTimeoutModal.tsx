"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, ShieldAlert, LogIn, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SessionTimeoutModalProps {
  isOpen: boolean;
  onStayLoggedIn: () => void;
  onLogout: () => void;
  initialCountdown?: number;
}

export function SessionTimeoutModal({
  isOpen,
  onStayLoggedIn,
  onLogout,
  initialCountdown = 60,
}: SessionTimeoutModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialCountdown);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(initialCountdown);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, initialCountdown, onLogout]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      role="alertdialog"
      aria-labelledby="session-timeout-title"
      aria-describedby="session-timeout-desc"
    >
      <div className="bg-white rounded-3xl max-w-md w-full border border-cream-border p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mx-auto shadow-inner">
          <Clock className="w-7 h-7 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 id="session-timeout-title" className="font-display font-bold text-xl text-charcoal">
            Staff Session Expiring Soon
          </h2>
          <p id="session-timeout-desc" className="text-xs text-charcoal-muted leading-relaxed">
            Due to inactivity on the central timber inventory portal, your session will automatically terminate in:
          </p>

          <div className="py-2">
            <span className="font-display font-black text-4xl text-amber-oak tracking-tight font-mono">
              00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
            </span>
            <span className="text-[11px] text-charcoal-subtle block mt-1">
              seconds remaining before auto-lockout
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Button
            variant="amber"
            size="default"
            onClick={onStayLoggedIn}
            className="w-full justify-center text-xs sm:text-sm font-bold shadow-md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Stay Signed In
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={onLogout}
            className="w-full justify-center text-xs sm:text-sm font-semibold"
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Log Out Now
          </Button>
        </div>
      </div>
    </div>
  );
}
