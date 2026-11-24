"use client";

import * as React from "react";
import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ClipboardPaste,
  ShieldAlert,
  Loader2,
  FileCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalysisResult } from "@/lib/types/analysis";

export interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

const SAMPLE_RESUME_TEXT = `Alex Mercer
Lead Distributed Systems Architect
San Francisco, CA • alex.mercer@example.com • github.com/alexmercer

PROFESSIONAL SUMMARY
Senior Systems Architect with 8+ years designing high-throughput distributed architectures, microservices, and design systems. Track record scaling mission-critical platforms to 2M+ daily active requests across multi-region clusters.

EXPERIENCE
Lead Infrastructure Architect | CloudScale Inc. | 2021 - Present
- Responsible for redesigning the frontend application and improving performance for customers.
- Scaled distributed Redis caching cluster handling 2.5M requests/sec across multi-region AWS deployments.
- Mentored 12 senior engineers on Kubernetes container orchestration and CI/CD automation pipelines.
- Implemented real-time telemetry reducing Mean Time to Resolution (MTTR) by 35%.

Senior Full Stack Engineer | DataPulse Systems | 2018 - 2021
- Worked on microservices migration from monolithic Ruby on Rails backend to TypeScript and Go.
- Optimized PostgreSQL database queries, reducing p99 latency from 450ms to 85ms across core API endpoints.
- Designed reusable design system component library adopted across 6 cross-functional engineering pods.

EDUCATION
B.S. in Computer Science | University of California, Berkeley

CORE SKILLS
TypeScript, React, Next.js, Node.js, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS, System Architecture, CI/CD, Design Systems`;

const SAMPLE_JOB_DESCRIPTION = `Senior Staff Distributed Systems Engineer @ Modern SaaS
We are looking for a Senior Staff Systems Engineer to lead our Core Infrastructure and Real-Time Data Pipeline team.

Key Responsibilities & Requirements:
- Lead the architecture and implementation of highly scalable distributed microservices handling billions of events daily.
- Deep expertise in TypeScript, Go (Golang), and Node.js microservices.
- Production experience with PostgreSQL, Redis, and Kafka event streaming pipelines.
- Proficiency in Kubernetes, Docker, and AWS cloud infrastructure.
- Experience with GraphQL Federation (Apollo Router) for unified schema delivery.
- Track record of team mentorship, architectural ownership, and driving technical standards.
- Strong knowledge of CI/CD automation, testing paradigms, and low-latency API design.`;

