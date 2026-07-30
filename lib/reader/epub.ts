"use client";

// EPUB = un ZIP con XHTML dentro. Se lee con `fflate` (30 KB, cargada en
// diferido) y se ordena por el «spine» del OPF, que es el índice real del
// libro: coger los ficheros por nombre daría capítulos desordenados.
//
// Todo ocurre en el navegador: el libro no viaja a ningún servidor.

/** Resuelve una ruta relativa del OPF contra la carpeta que lo contiene. */
function resolvePath(base: string, relative: string): string {
  if (relative.startsWith("/")) return relative.slice(1);
  const parts = base.split("/").slice(0, -1).concat(relative.split("/"));
  const out: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out.join("/");
}

function textOf(xhtml: string): string {
  const doc = new DOMParser().parseFromString(xhtml, "application/xhtml+xml");
  // Los saltos de párrafo se conservan: el lector segmenta por frases y un
  // muro de texto sin cortes le complica la vida.
  const body = doc.querySelector("body") ?? doc.documentElement;
  const blocks: string[] = [];
  body?.querySelectorAll("p, h1, h2, h3, h4, li, blockquote").forEach((el) => {
    const t = el.textContent?.replace(/\s+/g, " ").trim();
    if (t) blocks.push(t);
  });
  if (blocks.length > 0) return blocks.join("\n\n");
  // Libros sin marcado de párrafos: se cae al texto plano del cuerpo.
  return (body?.textContent ?? "").replace(/\s+/g, " ").trim();
}

export type EpubResult = { text: string; title: string };

export async function epubToText(file: File): Promise<EpubResult> {
  const { unzipSync, strFromU8 } = await import("fflate");
  const zip = unzipSync(new Uint8Array(await file.arrayBuffer()));
  const read = (path: string) => (zip[path] ? strFromU8(zip[path]) : null);

  // 1) container.xml dice dónde está el OPF.
  const container = read("META-INF/container.xml");
  const opfPath =
    container
      ?.match(/full-path="([^"]+)"/)?.[1] ??
    Object.keys(zip).find((k) => k.endsWith(".opf"));
  if (!opfPath) throw new Error("epub sin OPF");

  const opf = read(opfPath);
  if (!opf) throw new Error("epub sin OPF");
  const opfDoc = new DOMParser().parseFromString(opf, "application/xml");

  // 2) manifest: id → href. 3) spine: orden de lectura.
  const hrefById = new Map<string, string>();
  opfDoc.querySelectorAll("manifest > item").forEach((item) => {
    const id = item.getAttribute("id");
    const href = item.getAttribute("href");
    const type = item.getAttribute("media-type") ?? "";
    if (id && href && /xhtml|html/.test(type)) hrefById.set(id, href);
  });

  const order: string[] = [];
  opfDoc.querySelectorAll("spine > itemref").forEach((ref) => {
    const href = hrefById.get(ref.getAttribute("idref") ?? "");
    if (href) order.push(resolvePath(opfPath, href));
  });
  // Sin spine legible: al menos se leen los XHTML en el orden del zip.
  const files =
    order.length > 0
      ? order
      : Object.keys(zip).filter((k) => /\.x?html?$/i.test(k)).sort();

  const parts: string[] = [];
  for (const path of files) {
    const raw = read(path);
    if (!raw) continue;
    const text = textOf(raw);
    if (text) parts.push(text);
  }

  const title =
    opfDoc.querySelector("title")?.textContent?.trim() ||
    file.name.replace(/\.[^.]+$/, "");

  return { text: parts.join("\n\n"), title };
}
