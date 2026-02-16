export const metadata = {
  title: "Política de Privacidade — Nossa Snacks",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-foreground">
      <h1 className="mb-8 text-3xl font-bold">Política de Privacidade</h1>

      <section className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          A Nossa Snacks está comprometida com a proteção dos seus dados pessoais, em conformidade com a
          Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>

        <h2 className="text-base font-semibold text-foreground">Quais dados coletamos</h2>
        <p>Nome e endereço de e-mail fornecidos voluntariamente através do formulário de cadastro.</p>

        <h2 className="text-base font-semibold text-foreground">Finalidade</h2>
        <p>
          Os dados coletados são utilizados exclusivamente para envio de comunicações sobre o lançamento
          da Nossa Snacks, incluindo e-mails informativos e promocionais.
        </p>

        <h2 className="text-base font-semibold text-foreground">Base legal</h2>
        <p>O tratamento é realizado com base no consentimento expresso do titular (Art. 7º, inciso I, LGPD).</p>

        <h2 className="text-base font-semibold text-foreground">Retenção de dados</h2>
        <p>
          Seus dados serão mantidos enquanto você permanecer inscrito em nossa lista. Você pode solicitar
          a exclusão a qualquer momento.
        </p>

        <h2 className="text-base font-semibold text-foreground">Seus direitos</h2>
        <p>
          Em conformidade com a LGPD, você tem o direito de acessar, corrigir, portabilizar ou excluir
          seus dados a qualquer momento. Para exercer esses direitos, entre em contato:
        </p>
        <p>
          <a href="mailto:privacidade@nossasnacks.com.br" className="underline hover:text-foreground">
            privacidade@nossasnacks.com.br
          </a>
        </p>

        <h2 className="text-base font-semibold text-foreground">Compartilhamento</h2>
        <p>
          Seus dados não são vendidos ou compartilhados com terceiros, exceto com a plataforma de
          envio de e-mails (Brevo), utilizada exclusivamente para a entrega das comunicações.
        </p>

        <p className="pt-4 text-xs">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
      </section>
    </main>
  );
}
