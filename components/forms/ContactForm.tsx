"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/lib/toast-context";
import { siteConfig } from "@/lib/siteConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid corporate or work email"),
  phone: z.string().min(7, "Please provide a valid phone or WhatsApp number"),
  product: z.string().min(1, "Please specify the timber or plywood product"),
  quantity: z.string().min(1, "Please specify estimated sheet count or cubic meters"),
  message: z.string().min(10, "Specification message must be at least 10 characters"),
  company: z.string().optional(),
  website_hp: z.string().max(0, "Bot detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      message: "",
      company: "",
      website_hp: "",
    },
  });

  const messageValue = watch("message") || "";

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit message. Please try again.");
      }

      setIsSuccess(true);
      showToast({
        type: "success",
        title: "Inquiry Successfully Delivered",
        message: "A timber consultant has received your inquiry and will respond within 2 hours.",
      });
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      showToast({
        type: "error",
        title: "Submission Error",
        message: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-emerald-50 rounded-3xl border border-emerald-200 p-8 sm:p-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-emerald-900">
          Inquiry Successfully Delivered
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to {siteConfig.name}. A commercial timber consultant has received your specifications and will respond within 2 business hours.
        </p>
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-cream-border shadow-sm transition-all"
    >
      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Honeypot hidden input */}
      <input
        type="text"
        {...register("website_hp")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          placeholder="e.g. Dawit Haile"
          required
          error={errors.name?.message}
          helperText="Lead project contractor or contact person"
          {...register("name")}
        />
        <Input
          label="Company or Contracting Firm"
          placeholder="e.g. Midroc Construction (Optional)"
          error={errors.company?.message}
          helperText="Optional commercial trade name"
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Work Email Address"
          type="email"
          placeholder="e.g. dawit@example.com"
          required
          error={errors.email?.message}
          helperText="Official quote proforma will be sent here"
          {...register("email")}
        />
        <Input
          label="Phone / WhatsApp Number"
          type="tel"
          placeholder="e.g. +251 911 234 567"
          required
          error={errors.phone?.message}
          helperText="For immediate warehouse gate verification"
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Plywood Product / Grade"
          placeholder="e.g. 18mm BS 1088 Marine / Dynea Shuttering"
          required
          error={errors.product?.message}
          helperText="Specify panel series or core type"
          {...register("product")}
        />
        <Input
          label="Estimated Quantity"
          placeholder="e.g. 500 sheets or 1x 40ft container"
          required
          error={errors.quantity?.message}
          helperText="Sheet count or total bundle requirement"
          {...register("quantity")}
        />
      </div>

      <Textarea
        label="Project Specifications & Delivery Details"
        placeholder="Specify required core species, thickness tolerances, boiling-water-proof bond rating, target jobsite location in Addis Ababa or regions..."
        rows={4}
        required
        maxLength={1000}
        currentLength={messageValue.length}
        error={errors.message?.message}
        helperText="Include batch cutting lists or delivery constraints if available"
        {...register("message")}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="amber"
          size="lg"
          className="w-full font-bold shadow-md shadow-amber-950/20"
          isLoading={isSubmitting}
          loadingText="Submitting Commercial Inquiry..."
          disabled={isSubmitting}
          rightIcon={<Send className="w-4 h-4 ml-1" />}
        >
          Submit Commercial Inquiry
        </Button>
      </div>

      <p className="text-[11px] text-charcoal-muted text-center pt-2">
        Your information is used strictly for timber supply quotation purposes under {siteConfig.name} confidentiality terms.
      </p>
    </form>
  );
}
