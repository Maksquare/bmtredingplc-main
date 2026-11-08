"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-forest-dark text-cream p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-forest-light/40">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-oak flex items-center justify-center font-display text-white font-bold text-lg shadow-sm">
                    B
                  </div>
                  <span className="font-display text-lg font-bold tracking-tight text-cream">
                    {siteConfig.name}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-cream/70 hover:text-white hover:bg-forest-light/50 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-1">
                {siteConfig.navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                        isActive
                          ? "bg-amber-oak text-white font-semibold"
                          : "text-cream/80 hover:text-white hover:bg-forest-light/40"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-forest-light/40 space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-light font-medium bg-forest-surface px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-oak" />
                <span>BS 1088 & ISO 9001 Certified Supplier</span>
              </div>

              <div className="space-y-2">
                <Button
                  href="/quote"
                  variant="amber"
                  className="w-full"
                  onClick={onClose}
                >
                  Request a Formal Quote
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-forest-light/50 text-xs font-semibold text-cream hover:bg-forest-light transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-light" />
                    Call Sales
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtredingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20supply.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-800/60 text-xs font-semibold text-emerald-100 hover:bg-emerald-800 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

