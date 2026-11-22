/**
 * Standalone test for pdf-parse v2 PDFParse class.
 * Run with: node scratch/test-pdf-parser.mjs
 *
 * This tests the same code path used in src/lib/parser.ts
 * (createRequire + PDFParse class with load() -> getText())
 */
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const _require = createRequire(import.meta.url);

// Minimal valid PDF with readable text layer
const MINIMAL_PDF = Buffer.from(
  "255044462d312e340a3120302006f626a0a3c3c2f547970652f436174616c6f672f506167657320322030" +
  "2052 3e3e0a656e646f626a0a322030206f626a0a3c3c2f547970652f50616765730a2f4b696473205b33" +
  "203020525d0a2f436f756e7420313e3e0a656e646f626a0a332030206f626a0a3c3c2f547970652f5061" +
  "67650a2f506172656e7420322030520a2f4d65646961426f7820"
  .replace(/ /g, ""),
  "hex"
);

// Use a simple known-good PDF binary that the parser can handle
// (the hex above is intentionally incomplete for the hex test; use a text-based PDF)
const TEST_PDF_CONTENT = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
  /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>>
endobj
4 0 obj
<</Length 88>>
stream
BT
/F1 12 Tf
100 700 Td
(John Smith - Software Engineer Resume) Tj
0 -20 Td
(Skills: JavaScript TypeScript React Node.js Python) Tj
ET
endstream
endobj
5 0 obj
<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000414 00000 n 
trailer
<</Size 6 /Root 1 0 R>>
startxref
495
%%EOF`;

async function testPDFParser() {
  console.log("=== PDF Parser Test (pdf-parse v2 via createRequire) ===\n");

  try {
    const { PDFParse } = _require("pdf-parse");
    console.log("✓ pdf-parse loaded via createRequire");
    console.log("  PDFParse type:", typeof PDFParse);

    const pdfBuffer = Buffer.from(TEST_PDF_CONTENT, "utf-8");
    console.log(`  PDF buffer size: ${pdfBuffer.length} bytes\n`);

    const parserInstance = new PDFParse({ data: pdfBuffer });
    console.log("✓ PDFParse instance created");

    await parserInstance.load();
    console.log("✓ load() completed");

    const result = await parserInstance.getText();
    console.log("✓ getText() completed");
    console.log("  Pages:", result.total);
    console.log("  Text preview:", result.text?.slice(0, 150).replace(/\n/g, " "));

    await parserInstance.destroy();
    console.log("✓ destroy() completed");

    if (!result.text || result.text.trim().length === 0) {
      throw new Error("getText() returned empty text — PDF extraction failed silently");
    }

    console.log("\n✅ PDF PARSER TEST PASSED");
    console.log(`   Extracted ${result.text.trim().split(/\s+/).length} words from ${result.total} page(s)`);
  } catch (err) {
    console.error("\n❌ PDF PARSER TEST FAILED");
    console.error("   Error:", err.message);
    console.error("   Stack:", err.stack);
    process.exit(1);
  }
}

testPDFParser();
