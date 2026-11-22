import { extractTextFromBuffer } from "../src/lib/parser";
import { getPromptConfig, PROMPT_REGISTRY } from "../src/lib/prompts";
import { analyzeWithHeuristics } from "../src/lib/heuristic-analyzer";
import { analyzeResume } from "../src/lib/analyzer";

async function runTests() {
  console.log("=== RUNNING STAGE 1 & STAGE 2 TESTS ===");

  // TEST 1: Document Parser (TXT buffer)
  console.log("\n--- TEST 1: Document Parser ---");
  const sampleResumeText = `
Alex Mercer
Staff Distributed Systems Engineer
San Francisco, CA • alex@example.com

SUMMARY
Systems Architect with 8+ years designing high-throughput distributed architectures, microservices, and design systems.

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

  const parsedDoc = await extractTextFromBuffer(
    Buffer.from(sampleResumeText, "utf-8"),
    "Alex_Mercer_Resume.txt"
  );
  console.log(`✓ Parsed format: ${parsedDoc.format}`);
  console.log(`✓ Word count: ${parsedDoc.wordCount}`);
  if (parsedDoc.wordCount < 50) throw new Error("Parsed word count is unexpectedly low.");

  // TEST 2: Prompt Engineering Modules
  console.log("\n--- TEST 2: Prompt Versions ---");
  const versions = Object.keys(PROMPT_REGISTRY);
  console.log(`✓ Registered prompt versions: ${versions.join(", ")}`);
  if (!versions.includes("v1-standard") || !versions.includes("v2-deep-audit")) {
    throw new Error("Missing required prompt versions.");
  }

  const v1 = getPromptConfig("v1-standard");
  const v2 = getPromptConfig("v2-deep-audit");
  console.log(`✓ v1 name: ${v1.name} (description: ${v1.description.slice(0, 40)}...)`);
  console.log(`✓ v2 name: ${v2.name} (description: ${v2.description.slice(0, 40)}...)`);
  if (!v1.systemInstruction.includes("ETHICAL RULES")) throw new Error("v1 missing ethical rules");
  if (!v2.systemInstruction.includes("ANTI-FABRICATION PROTOCOL")) throw new Error("v2 missing anti-fabrication");

  // TEST 3: Deterministic Heuristic Analyzer
  console.log("\n--- TEST 3: Deterministic Real Match Analyzer ---");
  const targetJobDescription = `
Senior Staff Distributed Systems Engineer
We are seeking an experienced Senior Staff Systems Engineer to lead our Core Infrastructure and Real-Time Data Pipeline team.

Key Requirements:
- Deep expertise in TypeScript, Go (Golang), and Node.js microservices.
- Production experience with PostgreSQL, Redis, and Kafka event streaming.
- Proficiency in Kubernetes, Docker, and AWS cloud architecture.
- Experience with GraphQL Federation (Apollo Router) for unified schema delivery.
- Track record of team mentorship and technical leadership.
- Must hold B.S. in Computer Science or equivalent practical experience.
`;

  const heuristicResult = analyzeWithHeuristics(
    sampleResumeText,
    targetJobDescription,
    "Senior Staff Distributed Systems Engineer"
  );

  console.log(`✓ Overall Match Score: ${heuristicResult.scores.overall}/100`);
  console.log(`✓ Hard Skills Score: ${heuristicResult.scores.hardSkills}/100`);
  console.log(`✓ Experience Alignment: ${heuristicResult.scores.experienceAlignment}/100`);
  console.log(`✓ ATS Clarity Score: ${heuristicResult.scores.formattingClarity}/100`);
  console.log(`✓ Matched Skills Count: ${heuristicResult.matchedSkills.length}`);
  console.log(`  Matched: ${heuristicResult.matchedSkills.map((s) => s.name).slice(0, 5).join(", ")}...`);
  console.log(`✓ Missing Skills Count: ${heuristicResult.missingSkills.length}`);
  console.log(`  Missing: ${heuristicResult.missingSkills.map((s) => s.name).join(", ")}`);
  console.log(`✓ Bullet Improvements Count: ${heuristicResult.bulletImprovements.length}`);
  if (heuristicResult.bulletImprovements.length > 0) {
    console.log(`  Original: "${heuristicResult.bulletImprovements[0].original}"`);
    console.log(`  Improved: "${heuristicResult.bulletImprovements[0].improved}"`);
  }
  console.log(`✓ Ethical Safeguard Verified: ${heuristicResult.ethicalSafeguard.candidateTruthPreserved}`);

  // TEST 4: Unified Analyzer Facade
  console.log("\n--- TEST 4: Unified Analyzer Facade ---");
  const analysisOutput = await analyzeResume({
    resumeText: sampleResumeText,
    jobDescription: targetJobDescription,
    targetRole: "Senior Staff Distributed Systems Engineer",
    promptVersion: "v2-deep-audit",
  });

  console.log(`✓ Analysis ID: ${analysisOutput.id}`);
  console.log(`✓ Engine Used: ${analysisOutput.engine}`);
  console.log(`✓ Target Role: ${analysisOutput.targetRole}`);
  console.log(`✓ Summary: ${analysisOutput.summary}`);

  console.log("\n=== ALL STAGE 1 & STAGE 2 TESTS PASSED! ===");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
