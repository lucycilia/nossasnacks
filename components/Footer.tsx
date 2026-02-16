export default function Footer() {
  return (
    <footer
      className="py-8 text-center text-sm"
      style={{ color: "rgba(201,169,122,0.7)", fontFamily: "Reigo, system-ui, sans-serif", fontWeight: 300 }}
    >
      <p className="text-base" style={{ color: "#C9A97A" }}>
        Feito no Brasil com amor ❤️
      </p>
      <div className="mt-3 flex justify-center gap-6 text-xs">
        <a
          href="/privacy"
          className="underline transition-colors"
          style={{ color: "rgba(201,169,122,0.6)" }}
        >
          Política de Privacidade
        </a>
      </div>
      <p className="mt-2 text-xs" style={{ color: "rgba(201,169,122,0.45)" }}>
        © {new Date().getFullYear()} Nossa Snacks. Todos os direitos reservados.
      </p>
    </footer>
  );
}
