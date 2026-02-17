"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setMessage("Por favor, aceite os termos para continuar.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus("success");
      setMessage("Obrigado! Você está na lista. Avisaremos em breve.");
    } catch (err: unknown) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente novamente.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-lg font-medium text-foreground"
      >
        {message}
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-foreground"
      />
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-foreground"
      />

      {/* LGPD consent — must NOT be pre-checked */}
      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 flex-shrink-0 accent-foreground"
        />
        <span>
          Concordo em receber comunicações da Nossa Snacks e aceito a{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Política de Privacidade
          </a>
          . Você pode cancelar a qualquer momento.
        </span>
      </label>

      {message && status === "error" && (
        <p className="text-sm text-red-500">{message}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full bg-foreground px-6 py-3 font-semibold text-background disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Quero ser avisado"}
      </motion.button>
    </form>
  );
}
