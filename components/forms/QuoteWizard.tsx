"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Truck,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { categories, products } from "@/data/seed-data";
import { siteConfig } from "@/lib/siteConfig";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface QuoteWizardProps {
  initialProduct?: string;
}

export function QuoteWizard({ initialProduct = "" }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Product Specifications
    category: "",
    productName: initialProduct || "",
    thickness: "18mm",
    grade: "BS 1088 / Standard Marine",
    // Step 2: Quantity & Logistics
    quantity: "500 Sheets",
    deliveryType: "delivery", // 'delivery' or 'yard_pickup'
    deliveryAddress: "",
    targetDate: "",
    // Step 3: Client Identity
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: "",
    // Honeypot
    hp_field: "",
  });

  const steps = [
    { number: 1, title: "Specification", icon: Layers },
    { number: 2, title: "Quantity & Yard", icon: Truck },
    { number: 3, title: "Contact Details", icon: User },
  ];

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!formData.productName.trim()) {
        setErrorMsg("Please select or specify a timber/plywood product.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.quantity.trim()) {
        setErrorMsg("Please specify your required quantity or sheet count.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your name, email, and phone number.");
      return;
    }

    if (formData.hp_field) {
      return; // Honeypot triggered
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit quote request.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl border border-cream-border p-8 sm:p-12 text-center space-y-6 shadow-xl max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
            Request Logged in System
          </span>
          <h2 className="font-display text-3xl font-extrabold text-charcoal">
            Formal Quotation Initiated!
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed max-w-lg mx-auto">
            Thank you, <strong className="text-charcoal font-semibold">{formData.fullName}</strong>. A dedicated {siteConfig.name} account manager has received your Bill of Quantities request for <strong className="text-charcoal">{formData.productName} ({formData.quantity})</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-cream-surface border border-cream-border text-xs text-charcoal-muted space-y-1 text-left">
          <p className="font-semibold text-charcoal">What happens next?</p>
          <ul className="list-disc list-inside space-y-1 pt-1">
            <li>Our pricing desk reviews inventory reserves and logistics options.</li>
            <li>A stamped PDF proforma invoice will be delivered to <span className="font-semibold text-charcoal">{formData.email}</span> within 2 hours.</li>
            <li>We will follow up via WhatsApp / phone on <span className="font-semibold text-charcoal">{formData.phone}</span>.</li>
          </ul>
        </div>

        <div className="pt-2">
          <Button
            variant="amber"
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
            }}
          >
            Create Another Quote Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Indicator Steps */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-cream-border shadow-xs">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-cream-border z-0" />
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-amber-oak transition-all duration-300 z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 88}%` }}
          />

          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div key={s.number} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs transition-colors ${
                    isCompleted
                      ? "bg-forest text-white"
                      : isCurrent
                      ? "bg-amber-oak text-white shadow-md shadow-amber-oak/30 ring-4 ring-amber-pale"
                      : "bg-cream-surface text-charcoal-subtle border border-cream-border"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : s.number}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1.5 transition-colors hidden sm:block ${
                    isCurrent ? "text-amber-oak" : "text-charcoal-muted"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Multi-Step Card */}
      <div className="bg-white rounded-3xl border border-cream-border p-6 sm:p-10 shadow-sm relative">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input
            type="text"
            value={formData.hp_field}
            onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <AnimatePresence mode="wait">
            {/* STEP 1: Material & Product Specification */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                    Step 1 of 3
                  </span>
                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    Select Product Specifications
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Choose the panel category and core thickness required for your project.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                      Popular Timber Categories
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              category: cat.name,
                              productName: cat.name,
                            })
                          }
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                            formData.category === cat.name
                              ? "bg-forest text-white border-forest shadow-xs"
                              : "bg-white text-charcoal border-cream-border hover:bg-cream-surface"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Specific Product or Grade Required"
                    placeholder="e.g. AquaShield BS 1088 Marine or ProForm 18mm Shuttering"
                    value={formData.productName}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Core Thickness
                      </label>
                      <select
                        value={formData.thickness}
                        onChange={(e) =>
                          setFormData({ ...formData, thickness: e.target.value })
                        }
                        className="w-full h-11 px-4 text-sm bg-white rounded-xl border border-cream-border text-charcoal focus:border-amber-oak focus:outline-none"
                      >
                        <option value="3mm / 4mm">3mm – 4mm (Underlay / Backing)</option>
                        <option value="6mm">6mm (Light Linings)</option>
                        <option value="9mm">9mm (Joinery Panels)</option>
                        <option value="12mm">12mm (Cabinet Carcass / Sheathing)</option>
                        <option value="15mm">15mm (Heavy Joinery)</option>
                        <option value="18mm">18mm (Standard Formwork & Flooring)</option>
                        <option value="21mm">21mm (Heavy Civil Shuttering)</option>
                        <option value="25mm+">25mm – 30mm (Heavy Transport Decks)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Adhesive / Bonding Grade
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) =>
                          setFormData({ ...formData, grade: e.target.value })
                        }
                        className="w-full h-11 px-4 text-sm bg-white rounded-xl border border-cream-border text-charcoal focus:border-amber-oak focus:outline-none"
                      >
                        <option value="BS 1088 / Standard Marine">
                          BS 1088 Boiling Water Proof (WBP)
                        </option>
                        <option value="Dynea 120g Phenolic Shuttering">
                          Dynea 120g/m² Phenolic Film
                        </option>
                        <option value="MR / Interior Joinery">
                          Moisture Resistant (MR / E1 Glue)
                        </option>
                        <option value="E0 Ultra-Low VOC">
                          CARB Phase 2 / E0 Standard
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="amber"
                    onClick={handleNext}
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Continue to Step 2: Quantity
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Quantity & Logistics */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                    Step 2 of 3
                  </span>
                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    Estimated Quantity & Dispatch Mode
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    We offer tiered wholesale discounts based on sheet count or full container lots.
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Estimated Quantity Needed"
                    placeholder="e.g. 250 sheets, 3 bundles, or 1x 20ft container"
                    value={formData.quantity}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                      Fulfillment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, deliveryType: "delivery" })
                        }
                        className={`p-4 rounded-xl border text-left text-xs space-y-1 transition-all ${
                          formData.deliveryType === "delivery"
                            ? "bg-forest-surface text-white border-forest shadow-xs"
                            : "bg-white text-charcoal border-cream-border hover:bg-cream-surface"
                        }`}
                      >
                        <span className="font-bold block">
                          Jobsite Flatbed Delivery
                        </span>
                        <span className="opacity-75 block text-[11px]">
                          Delivered directly to your construction site or facility
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, deliveryType: "yard_pickup" })
                        }
                        className={`p-4 rounded-xl border text-left text-xs space-y-1 transition-all ${
                          formData.deliveryType === "yard_pickup"
                            ? "bg-forest-surface text-white border-forest shadow-xs"
                            : "bg-white text-charcoal border-cream-border hover:bg-cream-surface"
                        }`}
                      >
                        <span className="font-bold block">
                          Central Yard Gate Collection
                        </span>
                        <span className="opacity-75 block text-[11px]">
                          Pick up with your own transport from our warehouse
                        </span>
                      </button>
                    </div>
                  </div>

                  {formData.deliveryType === "delivery" && (
                    <Input
                      label="Target Jobsite City or Region"
                      placeholder="e.g. Dar es Salaam, Arusha, Dodoma, Zanzibar, etc."
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryAddress: e.target.value,
                        })
                      }
                    />
                  )}

                  <Input
                    label="Expected Delivery or Start Date"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="amber"
                    onClick={handleNext}
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    Continue to Step 3: Contact
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact & Company Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-oak">
                    Step 3 of 3
                  </span>
                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    Where Should We Send the Proforma Invoice?
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    We will send official pricing and specifications directly to your email.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Contact Full Name"
                      placeholder="e.g. Sarah Lindqvist"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                    <Input
                      label="Company / Firm Name"
                      placeholder="e.g. Nordic Craft Interiors"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Official Email Address"
                      type="email"
                      placeholder="e.g. sarah@nordiccraft.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <Input
                      label="Phone / WhatsApp Number"
                      type="tel"
                      placeholder="e.g. +255 745 000 000"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <Textarea
                    label="Additional Project Notes or Cutting Instructions"
                    placeholder="Mention any custom size requirements, container booking timelines, or technical certifications needed..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="amber"
                    size="lg"
                    isLoading={isSubmitting}
                    className="font-bold shadow-md shadow-amber-oak/20"
                    rightIcon={<CheckCircle2 className="w-4 h-4 ml-1" />}
                  >
                    Submit Request for Proforma Quote
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

