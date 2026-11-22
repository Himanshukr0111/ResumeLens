import * as React from "react";
import { ShieldCheck, Lock, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrustAndPrivacy() {
  const principles = [
    {
      title: "Preserving Authentic Experience",
      description:
        "AI suggestions must always reflect the candidate's actual work history. ResumeLens never fabricates projects, claims unearned titles, or invents achievements you did not accomplish.",
    },
    {
      title: "No Inferred or Invented Skills",
      description:
        "Missing skills are presented as genuine gaps to bridge, never disguised as existing skills. We help you highlight relevant adjacent experience while upholding absolute honesty.",
    },
    {
      title: "Transparent & Explainable Scoring",
      description:
        "Match scores are estimates calculated against public semantic rubrics, not arbitrary black-box guarantees. We provide clear reasoning for every recommendation.",
    },
    {
      title: "In-Memory Privacy Guarantee",
      description:
        "Your documents and career history belong to you. We do not sell your personal data, build public profiles, or use your resumes to train public third-party AI models.",
    },
  ];

  return (
    <section id="trust-and-privacy" className="py-20 sm:py-28 border-b border-border bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="success" size="md">
            Our Ethical Commitment
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Trust, privacy, and <span className="font-serif italic font-normal">transparent standards</span>.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            In an era of generic AI hype and inflated claims, ResumeLens operates on strict
            ethical principles designed to protect candidate reputation and privacy.
          </p>
        </div>

        {/* 4 Trust Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-border bg-white shadow-subtle space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlighted Banner */}
        <div className="rounded-xl border border-border bg-surface-subtle p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-brand-600 shrink-0" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">Confidentiality by Design:</strong> Uploaded resumes are analyzed within temporary secure compute instances.
            </p>
          </div>
          <Badge variant="neutral" size="sm" className="shrink-0 bg-white">
            SOC2 & GDPR Aligned Architecture
          </Badge>
        </div>
      </div>
    </section>
  );
}
