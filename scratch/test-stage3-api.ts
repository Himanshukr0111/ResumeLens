import { POST } from "../src/app/api/analyze/route";
import { NextRequest } from "next/server";

async function runApiTests() {
  console.log("=== RUNNING STAGE 3 API ROUTE TESTS ===");

  // TEST 1: Validation - Empty inputs
  console.log("\n--- TEST 1: Input Validation ---");
  const emptyReq = new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText: "", jobDescription: "" }),
  });

  const emptyRes = await POST(emptyReq);
  const emptyJson = await emptyRes.json();
  console.log(`✓ Empty request response status: ${emptyRes.status}`);
  console.log(`✓ Error code: ${emptyJson.error}`);
  if (emptyRes.status !== 400 || emptyJson.error !== "RESUME_REQUIRED") {
    throw new Error("Validation test failed for empty input");
  }

  // TEST 2: Key Missing Guardrail
  console.log("\n--- TEST 2: GEMINI_API_KEY Missing Guardrail ---");
  const originalKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;

  const validReq = new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resumeText: "Alex Mercer is a senior systems architect with 10 years of experience in distributed systems, TypeScript, React, and Go.",
      jobDescription: "Looking for an experienced Senior Staff Engineer with deep distributed systems and Kubernetes knowledge.",
      targetRole: "Senior Staff Engineer",
    }),
  });

  const keyMissingRes = await POST(validReq);
  const keyMissingJson = await keyMissingRes.json();
  console.log(`✓ Missing key response status: ${keyMissingRes.status}`);
  console.log(`✓ Error code: ${keyMissingJson.error}`);
  console.log(`✓ Message: ${keyMissingJson.message}`);
  if (keyMissingRes.status !== 503 || keyMissingJson.error !== "GEMINI_API_KEY_MISSING") {
    throw new Error("Missing key test failed");
  }

  // Restore key if there was one
  if (originalKey) {
    process.env.GEMINI_API_KEY = originalKey;
  }

  // TEST 3: Multipart Form-Data Validation
  console.log("\n--- TEST 3: Multipart Form-Data Handling ---");
  const formData = new FormData();
  formData.append("resumeText", "Pasted text from candidate resume with more than 50 characters of verified work history.");
  formData.append("jobDescription", "Senior Engineer target description requiring 30+ characters.");
  formData.append("targetRole", "Senior Engineer");

  const multipartReq = new NextRequest("http://localhost:3000/api/analyze", {
    method: "POST",
    body: formData,
  });

  const multipartRes = await POST(multipartReq);
  const multipartJson = await multipartRes.json();
  console.log(`✓ Multipart request status: ${multipartRes.status}`);
  console.log(`✓ Response error code: ${multipartJson.error}`);
  if (multipartRes.status !== 503 || multipartJson.error !== "GEMINI_API_KEY_MISSING") {
    throw new Error("Multipart test failed");
  }

  console.log("\n=== ALL STAGE 3 API ROUTE TESTS PASSED! ===");
}

runApiTests().catch((err) => {
  console.error("API test failed:", err);
  process.exit(1);
});
