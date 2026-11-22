import * as React from "react";
import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-white py-12 sm:py-16 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-subtle">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Resume<span className="text-brand-600">Lens</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-xs">
              AI-powered resume feedback and job-match intelligence. Built with
              transparent scoring, zero hallucinations, and high-precision career alignment.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational • v1.0.0</span>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Product
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#showcase" className="hover:text-foreground transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Design System <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Trust */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Standards
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
                  Ethical AI Standards
                </Link>
              </li>
              <li>
                <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
                  Truth-in-Hiring
                </Link>
              </li>
              <li>
                <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
                  Scoring Transparency
                </Link>
              </li>
              <li>
                <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@resumelens.ai"
                  className="hover:text-foreground transition-colors"
                >
                  contact@resumelens.ai
                </a>
              </li>
              <li>
                <span className="text-muted-foreground/80">
                  San Francisco, CA
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/80">
                  Early Access Program
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p>© {new Date().getFullYear()} ResumeLens Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#trust-and-privacy" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
