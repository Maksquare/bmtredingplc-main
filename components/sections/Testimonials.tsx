import React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials, partners } from "@/data/seed-data";
import { Container } from "@/components/ui/Container";
import { PartnerLogoBadge } from "@/components/ui/PartnerLogoBadge";

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5DEC9]/70">
      <Container size="wide">
        {/* Centered Header (Inspo 00:20–00:22) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#141715]">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-[#3D4A43] leading-relaxed">
            Trusted by leading construction groups and furniture workshops across Ethiopia for dependable Safarian and Plywood supply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#FCFBF8] rounded-3xl border border-[#E5DEC9] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:bg-white hover:border-[#C8832A]/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C8832A]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8832A] text-[#C8832A]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#D8CFC0] group-hover:text-[#C8832A] transition-colors" />
                </div>

                {test.project_type && (
                  <span className="inline-block text-[11px] font-bold text-[#0B241B] bg-[#F4EFE6] px-3 py-1 rounded-full">
                    {test.project_type}
                  </span>
                )}

                <p className="text-sm text-[#2D332F] leading-relaxed">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#E5DEC9]/80 flex items-center gap-3.5">
                <PartnerLogoBadge
                  logoUrl={
                    test.avatar_url ||
                    partners.find(
                      (p) => p.name.toLowerCase() === test.company.toLowerCase()
                    )?.logo_url
                  }
                  name={test.company}
                  initials={test.company
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                  size="md"
                />
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-sm text-[#141715] truncate">
                    {test.company}
                  </h3>
                  <p className="text-[11px] text-[#5A6961] leading-snug">
                    {test.client_name} • {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}