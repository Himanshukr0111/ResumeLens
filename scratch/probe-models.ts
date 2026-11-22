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

const candidates = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-1.5-flash",
  "gemini-pro-latest"
];

async function probeModels() {
  for (const model of candidates) {
    process.stdout.write(`Testing model: ${model}... `);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Respond with the word SUCCESS" }] }]
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ OK (${res.status}): ${JSON.stringify(data.candidates?.[0]?.content?.parts?.[0]?.text?.trim())}`);
        return model;
      } else {
        console.log(`❌ (${res.status}): ${data.error?.message?.slice(0, 80)}`);
      }
    } catch (err: any) {
      clearTimeout(timeout);
      console.log(`⏱ Error/Timeout: ${err.message}`);
    }
  }
  return null;
}

probeModels().then(m => {
  if (m) {
    console.log(`\n🎉 Best working model found: ${m}`);
  } else {
    console.log("\nNo working candidate model found.");
  }
});
