"use client";

import * as React from "react";
import {
  FileText,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  Sliders,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [activePillar, setActivePillar] = React.useState<number>(0);

  const pillars = [
    {
      id: "resume-intelligence",
      title: "Resume Intelligence",
      eyebrow: "Structural & Semantic Parsing",
      description:
        "Deep structural parsing extracts timeline hierarchies, impact verbs, and quantified metrics without tripping applicant tracking systems.",
      details: [
        "Detects unparseable multi-column tables, graphics, and icon fonts",
        "Scores bullet point impact using real industry action verb taxonomies",
        "Calculates experience seniority markers and leadership signals",
      ],
      preview: {
        tag: "Structure Assessment",
        metric: "98.4%",
        label: "ATS Parseability Score",
        badge: "Clean Layout",
        bullets: [
          { text: "Career progression correctly mapped across 3 companies", status: "success" },
          { text: "No non-standard unicode characters or embedded vectors", status: "success" },
          { text: "Dates formatted uniformly in standard MM/YYYY notation", status: "success" },
        ],
      },
    },
    {
      id: "job-matching",
      title: "Job Description Matching",
      eyebrow: "Semantic Intent Comparison",
      description:
        "Compare your resume directly against target job descriptions using contextual semantic understanding rather than naive keyword stuffing.",
      details: [
        "Identifies both explicit requirements and implicit seniority expectations",
        "Differentiates between core must-haves and nice-to-have preferences",
        "Provides calibrated match indices for specific engineering and product roles",
      ],
      preview: {
        tag: "Target Role Comparison",
        metric: "91%",
        label: "Semantic Match Index",
        badge: "Staff Engineer Alignment",
        bullets: [
          { text: "High alignment with Core Platform & Infrastructure requirements", status: "success" },
          { text: "Matches 8 of 9 must-have architectural qualifications", status: "success" },
          { text: "Missing: 1 secondary tool mentioned in nice-to-have section", status: "warning" },
        ],
      },
    },
    {
      id: "skill-gap-analysis",
      title: "Skill Gap Analysis",
      eyebrow: "Targeted Competency Mapping",
      description:
        "Pinpoint precisely which technologies, architectural patterns, or leadership competencies are missing from your current draft.",
      details: [
        "Categorizes skills into verified matches, unaddressed gaps, and adjacent competencies",
        "Flags missing certifications or tool versions requested by hiring managers",
        "Highlights opportunities to mention real project experience you might have omitted",
      ],
      preview: {
        tag: "Competency Breakdown",
        metric: "14 / 16",
        label: "Requirements Addressed",
        badge: "2 Unaddressed Areas",
        bullets: [
          { text: "System Architecture, TypeScript, Distributed Caching verified", status: "success" },
          { text: "Identified gap: GraphQL Federation (Apollo Router)", status: "warning" },
          { text: "Identified gap: Go microservices concurrency patterns", status: "warning" },
        ],
      },
    },
    {
      id: "evidence-improvements",
      title: "Evidence-Based Improvements",
      eyebrow: "Ethical Impact Enhancements",
      description:
        "Receive contextual rewrite suggestions that strengthen active verbs and business results while strictly preserving your authentic career history.",
      details: [
        "Converts weak passive phrases into quantified achievement statements",
        "Encourages specific business outcomes (latency, revenue, team velocity)",
        "Zero hallucination: never invents companies, dates, or unearned skills",
      ],
      preview: {
        tag: "Contextual Refinement",
        metric: "+34%",
        label: "Recruiter Readability Lift",
        badge: "Zero Hallucination",
        bullets: [
          { text: "Replaced 4 passive duty statements with direct outcome verbs", status: "success" },
          { text: "Preserved original candidate metrics and genuine project scope", status: "success" },
          { text: "Strengthened leadership visibility across 2 major achievements", status: "success" },
        ],
      },
    },
  ];

  return (
    <section id="showcase" className="py-20 sm:py-28 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <Badge variant="brand" size="md">
            Product Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            A comprehensive lens on your <span className="font-serif italic font-normal">career story</span>.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Four specialized modules working together to clarify your accomplishments,
            align with target job criteria, and ensure ATS parseability.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-xl border border-border bg-surface-subtle/70">
          {pillars.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(idx)}
              className={cn(
                "flex flex-col items-start p-3 sm:p-4 rounded-lg text-left transition-all duration-200 select-none",
                activePillar === idx
                  ? "bg-white text-foreground shadow-subtle border border-border font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                0{idx + 1}
              </span>
              <span className="text-xs sm:text-sm font-semibold mt-1">
                {pillar.title}
              </span>
            </button>
          ))}
        </div>

        {/* Pillar Showcase Interactive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column: Editorial Explanation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-600">
                {pillars[activePillar].eyebrow}
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                {pillars[activePillar].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {pillars[activePillar].description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Key Diagnostic Capabilities:
              </span>
              <ul className="space-y-2 text-xs text-foreground/85">
                {pillars[activePillar].details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: High-Fidelity UI Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white shadow-card p-6 sm:p-8 space-y-6">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase">
                    {pillars[activePillar].preview.tag}
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    Real-time Diagnostic Output
                  </p>
                </div>
                <Badge variant="brand" size="sm">
                  {pillars[activePillar].preview.badge}
                </Badge>
              </div>

              {/* Metric Hero in Card */}
              <div className="flex items-baseline gap-3 p-4 rounded-xl bg-surface-subtle border border-border/80">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground font-mono">
                  {pillars[activePillar].preview.metric}
                </span>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {pillars[activePillar].preview.label}
                </span>
              </div>

              {/* Findings List */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Diagnostic Findings
                </span>
                <div className="space-y-2">
                  {pillars[activePillar].preview.bullets.map((b) => (
                    <div
                      key={b.text}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border text-xs",
                        b.status === "success"
                          ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                          : "bg-amber-50/50 border-amber-200 text-amber-900"
                      )}
                    >
                      {b.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                      )}
                      <span className="font-medium leading-normal">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground font-mono pt-1 text-right">
                [Illustrative verification preview • ResumeLens Analysis Model]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
