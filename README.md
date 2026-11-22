# ResumeLens — AI-Powered Resume Feedback & Job-Match Analysis

> **A premium AI SaaS platform delivering explainable career intelligence, transparent job-fit scoring, and evidence-based resume enhancement without hallucinating candidate qualifications.**

---

## 1. Project Overview

**ResumeLens** is an intelligent career diagnostic and resume optimization platform built with Next.js 14, TypeScript, Tailwind CSS, and the Google Gemini API. Inspired by the refined design craft of Linear, Stripe, and Apple, ResumeLens replaces generic ATS keyword-stuffing templates with an authentic, evidence-backed evaluation system.

### The Core Problem
Most AI resume tools suffer from three critical defects:
1. **Opaque Black-Box Scores**: Arbitrary percentages with no breakdown of *why* a candidate was rated high or low.
2. **Harmful Hallucinations**: Fabricating unearned metrics, false job titles, or skills the candidate never practiced.
3. **Fragile Parsers**: Breaking on real multi-page PDFs or DOCX formatting.

### The ResumeLens Solution
ResumeLens implements **Explainable Career Intelligence**:
* **Real Document Parsing**: In-memory server-side extraction for PDF, DOCX, and plain text.
* **Mathematical Scoring Transparency**: Strict formula weighting (60% Hard Technical Skills, 25% Seniority & Architectural Scope, 15% ATS Clarity).
* **Anti-Fabrication Guarantee**: System prompt guardrails that enforce zero invention of unearned competencies. Missing skills are honestly categorized as bridge opportunities.
* **Google X-Y-Z Bullet Restructuring**: Transforming passive duty statements into quantified impact statements using truthful candidate context.

---

## 2. Key Features

| Feature | Description |
|---|---|
| **📄 Multi-Format Ingestion** | Upload `.pdf`, `.docx`, or `.txt` files up to 10MB, or paste resume text directly. |
| **🎯 Job Alignment Matching** | Cross-references extracted candidate competencies against target job requirements. |
| **🔍 Skill Gap Intelligence** | Automatically identifies verified matches, critical unaddressed gaps, and adjacent competencies. |
| **✍️ Evidence-Based Rewrites** | Generates before/after bullet enhancements using active ownership verbs and metric structures. |
| **📊 4-Tab Diagnostic Panel** | Complete interactive dashboard: **Overview**, **Skill Breakdown**, **Evidence-Based Rewrites**, and **Scoring Methodology**. |
| **🛡️ Ethical Truth Safeguards** | Explicit non-fabrication guarantee ensuring candidate career integrity is preserved. |
| **⚙️ Separated Prompt Modules** | Switchable prompt strategies (`v2-deep-audit` with mathematical weights vs `v1-standard`). |
| **🎨 Premium Design System** | Custom component library inspired by Linear and Stripe with accessible Radix UI primitives. |

---

