import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CTASectionProps {
  onOpenUpload: () => void;
}

export function CTASection({ onOpenUpload }: CTASectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-border bg-gradient-to-b from-white to-surface-subtle p-8 sm:p-16 shadow-dialog overflow-hidden text-center max-w-4xl mx-auto space-y-6">
          {/* Subtle glow accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2">
            <Badge variant="brand" size="md" dot>
              Ready When You Are
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            Make your next application your{" "}
            <span className="font-serif italic font-normal text-brand-600">
              strongest one
            </span>
            .
          </h2>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Discover how your experience aligns with your target role, uncover skill gaps,
            and present your genuine achievements with maximum impact.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenUpload}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Get started
            </Button>
            <Link
              href="/design-system"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Explore Design System
            </Link>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            Instant sample analysis available • No credit card required • In-memory privacy
          </p>
        </div>
      </div>
    </section>
  );
}
