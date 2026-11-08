import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Central Yard & Sales Desk • Addis Ababa, Ethiopia | bmtredingplc",
  description: `Contact ${siteConfig.name} in Addis Ababa, Ethiopia for wholesale plywood pricing, container logistics, sample specimens, and warehouse gate collection details.`,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header with High Contrast */}
        <div className="bg-[#0B241B] text-white py-16 lg:py-20 bg-dark-grain border-b border-white/15 relative">
          <Container size="wide">
            <div className="max-w-3xl space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block shadow-sm">
                Direct Sales & Distribution Yard • Addis Ababa, Ethiopia
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Connect with our Timber Specialists
              </h1>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                Whether you need a full container of BS 1088 marine plywood or urgent jobsite flatbed dispatch of film-faced formwork across Addis Ababa and surrounding regions, our commercial sales desk is ready to assist.
              </p>
            </div>
          </Container>
        </div>

        {/* Contact Layout */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Contact Details & Click-to-Chat */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3.5 py-1.5 rounded-full border border-amber-light/40 inline-block">
                    Headquarters & Central Yard
                  </span>
                  <h2 className="font-display text-3xl font-extrabold text-charcoal">
                    {siteConfig.name} Addis Ababa
                  </h2>
                  <p className="text-sm text-charcoal-muted leading-relaxed font-medium">
                    Strategically located in Addis Ababa&apos;s commercial corridor for rapid customs container de-stuffing, regional transport hub clearance, and immediate jobsite flatbed loading.
                  </p>
                </div>

                {/* Contact Cards List with High Contrast */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-amber-oak flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                        Central Yard Location
                      </h4>
                      <p className="text-sm font-bold text-charcoal mt-1 leading-snug">
                        {siteConfig.contact.address.full}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-amber-oak flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                        Contractor Sales Desk & Hotline
                      </h4>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                        className="text-base font-extrabold text-charcoal hover:text-amber-oak transition-colors block mt-1"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Landline: {siteConfig.contact.landline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-amber-oak flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                        Official Correspondence
                      </h4>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-sm font-extrabold text-charcoal hover:text-amber-oak transition-colors block mt-1"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-border shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-amber-oak flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                        Warehouse Operating Hours
                      </h4>
                      <p className="text-xs font-bold text-charcoal leading-relaxed mt-1">
                        {siteConfig.contact.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Messaging Strip */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                    Direct Instant Messaging Channels:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtredingplc,%20I%20would%20like%20to%20inquire%20about%20plywood%20supply%20in%20Ethiopia.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-200" />
                      <span>WhatsApp Chat</span>
                    </a>

                    <a
                      href={`https://t.me/${siteConfig.contact.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all"
                    >
                      <Send className="w-4 h-4 text-sky-200" />
                      <span>Telegram Direct</span>
                    </a>
                  </div>
                </div>

                {/* Trust Guarantee Box */}
                <div className="p-5 rounded-2xl bg-[#0B241B] text-white border border-white/15 space-y-2.5 shadow-md">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct Mill Import Guarantee</span>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed">
                    All consignments stored in our Addis Ababa yards include batch test certificates, zero core void guarantees, and verified boiling-water-proof phenolic resin testing reports.
                  </p>
                </div>
              </div>

              {/* Right Column: Commercial Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="mb-5 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3.5 py-1 rounded-full border border-amber-light/40 inline-block">
                    Electronic RFQ Specification
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal">
                    Request a Direct Wholesale Quotation
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Submit your sheet requirements, core specs, or BOQ cutting schedules for a stamped proforma.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
