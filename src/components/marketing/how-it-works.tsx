import * as React from "react";
import { Upload, FileCheck, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload your resume",
      description:
        "Upload your resume as a PDF or DOCX file. Our engine parses the formatting and text layers in-memory with strict confidentiality.",
    },
    {
      number: "02",
      icon: FileCheck,
      title: "Add target job description",
      description:
        "Paste the job posting description or key role requirements to establish the benchmark for the opportunities you want.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Discover personalized analysis",
      description:
        "Instantly explore your explainable match score, verified matching skills, prioritized skill gaps, and bullet refinement recommendations.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <Badge variant="brand" size="md">
            Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How ResumeLens <span className="font-serif italic font-normal">works</span>.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            From raw resume to evidence-backed career alignment in three seamless steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col p-6 sm:p-8 rounded-2xl border border-border bg-white shadow-subtle hover:border-brand-200 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-subtle text-foreground border border-border">
                    <Icon className="h-6 w-6 text-brand-600 stroke-[1.75]" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-muted-foreground/30">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
