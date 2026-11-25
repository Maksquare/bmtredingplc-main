"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Layers,
  MapPin,
  UserCheck,
  Sparkles,
  Phone,
  AlertCircle,
  RotateCw,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/lib/toast-context";

interface QuoteWizardProps {
  initialProduct?: string;
  initialThickness?: string;
  initialQuantity?: string;
}

const PRODUCT_OPTIONS = [
  {
    name: "Safarian",
    subtitle: "Precision Boards in 4 Gauges",
    thicknesses: ["03mm", "06mm", "08mm", "12mm"],
    specialThickness: null,
  },
  {
    name: "Plywood",
    subtitle: "Structural Panels • 18mm Special Product",
    thicknesses: ["16mm", "18mm"],
    specialThickness: "18mm",
  },
];

const APPLICATION_OPTIONS = [
  "Furniture & Cabinetry",
  "Interior Partitioning & Doors",
  "Commercial Development Fit-Out",
  "Structural & Formwork",
  "Wholesale Distribution",
];

export function QuoteWizard({
  initialProduct = "",
  initialThickness = "",
  initialQuantity = "",
}: QuoteWizardProps) {
  const { showToast } = useToast();

  const normalizedInitialProduct = initialProduct.toLowerCase().includes("safarian")
    ? "Safarian"
    : initialProduct.toLowerCase().includes("plywood")
    ? "Plywood"
    : "Plywood";

  const defaultThicknesses =
    normalizedInitialProduct === "Safarian"
      ? ["03mm", "06mm", "08mm", "12mm"]
      : ["16mm", "18mm"];

  const defaultThickness = defaultThicknesses.includes(initialThickness)
    ? initialThickness
    : normalizedInitialProduct === "Safarian"
    ? "08mm"
    : "18mm";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    product: normalizedInitialProduct,
    thickness: defaultThickness,
    quantity: initialQuantity || "100",
    application: APPLICATION_OPTIONS[0],
    location: "",
    timeline: "Immediate Dispatch",
    name: "",
    company: "",
    phone: "",
    email: "",
    notes: "",
  });

  const activeProductConfig =
    PRODUCT_OPTIONS.find((p) => p.name === form.product) || PRODUCT_OPTIONS[1];

  const handleProductSelect = (productName: string) => {
    const config = PRODUCT_OPTIONS.find((p) => p.name === productName) || PRODUCT_OPTIONS[0];
    setForm((prev) => ({
      ...prev,
      product: productName,
      thickness:
        config.specialThickness ||
        (config.thicknesses.includes(prev.thickness) ? prev.thickness : config.thicknesses[0]),
    }));
  };

  const validateStep = (targetStep: number) => {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!form.quantity || Number(form.quantity) < 1) {
        nextErrors.quantity = "Please enter at least 1 sheet.";
      }
    }

    if (targetStep === 2) {
      if (!form.location.trim()) {
        nextErrors.location = "Please enter your delivery city or Addis Ababa sub-city.";
      }
    }

    if (targetStep === 3) {
      if (!form.name.trim() || form.name.trim().length < 2) {
        nextErrors.name = "Please enter your full name.";
      }
      if (!form.phone.trim() || form.phone.trim().length < 8) {
        nextErrors.phone = "Please provide a valid telephone number.";
      }
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !validateStep(3)) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const productLabel = `${form.product} (${form.thickness}${
        form.thickness === "18mm" ? " - Special Product" : ""
      })`;

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          product: productLabel,
          thickness: form.thickness,
          quantity: `${form.quantity} sheets`,
          application: form.application,
          location: form.location,
          timeline: form.timeline,
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit quote request");
      }

      setSubmitted(true);
      showToast({
        type: "success",
        title: "Quote request submitted",
        message: `Our team at Ayer Tena will contact you shortly regarding ${productLabel}.`,
      });
    } catch {
      setErrorMessage(
        `Your quote request couldn't go through right now. Please retry or call ${siteConfig.contact.phoneDisplay}.`
      );
      showToast({
        type: "error",
        title: "Submission issue",
        message: "Please retry or reach us on 0911 247 821.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-cream-border shadow-xl text-center space-y-6"
        role="status"
        aria-live="polite"
      >
        <div className="w-20 h-20 rounded-full bg-forest text-amber-light flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-oak">
            Quote Request Sent
          </span>
          <h2 className="text-3xl font-display font-extrabold text-charcoal">
            Thank You, {form.name}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-light max-w-lg mx-auto leading-relaxed">
            Your request for{" "}
            <strong className="text-charcoal">
              {form.quantity} sheets of {form.thickness} {form.product}
            </strong>{" "}
            has been logged for our Addis Ababa coordination office ({siteConfig.contact.address.full}).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-cream/60 border border-cream-border text-xs text-charcoal-light flex flex-col sm:flex-row items-center justify-center gap-3">
          <span>Need immediate assistance? Call, WhatsApp, or Telegram us on:</span>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="inline-flex items-center gap-1.5 font-extrabold text-forest hover:text-amber-oak"
          >
            <Phone className="w-4 h-4" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
          >
            Submit Another Request
          </Button>
          <Button href="/products" variant="amber">
            Back to Product Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-cream-border shadow-xl overflow-hidden">
      {/* Stepper Header */}
      <div className="bg-forest-dark text-white px-6 sm:px-8 py-5 border-b border-forest-light/30 flex items-center justify-between gap-4">
        {[
          { num: 1, label: "Board & Thickness", icon: Layers },
          { num: 2, label: "Delivery & Schedule", icon: MapPin },
          { num: 3, label: "Contact & Submit", icon: UserCheck },
        ].map((item) => {
          const active = step === item.num;
          const done = step > item.num;
          return (
            <button
              key={item.num}
              type="button"
              onClick={() => {
                if (item.num < step) setStep(item.num as 1 | 2 | 3);
              }}
              className={`flex items-center gap-2.5 text-left transition-opacity ${
                active ? "opacity-100" : done ? "opacity-85 cursor-pointer" : "opacity-45 cursor-default"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold border ${
                  active
                    ? "bg-amber-oak text-white border-amber-oak shadow-sm"
                    : done
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-white/10 text-white border-white/20"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : item.num}
              </span>
              <span className="hidden sm:block text-xs font-bold uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6" noValidate>
        {errorMessage && (
          <div
            className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-xs text-red-800"
            role="alert"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1 font-bold underline shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Choose Safarian or Plywood */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                  1. Select Product Lineup <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRODUCT_OPTIONS.map((prod) => {
                    const selected = form.product === prod.name;
                    return (
                      <button
                        key={prod.name}
                        type="button"
                        onClick={() => handleProductSelect(prod.name)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all ${
                          selected
                            ? "border-amber-oak bg-amber-oak/10 shadow-sm"
                            : "border-cream-border bg-cream/30 hover:border-forest/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xl font-display font-extrabold text-charcoal">
                            {prod.name}
                          </span>
                          {prod.specialThickness && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-oak text-white text-[10px] font-extrabold uppercase">
                              <Sparkles className="w-3 h-3" />
                              18mm Special
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-subtle mt-1">{prod.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Thickness Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                  2. Select {form.product} Thickness <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeProductConfig.thicknesses.map((t) => {
                    const selected = form.thickness === t;
                    const isSpecial = t === "18mm";
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, thickness: t }))}
                        className={`px-4 py-3.5 rounded-2xl border text-left transition-all ${
                          selected
                            ? "border-forest bg-forest text-white shadow-sm"
                            : isSpecial
                            ? "border-amber-oak bg-amber-oak/10 text-charcoal hover:bg-amber-oak/20"
                            : "border-cream-border bg-cream/40 text-charcoal hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-base font-display font-extrabold">{t}</span>
                          {isSpecial && (
                            <Sparkles
                              className={`w-3.5 h-3.5 ${selected ? "text-amber-300" : "text-amber-oak"}`}
                            />
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-semibold block ${
                            selected ? "text-cream/80" : "text-charcoal-subtle"
                          }`}
                        >
                          {isSpecial ? "Special Product" : `${form.product} Gauge`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Application */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Input
                    label="Required Sheet Quantity"
                    type="number"
                    min={1}
                    required
                    value={form.quantity}
                    error={fieldErrors.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {["50", "100", "250", "500"].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, quantity: q }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                          form.quantity === q
                            ? "bg-forest text-white border-forest"
                            : "bg-cream/50 text-charcoal-subtle border-cream-border hover:text-charcoal"
                        }`}
                      >
                        {q} sheets
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                    Primary Application
                  </label>
                  <select
                    value={form.application}
                    onChange={(e) => setForm((f) => ({ ...f, application: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl border border-cream-border bg-white text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-amber-oak"
                  >
                    {APPLICATION_OPTIONS.map((app) => (
                      <option key={app} value={app}>
                        {app}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-cream-border flex justify-end">
                <Button
                  type="button"
                  variant="amber"
                  size="lg"
                  onClick={nextStep}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Continue to Delivery
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Input
                label="Delivery Location / Project Site"
                required
                placeholder="e.g. Addis Ababa (Ayer Tena, Bole, Kazanchis), Werabe, Hawassa, Adama"
                helperText="Specify city, sub-city, or indicate if picking up directly from Werabe / Addis Ababa"
                value={form.location}
                error={fieldErrors.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />

              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                  Preferred Schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Immediate Dispatch",
                    "Within 2 Weeks",
                    "Within This Month",
                    "Ongoing Scheduled Supply",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, timeline: option }))}
                      className={`px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all ${
                        form.timeline === option
                          ? "border-amber-oak bg-amber-oak/10 text-amber-900"
                          : "border-cream-border bg-cream/30 text-charcoal hover:bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-cream-border flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="amber"
                  size="lg"
                  onClick={nextStep}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Continue to Contact Details
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Summary Strip (Zero Prices) */}
              <div className="p-4 rounded-2xl bg-forest-dark text-cream flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="uppercase tracking-wider text-[10px] font-bold text-amber-light">
                    Request Summary
                  </span>
                  <div className="font-bold text-sm text-white">
                    {form.quantity} sheets • {form.product} ({form.thickness}
                    {form.thickness === "18mm" ? " — Special Product" : ""})
                  </div>
                </div>
                <div className="text-cream/80">
                  {form.location || "Location pending"} • {form.timeline}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  placeholder="e.g. Dawit Tadesse"
                  value={form.name}
                  error={fieldErrors.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <Input
                  label="Company / Workshop (Optional)"
                  placeholder="e.g. Classic Furniture / MIDROC Group"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Telephone Number"
                  type="tel"
                  required
                  placeholder="e.g. 0911 247 821"
                  value={form.phone}
                  error={fieldErrors.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={form.email}
                  error={fieldErrors.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>

              <Textarea
                label="Additional Notes (Optional)"
                rows={3}
                placeholder="Mixed thickness breakdown (e.g. 50 sheets 08mm Safarian + 100 sheets 18mm Plywood), pickup preference, etc."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />

              <div className="pt-4 border-t border-cream-border flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="amber"
                  size="lg"
                  isLoading={submitting}
                  loadingText="Submitting Request..."
                  disabled={submitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Submit Quote Request
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}