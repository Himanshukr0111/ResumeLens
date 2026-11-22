"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, Menu, X, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface MarketingNavbarProps {
  onOpenUpload: () => void;
}

export function MarketingNavbar({ onOpenUpload }: MarketingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signInEmail, setSignInEmail] = React.useState("");
  const [signInSubmitted, setSignInSubmitted] = React.useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Showcase", href: "#showcase" },
    { label: "Trust & Privacy", href: "#trust-and-privacy" },
    { label: "Design System", href: "/design-system" },
  ];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInSubmitted(true);
    setTimeout(() => {
      setSignInSubmitted(false);
      setSignInOpen(false);
      setSignInEmail("");
    }, 1800);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-brand transition-transform duration-200 group-hover:scale-105">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-foreground text-base leading-none">
                Resume<span className="text-brand-600 font-bold">Lens</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-subtle rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSignInOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenUpload}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Get started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-white px-4 py-5 space-y-4 shadow-dropdown animate-fade-in">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInOpen(true);
                }}
                className="w-full justify-center"
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenUpload();
                }}
                className="w-full justify-center"
              >
                Get started
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Sign In Early Access Modal */}
      <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 border border-brand-200 mb-2">
              <User className="h-5 w-5" />
            </div>
            <DialogTitle>Sign in to ResumeLens</DialogTitle>
            <DialogDescription>
              Enter your work email to access your saved resume reviews and job match histories.
            </DialogDescription>
          </DialogHeader>

          {!signInSubmitted ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" required>
                  Email address
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSignInOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Continue with Email
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 text-center space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-2">
                ✓
              </div>
              <p className="text-sm font-semibold text-foreground">
                Check your inbox
              </p>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                We sent a secure magic login link to <strong className="text-foreground">{signInEmail}</strong>.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
