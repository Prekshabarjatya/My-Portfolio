import { ImageResponse } from "next/og";

// Social preview card (LinkedIn, WhatsApp, X, Slack). Colours are the site's ink + accent tokens.
export const alt = "Preksha Barjatya, AI Engineer in Indore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1c1c1c", ON_INK = "#f3f3f0", MUTED = "#b3b3b3", ACCENT = "#ef6c82";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: INK, color: ON_INK }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: MUTED }}>AI ENGINEER · INDORE, INDIA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1.02 }}>Preksha Barjatya</div>
          <div style={{ marginTop: 24, fontSize: 44, fontStyle: "italic", color: ACCENT }}>Curious by default. Careful by design.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, color: MUTED }}>
          <div style={{ display: "flex" }}>RAG · LangGraph agents · FastAPI</div>
          <div style={{ display: "flex", color: ON_INK }}>prekshaa.tech</div>
        </div>
      </div>
    ),
    size
  );
}
