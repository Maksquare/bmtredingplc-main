import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Award,
  Layers,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { teamMembers, partners } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Industrial Timber Excellence",
  description: `Learn about ${siteConfig.name}, our 18+ year history of importing certified BS 1088 marine plywood, high-cycle film-faced shuttering panels, and sustainable timber solutions.`,
};

export default function AboutPage() {
  const timeline = [
    {
      year: "2008",
      title: "Founding & Timber Import Licensing",
      description: `${siteConfig.name} was established with a singular mission: to supply certified, zero-defect timber products directly to East Africa's rapidly growing infrastructure sector.`,
    },
    {
      year: "2013",
      title: "BS 1088 Marine Certification Partnership",
      description:
        "Secured exclusive regional import agreements for authentic boiling-water-proof (WBP) Gurjan core marine plywood, serving coastal shipyards and port authorities.",
    },
    {
      year: "2017",
      title: "Introduction of Dynea Phenolic Shuttering",
      description:
        "Pioneered the introduction of 120g/m² high-pour Dynea film-faced plywood across commercial civil construction, tripling formwork reuse cycles for major contractors.",
    },
    {
      year: "2021",
      title: "Central Logistics Hub & Direct Fleet",
      description:
        "Commissioned a 15,000 m² central distribution warehouse with integrated overhead gantry cranes and dedicated flatbed transport for same-day jobsite delivery.",
    },
    {
      year: "2026",
      title: "Pan-Regional Industrial Expansion",
      description:
        "Over 120,000 metric tons delivered across 450+ high-rise buildings, marine vessels, and luxury architectural hospitality developments.",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Uncompromising Material Integrity",
      description:
        "We reject substandard fillers, unseasoned core veneers, and false grading claims. Every panel delivered meets certified international structural standards.",
    },
    {
      icon: Target,
      title: "Supply Chain Certainty",
      description:
        "Contractors cannot afford delays. We maintain extensive buffer inventories in our central warehouse to guarantee immediate availability for continuous concrete pours.",
    },
    {
      icon: Compass,
      title: "Responsible Timber Stewardship",
      description:
        "We source exclusively from certified sustainable concessions adhering to FSC guidelines, ensuring that our growth protects tropical forest biodiversity.",
    },
    {
      icon: Award,
      title: "Technical Consultation",
      description:
        "Our team of materials specialists works directly with structural engineers and joinery estimators to match the exact glue, core, and calibration to your application.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-forest-dark text-cream py-16 lg:py-24 bg-dark-grain border-b border-forest-light/30 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-oak/10 rounded-full blur-[140px] pointer-events-none" />

          <Container size="wide" className="relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-light bg-forest-surface px-3.5 py-1 rounded-full border border-forest-light/60">
                About Our Corporation
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Architectural Timber & Plywood Engineered for Durability.
              </h1>
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed">
                For nearly two decades, <strong className="text-white font-semibold">{siteConfig.name}</strong> has been the benchmark of structural timber supply, delivering verified quality and unwavering logistics reliability.
              </p>
            </div>
          </Container>
        </div>

        {/* Company Story & Purpose */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                  Our Origins & Trajectory
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                  Bridging Global Sustainable Mills with Industrial Constructors
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-charcoal-muted leading-relaxed">
                  <p>
                    Founded in 2008, <strong className="text-charcoal font-semibold">{siteConfig.name}</strong> addressed a critical vulnerability in the regional building sector: the proliferation of uncalibrated, void-ridden plywood falsely labeled as waterproof.
                  </p>
                  <p>
                    By establishing direct, verified relationships with premier timber mills worldwide, we instituted strict laboratory testing for core void tolerances, boiling water resistance, and adhesive shear strength before any consignment reaches our distribution yards.
                  </p>
                  <p>
                    Today, our products form the concrete cores of iconic capital city skyscrapers, line the hulls of ocean-going passenger ferries, and create bespoke cabinetry for 5-star safari lodges.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-forest bg-cream-surface px-3.5 py-2 rounded-xl border border-cream-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>18+ Years Operating History</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-forest bg-cream-surface px-3.5 py-2 rounded-xl border border-cream-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Primary Importer</span>
                  </div>
                </div>
              </div>

              {/* Mission / Vision Box */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-forest-surface text-cream p-8 rounded-3xl border border-forest-light/60 shadow-xl space-y-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-amber-oak/20 border border-amber-oak/40 text-amber-light flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                    To deliver zero-defect timber and composite panel products that maximize structural safety, elevate architectural aesthetics, and empower builders with predictable project timelines.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-cream-border shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cream-surface text-forest flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-charcoal">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    To remain the most trusted timber supply partner across the continent, recognized for ethical forestry compliance, technical innovation, and exceptional customer service.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section variant="cream-surface" padded="default" className="border-y border-cream-border/70">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                Guiding Principles
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                Core Values Behind Every Consignment
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-cream-border p-6 shadow-sm hover:shadow-lg transition-all space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-forest/5 text-amber-oak flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {val.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Company Timeline */}
        <Section variant="cream" woodgrain padded="default">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                Milestones & Evolution
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                Eighteen Years of Growth & Innovation
              </h2>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-cream-border -translate-x-1/2" />

              <div className="space-y-10">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      index % 2 === 0 ? "sm:flex-row-reverse" : ""
                    } gap-8`}
                  >
                    {/* Year Marker Pin */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-forest text-amber-light font-display font-bold text-xs flex items-center justify-center border-4 border-cream shadow-md z-10">
                      {index + 1}
                    </div>

                    {/* Content Box */}
                    <div className="ml-12 sm:ml-0 sm:w-1/2 p-6 rounded-2xl bg-white border border-cream-border shadow-sm space-y-2">
                      <span className="text-xs font-extrabold text-amber-oak uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="font-display text-lg font-bold text-charcoal">
                        {item.title}
                      </h3>
                      <p className="text-xs text-charcoal-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Leadership Team */}
        <Section variant="cream-surface" padded="default" className="border-t border-cream-border/70">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-oak bg-amber-pale px-3 py-1 rounded-full border border-amber-light/30">
                Executive Leadership
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
                Meet the Timber Specialists
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-cream-border overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 space-y-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-forest-surface text-amber-light font-display font-black text-2xl flex items-center justify-center shadow-md">
                    {member.name.split(" ")[0][0]}
                    {member.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-oak">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Certifications CTA */}
        <Section variant="forest" woodgrain padded="default">
          <Container size="default" className="text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Need Verification of Quality Standards?
            </h2>
            <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
              We provide formal mill test certificates, boiling water test reports, and formaldehyde emission compliance documentation with every project order.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button href="/contact" variant="amber" size="lg">
                Contact Technical QA Team
              </Button>
              <Button href="/products" variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream hover:text-forest">
                Browse Certified Products
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

