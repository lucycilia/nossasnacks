"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FooterEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: email.split("@")[0],
          consent: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
      setMessage("🎉 Você está na lista! Avisaremos em Julho 2026.");
    } catch {
      setStatus("error");
      setMessage("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: "#F9EFE1",
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
            }}
          >
            {message}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="footer-email-input"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              data-custom-cursor
              className="footer-cta-btn"
            >
              {status === "loading" ? "Enviando…" : "Eu quero!"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <p
          style={{
            marginTop: "8px",
            fontSize: "13px",
            color: "#e87a6a",
            fontFamily: "'Poppins', system-ui, sans-serif",
          }}
        >
          {message}
        </p>
      )}

      {status !== "success" && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "13px",
            color: "rgba(249,239,225,0.55)",
            fontStyle: "italic",
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 400,
          }}
        >
          Sem spam. Apenas novidades deliciosas.
        </p>
      )}
    </div>
  );
}
