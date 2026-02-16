"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Flavor = "cranberry" | "coco";

const flavorConfig = {
  cranberry: { label: "Cranberry", accentColor: "#D91E29" },
  coco:      { label: "Coco",      accentColor: "#D4A853" },
};

export default function Hero() {
  const [flavor, setFlavor] = useState<Flavor>("cranberry");
  const [email, setEmail] = useState("");
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

      {/* ── Flavor toggle — top right ─── */}
      <div className="relative z-10 flex justify-end">
        <div className="flex" style={{ gap: "8px" }}>
          {(["cranberry", "coco"] as Flavor[]).map((f) => (
            <button
              key={f}
              onClick={() => setFlavor(f)}
              className="transition-all duration-300"
              style={{
                borderRadius: "9999px",
                padding: "10px 24px",
                fontSize: "20px",
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 500,
                color: "#F9EFE1",
                background: flavor === f ? "#D91E29" : "rgba(249,239,225,0.15)",
                backdropFilter: flavor === f ? undefined : "blur(12px)",
                WebkitBackdropFilter: flavor === f ? undefined : "blur(12px)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {flavorConfig[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Red badge — 300px from top, 104px from right ─── */}
      <motion.div
        initial={{ opacity: 0, rotate: 15, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        style={{ position: "absolute", top: 300, right: 104, zIndex: 20 }}
      >
        <Image
          src="/badge-red.png"
          alt="Toooooda natural"
          width={140}
          height={140}
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
        />
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

      {/* ── Main content ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full mt-8 lg:mt-0">

        {/* Left: copy + form */}
        <div className="flex flex-col items-start max-w-xl relative">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 sm:mt-20 text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1]"
            style={{ color: "#F9EFE1", fontFamily: "Reigo, system-ui, sans-serif", fontWeight: 300 }}
          >
            <span style={{ display: "block", whiteSpace: "nowrap" }}>
              Seu novo snack
            </span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 700 }}>favorito. Sem culpa.</span>
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
                      background: "#F9EFE1",
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
