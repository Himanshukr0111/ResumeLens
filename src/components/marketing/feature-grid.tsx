import * as React from "react";
import {
  FileSearch,
  Crosshair,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  BarChart2,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeatureGrid() {
  const features = [
    {
      icon: FileSearch,
      title: "Intelligent Resume Analysis",
      badge: "Deep Parsing",
      description:
        "Comprehensive structural evaluation that analyzes formatting, document hierarchy, and bullet strength across major ATS engines including Workday, Greenhouse, and Lever.",
      highlights: [
        "Multi-column and table parse checks",
        "Action verb density grading",
        "Chronological progression audit",
      ],
    },
    {
      icon: Crosshair,
      title: "Skill Gap Intelligence",
      badge: "Semantic Matching",
      description:
        "Contextual comparison between your real career history and target job specifications, discovering hard skills, architectural patterns, and competencies you may have omitted.",
      highlights: [
        "Uncovers unaddressed requirement gaps",
        "Distinguishes must-haves from preferences",
        "Context-sensitive keyword mapping",
      ],
    },
    {
      icon: Sparkles,
      title: "AI Resume Enhancement",
      badge: "Ethical Rewrites",
      description:
        "Context-aware recommendations that transform passive statements into high-impact, quantified achievements while strictly preserving your truthful experience.",
      highlights: [
        "Eliminates passive 'responsible for' phrases",
        "Prompts for quantifiable business metrics",
        "Zero hallucination guarantee",
      ],
    },
    {
      icon: BarChart2,
      title: "Explainable Match Scoring",
      badge: "Transparent Math",
      description:
        "No opaque black boxes. Every match score comes with a clear, inspectable breakdown showing exactly which sections, skills, and qualifications influenced the calculation.",
      highlights: [
        "Transparent component weighting",
        "Inspectable scoring rubrics",
        "Actionable steps to improve alignment",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 border-b border-border bg-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <Badge variant="brand" size="md">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Engineered for <span className="font-serif italic font-normal">clarity</span>, precision, and truth.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Built from the ground up to give candidates unfair advantage through transparent,
            interpretable career analysis.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                interactive
                className="p-2 sm:p-4 flex flex-col justify-between"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-200">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {feature.badge}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="border-t border-border/60 pt-4 space-y-2">
                    {feature.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-2 text-xs text-foreground/80 font-medium"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
