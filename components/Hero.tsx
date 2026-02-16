"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const rotatingPhrases = [
  "Sem culpa.",
  "Sem glúten.",
  "Sem lactose.",
  "100% natural.",
  "100% vegano.",
];

type Flavor = "cranberry" | "coco";

const flavorConfig = {
  cranberry: { label: "Cranberry", accentColor: "#D91E29" },
  coco:      { label: "Coco",      accentColor: "#D4A853" },
};

export default function Hero() {
  const [flavor, setFlavor] = useState<Flavor>("cranberry");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: email.split("@")[0], consent: true }),
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
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ padding: "48px" }}
    >
      {/* ── Background image ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "0% center", transform: "scale(1.1)", transformOrigin: "0% center" }}
        />
      </div>

      {/* ── Header row: logo left ─── */}
      <div className="relative z-10 flex">
        {/* Nossa logo — top left */}
        <div
          style={{
            borderRadius: "9999px",
            padding: "0px 24px",
            background: "rgba(249, 239, 225, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontFamily: "Reigo, system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "44px",
              color: "#F9EFE1",
              letterSpacing: "0.01em",
            }}
          >
            nossa
          </span>
        </div>
      </div>

      {/* ── Red badge — 300px from top, 104px from right ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        style={{ position: "absolute", top: 300, right: 104, zIndex: 20 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          <Image
            src="/badge-red.png"
            alt="Toooooda natural"
            width={224}
            height={224}
            style={{ width: 224, height: 224, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Blue badge — fixed page coords: 238px from top, 448px from right ─── */}
      <motion.div
        initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
        animate={{ opacity: 1, rotate: -10, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.5, type: "spring" }}
        style={{ position: "absolute", top: 238, right: 448, zIndex: 20 }}
      >
        <Image
          src="/badge-blue.png"
          alt="seu snack do bem"
          width={240}
          height={240}
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
        />
      </motion.div>

      {/* ── Bottom-left tag ─── */}
      <p
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          zIndex: 10,
          color: "#F9EFE1",
          fontFamily: "'Poppins', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
        }}
      >
        Feito no Brasil com amor ❤️
      </p>

      {/* ── Main content ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full mt-8 lg:mt-0">

        {/* Left: copy + form */}
        <div className="flex flex-col items-start max-w-xl relative">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-0 sm:mt-4 text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1]"
            style={{ color: "#F9EFE1", fontFamily: "Reigo, system-ui, sans-serif", fontWeight: 300 }}
          >
            <span style={{ display: "block", whiteSpace: "nowrap" }}>
              Seu novo snack
            </span>
            <span style={{ display: "flex", alignItems: "baseline", whiteSpace: "nowrap", gap: "0.3em" }}>
              <span style={{ fontWeight: 700 }}>favorito.</span>
              <span style={{ display: "inline-grid", minWidth: "9ch" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: "40%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-40%" }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    style={{ display: "block", fontWeight: 700, gridArea: "1 / 1" }}
                  >
                    {rotatingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              color: "#F9EFE1",
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Lançamento Julho 2026 &nbsp;•&nbsp; Primeiros 500 ganham desconto
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            style={{ marginTop: "32px", width: "100%" }}
          >
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
                    fontSize: "18px",
                  }}
                >
                  {message}
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 rounded-full px-5 py-3 outline-none"
                    style={{
                      background: "#271818",
                      border: "2px solid #F9EFE1",
                      color: "#F9EFE1",
                      backdropFilter: "blur(8px)",
                      fontFamily: "'Poppins', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full px-7 py-3 whitespace-nowrap disabled:opacity-60"
                    style={{
                      background: "#92F4E5",
                      color: "#000000",
                      fontFamily: "'Poppins', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {status === "loading" ? "Enviando…" : "Eu quero!"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {status === "error" && (
              <p style={{ marginTop: "8px", fontSize: "14px", color: "#e87a6a", fontFamily: "'Poppins', system-ui, sans-serif" }}>
                {message}
              </p>
            )}

            <p
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "rgba(249,239,225,0.7)",
                fontStyle: "italic",
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              Sem spam. Cancele quando quiser. Apenas novidades deliciosas.
            </p>
          </motion.div>
        </div>

        {/* Right: empty spacer to keep layout balanced */}
        <div className="flex-shrink-0" style={{ minWidth: 64 }} />

      </div>
    </section>
  );
}
