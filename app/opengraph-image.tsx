import { ImageResponse } from "next/og";

export const alt = "bmtradingplc — Safarian Boards (03–12mm) & Structural Plywood (16–18mm Special Product)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0B241B 0%, #103225 60%, #163B2D 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "#C8832A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-0.02em" }}>
                bmtradingplc
              </span>
              <span style={{ fontSize: "16px", color: "#EAA84F", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Werabe Factory • Addis Ababa Office
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "18px",
              fontWeight: 700,
              color: "#EAA84F",
            }}
          >
            100% Quality Inspected
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "960px" }}>
          <div style={{ fontSize: "64px", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            Precision Safarian &amp; Structural Plywood.
          </div>
          <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.82)", lineHeight: 1.4 }}>
            Safarian (03mm, 06mm, 08mm, 12mm) and Heavy Plywood (16mm &amp; Flagship 18mm Special Product) manufactured in Ethiopia.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: "26px",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", gap: "36px" }}>
            <span>10+ Years Experience</span>
            <span>200+ Trusted Clients</span>
            <span style={{ color: "#EAA84F" }}>100% Quality</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.75)" }}>0911 247 821</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
