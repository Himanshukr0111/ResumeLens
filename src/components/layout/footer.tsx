import * as React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "./container";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border/80 bg-background py-10 transition-colors",
        className
      )}
    >
      <Container size="xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand mark & copyright */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white shadow-subtle">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Resume<span className="text-brand-600">Lens</span>
            </span>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">
              © {new Date().getFullYear()} ResumeLens Inc. All rights reserved.
            </span>
          </div>

          {/* Status Indicator & Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </div>
            <Link
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
