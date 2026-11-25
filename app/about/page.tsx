import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Factory,
  Layers,
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  Users,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { partners } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — over 10 years of experience supplying Safarian boards (03mm, 06mm, 08mm, 12mm) and Plywood (16mm and 18mm special product) to 200+ clients from our Werabe factory and Addis Ababa office.`,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

const milestones = [
  {
    step: "01",
    title: "Foundation & Industrial Vision",
    desc: "Founded over a decade ago to provide Ethiopian furniture manufacturers and commercial builders with a steady, dependable supply of wood-based sheet panels.",
  },
  {
    step: "02",
    title: "Werabe Manufacturing Facility",
    desc: "Established production operations in Central Ethiopia, Werabe City, creating a reliable domestic manufacturing base for consistent Safarian and Plywood sheet output.",
  },
  {
    step: "03",
    title: "Flagship 18mm Special Plywood",
    desc: "Expanded our core catalog around focused, high-demand thicknesses — Safarian in 03mm, 06mm, 08mm, and 12mm alongside Plywood in 16mm and our signature 18mm special product.",
  },
  {
    step: "04",
    title: "200+ Clients & Leading Partners",
    desc: "Today we proudly serve over 200 clients nationwide — including MIDROC Investment Group, Mina Furniture, Warit Furniture, and Classic Furniture — from our Ayer Tena, Addis Ababa office.",
  },
];

const values = [
  {
    icon: Layers,
    title: "Focused Product Lineup",
    desc: "Instead of overcomplicating stock, we concentrate on perfecting Safarian boards (03mm, 06mm, 08mm, 12mm) and structural Plywood (16mm and 18mm special product) so every thickness is ready for active orders.",
  },
  {
    icon: Factory,
    title: "Werabe Factory Production",
    desc: "Manufacturing in Werabe City, Central Ethiopia allows close oversight of sheet pressing, thickness uniformity, and dependable bulk volume allocation for recurring commercial partners.",
  },
  {
    icon: MapPin,
    title: "Addis Ababa Sales Coordination",
    desc: "Our commercial office at Ayer Tena, Shamo Tower, 3rd Floor in Addis Ababa provides fast communication, order scheduling, and direct client service via phone, WhatsApp, and Telegram.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 bg-cream">
        {/* Hero */}
        <section className="relative bg-forest-dark text-cream py-20 lg:py-28 overflow-hidden bg-dark-grain border-b border-forest-light/30">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-oak/15 rounded-full blur-3xl pointer-events-none" />
          <Container size="wide" className="relative z-10">
            <Reveal variant="fade-up" className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-surface border border-forest-light/40 text-xs font-bold tracking-widest uppercase text-amber-light">
                <Award className="w-3.5 h-3.5 text-amber-light" />
                <span>About {siteConfig.name} • 10+ Years in Ethiopia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                Reliable Safarian &amp; Plywood Supply Built Over 10+ Years.
              </h1>
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed max-w-2xl">
                {siteConfig.name} combines manufacturing operations in Central Ethiopia, Werabe City with commercial coordination in Addis Ababa (Ayer Tena, Shamo Tower, 3rd Floor) — serving 200+ furniture workshops, contractors, and enterprises nationwide.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/products" variant="amber" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View Safarian &amp; Plywood
                </Button>
                <Button
                  href="/contact"
                  variant="ghost"
                  className="text-cream hover:text-amber-light hover:bg-forest-surface border border-forest-light/40"
                >
                  Office &amp; Factory Locations
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Key Figures Bar */}
        <Section className="bg-white border-b border-cream-border/80 py-12">
          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-cream/60 border border-cream-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-oak/15 border border-amber-oak/30 flex items-center justify-center text-amber-oak shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-forest-dark tabular-nums">10+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                    Years of Industry Experience
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-cream/60 border border-cream-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-oak/15 border border-amber-oak/30 flex items-center justify-center text-amber-oak shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-forest-dark tabular-nums">200+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-charcoal-subtle">
                    Trusted Clients Served
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-forest-dark text-cream border border-forest-light/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-oak flex items-center justify-center text-white shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-white tabular-nums">100%</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-light">
                    Verified Quality Standards
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission & Operational Footprint */}
        <Section className="bg-cream py-16 lg:py-24">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <Reveal variant="fade-up" className="space-y-6">
                <span className="text-xs font-bold tracking-widest uppercase text-amber-oak">
                  How We Operate
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal tracking-tight">
                  From Central Ethiopia Manufacturing to Addis Ababa Fulfillment
                </h2>
                <p className="text-sm sm:text-base text-charcoal-light leading-relaxed">
                  Furniture makers and major construction groups depend on sheet boards that arrive flat, cleanly cut, and true to thickness across every order. At {siteConfig.name}, our production in Werabe City keeps bulk availability strong across our entire product range.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    "Safarian Boards manufactured in 03mm, 06mm, 08mm, and 12mm thicknesses",
                    "Structural Plywood supplied in 16mm and our 18mm special product grade",
                    "Addis Ababa office at Ayer Tena, Shamo Tower, 3rd Floor for quick order scheduling",
                    "Direct client coordination with 200+ furniture workshops and contractors",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-oak shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <StaggerContainer className="grid grid-cols-1 gap-5">
                {values.map((val) => (
                  <StaggerItem key={val.title}>
                    <div className="p-6 rounded-2xl bg-white border border-cream-border shadow-xs hover:shadow-md hover:border-amber-oak/40 transition-all duration-300 flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-oak/10 border border-amber-oak/20 flex items-center justify-center text-amber-oak shrink-0">
                        <val.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-display font-bold text-charcoal">
                          {val.title}
                        </h3>
                        <p className="text-sm text-charcoal-light leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        {/* Timeline */}
        <Section className="bg-white border-y border-cream-border/80 py-16 lg:py-24">
          <Container size="wide">
            <Reveal variant="fade-up" className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-oak">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal tracking-tight">
                10+ Years of Steady Growth
              </h2>
            </Reveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((item) => (
                <StaggerItem key={item.step}>
                  <div className="h-full p-6 rounded-2xl bg-cream/60 border border-cream-border hover:border-amber-oak/50 transition-all duration-300 space-y-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-forest-dark text-amber-light font-display font-bold text-sm">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-display font-bold text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>

        {/* Companies We Work With */}
        <Section className="bg-cream py-16 lg:py-20">
          <Container size="wide">
            <Reveal variant="fade-up" className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-oak">
                Long-Term Client Partnerships
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal">
                Selected Companies We Supply
              </h2>
              <p className="text-sm text-charcoal-light">
                Part of our 200+ clients relying on bmtradingplc across commercial development and Ethiopian furniture production.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group p-6 rounded-2xl bg-white border border-cream-border shadow-xs flex flex-col gap-4 hover:border-amber-oak/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-start gap-3">
                    <PartnerLogoBadge
                      logoUrl={partner.logo_url}
                      name={partner.name}
                      initials={partner.initials}
                      size="lg"
                    />
                    <div>
                      <h3 className="text-base font-display font-bold text-charcoal leading-tight">
                        {partner.name}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-oak">
                        {partner.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-subtle">
                    Active commercial partner supplied with Safarian &amp; Plywood sheets.
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Bottom CTA */}
        <Section className="bg-forest-dark text-cream py-16 bg-dark-grain">
          <Container size="wide">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Ready to Order Safarian or Plywood?
                </h2>
                <p className="text-sm text-cream/80">
                  Contact our Addis Ababa office at Ayer Tena, Shamo Tower, 3rd Floor or reach us directly on{" "}
                  <Link href={`tel:${siteConfig.contact.phone}`} className="text-amber-light font-bold hover:underline">
                    {siteConfig.contact.phoneDisplay}
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/quote" variant="amber" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request a Quote
                </Button>
                <Button
                  href={`tel:${siteConfig.contact.phone}`}
                  variant="ghost"
                  className="border border-white/20 text-white hover:bg-white/10"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  {siteConfig.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}