## 3. Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server-Side API Routes)
* **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with `tailwindcss-animate`
* **UI Components**: Custom Radix UI primitives (`@radix-ui/react-*`), `lucide-react` icons
* **AI Integration**: [Google Gemini API](https://ai.google.dev/) via `@google/generative-ai`
* **Document Parsing**: `pdf-parse` (PDF extraction) and `mammoth` (DOCX extraction)
* **Class Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority` (CVA)

---

## 4. Project Structure

```
ResumeLens/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts         # Secure server-side API (multipart/form-data & JSON)
│   │   ├── design-system/
│   │   │   └── page.tsx             # Interactive Design System Workbench (/design-system)
│   │   ├── globals.css              # Custom tokens, warm off-white canvas & theme layers
│   │   ├── layout.tsx               # Root HTML layout with font declarations
│   │   └── page.tsx                 # SaaS Marketing Landing Page & Live Analysis Host (/)
│   ├── components/
│   │   ├── layout/                  # Shell components: container, footer, navbar, sidebar
│   │   ├── marketing/               # Landing page modules:
│   │   │   ├── hero-preview.tsx     # 4-Tab interactive diagnostic dashboard
│   │   │   ├── upload-modal.tsx     # Document uploader & live analysis modal
│   │   │   ├── product-showcase.tsx # Tabbed architectural feature showcase
│   │   │   ├── feature-grid.tsx     # 4-pillar capability grid
│   │   │   ├── how-it-works.tsx     # 3-step workflow
│   │   │   ├── trust-privacy.tsx    # Ethical principles & zero-fabrication pledge
│   │   │   └── cta-section.tsx      # High-conversion closing banner
│   │   └── ui/                      # 20 Radix UI atomic primitives (buttons, dialogs, tabs...)
│   └── lib/
│       ├── prompts/                 # Prompt Engineering Modules:
│       │   ├── types.ts             # Prompt configuration schema
│       │   ├── v1-standard.ts       # Rapid semantic alignment prompt
│       │   ├── v2-deep-audit.ts     # Deep architectural career audit prompt
│       │   └── index.ts             # Version registry and prompt selector
│       ├── types/
│       │   └── analysis.ts          # Strongly-typed data contracts & API schemas
│       ├── parser.ts                # PDF, DOCX, and TXT server-side document parser
│       ├── gemini.ts                # Secure Gemini API client (JSON mode, temp 0.2)
│       ├── heuristic-analyzer.ts    # Deterministic real analysis & taxonomy matcher
│       ├── analyzer.ts              # Unified analysis service facade
│       ├── tokens.ts                # TypeScript design token dictionary
│       └── utils.ts                 # cn() class merge helper
├── .env.example                     # Environment template without sensitive keys
├── tailwind.config.ts               # Custom color tokens, radii, keyframes, shadows
├── tsconfig.json                    # Strict TypeScript configuration
└── package.json                     # Project manifest and scripts
```

---

## 5. Installation & Setup

### Prerequisites
* **Node.js**: v18.17+ or v20+ recommended
* **npm**: v9+ or v10+

### Step 1: Clone or Navigate to the Repository
```bash
cd ResumeLens
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your **Google Gemini API Key** inside `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```
> **Security Note:** `GEMINI_API_KEY` is read strictly on the server by `src/app/api/analyze/route.ts`. It is never bundled into or transmitted to the client browser.

---

## 6. How to Run

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

### Code Quality & Linting
```bash
# Run ESLint validation
npm run lint

# Run TypeScript type check
npx tsc --noEmit
```

---

## 7. Application Routes

* **`/` (Main Landing Page & Live Diagnostic)**:
  Features the full marketing presentation plus the **live interactive diagnostic preview**. Uploading a resume via the *"Analyze my resume"* modal streams live results directly into the Hero Preview tabs.
* **`/design-system` (Component Workbench)**:
  Complete visual showcase documenting all 20 UI primitives, button variants, color tokens, typography scales, alert types, and modal dialogues.
* **`/api/analyze` (Secure Server Endpoint)**:
  `POST` endpoint accepting `multipart/form-data` or `application/json`. Performs text parsing, executes Gemini AI analysis, and returns structured JSON diagnostics.

---

## 8. Four-Tab Analysis Architecture

The core analysis result renders across four specialized diagnostic views:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Overview]  [Matching & Missing Skills]  [Recommendations]  [Methodology] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Match Index: 92/100  [Strong Alignment]                              │
│  Covered Skills: 14/16 (87.5%)  •  Identified Gaps: 2  •  ATS: 98%    │
│                                                                        │
│  Core Strengths                   Focus Gaps to Address               │
│  ✓ Distributed Systems Scale      ⚠ GraphQL Federation (preferred)     │
│  ✓ Frontend Design Systems        ⚠ Go microservices (preferred)      │
│                                                                        │
│  Evidence-Based Improvement:                                          │
│  Original: "Responsible for redesigning the frontend..."              │
│  Enhanced: "Architected modular React/Next.js design system..."        │
│                                                                        │
│  Transparent Methodology: 60% Skills + 25% Seniority + 15% ATS         │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Overview**: Executive alignment summary, top technical strengths, and prioritized focus gaps.
2. **Skill Breakdown**: Color-coded badges of verified matching skills (with resume context tooltips) alongside target job gaps with actionable bridge advice.
3. **Recommendations**: Side-by-side comparison of original candidate bullet points vs. enhanced high-impact suggestions utilizing the Google X-Y-Z formula.
4. **Methodology**: Mathematical scoring formula explanation, active prompt version, engine metadata, and ethical non-fabrication guarantee.

---

## 9. Academic Evaluation & Demonstration Guide

To evaluate the application for university submission grading:

1. **Verify Home Route**: Navigate to `http://localhost:3000` to review the production SaaS landing page and responsive layout.
2. **Verify Component System**: Navigate to `http://localhost:3000/design-system` to test all interactive UI primitives.
3. **Test One-Click Sample Analysis**:
   * Click **"Analyze my resume"** in the navigation or hero section.
   * Click **"Load Verified Sample Candidate"** and **"Load Sample Job"**.
   * Click **"Run Match Analysis"**.
   * Click **"Explore Full 4-Tab Diagnostic"** to inspect all four diagnostic tabs dynamically populated.
4. **Test Real Document Upload**:
   * Drag and drop any real `.pdf`, `.docx`, or `.txt` resume into the dropzone.
   * Provide custom target role requirements.
   * Execute analysis to inspect extracted competencies and evidence-based rewrites.
5. **Verify Configuration Error Handling**:
   * If `GEMINI_API_KEY` is omitted, the API cleanly returns HTTP 503 with actionable setup guidance without crashing.

---

## 10. License

Developed for academic submission and demonstration. All rights reserved.