export function UploadModal({ open, onOpenChange, onAnalysisComplete }: UploadModalProps) {
  // Input mode: "file" vs "paste"
  const [inputMode, setInputMode] = React.useState<"file" | "paste">("file");

  // Form State
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [pastedResumeText, setPastedResumeText] = React.useState("");
  const [targetRole, setTargetRole] = React.useState("Senior Staff Distributed Systems Engineer");
  const [jobDescription, setJobDescription] = React.useState(SAMPLE_JOB_DESCRIPTION);
  const [promptVersion, setPromptVersion] = React.useState("v2-deep-audit");

  // Execution State
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanStep, setScanStep] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [errorDetails, setErrorDetails] = React.useState<string | null>(null);
  const [errorType, setErrorType] = React.useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = React.useState<AnalysisResult | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMessage(null);
      setErrorDetails(null);
      setErrorType(null);
    }
  };

  const handleSelectSampleFile = () => {
    // Create a real text file object representing the sample candidate
    const blob = new Blob([SAMPLE_RESUME_TEXT], { type: "text/plain" });
    const file = new File([blob], "Alex_Mercer_Lead_Architect_Resume.txt", { type: "text/plain" });
    setSelectedFile(file);
    setErrorMessage(null);
    setErrorDetails(null);
    setErrorType(null);
  };

  const handleInsertSampleText = () => {
    setPastedResumeText(SAMPLE_RESUME_TEXT);
    setErrorMessage(null);
    setErrorDetails(null);
    setErrorType(null);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPastedResumeText("");
    setAnalysisResult(null);
    setIsScanning(false);
    setErrorMessage(null);
    setErrorDetails(null);
    setErrorType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    setErrorMessage(null);
    setErrorDetails(null);
    setErrorType(null);

    const initialStep =
      inputMode === "file" && selectedFile
        ? `Extracting text from "${selectedFile.name}"...`
        : "Sending resume text to Gemini AI...";
    setScanStep(initialStep);

    try {
      let response: Response;

      try {
        if (inputMode === "file" && selectedFile) {
          setScanStep("Uploading document to secure server parser...");
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("jobDescription", jobDescription);
          formData.append("targetRole", targetRole);
          formData.append("promptVersion", promptVersion);

          response = await fetch("/api/analyze", {
            method: "POST",
            body: formData,
          });
        } else {
          setScanStep("Sending resume text to Gemini AI analysis engine...");
          response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resumeText: pastedResumeText,
              jobDescription,
              targetRole,
              promptVersion,
            }),
          });
        }
      } catch (fetchErr: unknown) {
        // Genuine network transport failure (e.g. client offline, connection dropped)
        const error = fetchErr as Error;
        setIsScanning(false);
        setErrorType("NETWORK_ERROR");
        setErrorMessage(
          "Unable to reach the analysis server. Please check your internet connection and try again."
        );
        setErrorDetails(error.message);
        return;
      }

      setScanStep("Evaluating skills, alignment, and evidence with Gemini AI...");

      // Safely parse response body — handle both JSON and non-JSON (e.g. Vercel 504/413/500 HTML)
      let payload: any = null;
      let rawText = "";

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          payload = await response.json();
        } catch {
          payload = null;
        }
      } else {
        try {
          rawText = await response.text();
          // Attempt JSON parse in case Content-Type header was omitted
          payload = JSON.parse(rawText);
        } catch {
          payload = null;
        }
      }

      if (!response.ok) {
        setIsScanning(false);

        // If the server returned a structured JSON error response
        if (payload && (payload.error || payload.message)) {
          setErrorType(payload.error || "ANALYSIS_FAILED");

          if (payload.error === "GEMINI_API_KEY_MISSING") {
            setErrorMessage(
              "Gemini API key is not configured in the server environment."
            );
            setErrorDetails(
              payload.instructions ||
                "In Vercel: Go to Project Dashboard > Settings > Environment Variables. Add GEMINI_API_KEY with your Google AI Studio API key, ensure 'Production' is checked, then Redeploy."
            );
          } else if (payload.error === "AI_SERVICE_OVERLOADED") {
            setErrorMessage(
              payload.message ||
                "Google Gemini AI is currently experiencing high demand. Automatic retries were attempted, but the service is temporarily busy. Your inputs are preserved — please click 'Try Again Now'."
            );
            setErrorDetails(null);
          } else if (payload.error === "RATE_LIMIT_EXCEEDED") {
            setErrorMessage(
              payload.message ||
                "Gemini API rate limit reached. Your inputs are preserved. Please wait a moment and click 'Try Again Now'."
            );
            setErrorDetails(null);
          } else if (payload.error === "GEMINI_AUTH_FAILED") {
            setErrorMessage(
              "Gemini API authentication failed. The configured GEMINI_API_KEY is invalid or revoked."
            );
            setErrorDetails(
              payload.instructions ||
                "Verify your key at https://aistudio.google.com and update GEMINI_API_KEY in Vercel Environment Variables."
            );
          } else {
            setErrorMessage(payload.message || "Failed to analyze resume.");
            setErrorDetails(payload.details || payload.error || null);
          }
          return;
        }

        // If the server returned a non-JSON status code (e.g. Vercel 504 Gateway Timeout, 413, 502)
        if (response.status === 504) {
          setErrorType("AI_SERVICE_OVERLOADED");
          setErrorMessage(
            "The analysis request timed out on the server (Vercel 504 Gateway Timeout). The AI model took longer to respond than the serverless execution limit. Your resume and job inputs are preserved — please click 'Try Again Now'."
          );
          setErrorDetails("Serverless execution timeout (504). Click Try Again Now to re-run.");
        } else if (response.status === 413) {
          setErrorType("PAYLOAD_TOO_LARGE");
          setErrorMessage(
            "The uploaded file exceeds the deployment upload limit (4.5MB). Please upload a smaller document or paste your resume text directly."
          );
          setErrorDetails("HTTP 413 Request Entity Too Large");
        } else if (response.status === 502 || response.status === 503) {
          setErrorType("AI_SERVICE_OVERLOADED");
          setErrorMessage(
            `The analysis server is temporarily unavailable (HTTP ${response.status}). Your inputs have been preserved. Please try again in a few moments.`
          );
          setErrorDetails(rawText ? rawText.slice(0, 150) : null);
        } else {
          setErrorType("SERVER_ERROR");
          setErrorMessage(
            `The analysis server returned an error (HTTP ${response.status}). Your inputs have been preserved. Please try again.`
          );
          setErrorDetails(rawText ? rawText.slice(0, 200) : "No error details returned by server.");
        }
        return;
      }

      // Success
      if (!payload || !payload.data) {
        setIsScanning(false);
        setErrorType("INVALID_RESPONSE");
        setErrorMessage("Received an unexpected data format from the analysis server. Please try again.");
        return;
      }

      const result: AnalysisResult = payload.data;
      setAnalysisResult(result);
      setIsScanning(false);

      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setIsScanning(false);
      setErrorType("UNEXPECTED_ERROR");
      setErrorMessage(
        "An unexpected error occurred during analysis. Your inputs have been preserved. Please try again."
      );
      setErrorDetails(error.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // Preserve user inputs if they dismiss or toggle the modal
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm">
              ResumeLens AI Engine
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              Server-Side Gemini API
            </span>
          </div>
          <DialogTitle className="text-xl">
            {analysisResult ? "Analysis Complete" : "Analyze Your Resume"}
          </DialogTitle>
          <DialogDescription>
            {analysisResult
              ? "Your real AI analysis is ready. Review the score breakdown below or open the full 4-tab dashboard."
              : "Upload a PDF/DOCX resume or paste your text to run live job-match analysis."}
          </DialogDescription>
        </DialogHeader>

        {/* Configuration / Overload Error Alert */}
        {errorMessage && (
          <Alert variant={errorType === "AI_SERVICE_OVERLOADED" ? "warning" : "destructive"} className="my-2">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle className="font-semibold flex items-center justify-between">
              <span>
                {errorType === "AI_SERVICE_OVERLOADED"
                  ? "AI Service Temporarily Busy"
                  : errorType === "RATE_LIMIT_EXCEEDED"
                  ? "Rate Limit Notice"
                  : errorType === "GEMINI_API_KEY_MISSING"
                  ? "Configuration Notice"
                  : "Analysis Notice"}
              </span>
              <span className="text-[10px] font-mono font-normal text-muted-foreground">
                Inputs Preserved
              </span>
            </AlertTitle>
            <AlertDescription className="text-xs space-y-2 mt-1">
              <p>{errorMessage}</p>
              {errorDetails && (
                <div className="p-2 bg-destructive-muted/80 rounded border border-destructive-border font-mono text-[11px] text-destructive-foreground">
                  {errorDetails}
                </div>
              )}
              {errorType === "AI_SERVICE_OVERLOADED" && (
                <div className="pt-1 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleRunScan}
                    disabled={isScanning}
                    leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                  >
                    Try Again Now
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {!analysisResult ? (
          <div className="space-y-4 py-1">
            {/* Target Job Role */}
            <div className="space-y-1.5">
              <Label htmlFor="modal-target-role" required>
                Target Job Role / Title
              </Label>
              <Input
                id="modal-target-role"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Staff Distributed Systems Engineer"
                disabled={isScanning}
              />
            </div>

            {/* Target Job Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="modal-job-description" required>
                  Target Job Description & Requirements
                </Label>
                <button
                  type="button"
                  onClick={() => setJobDescription(SAMPLE_JOB_DESCRIPTION)}
                  className="text-xs text-brand-600 hover:text-brand-700 underline font-medium"
                  disabled={isScanning}
                >
                  Load Sample Job
                </button>
              </div>
              <Textarea
                id="modal-job-description"
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description or requirements here (min 30 characters)..."
                disabled={isScanning}
                className="text-xs"
              />
            </div>

            {/* Resume Input Mode Tabs */}
            <div className="space-y-2">
              <Label required>Resume Input Method</Label>
              <Tabs
                value={inputMode}
                onValueChange={(val) => setInputMode(val as "file" | "paste")}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2 bg-surface-subtle">
                  <TabsTrigger value="file" disabled={isScanning}>
                    <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload File (PDF / DOCX)
                  </TabsTrigger>
                  <TabsTrigger value="paste" disabled={isScanning}>
                    <ClipboardPaste className="h-3.5 w-3.5 mr-1.5" /> Paste Resume Text
                  </TabsTrigger>
                </TabsList>

                {/* Tab: File Upload */}
                <TabsContent value="file" className="space-y-2 pt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload-input"
                    disabled={isScanning}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      selectedFile
                        ? "border-brand-500 bg-brand-50/30"
                        : "border-border hover:border-brand-300 bg-surface-subtle/50"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-brand-100 text-brand-700 rounded-lg">
                          <FileCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">
                            {(selectedFile.size / 1024).toFixed(1)} KB • Ready for extraction
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="text-xs text-muted-foreground hover:text-foreground"
                          disabled={isScanning}
                        >
                          Choose a different file
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-white border border-border shadow-subtle rounded-lg text-muted-foreground">
                          <Upload className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Click to browse or drag and drop your resume
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Supports PDF, DOCX, and TXT up to 10MB
                          </p>
                        </div>
                        <div className="pt-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectSampleFile();
                            }}
                            disabled={isScanning}
                          >
                            Load Verified Sample Candidate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Tab: Paste Text */}
                <TabsContent value="paste" className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Paste raw resume text below:</span>
                    <button
                      type="button"
                      onClick={handleInsertSampleText}
                      className="text-brand-600 hover:text-brand-700 underline font-medium"
                      disabled={isScanning}
                    >
                      Insert Sample Resume Text
                    </button>
                  </div>
                  <Textarea
                    rows={6}
                    value={pastedResumeText}
                    onChange={(e) => setPastedResumeText(e.target.value)}
                    placeholder="Paste candidate work history, education, and skills here..."
                    disabled={isScanning}
                    className="font-mono text-xs"
                  />
                  <div className="text-right text-[11px] text-muted-foreground">
                    {pastedResumeText ? `${pastedResumeText.split(/\s+/).filter(Boolean).length} words` : "0 words"}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Prompt Version Selector */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-subtle/70 border border-border text-xs">
              <div>
                <span className="font-semibold text-foreground block">Analysis Prompt Strategy:</span>
                <span className="text-muted-foreground">
                  {promptVersion === "v2-deep-audit"
                    ? "v2-deep-audit: Mathematical scoring (60% hard skills, 25% seniority, 15% ATS)"
                    : "v1-standard: Rapid semantic matching & core gaps"}
                </span>
              </div>
              <select
                value={promptVersion}
                onChange={(e) => setPromptVersion(e.target.value)}
                disabled={isScanning}
                aria-label="Analysis Prompt Strategy"
                className="bg-white border border-border rounded-md px-2 py-1 text-xs font-mono text-foreground focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="v2-deep-audit">v2-deep-audit</option>
                <option value="v1-standard">v1-standard</option>
              </select>
            </div>

            {/* Privacy notice */}
            <p className="text-[11px] text-muted-foreground leading-normal bg-white p-2.5 rounded-lg border border-border/80">
              <strong className="text-foreground font-medium">Zero-Fabrication Privacy Notice:</strong>{" "}
              Documents are processed server-side in-memory. ResumeLens strictly preserves candidate truthful experience and will never invent skills or claims.
            </p>
          </div>
        ) : (
          /* Scan Results Screen */
          <div className="space-y-4 py-2">
            <div className="p-5 rounded-xl bg-white border border-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-mono">
                    Match Assessment
                  </span>
                  <h4 className="text-lg font-bold text-foreground">
                    {analysisResult.targetRole}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-600 font-mono leading-none">
                    {analysisResult.scores.overall}%
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    {analysisResult.scores.overall >= 80 ? "Strong Alignment" : "Match Computed"}
                  </span>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/70 text-center">
                <div className="p-2 rounded bg-surface-subtle">
                  <span className="text-[10px] text-muted-foreground block uppercase font-mono">Hard Skills</span>
                  <span className="text-sm font-bold text-foreground font-mono">{analysisResult.scores.hardSkills}%</span>
                </div>
                <div className="p-2 rounded bg-surface-subtle">
                  <span className="text-[10px] text-muted-foreground block uppercase font-mono">Seniority</span>
                  <span className="text-sm font-bold text-foreground font-mono">{analysisResult.scores.experienceAlignment}%</span>
                </div>
                <div className="p-2 rounded bg-surface-subtle">
                  <span className="text-[10px] text-muted-foreground block uppercase font-mono">ATS Clarity</span>
                  <span className="text-sm font-bold text-foreground font-mono">{analysisResult.scores.formattingClarity}%</span>
                </div>
              </div>

              {/* Skills summary */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Verified Skills ({analysisResult.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.matchedSkills.slice(0, 6).map((s) => (
                      <Badge key={s.name} variant="success" size="sm">
                        {s.name}
                      </Badge>
                    ))}
                    {analysisResult.matchedSkills.length > 6 && (
                      <span className="text-[10px] text-muted-foreground self-center">
                        +{analysisResult.matchedSkills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                    Skill Gaps Identified ({analysisResult.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {analysisResult.missingSkills.slice(0, 4).map((g) => (
                      <Badge key={g.name} variant="warning" size="sm">
                        {g.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Bullet Recommendation */}
            {analysisResult.bulletImprovements.length > 0 && (
              <Alert variant="brand">
                <AlertTitle className="text-xs uppercase font-mono tracking-wide">
                  Priority Bullet Improvement
                </AlertTitle>
                <AlertDescription className="text-xs space-y-1 mt-1">
                  <p className="italic text-muted-foreground">&quot;{analysisResult.bulletImprovements[0].original}&quot;</p>
                  <p className="text-foreground font-medium">↳ &quot;{analysisResult.bulletImprovements[0].improved}&quot;</p>
                </AlertDescription>
              </Alert>
            )}

            {/* Engine badge */}
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>
                Engine: <strong className="text-foreground font-mono">{analysisResult.engine}</strong>
              </span>
              <span>
                Prompt: <strong className="text-foreground font-mono">{analysisResult.promptVersion}</strong>
              </span>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {!analysisResult ? (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isScanning}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRunScan}
                disabled={
                  isScanning ||
                  (inputMode === "file" && !selectedFile) ||
                  (inputMode === "paste" && pastedResumeText.trim().length < 50) ||
                  jobDescription.trim().length < 30
                }
                isLoading={isScanning}
                leftIcon={errorMessage ? <RefreshCw className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              >
                {isScanning ? (scanStep || "Analyzing...") : errorMessage ? "Retry Analysis" : "Run Match Analysis"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
              >
                Scan Another Document
              </Button>
              <Button
                variant="primary"
                onClick={() => onOpenChange(false)}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Full 4-Tab Diagnostic
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
