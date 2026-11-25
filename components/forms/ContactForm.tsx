"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, RotateCw, Phone } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/lib/toast-context";
import { siteConfig } from "@/lib/siteConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please provide a valid Ethiopian contact phone number."),
  company: z.string().optional(),
  product_interest: z.string().optional(),
  message: z
    .string()
    .min(10, "Please share a few details about your required board type, thickness, or quantity."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { showToast } = useToast();
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      product_interest: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !submittedSuccess) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, submittedSuccess]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || "",
          product: data.product_interest || "General Inquiry (Safarian / Plywood)",
          quantity: "Inquiry",
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not submit your inquiry right now.");
      }

      setSubmittedSuccess(true);
      showToast({
        type: "success",
        title: "Inquiry sent",
        message: "Thank you — our Addis Ababa office will respond shortly.",
      });
      reset();
    } catch {
      const msg = `We couldn't send your message right now. Please try again or call ${siteConfig.contact.phoneDisplay}.`;
      setSubmitError(msg);
      showToast({
        type: "error",
        title: "Message not sent",
        message: "Please try again or contact us directly by phone.",
      });
    }
  };

  if (submittedSuccess) {
    return (
      <div
        className="p-8 rounded-2xl bg-forest/5 border border-forest/20 text-center space-y-5"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8 text-amber-light" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-forest-dark">
            Message Received
          </h3>
          <p className="text-sm text-charcoal-light max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to {siteConfig.name}. Our team at {siteConfig.contact.address.full} has received your inquiry and will follow up promptly.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSubmittedSuccess(false)}
          >
            Send Another Message
          </Button>
          <Button
            href={`tel:${siteConfig.contact.phone}`}
            variant="amber"
            leftIcon={<Phone className="w-4 h-4" />}
          >
            Call {siteConfig.contact.phoneDisplay}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {submitError && (
        <div
          className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-xs text-red-800"
          role="alert"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{submitError}</span>
          </div>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="inline-flex items-center gap-1 font-bold underline shrink-0"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Abebe Tadesse"
          error={errors.name?.message}
          showValidCheck={Boolean(dirtyFields.name && !errors.name)}
          isValid={!errors.name}
          {...register("name")}
        />
        <Input
          label="Company / Workshop (Optional)"
          placeholder="e.g. Mina Furniture / MIDROC Group"
          error={errors.company?.message}
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          required
          placeholder="+251 911 247 821"
          helperText="Used for quick sales follow-up or WhatsApp/Telegram"
          error={errors.phone?.message}
          showValidCheck={Boolean(dirtyFields.phone && !errors.phone)}
          isValid={!errors.phone}
          {...register("phone")}
        />
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="name@company.com"
          error={errors.email?.message}
          showValidCheck={Boolean(dirtyFields.email && !errors.email)}
          isValid={!errors.email}
          {...register("email")}
        />
      </div>

      <Input
        label="Product & Thickness Interest (Optional)"
        placeholder="e.g. Safarian 08mm & Plywood 18mm Special Product"
        {...register("product_interest")}
      />

      <Textarea
        label="Inquiry Details"
        required
        rows={4}
        placeholder="Share your required Safarian thickness (03mm, 06mm, 08mm, 12mm) or Plywood thickness (16mm, 18mm Special Product), approximate quantity, and delivery destination..."
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-charcoal-subtle">
          Direct phone support: <strong className="text-charcoal">{siteConfig.contact.phoneDisplay}</strong>
        </p>

        <Button
          type="submit"
          variant="amber"
          size="lg"
          isLoading={isSubmitting}
          loadingText="Sending Message..."
          disabled={isSubmitting}
          rightIcon={<Send className="w-4 h-4" />}
          className="font-bold shadow-md"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
}