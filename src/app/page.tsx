"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/marketing-navbar";
import { HeroPreview } from "@/components/marketing/hero-preview";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TrustAndPrivacy } from "@/components/marketing/trust-privacy";
import { CTASection } from "@/components/marketing/cta-section";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { UploadModal } from "@/components/marketing/upload-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/lib/types/analysis";

export default function MarketingLandingPage() {
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<AnalysisResult | null>(null);

  const handleOpenUpload = () => {
    setUploadModalOpen(true);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    // Smooth scroll down to the preview section so the user sees the live 4-tab analysis
    setTimeout(() => {
      const el = document.getElementById("preview-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const handleExplorePlatform = () => {
    const el = document.getElementById("preview-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-100 selection:text-brand-900">
      {/* SECTION 1: MARKETING NAVIGATION */}
      <MarketingNavbar onOpenUpload={handleOpenUpload} />

      <main className="flex-1">
        {/* SECTION 2: HERO SECTION */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-border bg-gradient-to-b from-white via-background to-background overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/5 blur-3xl rounded-full pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Hero Copy */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <Badge variant="brand" size="md" dot>
                  INTELLIGENT CAREER ANALYSIS
                </Badge>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                Your resume deserves{" "}
                <span className="font-serif italic font-normal text-brand-600 underline decoration-brand-200 decoration-wavy decoration-1 underline-offset-8">
                  more than a quick scan
                </span>
                .
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Understand your strengths, uncover skill gaps, and discover how your experience
                aligns with the opportunities you want.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleOpenUpload}
                  leftIcon={<Sparkles className="h-4 w-4" />}
                >
                  Analyze my resume
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleExplorePlatform}
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                >
                  Explore the platform
                </Button>
              </div>

              {/* Trust Subtext */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Preserves truthful career history
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                  In-memory document privacy
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  ATS format validated
                </span>
              </div>
            </div>

            {/* Custom-Designed Product Preview */}
            <div id="preview-section" className="pt-4">
              <HeroPreview
                analysis={analysisResult}
                onOpenAnalysis={handleOpenUpload}
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: EDITORIAL PRODUCT SHOWCASE */}
        <ProductShowcase />

        {/* SECTION 4: FOUR PREMIUM FEATURES */}
        <FeatureGrid />

        {/* SECTION 5: HOW IT WORKS (3 STEPS) */}
        <HowItWorks />

        {/* SECTION 6: TRUST AND PRIVACY */}
        <TrustAndPrivacy />

        {/* SECTION 7: FINAL CTA */}
        <CTASection onOpenUpload={handleOpenUpload} />
      </main>

      {/* SECTION 8: MARKETING FOOTER */}
      <MarketingFooter />

      {/* Interactive Resume Upload & Analysis Modal */}
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
}
