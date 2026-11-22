import * as fs from "fs";
import * as path from "path";

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

async function testLiveMultipart() {
  console.log("=== TESTING LIVE GEMINI WITH MULTIPART FILE UPLOAD ===");

  const resumeContent = `Jane Doe
Senior Full-Stack Cloud Architect
Seattle, WA • jane@example.com

SUMMARY
Full-Stack Cloud Engineer with 7 years of production experience in React, Next.js, Node.js, and AWS serverless architecture.

EXPERIENCE
Staff Engineer | CloudVenture (2021 - Present)
- Led frontend architecture migration from legacy single-page application to Next.js App Router.
- Built automated CI/CD pipelines using GitHub Actions, cutting deployment cycle times by 50%.
- Designed and maintained PostgreSQL schemas and DynamoDB storage for 1M+ active records.

EDUCATION
B.S. in Software Engineering, University of Washington

SKILLS
TypeScript, React, Next.js, Node.js, AWS, PostgreSQL, DynamoDB, Docker, CI/CD, Tailwind CSS
`;

  const blob = new Blob([resumeContent], { type: "text/plain" });
  const file = new File([blob], "Jane_Doe_Resume.txt", { type: "text/plain" });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("targetRole", "Lead Frontend Architect");
  formData.append("jobDescription", "Seeking Lead Frontend Architect with expertise in Next.js, React 18, TypeScript, Design Systems, and AWS Cloud deployments.");
  formData.append("promptVersion", "v1-standard");

  const req = new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    body: formData,
  });

  const res = await POST(req);
  const data = await res.json();

  console.log(`Response status: ${res.status}`);
  if (res.status === 200 && data.success) {
    console.log(`✓ Overall Match: ${data.data.scores.overall}%`);
    console.log(`✓ Engine: ${data.data.engine} (${data.data.modelUsed})`);
    console.log(`✓ Summary: ${data.data.summary}`);
    console.log(`✓ Matched Skills: ${data.data.matchedSkills.map((s: any) => s.name).slice(0, 5).join(", ")}`);
    console.log("✅ MULTIPART FILE UPLOAD TEST PASSED!");
  } else {
    console.error("❌ Multipart test failed:", data);
    process.exit(1);
  }
}

testLiveMultipart().catch(console.error);
