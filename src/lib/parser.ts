import mammoth from "mammoth";
import { createRequire } from "module";
import { DocumentFormat, ParsedDocument } from "./types/analysis";

// Use createRequire so the CJS pdf-parse bundle is loaded by Node.js natively
// (not bundled by webpack), which is required for it to work in Next.js App Router.
const _require = createRequire(import.meta.url);

/**
 * Extracts raw plain text from uploaded resume buffer (PDF, DOCX, TXT)
 */
export async function extractTextFromBuffer(
  buffer: Buffer,
  filename: string,
  mimeType?: string
): Promise<ParsedDocument> {
  const extension = filename.split(".").pop()?.toLowerCase();

  let format: DocumentFormat = "txt";
  let text = "";
  let pageCount: number | undefined;

  if (extension === "pdf" || mimeType === "application/pdf") {
    format = "pdf";
    try {
      // Use createRequire so pdf-parse CJS is loaded natively by Node.js,
      // not bundled by webpack (which breaks the package's internal Object.defineProperty calls).
      const { PDFParse } = _require("pdf-parse") as {
        PDFParse: new (opts: { data: Buffer }) => {
          load: () => Promise<void>;
          getText: () => Promise<{ text: string; total: number }>;
          destroy: () => Promise<void>;
        };
      };
      const parserInstance = new PDFParse({ data: buffer });
      try {
        await parserInstance.load();
        const result = await parserInstance.getText();
        text = result.text || "";
        pageCount = result.total;
      } finally {
        if (typeof parserInstance.destroy === "function") {
          await parserInstance.destroy();
        }
      }
    } catch (pdfError: unknown) {
      const err = pdfError as Error;
      throw new Error(`Failed to parse PDF document (${filename}): ${err.message}`);
    }
  } else if (
    extension === "docx" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    format = "docx";
    try {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value || "";
    } catch (docxError: unknown) {
      const err = docxError as Error;
      throw new Error(`Failed to parse DOCX document (${filename}): ${err.message}`);
    }
  } else if (
    extension === "txt" ||
    mimeType === "text/plain" ||
    extension === "md"
  ) {
    format = "txt";
    text = buffer.toString("utf-8");
  } else {
    // Attempt utf-8 fallback
    try {
      text = buffer.toString("utf-8");
      format = "txt";
    } catch {
      throw new Error(
        `Unsupported document format for "${filename}". Please upload a .pdf, .docx, or .txt file.`
      );
    }
  }

  // Normalize whitespace & remove binary nulls
  const cleanedText = text
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const words = cleanedText ? cleanedText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  if (wordCount < 15) {
    throw new Error(
      `Document "${filename}" contains insufficient readable text (${wordCount} words detected). ` +
      `If this is a scanned image PDF, please use a document with an accessible text layer.`
    );
  }

  return {
    text: cleanedText,
    wordCount,
    format,
    filename,
    pageCount,
  };
}
