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
import { teamMembers } from "@/data/seed-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Industrial Timber Excellence in Ethiopia",
  description: `Learn about ${siteConfig.name}, our history of importing certified BS 1088 marine plywood, high-cycle film-faced shuttering panels, and architectural hardwoods in Addis Ababa, Ethiopia.`,
};

export default function AboutPage() {
  const timeline = [
    {
      year: "2008",
      title: "Founding & Timber Import Licensing",
      description: `${siteConfig.name} was established with a clear mandate: supplying certified, zero-defect timber products directly to Ethiopia's expanding commercial infrastructure and building sectors.`,
    },
    {
      year: "2013",
      title: "BS 1088 Marine Certification Standard",
      description:
        "Secured verified direct import channels for authentic boiling-water-proof (WBP) Gurjan core marine plywood, meeting international laboratory specifications.",
    },
    {
      year: "2017",
      title: "Introduction of Dynea Phenolic Shuttering",
      description:
        "Pioneered the wholesale distribution of 120g/m² Dynea film-faced plywood across Addis Ababa civil construction, achieving 25+ concrete pour cycles for major builders.",
    },
    {
      year: "2021",
      title: "Central Logistics Hub & Direct Fleet",
      description:
        "Expanded our central industrial warehousing with dedicated flatbed logistics and crane offloading coordination for same-day jobsite delivery.",
    },
    {
      year: "2026",
      title: "Market Leadership & Quality Benchmark",
      description:
        "Over 120,000 metric tons supplied across 450+ commercial high-rises, civil bridge decks, and luxury architectural hospitality projects in Ethiopia.",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Material Integrity Guarantee",
      description:
        "We reject unseasoned core veneers, hollow internal pockets, and fraudulent grading. Every panel supplied meets certified international specifications.",
    },
    {
      icon: Target,
      title: "Supply Chain Continuity",
      description:
        "Contractors cannot afford concrete delays. We maintain substantial warehouse buffer stock in Addis Ababa to guarantee continuous pour schedules.",
    },
    {
      icon: Compass,
      title: "Certified Mill Sources",
      description:
        "We partner directly with sustainably managed timber concessions conforming to FSC forestry standards, protecting natural forest biodiversity.",
    },
    {
      icon: Award,
      title: "Technical Engineering Support",
      description:
        "Our materials specialists work directly with civil engineers, quantity surveyors, and joinery estimators to match the exact adhesive, core species, and tolerance.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <div className="bg-[#071711] text-white py-12 sm:py-16 lg:py-20 border-b border-white/15 relative overflow-hidden">
          <Container size="wide" className="relative z-10">
            <div className="max-w-3xl space-y-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block shadow-2xs">
                About Our Corporation
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Architectural Timber & Plywood Engineered for Enduring Strength.
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                For nearly two decades, <strong className="text-white font-semibold">{siteConfig.name}</strong> has provided verified structural panel supply, technical consultation, and unwavering delivery reliability across Ethiopia.
              </p>
            </div>
          </Container>
        </div>

        {/* Company Story & Purpose */}
        <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                  Background & Standards
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
                  Direct Mill Sourcing for Commercial & Civil Contractors
                </h2>
                <div className="space-y-3.5 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  <p>
                    Established in 2008, <strong className="text-charcoal font-semibold">{siteConfig.name}</strong> solved a critical quality issue in the regional construction sector: the prevalence of uncalibrated, void-ridden plywood incorrectly marketed as waterproof.
                  </p>
                  <p>
                    By establishing direct, verified relationships with premier timber mills worldwide, we enforce strict laboratory testing for core void tolerances, boiling water resistance (WBP phenolic testing), and calibrated thickness gauge before any consignment reaches our distribution yards.
                  </p>
                  <p>
                    Today, our panels form the concrete structures of Addis Ababa high-rises, civil bridge decks, and bespoke architectural millwork for leading commercial builders.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest bg-white px-3 py-2 rounded-xl border border-cream-border/90 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>18+ Years Operating Track Record</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest bg-white px-3 py-2 rounded-xl border border-cream-border/90 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Primary Importer</span>
                  </div>
                </div>
              </div>

              {/* Mission / Vision Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#0B241B] text-white p-6 sm:p-7 rounded-2xl border border-white/15 shadow-lg space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    To deliver zero-defect timber and engineered panels that maximize structural performance, elevate architectural finish quality, and empower contractors with dependable timelines.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-cream-border/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cream-surface text-forest flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    To remain the most trusted timber supply partner in Ethiopia, recognized for rigorous standards compliance, transparent wholesale pricing, and exceptional customer service.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section variant="cream-surface" padded="default" className="py-12 sm:py-16 lg:py-20 border-y border-cream-border/70">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                Operating Principles
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                Core Standards Behind Every Shipment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-forest/5 text-amber-oak group-hover:bg-amber-pale flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-charcoal group-hover:text-forest transition-colors">
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
        <Section variant="cream" woodgrain padded="default" className="py-12 sm:py-16 lg:py-20">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                Milestones & Growth
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                Eighteen Years of Reliability
              </h2>
            </div>

            <div className="max-w-3xl mx-auto relative">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-cream-border/80 -translate-x-1/2" />

              <div className="space-y-6 sm:space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      index % 2 === 0 ? "sm:flex-row-reverse" : ""
                    } gap-4 sm:gap-8`}
                  >
                    {/* Marker Pin */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B241B] text-amber-300 font-display font-bold text-xs flex items-center justify-center border-4 border-cream shadow-sm z-10">
                      {index + 1}
                    </div>

                    {/* Content Box */}
                    <div className="ml-10 sm:ml-0 sm:w-1/2 p-5 rounded-xl sm:rounded-2xl bg-white border border-cream-border/90 shadow-2xs hover:shadow-md transition-all duration-200 space-y-1.5">
                      <span className="text-xs font-bold text-amber-oak uppercase tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="font-display text-base font-bold text-charcoal">
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
        <Section variant="cream-surface" padded="default" className="py-12 sm:py-16 lg:py-20 border-t border-cream-border/70">
          <Container size="wide">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-oak bg-white px-3 py-1 rounded-full border border-cream-border/90 shadow-2xs">
                Key Management
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                Materials Specialists & Operations Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl sm:rounded-2xl border border-cream-border/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 p-5 sm:p-6 space-y-3 group hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-forest text-amber-300 font-display font-bold text-xl flex items-center justify-center shadow-2xs">
                    {member.name.split(" ")[0][0]}
                    {member.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-charcoal group-hover:text-forest transition-colors">
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
        <Section variant="forest" woodgrain padded="default" className="py-12 sm:py-16">
          <Container size="default" className="text-center space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Need Verification of Quality Standards?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
              We supply official mill test certificates, boiling water test reports, and formaldehyde emission compliance documentation with every consignment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
              <Button href="/contact" variant="amber" size="default" className="w-full sm:w-auto font-bold">
                Contact Technical QA Team
              </Button>
              <Button href="/products" variant="outline" size="default" className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-forest font-bold">
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
