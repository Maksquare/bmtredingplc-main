"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/siteConfig";

const FAQS = [
  {
    q: "What board types and thicknesses does bmtradingplc supply?",
    a: "We specialize exclusively in Safarian boards in four calibrated thicknesses — 03mm, 06mm, 08mm, and 12mm — and structural Plywood in 16mm along with our flagship 18mm Special Product.",
  },
  {
    q: "What makes your 18mm Plywood a Special Product?",
    a: "Our 18mm Plywood is manufactured for maximum structural rigidity, smooth calibrated facing, and reliable fastener retention — making it the preferred core sheet for heavy wardrobe doors, executive furniture, and major building projects.",
  },
  {
    q: "Where are your factory and commercial sales office located?",
    a: `Production takes place at our factory in ${siteConfig.contact.factory.full}. Commercial inquiries, client coordination, and bulk order scheduling are handled at our office at ${siteConfig.contact.address.full}.`,
  },
  {
    q: "How can I check sheet availability or place a bulk request?",
    a: `You can submit your required thicknesses and quantities through our Request a Quote page, or reach us directly on ${siteConfig.contact.phoneDisplay} (Call, WhatsApp, or Telegram), ${siteConfig.contact.secondaryPhoneDisplay}, or ${siteConfig.contact.tertiaryPhoneDisplay}.`,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-[#F8F3E9] border-t border-[#E5DEC9]/70">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Soft center glow matching inspo 00:17–00:19 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,168,79,0.22),transparent_68%)]"
      />

      <Container size="narrow" className="relative z-10 max-w-3xl">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#3D4A43]">
            Quick answers about Safarian and Plywood thicknesses, manufacturing, and order coordination.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="rounded-2xl bg-white/95 border border-[#E5DEC9] shadow-2xs transition-shadow duration-200 hover:shadow-md overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-oak"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#141715]">
                    {item.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#C8832A] text-white rotate-180"
                        : "bg-[#F4EFE6] text-[#0B241B] hover:bg-[#C8832A]/20"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 text-xs sm:text-sm text-[#3D4A43] leading-relaxed border-t border-[#E5DEC9]/60 pt-3.5">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}