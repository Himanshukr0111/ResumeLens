import * as fs from "fs";
import * as path from "path";

// Manually parse .env.local to ensure environment variables are populated for the test
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const k = trimmed.slice(0, eqIdx).trim();
        const v = trimmed.slice(eqIdx + 1).trim();
        if (k && !process.env[k]) {
          process.env[k] = v;
        }
      }
    }
  }
}

import { POST } from "../src/app/api/analyze/route";
import { NextRequest } from "next/server";

async function testLiveGemini() {
  console.log("=== TESTING LIVE GEMINI API INTEGRATION ===");

  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === "" || key === "your_gemini_api_key_here") {
    console.error("❌ GEMINI_API_KEY is not populated or still contains placeholder.");
    process.exit(1);
  }

  // Safe verification without exposing the key
  console.log(`✓ GEMINI_API_KEY detected (Length: ${key.length} characters, Prefix: ${key.slice(0, 4)}...)`);
  console.log(`✓ Configured model: ${process.env.GEMINI_MODEL || "gemini-1.5-flash"}`);

  const sampleResume = `
Alex Mercer
Lead Distributed Systems Architect
San Francisco, CA • alex@example.com

SUMMARY
Systems Architect with 8+ years designing high-throughput distributed microservices, Redis caching layers, and Kubernetes infrastructure.

EXPERIENCE
Lead Infrastructure Architect | CloudScale Inc. | 2021 - Present
- Responsible for redesigning the frontend application and improving performance for customers.
- Scaled distributed Redis caching cluster handling 2.5M requests/sec across multi-region AWS deployments.
- Mentored 12 senior engineers on Kubernetes container orchestration and CI/CD automation pipelines.

Senior Full Stack Engineer | DataPulse | 2018 - 2021
- Worked on microservices migration from monolithic Ruby on Rails backend to TypeScript and Go.
- Optimized PostgreSQL database queries, reducing p99 latency from 450ms to 85ms across core API endpoints.
- Designed reusable design system component library adopted across 6 cross-functional engineering pods.

EDUCATION
B.S. in Computer Science | University of California, Berkeley

SKILLS
TypeScript, React, Next.js, Node.js, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS, System Architecture, CI/CD
`;

  const sampleJob = `
Senior Staff Distributed Systems Engineer @ Modern SaaS
We are looking for a Senior Staff Systems Engineer to lead our Core Infrastructure and Real-Time Data Pipeline team.

Key Requirements:
- Deep expertise in TypeScript, Go (Golang), and Node.js microservices.
- Production experience with PostgreSQL, Redis, and Kafka event streaming pipelines.
- Proficiency in Kubernetes, Docker, and AWS cloud infrastructure.
- Experience with GraphQL Federation (Apollo Router) for unified schema delivery.
- Track record of team mentorship, architectural ownership, and driving technical standards.
`;

  console.log("\nSending live test request to POST /api/analyze...");
  const req = new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resumeText: sampleResume,
      jobDescription: sampleJob,
      targetRole: "Senior Staff Distributed Systems Engineer",
      promptVersion: "v2-deep-audit",
    }),
  });

  const response = await POST(req);
  const data = await response.json();

  console.log(`\nAPI Response Status: ${response.status}`);

  if (response.status !== 200 || !data.success) {
    console.error("❌ Live API returned an error:", data);
    process.exit(1);
  }

  const analysis = data.data;
  console.log("\n=== LIVE GEMINI AI RESPONSE RECEIVED SUCCESSFULLY ===");
  console.log(`✓ Engine Used: ${analysis.engine} (Model: ${analysis.modelUsed})`);
  console.log(`✓ Prompt Version: ${analysis.promptVersion}`);
  console.log(`✓ Overall Match Score: ${analysis.scores.overall}/100`);
  console.log(`  - Hard Skills: ${analysis.scores.hardSkills}%`);
  console.log(`  - Seniority Alignment: ${analysis.scores.experienceAlignment}%`);
  console.log(`  - Impact Metrics: ${analysis.scores.impactMetrics}%`);
  console.log(`  - ATS Formatting: ${analysis.scores.formattingClarity}%`);
  console.log(`✓ Summary: ${analysis.summary}`);
  console.log(`✓ Matched Skills Count: ${analysis.matchedSkills.length}`);
  console.log(`  Preview: ${analysis.matchedSkills.slice(0, 4).map((s: any) => s.name).join(", ")}...`);
  console.log(`✓ Missing Skills Count: ${analysis.missingSkills.length}`);
  console.log(`  Preview: ${analysis.missingSkills.slice(0, 3).map((s: any) => s.name).join(", ")}...`);
  console.log(`✓ Bullet Improvements Count: ${analysis.bulletImprovements.length}`);
  if (analysis.bulletImprovements.length > 0) {
    console.log(`  Original: "${analysis.bulletImprovements[0].original}"`);
    console.log(`  Improved: "${analysis.bulletImprovements[0].improved}"`);
  }
  console.log(`✓ Ethical Truth Safeguard: ${analysis.ethicalSafeguard.nonFabricationAffirmation}`);

  console.log("\n✅ ALL LIVE GEMINI VERIFICATIONS PASSED SUCCESSFULLY!");
}

testLiveGemini().catch((err) => {
  console.error("Live test failed:", err);
  process.exit(1);
});
