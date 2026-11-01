import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

// Exported as /og.png so GitHub Pages serves it with an image MIME type.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafafa",
          backgroundImage: "radial-gradient(#d4d4d4 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          color: "#171717",
        }}
      >
        <div style={{ fontSize: 28, color: "#737373" }}>{DATA.url.replace("https://", "")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>{DATA.name}</div>
          <div style={{ fontSize: 36, lineHeight: 1.4, color: "#525252", maxWidth: 960 }}>{DATA.description}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
