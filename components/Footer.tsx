import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1a0e06",
        borderTop: "1px solid rgba(201,169,122,0.15)",
        paddingTop: "clamp(40px, 6vw, 64px)",
        paddingBottom: "clamp(28px, 4vw, 48px)",
        paddingLeft: "clamp(20px, 5vw, 64px)",
        paddingRight: "clamp(20px, 5vw, 64px)",
      }}
    >
      {/* Top row: brand + tagline left, links right */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "32px",
        }}
      >
        {/* Brand block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              fontFamily: "Reigo, system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#F9EFE1",
              letterSpacing: "0.01em",
              lineHeight: 1,
            }}
          >
            nossa
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Image
              src="/Start-little-teal.svg"
              alt=""
              width={8}
              height={8}
              style={{ flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.5vw, 15px)",
                color: "rgba(201,169,122,0.8)",
                lineHeight: 1.5,
              }}
            >
              Snacks do bem, feitos no Brasil.
            </span>
          </div>
        </div>

        {/* Links block */}
        <nav
          aria-label="Rodapé"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <span
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(201,169,122,0.5)",
            }}
          >
            Links
          </span>
          <Link href="/privacy" className="footer-nav-link">
            Política de Privacidade
          </Link>
        </nav>
      </div>

      {/* Divider */}
      <div
        style={{
          marginTop: "clamp(28px, 4vw, 48px)",
          height: "1px",
          background: "rgba(201,169,122,0.12)",
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(201,169,122,0.45)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Nossa Snacks. Todos os direitos
          reservados.
        </p>
        <p
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(201,169,122,0.45)",
            margin: 0,
          }}
        >
          Feito no Brasil com amor ❤️
        </p>
      </div>
    </footer>
  );
}
