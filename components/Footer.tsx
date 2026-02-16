export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted">
      <div className="mb-3 flex justify-center gap-6">
        {/* Add your social links */}
        <a href="https://instagram.com/nossasnacks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          Instagram
        </a>
        <a href="https://tiktok.com/@nossasnacks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          TikTok
        </a>
      </div>
      <a href="/privacy" className="underline hover:text-foreground">
        Política de Privacidade
      </a>
      <p className="mt-2">© {new Date().getFullYear()} Nossa Snacks. Todos os direitos reservados.</p>
    </footer>
  );
}
