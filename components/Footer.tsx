import Link from "next/link";
import FooterEmailForm from "./FooterEmailForm";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#261B19",
        paddingTop: "clamp(40px, 6vw, 72px)",
        paddingLeft: "clamp(20px, 5vw, 64px)",
        paddingRight: "clamp(20px, 5vw, 64px)",
        paddingBottom: "clamp(24px, 3vw, 40px)",
      }}
    >
      {/* ── Top: two columns ──────────────────────────────── */}
      <div className="footer-top">
        {/* Column 1 — Email signup */}
        <div className="footer-col">
          <h2 className="footer-col-heading">Está quase saindo do forno</h2>
          <p
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.4vw, 15px)",
              color: "#F9EFE1",
              margin: "0 0 20px 0",
            }}
          >
            Lote limitado&nbsp;•&nbsp;Primeiros 500 ganham 10% desconto
          </p>
          <FooterEmailForm />
        </div>

        {/* Vertical divider (hidden on mobile) */}
        <div className="footer-vdivider" />

        {/* Column 2 — Help */}
        <div className="footer-col">
          <h2 className="footer-col-heading">Precisa de ajuda?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#" className="footer-pill-btn">
              Perguntas frequentes
            </a>
            <Link href="/privacy" className="footer-pill-btn">
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>

      {/* ── Wordmark (full-bleed) ─────────────────────────── */}
      <div
        className="wordmark-container"
        style={{
          marginTop: "clamp(36px, 5vw, 60px)",
        }}
      >
        <div style={{ height: "2px", background: "#F9EFE1", borderRadius: "9999px" }} />
        <div
          style={{
            overflow: "hidden",
            padding: "clamp(2px, 0.8vw, 10px) 0",
            lineHeight: 0.85,
          }}
        >
          <span
            style={{
              fontFamily: "Reigo, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "42cqw",
              color: "#F9EFE1",
              letterSpacing: "-0.02em",
              display: "block",
              textAlign: "center",
              lineHeight: 0.85,
            }}
          >
            nossa
          </span>
        </div>
        <div style={{ height: "2px", background: "#F9EFE1", borderRadius: "9999px" }} />
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div
        style={{
          marginTop: "clamp(14px, 2vw, 24px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <a href="mailto:contato@nossasnacks.com" className="footer-bottom-link">
            contato@nossasnacks.com
          </a>
          <a
            href="https://www.instagram.com/nossa.snacks/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-link"
          >
            Instagram
          </a>
          <a href="#" className="footer-bottom-link">
            Tik Tok
          </a>
        </div>
        <p
          style={{
            color: "rgba(249,239,225,0.45)",
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            margin: 0,
          }}
        >
          © 2026 nossa snacks
        </p>
      </div>
    </footer>
  );
}
