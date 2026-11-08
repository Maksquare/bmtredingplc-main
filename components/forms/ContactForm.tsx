"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid contact phone number"),
  product: z.string().min(1, "Please specify the product or panel type"),
  quantity: z.string().min(1, "Please specify estimated quantity or sheet count"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  company: z.string().optional(),
  // Honeypot field for bot detection
  website_hp: z.string().max(0, "Bot detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website_hp: "",
    },
  });

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
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-8 sm:p-10 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-emerald-900">
          Inquiry Successfully Delivered
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to bmtredingplc. A commercial timber consultant has received your specifications and will respond within 2 business hours.
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-cream-border shadow-sm">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Honeypot hidden input */}
      <input
        type="text"
        {...register("website_hp")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          placeholder="e.g. David Mwangi"
          required
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Company or Contracting Firm"
          placeholder="e.g. Apex Civil Ltd (Optional)"
          error={errors.company?.message}
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. david@example.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone / WhatsApp Number"
          type="tel"
          placeholder="e.g. +255 745 000 000"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Plywood Product / Grade"
          placeholder="e.g. 18mm Film-Faced Shuttering"
          required
          error={errors.product?.message}
          {...register("product")}
        />
        <Input
          label="Estimated Quantity"
          placeholder="e.g. 500 sheets or 1x 40ft Container"
          required
          error={errors.quantity?.message}
          {...register("quantity")}
        />
      </div>

      <Textarea
        label="Project Specifications & Delivery Details"
        placeholder="Provide details on required thickness, core species, boiling water proof grade, target jobsite location, or delivery timeline..."
        rows={4}
        required
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="amber"
          size="lg"
          className="w-full font-bold shadow-md shadow-amber-oak/20"
          isLoading={isSubmitting}
          rightIcon={<Send className="w-4 h-4 ml-1" />}
        >
          Submit Commercial Inquiry
        </Button>
      </div>

      <p className="text-[11px] text-charcoal-muted text-center pt-2">
        Your information is used strictly for timber supply quotation purposes. Zero spam guarantee.
      </p>
    </form>
  );
}

