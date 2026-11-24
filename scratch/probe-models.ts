import * as fs from "fs";
import * as path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const envPath = path.resolve(__dirname, "../.env.local");
let apiKey = "";
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("GEMINI_API_KEY=")) {
      apiKey = trimmed.slice("GEMINI_API_KEY=".length).trim();
    }
  }
}

const genAI = new GoogleGenerativeAI(apiKey);

const candidates = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.5-flash",
  "gemini-3.0-flash",
  "gemini-3.5-pro",
  "gemini-flash-latest",
  "gemini-pro-latest"
];

async function probe() {
  for (const modelName of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const res = await model.generateContent("Respond with: OK");
      console.log(`[PASS] ${modelName} -> ${res.response.text().trim()}`);
    } catch (e: any) {
      console.log(`[FAIL] ${modelName} -> ${e.message?.slice(0, 140)}`);
    }
  }
}

probe();
