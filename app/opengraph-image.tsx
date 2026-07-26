import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagen de compartir (WhatsApp, X, LinkedIn…). Se genera en build.
export const alt = "Parlo — Aprende inglés como se debe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          // Degradado plano: satori deja costuras visibles con radiales grandes.
          background: "linear-gradient(135deg, #23133a 0%, #140e24 48%, #0d2029 100%)",
          color: "#fff9f5",
          fontFamily: "sans-serif",
        }}
      >
        {/* barra de marca */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg, #ff6b4a 0%, #ffc94a 50%, #27c7a8 100%)",
          }}
        />
        <img src={logoSrc} alt="" height={132} style={{ objectFit: "contain" }} />

        {/* satori exige display:flex explícito en todo div con más de un hijo */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          <span>Aprende inglés&nbsp;</span>
          <span style={{ color: "#ff6b4a" }}>como se debe</span>
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: "#c9bfe0", maxWidth: 860 }}>
          Un tutor de IA que corrige y te explica el porqué, en español.
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["Currículo por niveles", "Repaso espaciado", "Conversación real"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 700,
                background: "rgba(255, 249, 245, 0.08)",
                border: "2px solid rgba(255, 249, 245, 0.14)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
