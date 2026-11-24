import React from "react";
import { CheckCircle2, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type AutosaveStatus = "idle" | "saving" | "saved" | "unsaved" | "error";

export interface AutosaveIndicatorProps {
  status: AutosaveStatus;
  lastSavedAt?: Date | null;
  className?: string;
  errorMessage?: string;
}

export function AutosaveIndicator({
  status,
  lastSavedAt,
  className,
  errorMessage,
}: AutosaveIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
        status === "saved" &&
          "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
        status === "saving" &&
          "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
        status === "unsaved" &&
          "bg-cream-surface text-charcoal border-cream-border dark:bg-charcoal dark:text-cream dark:border-charcoal-light",
        status === "error" &&
          "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
        status === "idle" && "opacity-0 pointer-events-none",
        className
      )}
    >
      {status === "saving" && (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
          <span>Saving to Supabase...</span>
        </>
      )}

      {status === "saved" && (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Saved{" "}
            {lastSavedAt ? (
              <time dateTime={lastSavedAt.toISOString()} className="opacity-75">
                at {lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </time>
            ) : (
              "to database"
            )}
          </span>
        </>
      )}

      {status === "unsaved" && (
        <>
          <Clock className="w-3.5 h-3.5 text-charcoal-muted" />
          <span>Unsaved edits pending</span>
        </>
      )}

      {status === "error" && (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
          <span>{errorMessage || "Save failed. Check network."}</span>
        </>
      )}
    </div>
  );
}
