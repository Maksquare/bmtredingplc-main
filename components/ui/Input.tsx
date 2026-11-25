"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showValidCheck?: boolean;
  isValid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      showValidCheck = false,
      isValid = false,
      id,
      required,
      disabled,
      onBlur,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const generatedId = id || autoId;
    const errorId = `${generatedId}-error`;
    const helperId = `${generatedId}-helper`;

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e);
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={generatedId}
            className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal select-none"
          >
            <span>
              {label}
              {required && (
                <span className="text-amber-600 ml-1 font-bold" aria-hidden="true">
                  *
                </span>
              )}
            </span>

            {showValidCheck && isValid && !error && (
              <span className="text-[11px] text-emerald-600 normal-case font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Valid</span>
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            id={generatedId}
            type={type}
            ref={ref}
            required={required}
            disabled={disabled}
            onBlur={handleBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full h-11 px-4 text-sm bg-white rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle",
              "transition-all duration-150 outline-none",
              "hover:border-forest/40",
              "focus:border-amber-oak focus:ring-3 focus:ring-amber-oak/20 focus:bg-white",
              "disabled:bg-cream-surface/70 disabled:text-charcoal-muted disabled:border-cream-border/60 disabled:cursor-not-allowed",
              error &&
                "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20 pr-10",
              className
            )}
            {...props}
          />

          {error && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-red-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-600 font-medium flex items-center gap-1.5 animate-in fade-in duration-150"
          >
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-charcoal-muted leading-relaxed">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      required,
      disabled,
      maxLength,
      currentLength,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId();
    const generatedId = id || autoId;
    const errorId = `${generatedId}-error`;
    const helperId = `${generatedId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal select-none">
            <label htmlFor={generatedId}>
              {label}
              {required && (
                <span className="text-amber-600 ml-1 font-bold" aria-hidden="true">
                  *
                </span>
              )}
            </label>

            {maxLength !== undefined && currentLength !== undefined && (
              <span className="text-[10px] text-charcoal-muted normal-case font-normal">
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          id={generatedId}
          ref={ref}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full min-h-[100px] p-3.5 text-sm bg-white rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle",
            "transition-all duration-150 outline-none resize-y",
            "hover:border-forest/40",
            "focus:border-amber-oak focus:ring-3 focus:ring-amber-oak/20 focus:bg-white",
            "disabled:bg-cream-surface/70 disabled:text-charcoal-muted disabled:cursor-not-allowed",
            error && "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-600 font-medium flex items-center gap-1.5"
          >
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-charcoal-muted leading-relaxed">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
