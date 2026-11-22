import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(__dirname, "../.env.local");
let key = "";
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("GEMINI_API_KEY=")) {
      key = trimmed.split("=")[1].trim();
    }
  }
}

async function listAvailableModels() {
  console.log("Querying https://generativelanguage.googleapis.com/v1beta/models?key=...");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
  const data = await res.json();
  if (data.models) {
    console.log("Available models for this key:");
    for (const m of data.models) {
      if (m.supportedGenerationMethods?.includes("generateContent")) {
        console.log(`- ${m.name} (${m.displayName})`);
      }
    }
  } else {
    console.error("Error from API:", data);
  }
}

listAvailableModels().catch(console.error);
