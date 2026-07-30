"use client";

// Extracción de texto del archivo que sube el usuario. Todo ocurre en su
// navegador: el documento no viaja a ningún servidor.

export type ParseResult = { text: string; title: string } | { error: "empty" | "type" | "scanned" };

const TEXT_TYPES = /\.(txt|md|markdown|csv|log)$/i;

export async function parseFile(file: File): Promise<ParseResult> {
  const title = file.name.replace(/\.[^.]+$/, "");

  if (TEXT_TYPES.test(file.name) || file.type.startsWith("text/")) {
    const text = (await file.text()).trim();
    return text ? { text, title } : { error: "empty" };
  }

  if (file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf") {
    const text = await pdfToText(file);
    if (!text.trim()) return { error: "scanned" };
    return { text, title };
  }

  if (file.name.toLowerCase().endsWith(".docx")) {
    const text = await docxToText(file);
    return text.trim() ? { text, title } : { error: "empty" };
  }

  return { error: "type" };
}

/**
 * DOCX con mammoth, también en diferido. Se pide texto plano (no HTML): el
 * lector segmenta por frases y el formato no aporta nada.
 * El `.doc` viejo (binario) NO está soportado: es otro formato.
 */
async function docxToText(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return value.replace(/\n{3,}/g, "\n\n").trim();
}

/** pdf.js se carga sólo cuando hace falta: pesa y no todos suben PDFs. */
async function pdfToText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  // El worker se sirve desde el propio paquete (sin CDN externo).
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (line) parts.push(line);
  }
  return parts.join("\n\n");
}
