"use client";

import * as React from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  ArrowUpRight,
  TrendingUp,
  Layers,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisResult } from "@/lib/types/analysis";
import { cn } from "@/lib/utils";

export interface HeroPreviewProps {
  onOpenAnalysis?: () => void;
  analysis?: AnalysisResult | null;
}

export function HeroPreview({ onOpenAnalysis, analysis }: HeroPreviewProps) {
  const [activeTab, setActiveTab] = React.useState("overview");

  // Determine whether to show real live analysis or illustrative sample data
  const isLive = Boolean(analysis);

  // Scores
  const overallScore = isLive && analysis ? analysis.scores.overall : 92;
  const hardSkillsScore = isLive && analysis ? analysis.scores.hardSkills : 88;
  const experienceAlignment = isLive && analysis ? analysis.scores.experienceAlignment : 90;
  const atsScore = isLive && analysis ? analysis.scores.formattingClarity : 98;

  // Counts
  const matchedCount = isLive && analysis ? analysis.matchedSkills.length : 14;
  const missingCount = isLive && analysis ? analysis.missingSkills.length : 2;
  const totalSkills = matchedCount + missingCount;
  const coveragePercent = totalSkills > 0 ? Math.round((matchedCount / totalSkills) * 100) : 88;

  // Role & Context
  const targetRole = isLive && analysis ? analysis.targetRole : "Senior Staff Engineer @ Modern SaaS";
  const candidateName = isLive && analysis ? "Verified Candidate Document" : "Alex Mercer • Lead Systems Architect";

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-border bg-white shadow-dialog overflow-hidden transition-all">
      {/* Editorial Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border bg-surface-subtle/60 px-5 py-3.5 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground border-l border-border pl-3 truncate max-w-xs sm:max-w-md">
            Candidate: <strong className="text-foreground font-semibold">{candidateName}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm" className="bg-white/80 border-border">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mr-1.5" />
            Target: {targetRole}
          </Badge>
          <span
            className={cn(
              "text-[10px] font-mono hidden md:inline px-2 py-0.5 rounded",
              isLive
                ? "bg-brand-50 text-brand-700 border border-brand-200 font-semibold"
                : "text-muted-foreground/70"
            )}
          >
            {isLive ? `[Live ${analysis?.engine === "gemini-ai" ? "Gemini AI" : "Analyzed"} Data]` : "[Sample Data]"}
          </span>
        </div>
      </div>

      {/* Product Preview Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Score Pod */}
          <div className="md:col-span-4 p-5 rounded-xl border border-border bg-surface-subtle/40 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Match Index
              </span>
              <Badge
                variant={overallScore >= 80 ? "success" : overallScore >= 60 ? "warning" : "neutral"}
                size="sm"
              >
                {overallScore >= 80 ? "Strong Alignment" : overallScore >= 60 ? "Moderate Alignment" : "Needs Optimization"}
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-foreground font-mono">
                {overallScore}
              </span>
              <span className="text-sm font-semibold text-muted-foreground font-mono">
                / 100
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Calculated using transparent semantic keyword weighting against target job criteria.
            </p>

            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, overallScore))}%` }}
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-border bg-white space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Matching Skills</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-foreground font-mono">
                {matchedCount} / {totalSkills}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">{coveragePercent}% coverage</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-white space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Identified Gaps</span>
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-foreground font-mono">{missingCount}</p>
              <p className="text-[11px] text-amber-600 font-medium">Actionable gaps</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-white space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>ATS Parse Rating</span>
                <Sparkles className="h-4 w-4 text-brand-600" />
              </div>
              <p className="text-2xl font-bold text-foreground font-mono">{atsScore}%</p>
              <p className="text-[11px] text-brand-600 font-medium">
                {atsScore >= 85 ? "Clean structure" : "Standard layout"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Interactive Section */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-3">
              <TabsList className="bg-surface-subtle">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Matching & Missing Skills</TabsTrigger>
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                <TabsTrigger value="methodology">Scoring Transparency</TabsTrigger>
              </TabsList>

              <span className="text-[11px] text-muted-foreground font-mono flex items-center gap-1">
                {isLive ? (
                  <>
                    <Cpu className="h-3.5 w-3.5 text-brand-600" /> Live Assessment Results
                  </>
                ) : (
                  <>
                    <HelpCircle className="h-3.5 w-3.5" /> Interactive Sample Data
                  </>
                )}
              </span>
            </div>

            {/* Tab 1: Overview */}
            <TabsContent value="overview" className="space-y-4 pt-2">
              {/* Summary Banner if Live */}
              {isLive && analysis?.summary && (
                <div className="p-3.5 rounded-xl border border-brand-200/80 bg-brand-50/40 text-xs text-foreground leading-relaxed">
                  <span className="font-semibold text-brand-900 block mb-0.5">Executive Fit Summary:</span>
                  {analysis.summary}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2.5">
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Core Alignment Strengths
                  </span>
                  <ul className="text-xs text-foreground/80 space-y-2">
                    {isLive && analysis ? (
                      analysis.atsFeedback.strengths.slice(0, 3).map((st, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{st}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>
                            <strong>Distributed Systems:</strong> Demonstrated experience handling 2M+ daily active requests across multi-region clusters.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>
                            <strong>Frontend Architecture:</strong> Deep expertise in Next.js, React server components, and design systems tooling.
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Growth Areas */}
                <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 space-y-2.5">
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" /> Focus Gaps to Address
                  </span>
                  <ul className="text-xs text-foreground/80 space-y-2">
                    {isLive && analysis ? (
                      analysis.missingSkills.slice(0, 2).map((gap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>
                            <strong>{gap.name}:</strong> {gap.reason}
                          </span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>
                            <strong>GraphQL Federation:</strong> Job specifies Apollo/Federation; candidate currently emphasizes REST and gRPC endpoints.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>
                            <strong>Go (Golang):</strong> Secondary backend language in posting not highlighted in recent project bullets.
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Skills Breakdown */}
            <TabsContent value="skills" className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Verified Matching Skills */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Matching Skills ({matchedCount})
                    </h5>
                    <Badge variant="success" size="sm">Present</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {isLive && analysis ? (
                      analysis.matchedSkills.map((skill) => (
                        <span
                          key={skill.name}
                          title={skill.contextInResume || undefined}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      [
                        "System Architecture",
                        "TypeScript",
                        "React 18+",
                        "Next.js App Router",
                        "PostgreSQL",
                        "Redis Caching",
                        "Tailwind CSS",
                        "CI/CD Pipelines",
                        "Microservices",
                        "Docker & Kubernetes",
                        "Team Mentorship",
                        "Design Systems",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          {skill}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-600" /> Target Job Skill Gaps ({missingCount})
                    </h5>
                    <Badge variant="warning" size="sm">Unaddressed</Badge>
                  </div>
                  <div className="space-y-2">
                    {isLive && analysis ? (
                      analysis.missingSkills.map((gap) => (
                        <div key={gap.name} className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs space-y-1">
                          <p className="font-semibold text-amber-900">{gap.name}</p>
                          <p className="text-muted-foreground leading-relaxed">{gap.recommendation || gap.reason}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs space-y-1">
                          <p className="font-semibold text-amber-900">GraphQL Federation</p>
                          <p className="text-muted-foreground leading-relaxed">
                            Mentioned in job description under &apos;Preferred Experience&apos;. If you have used Apollo Router or schema stitching, highlight it in your infrastructure section.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs space-y-1">
                          <p className="font-semibold text-amber-900">Go (Golang)</p>
                          <p className="text-muted-foreground leading-relaxed">
                            Required for high-throughput pipeline services. If you haven&apos;t used Go in production, do not fabricate; emphasize your experience with distributed systems paradigms instead.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Recommendations */}
            <TabsContent value="recommendations" className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-border bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Evidence-Based Bullet Improvement
                  </span>
                  <Badge variant="brand" size="sm">
                    Recommended Rewrite
                  </Badge>
                </div>

                {isLive && analysis && analysis.bulletImprovements.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.bulletImprovements.map((b, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
                          <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold">
                            Current Bullet
                          </span>
                          <p className="text-muted-foreground italic leading-relaxed">
                            &quot;{b.original}&quot;
                          </p>
                          <span className="inline-block text-[10px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                            {b.issue || "Opportunity to strengthen impact"}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-brand-50/50 border border-brand-200 space-y-1.5">
                          <span className="font-mono text-[10px] text-brand-700 uppercase font-semibold">
                            Enhanced Suggestion
                          </span>
                          <p className="text-foreground font-medium leading-relaxed">
                            &quot;{b.improved}&quot;
                          </p>
                          <span className="inline-block text-[10px] text-brand-700 bg-brand-100 px-2 py-0.5 rounded font-medium">
                            {b.explanation || "Action verb + Quantified metric"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold">
                        Current Bullet
                      </span>
                      <p className="text-muted-foreground italic leading-relaxed">
                        &quot;Responsible for redesigning the frontend application and improving performance for customers.&quot;
                      </p>
                      <span className="inline-block text-[10px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                        Passive tone • Unquantified impact
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-brand-50/50 border border-brand-200 space-y-1.5">
                      <span className="font-mono text-[10px] text-brand-700 uppercase font-semibold">
                        Enhanced Suggestion
                      </span>
                      <p className="text-foreground font-medium leading-relaxed">
                        &quot;Architected modular React/Next.js design system across 4 engineering pods, reducing First Contentful Paint by 42% and accelerating feature delivery by 3 weeks.&quot;
                      </p>
                      <span className="inline-block text-[10px] text-brand-700 bg-brand-100 px-2 py-0.5 rounded font-medium">
                        Action verb + Quantified metric
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab 4: Methodology */}
            <TabsContent value="methodology" className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-border bg-surface-subtle/50 text-xs text-muted-foreground space-y-2 leading-relaxed">
                <p className="text-foreground font-semibold">
                  How ResumeLens Calculates Match Scores:
                </p>
                <p>
                  Scores are calculated transparently using semantic role taxonomy mapping, hard requirement coverage (60%), architectural seniority signals (25%), and ATS formatting clarity (15%).
                </p>
                {isLive && analysis ? (
                  <div className="pt-2 border-t border-border/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground">Analysis Engine:</strong>
                      <span className="font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {analysis.engine === "gemini-ai" ? `Gemini AI (${analysis.modelUsed || "gemini-1.5-flash"})` : "Deterministic Engine"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground">Prompt Version:</strong>
                      <span className="font-mono text-muted-foreground">{analysis.promptVersion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground">Ethical Guarantee:</strong>
                      <span className="text-emerald-700 font-medium">
                        {analysis.ethicalSafeguard.nonFabricationAffirmation}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p>
                    <strong className="text-foreground">Ethical Transparency:</strong> ResumeLens never generates false claims or fabricates skills. We empower you to present your genuine career story with maximum clarity and impact.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer info pill */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between border-t border-border/70 text-xs text-muted-foreground gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ATS Standard Compliance: Verified for Workday, Greenhouse, Lever & Ashby
          </span>

          {onOpenAnalysis && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAnalysis}
              rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
            >
              {isLive ? "Analyze Another Resume" : "Analyze Your Own Resume"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
