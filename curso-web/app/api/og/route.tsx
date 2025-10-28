import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ?? "Fundamentos de Programacion en Python - Curso en 10 modulos";
  const subtitle =
    searchParams.get("subtitle") ??
    "Aprende Python con ejemplos ejecutables, ejercicios y un proyecto final integrador.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          color: "#f8fafc",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.8 }}>Fundamentos de Python</div>
        <div>
          <h1 style={{ fontSize: 60, lineHeight: 1.1, marginBottom: 20 }}>{title}</h1>
          <p style={{ fontSize: 30, color: "#cbd5f5" }}>{subtitle}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            opacity: 0.9
          }}
        >
          <span>Curso estatico optimizado para Vercel</span>
          <span>fundamentos-python.vercel.app</span>
        </div>
      </div>
    ),
    size
  );
}
