"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Briefcase,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  Layers,
  Palette,
  Type,
  MousePointerClick,
  LayoutGrid,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

export default function DesignSystemShowcasePage() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [switchState, setSwitchState] = React.useState(true);
  const [checkboxState, setCheckboxState] = React.useState(true);
  const [loadingDemo, setLoadingDemo] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const handleSimulateAction = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-brand-100 selection:text-brand-900">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="border-b border-border bg-white/50 backdrop-blur-sm">
          <Container size="xl" className="py-12 sm:py-16">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  ← Return to Landing Page
                </Link>
                <Badge variant="brand" dot size="md">
                  ResumeLens Design System
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  v1.0.0 Foundation
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Minimal. Elegant. Built for executive-grade AI products.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                A design language inspired by Linear, Stripe, and Apple. Featuring
                warm off-white surfaces, crisp typography, soft indigo accents,
                and high-precision interactive states.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handleSimulateAction}
                  isLoading={loadingDemo}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Interactive Component Demo
                </Button>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" leftIcon={<Sparkles className="h-4 w-4 text-brand-500" />}>
                      Test Modal Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Analyze Resume with AI</DialogTitle>
                      <DialogDescription>
                        Upload your candidate resume or paste the content below to benchmark
                        against ATS algorithms and target job descriptions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="resume-title" required>
                          Target Job Role
                        </Label>
                        <Input
                          id="resume-title"
                          placeholder="e.g. Senior Staff Product Designer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="job-desc">Job Description / Keywords</Label>
                        <Textarea
                          id="job-desc"
                          placeholder="Paste the key responsibilities and requirements..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setDialogOpen(false)}
                        leftIcon={<Sparkles className="h-4 w-4" />}
                      >
                        Run ATS Scan
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Container>
        </div>

        <Container size="xl" className="pt-12 space-y-16">
          {/* Section 1: Color Tokens */}
          <section id="colors" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  1. Color Tokens & Visual Identity
                </h2>
                <p className="text-sm text-muted-foreground">
                  Warm off-white base, near-black typography, soft indigo primary accent, and calibrated status hues.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                {
                  label: "Background",
                  hex: "#FAFAF8",
                  desc: "Warm off-white canvas",
                  bgClass: "bg-[#FAFAF8] border-border text-foreground",
                  border: true,
                },
                {
                  label: "Surface",
                  hex: "#FFFFFF",
                  desc: "Card & modal surfaces",
                  bgClass: "bg-white border-border text-foreground",
                  border: true,
                },
                {
                  label: "Typography",
                  hex: "#171717",
                  desc: "Near-black primary text",
                  bgClass: "bg-[#171717] text-white",
                },
                {
                  label: "Muted Text",
                  hex: "#737373",
                  desc: "Secondary typography",
                  bgClass: "bg-[#737373] text-white",
                },
                {
                  label: "Soft Indigo",
                  hex: "#7666E8",
                  desc: "Primary brand accent",
                  bgClass: "bg-[#7666E8] text-white",
                },
                {
                  label: "Success Green",
                  hex: "#16A34A",
                  desc: "Subtle success state",
                  bgClass: "bg-[#16A34A] text-white",
                },
              ].map((color) => (
                <button
                  key={color.label}
                  type="button"
                  onClick={() => copyToClipboard(color.hex, color.label)}
                  className="group relative flex flex-col p-3 rounded-xl border border-border bg-white text-left shadow-subtle hover:border-brand-300 transition-all cursor-pointer"
                >
                  <div
                    className={`h-12 w-full rounded-lg mb-3 flex items-end justify-end p-1.5 ${color.bgClass} ${
                      color.border ? "border" : ""
                    }`}
                  >
                    {copiedToken === color.label ? (
                      <span className="flex items-center gap-1 text-[10px] bg-white/90 text-foreground px-1.5 py-0.5 rounded shadow-subtle font-medium">
                        <Check className="h-3 w-3 text-emerald-600" /> Copied
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {color.label}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {color.hex}
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 mt-1 line-clamp-1">
                    {color.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Indigo Scale */}
            <div className="p-4 rounded-xl border border-border bg-white space-y-3">
              <span className="text-xs font-medium text-foreground">
                Brand Indigo Scale (50 - 900)
              </span>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center">
                {[
                  { step: "50", hex: "#F6F5FE", bg: "bg-brand-50 text-brand-900 border border-brand-200" },
                  { step: "100", hex: "#ECE9FD", bg: "bg-brand-100 text-brand-900" },
                  { step: "200", hex: "#DDD7FC", bg: "bg-brand-200 text-brand-900" },
                  { step: "300", hex: "#BFB3F8", bg: "bg-brand-300 text-brand-900" },
                  { step: "400", hex: "#9885F3", bg: "bg-brand-400 text-white" },
                  { step: "500", hex: "#7666E8", bg: "bg-brand-500 text-white font-bold ring-2 ring-brand-500 ring-offset-1" },
                  { step: "600", hex: "#6350DC", bg: "bg-brand-600 text-white" },
                  { step: "700", hex: "#503EC5", bg: "bg-brand-700 text-white" },
                  { step: "800", hex: "#4132A3", bg: "bg-brand-800 text-white" },
                  { step: "900", hex: "#362B83", bg: "bg-brand-900 text-white" },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-2 rounded-lg text-[11px] font-mono ${item.bg}`}
                  >
                    <div>{item.step}</div>
                    <div className="text-[9px] opacity-80">{item.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Typography */}
          <section id="typography" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-surface-subtle text-foreground border border-border">
                <Type className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  2. Typography Scale & Hierarchy
                </h2>
                <p className="text-sm text-muted-foreground">
                  Clean Inter / Geist typography with refined tracking and optical heights.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white divide-y divide-border/60">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Display — 48px / -0.035em tracking
                  </span>
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    Executive AI Intelligence
                  </p>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Heading 1 — 32px / -0.025em tracking
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    Candidate Resume Architecture
                  </h1>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Heading 2 — 24px / -0.02em tracking
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">
                    ATS Keyword Density Analysis
                  </h2>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Body Large & Regular — 16px / 14px
                  </span>
                  <p className="text-base text-foreground leading-relaxed max-w-2xl">
                    ResumeLens evaluates professional documents against industry benchmarks,
                    detecting formatting pitfalls and quantifying impact verbs.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    Secondary body copy uses our muted gray token (#737373) to establish
                    effortless visual hierarchy without clutter.
                  </p>
                </div>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Monospace / Numerical Data
                  </span>
                  <p className="font-mono text-sm text-foreground">
                    SCORE: 98.4% | MATCH_INDEX: 0.942 | RUN_ID: #RL-8942
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Button System */}
          <section id="buttons" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <MousePointerClick className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  3. Button Variants & Interactive States
                </h2>
                <p className="text-sm text-muted-foreground">
                  Standardized sizes, accessible focus rings, loading spinners, and micro-press scales.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 space-y-6">
              {/* Variants */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Button Variants
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Indigo</Button>
                  <Button variant="secondary">Secondary Surface</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="success">Success Action</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Variant</Button>
                </div>
              </div>

              <Separator />

              {/* Sizes */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Button Sizes
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small (32px)</Button>
                  <Button size="md">Medium (36px)</Button>
                  <Button size="lg">Large (44px)</Button>
                  <Button size="icon" aria-label="Icon button">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  <Button size="icon-sm" variant="outline" aria-label="Small icon button">
                    <Filter className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Functional States */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Functional States
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button isLoading>Processing Scan</Button>
                  <Button disabled>Disabled State</Button>
                  <Button leftIcon={<Upload className="h-3.5 w-3.5" />}>
                    With Left Icon
                  </Button>
                  <Button rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    With Right Icon
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Input & Form Controls */}
          <section id="forms" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-surface-subtle text-foreground border border-border">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  4. Input and Form Controls
                </h2>
                <p className="text-sm text-muted-foreground">
                  Carefully proportioned fields, accessible focus halos, prefix slots, and validation states.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Input with Icon */}
              <div className="space-y-2">
                <Label htmlFor="search-input" required>
                  Candidate Name or Job ID
                </Label>
                <Input
                  id="search-input"
                  placeholder="e.g. Sarah Jenkins (Lead Architect)"
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <p className="text-xs text-muted-foreground">
                  Search across analyzed candidate files.
                </p>
              </div>

              {/* Select Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="experience-level">Experience Benchmark</Label>
                <Select defaultValue="senior">
                  <SelectTrigger id="experience-level">
                    <SelectValue placeholder="Select experience tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior / Lead (6-10 years)</SelectItem>
                    <SelectItem value="executive">Staff & VP (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select role complexity for calibrated ATS scoring.
                </p>
              </div>

              {/* Error State Input */}
              <div className="space-y-2">
                <Label htmlFor="error-input" className="text-destructive">
                  File Upload Path (Error State Demo)
                </Label>
                <Input
                  id="error-input"
                  defaultValue="invalid_file_format.exe"
                  error
                />
                <p className="text-xs text-destructive font-medium">
                  Unsupported format. Please upload PDF or DOCX files under 10MB.
                </p>
              </div>

              {/* Switch and Checkbox Controls */}
              <div className="space-y-4 pt-1">
                <Label>Toggle & Selection Settings</Label>
                <div className="space-y-3 p-3.5 rounded-lg border border-border bg-surface-subtle/50">
                  <Switch
                    label="AI Real-Time Optimization"
                    description="Automatically highlight passive voice and weak metrics"
                    checked={switchState}
                    onCheckedChange={setSwitchState}
                  />
                  <Separator />
                  <Checkbox
                    id="ats-formatting"
                    label="Strict ATS Parser Mode"
                    description="Flags non-standard headers, two-column layouts, and graphics"
                    checked={checkboxState}
                    onChange={(e) => setCheckboxState(e.target.checked)}
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="executive-summary">Executive Summary Notes</Label>
                <Textarea
                  id="executive-summary"
                  placeholder="Write or paste the career summary to examine bullet impact..."
                  defaultValue="Led distributed design systems engineering team across 4 time zones. Boosted delivery velocity by 34%."
                />
              </div>
            </div>
          </section>

          {/* Section 5: Card Components */}
          <section id="cards" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  5. Card Components & Metric Tiles
                </h2>
                <p className="text-sm text-muted-foreground">
                  Subtle 1px borders, gentle card shadows, and optional hover elevation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric Card 1 */}
              <Card interactive>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      ATS Compatibility
                    </span>
                    <Badge variant="success" dot size="sm">
                      Passed
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold mt-1">96%</CardTitle>
                  <CardDescription>
                    Top tier parseability across Workday, Greenhouse & Lever.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    No unparseable glyphs or tables found
                  </div>
                </CardContent>
              </Card>

              {/* Metric Card 2 */}
              <Card interactive>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Keyword Match Rate
                    </span>
                    <Badge variant="brand" size="sm">
                      84/100
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold mt-1">84%</CardTitle>
                  <CardDescription>
                    Aligned with target position: Staff Frontend Architect.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-brand-600 font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    12 high-priority keywords matched
                  </div>
                </CardContent>
              </Card>

              {/* Metric Card 3 */}
              <Card interactive>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Action Verb Strength
                    </span>
                    <Badge variant="warning" size="sm">
                      Needs Polish
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold mt-1">71%</CardTitle>
                  <CardDescription>
                    3 bullet points use passive phrases (&apos;responsible for&apos;).
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Suggested: replace with quantified achievements
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 6: Navigation, Tabs & Dropdowns */}
          <section id="navigation" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-surface-subtle text-foreground border border-border">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  6. Navigation Styles, Tabs & Dropdowns
                </h2>
                <p className="text-sm text-muted-foreground">
                  Clean segment tabs, accessible dropdowns with shortcuts, and contextual actions.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 space-y-6">
              {/* Tabs Demo */}
              <Tabs defaultValue="all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <TabsList>
                    <TabsTrigger value="all">All Resumes (12)</TabsTrigger>
                    <TabsTrigger value="optimized">Optimized (9)</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts (3)</TabsTrigger>
                  </TabsList>

                  {/* Dropdown Action Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" rightIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}>
                        Filter & Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Sort Resumes</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Check className="h-4 w-4 mr-2 text-brand-600" />
                        Highest ATS Score
                      </DropdownMenuItem>
                      <DropdownMenuItem>Recently Modified</DropdownMenuItem>
                      <DropdownMenuItem>Candidate Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive>Reset Filters</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <TabsContent value="all" className="pt-4">
                  <div className="p-4 rounded-lg border border-border bg-surface-subtle/50 text-sm text-foreground flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded border border-border">
                        <FileCheck className="h-4 w-4 text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Senior_Staff_Designer_Resume_2026.pdf</p>
                        <p className="text-xs text-muted-foreground">
                          Updated 2 hours ago • ATS Score 96%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="brand">Active</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="optimized" className="pt-4">
                  <div className="p-4 rounded-lg border border-border bg-surface-subtle/50 text-sm text-muted-foreground">
                    Showing 9 ATS-optimized documents.
                  </div>
                </TabsContent>

                <TabsContent value="drafts" className="pt-4">
                  <div className="p-4 rounded-lg border border-border bg-surface-subtle/50 text-sm text-muted-foreground">
                    3 drafts awaiting target job description linkage.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Section 7: Feedback, Loading, Empty & Error States */}
          <section id="states" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 border border-brand-200">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  7. Loading, Empty and Error States
                </h2>
                <p className="text-sm text-muted-foreground">
                  Calibrated feedback patterns ensuring clarity during async transitions and edge cases.
                </p>
              </div>
            </div>

            {/* Alert Banners */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                System Alert Banners
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert variant="brand">
                  <AlertTitle>AI Recommendation Engine</AlertTitle>
                  <AlertDescription>
                    Adding 2 metrics to your experience section increases recruiter callback probability by 41%.
                  </AlertDescription>
                </Alert>

                <Alert variant="success">
                  <AlertTitle>ATS Benchmark Validated</AlertTitle>
                  <AlertDescription>
                    Resume successfully verified against modern applicant tracking standard parsers.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertTitle>Missing Job Keywords</AlertTitle>
                  <AlertDescription>
                    We found 4 missing skills required by the target job description: GraphQL, Kubernetes.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertTitle>Formatting Parse Error</AlertTitle>
                  <AlertDescription>
                    Complex multi-column tables detected on page 2. Convert to standard bullet lists.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            {/* Skeleton & Empty States */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Shimmer Skeleton Demo */}
              <div className="rounded-xl border border-border bg-white p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Skeleton Loading State
                  </span>
                  <Spinner size="sm" variant="brand" />
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>

              {/* Empty State */}
              <EmptyState
                icon={Briefcase}
                title="No target job linked yet"
                description="Link a job description URL or paste requirements to benchmark this resume against role expectations."
                action={
                  <Button variant="primary" size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
                    Link Job Posting
                  </Button>
                }
              />
            </div>

            {/* Dedicated Error State Component */}
            <div className="pt-2">
              <ErrorState
                title="AI Analysis Service Timeout"
                message="The language model took longer than anticipated to scan this 18-page document. Please retry or truncate references."
                code="ERR_AI_TIMEOUT_504"
                onRetry={async () => {
                  await new Promise((r) => setTimeout(r, 1200));
                }}
              />
            </div>
          </section>

          {/* Section 8: Badges & System Pill Indicators */}
          <section id="badges" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-surface-subtle text-foreground border border-border">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  8. Status Indicators & Badges
                </h2>
                <p className="text-sm text-muted-foreground">
                  Semantically colored badges with optional pulse and dot indicators.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="brand" dot>
                  Brand Accent
                </Badge>
                <Badge variant="neutral" dot>
                  Neutral Muted
                </Badge>
                <Badge variant="success" dot>
                  98% ATS Pass
                </Badge>
                <Badge variant="warning" dot>
                  Revision Recommended
                </Badge>
                <Badge variant="destructive" dot>
                  3 Critical Flaws
                </Badge>
                <Badge variant="outline">
                  Outline Neutral
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge size="sm" variant="brand">
                  Small Tag
                </Badge>
                <Badge size="md" variant="brand">
                  Medium Tag
                </Badge>
                <Badge size="lg" variant="brand">
                  Large Tag
                </Badge>
              </div>
            </div>
          </section>
        </Container>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
