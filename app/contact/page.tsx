import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Factory,
  MessageSquare,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} at our Addis Ababa office (Ayer Tena, Shamo Tower, 3rd Floor) or ${siteConfig.contact.factory.full} factory. Call 0911 247 821, 0911 221 261, or 0910 953 373.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  const phoneLines = [
    {
      label: "Primary Phone, WhatsApp & Telegram",
      display: siteConfig.contact.phoneDisplay,
      tel: siteConfig.contact.phone,
      highlight: true,
    },
    {
      label: "Secondary Sales Line",
      display: siteConfig.contact.secondaryPhoneDisplay,
      tel: siteConfig.contact.secondaryPhone,
      highlight: false,
    },
    {
      label: "Direct Office Line",
      display: siteConfig.contact.tertiaryPhoneDisplay,
      tel: siteConfig.contact.tertiaryPhone,
      highlight: false,
    },
  ];

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 bg-cream">
        {/* Header */}
        <section className="relative bg-forest-dark text-cream py-16 lg:py-24 overflow-hidden bg-dark-grain border-b border-forest-light/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-oak/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="wide" className="relative z-10">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-surface border border-forest-light/40 text-xs font-bold tracking-widest uppercase text-amber-light">
                <Phone className="w-3.5 h-3.5 text-amber-light" />
                <span>Direct Sales &amp; Coordination</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                Contact {siteConfig.name}
              </h1>
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed max-w-2xl">
                Reach our Addis Ababa office or Werabe manufacturing team to inquire about Safarian boards (03mm, 06mm, 08mm, 12mm) and Plywood (16mm &amp; 18mm special product).
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Grid */}
        <Section className="py-16 lg:py-24">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Locations & Phone Numbers */}
              <div className="lg:col-span-5 space-y-5">
                {/* Office Address Card */}
                <div className="p-6 rounded-2xl bg-white border border-cream-border shadow-xs space-y-3 hover:border-amber-oak/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-oak/10 border border-amber-oak/20 flex items-center justify-center text-amber-oak shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak">
                        Head Office
                      </span>
                      <h2 className="text-lg font-display font-bold text-charcoal">
                        Addis Ababa, Ayer Tena
                      </h2>
                      <p className="text-sm text-charcoal-light font-medium">
                        {siteConfig.contact.address.full}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Factory Location Card */}
                <div className="p-6 rounded-2xl bg-white border border-cream-border shadow-xs space-y-3 hover:border-amber-oak/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest shrink-0">
                      <Factory className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-forest">
                        Factory Location
                      </span>
                      <h2 className="text-lg font-display font-bold text-charcoal">
                        {siteConfig.contact.factory.full}
                      </h2>
                      <p className="text-sm text-charcoal-light">
                        Manufacturing facility producing Safarian boards and structural Plywood sheets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* All 3 Phone Numbers */}
                <div className="p-6 rounded-2xl bg-white border border-cream-border shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-oak/10 border border-amber-oak/20 flex items-center justify-center text-amber-oak shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak">
                        Phone Lines
                      </span>
                      <h2 className="text-lg font-display font-bold text-charcoal">
                        Direct Telephone Numbers
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {phoneLines.map((line) => (
                      <a
                        key={line.tel}
                        href={`tel:${line.tel}`}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-cream-border bg-cream/40 hover:bg-cream hover:border-amber-oak/50 transition-all group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-charcoal-subtle">
                            {line.label}
                          </div>
                          <div className="text-base font-display font-extrabold text-charcoal group-hover:text-forest transition-colors">
                            {line.display}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-oak group-hover:translate-x-0.5 transition-transform">
                          Call <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp, Telegram & Email Card */}
                <div className="p-6 rounded-2xl bg-forest-dark text-cream border border-forest-light/30 space-y-4 shadow-md">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-light">
                      Messaging &amp; Email
                    </span>
                    <h2 className="text-lg font-display font-bold text-white">
                      Chat Instantly on {siteConfig.contact.phoneDisplay}
                    </h2>
                    <p className="text-xs text-cream/75">
                      Use our primary number ({siteConfig.contact.phoneDisplay}) on WhatsApp or Telegram to discuss stock availability and sheet thicknesses.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20bmtradingplc,%20I%20would%20like%20to%20inquire%20about%20Safarian%20and%20Plywood%20supply.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold transition-all active:scale-[0.98]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={siteConfig.contact.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1982b8] text-white text-xs font-bold transition-all active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Telegram</span>
                    </a>
                  </div>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2.5 pt-2 border-t border-white/10 text-xs text-cream/85 hover:text-amber-light transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-light shrink-0" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-cream-border shadow-xl">
                  <div className="mb-6 space-y-1.5">
                    <h2 className="text-2xl font-display font-extrabold text-charcoal">
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-charcoal-light">
                      Tell us which Safarian or Plywood thicknesses you require and our team will get back to you promptly.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}