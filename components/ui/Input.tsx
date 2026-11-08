import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const generatedId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-amber-oak ml-1">*</span>}
          </label>
        )}
        <input
          id={generatedId}
          type={type}
          ref={ref}
          className={cn(
            "w-full h-11 px-4 text-sm bg-white rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle transition-all duration-150 focus:border-amber-oak focus:ring-1 focus:ring-amber-oak focus:outline-none disabled:bg-cream-surface disabled:opacity-60",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-charcoal-muted mt-1">{helperText}</p>
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
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const generatedId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-amber-oak ml-1">*</span>}
          </label>
        )}
        <textarea
          id={generatedId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full p-4 text-sm bg-white rounded-xl border border-cream-border text-charcoal placeholder:text-charcoal-subtle transition-all duration-150 focus:border-amber-oak focus:ring-1 focus:ring-amber-oak focus:outline-none disabled:bg-cream-surface disabled:opacity-60 resize-y",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-charcoal-muted mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

