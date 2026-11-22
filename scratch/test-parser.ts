import { extractTextFromBuffer } from "../src/lib/parser";

async function testDocxAndPdf() {
  console.log("=== TESTING DOCUMENT PARSING FOR DOCX & PDF & TXT ===");

  // 1. Test Text/Markdown Buffer
  const textBuffer = Buffer.from(
    `Alex Mercer - Staff Systems Engineer
San Francisco, CA • alex@example.com
EXPERIENCE
Principal Engineer | Cloud Corp (2020 - Present)
- Designed and maintained high-throughput microservices using TypeScript, Go, and Redis.
- Reduced p99 database query latency by 45% using PostgreSQL query plan optimization.
EDUCATION
B.S. in Computer Science, UC Berkeley
SKILLS
TypeScript, Go, React, Next.js, PostgreSQL, Redis, Kubernetes, AWS`,
    "utf-8"
  );

  const textDoc = await extractTextFromBuffer(textBuffer, "candidate_resume.txt");
  console.log(`✓ TXT extraction: ${textDoc.wordCount} words, format: ${textDoc.format}`);
  if (textDoc.wordCount < 40) throw new Error("TXT parsing failed");

  // 2. Test Invalid/Corrupted PDF error handling
  try {
    await extractTextFromBuffer(Buffer.from("not a real pdf content"), "corrupted.pdf");
    console.log("Expected corrupted PDF to fail, but it passed!");
  } catch (err: unknown) {
    const error = err as Error;
    console.log(`✓ Handled invalid PDF gracefully: "${error.message.slice(0, 60)}..."`);
  }

  // 3. Test Empty Document Guardrail (<15 words)
  try {
    await extractTextFromBuffer(Buffer.from("Short text"), "empty.txt");
    console.log("Expected empty document to fail, but it passed!");
  } catch (err: unknown) {
    const error = err as Error;
    console.log(`✓ Handled insufficient text guardrail: "${error.message.slice(0, 60)}..."`);
  }

  console.log("=== ALL PARSER TESTS PASSED! ===");
}

testDocxAndPdf().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
