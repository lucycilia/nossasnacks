"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Flavor = "cranberry" | "coco";

const flavorConfig = {
  cranberry: {
    label: "Cranberry",
    accentColor: "#D91E29",
    tagline: "Cranberry & Chocolate",
    barGradient: ["#6B1414", "#A52525", "#6B1414"],
  },
  coco: {
    label: "Coco",
    accentColor: "#D4A853",
    tagline: "Coco & Chocolate",
    barGradient: ["#3D2E22", "#6B5040", "#3D2E22"],
  },
};

export default function Hero() {
  const [flavor, setFlavor] = useState<Flavor>("cranberry");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const config = flavorConfig[flavor];

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
      {/* ── Background image — no overlay ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "60% center" }}
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
                background:
                  flavor === f
                    ? "#D91E29"
                    : "rgba(249,239,225,0.15)",
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

      {/* ── Main content ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full mt-8 lg:mt-0">

        {/* Left: copy + form + badge */}
        <div className="flex flex-col items-start max-w-xl relative">

          {/* Badge: seu snack do bem */}
          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
            animate={{ opacity: 1, rotate: -10, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5, type: "spring" }}
            className="absolute -top-6 -left-10 z-20 hidden sm:block"
          >
            <Image
              src="/badge-blue.png"
              alt="seu snack do bem"
              width={115}
              height={115}
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 sm:mt-20 text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1]"
            style={{
              color: "#F9EFE1",
              fontFamily: "Reigo, system-ui, sans-serif",
              fontWeight: 300,
            }}
          >
            Seu novo snack{" "}
            <span style={{ fontWeight: 700 }}>favorito.</span>
            <br />
            <span style={{ fontWeight: 700 }}>Sem culpa.</span>
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
                      background: "rgba(249,239,225,0.1)",
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
                    className="rounded-full px-7 py-3 text-white whitespace-nowrap disabled:opacity-60"
                    style={{
                      background: "#D91E29",
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
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#e87a6a",
                  fontFamily: "'Poppins', system-ui, sans-serif",
                }}
              >
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

        {/* Right: snack bar + badge — 64px from right edge */}
        <div
          className="relative flex items-center justify-center flex-shrink-0"
          style={{ paddingRight: "64px" }}
        >
          {/* Badge: Toooooda natural */}
          <motion.div
            initial={{ opacity: 0, rotate: 15, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 12, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="absolute -top-4 -right-2 z-20"
            style={{ right: "60px" }}
          >
            <Image
              src="/badge-red.png"
              alt="Toooooda natural"
              width={105}
              height={105}
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
            />
          </motion.div>

          {/* Snack bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={flavor}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -14, 0],
              }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                y: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
              style={{ width: 260, height: 400 }}
            >
              <SnackBarIllustration flavor={flavor} config={config} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Snack bar SVG illustration ────────────────────────── */
function SnackBarIllustration({
  flavor,
  config,
}: {
  flavor: Flavor;
  config: (typeof flavorConfig)[Flavor];
}) {
  const isCoco = flavor === "coco";
  const uid = flavor;

  return (
    <svg
      viewBox="0 0 260 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.65))" }}
    >
      <defs>
        <linearGradient id={`kraft-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="45%" stopColor="#A07820" />
          <stop offset="100%" stopColor="#6B5010" />
        </linearGradient>
        <linearGradient id={`bar-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={config.barGradient[0]} />
          <stop offset="50%" stopColor={config.barGradient[1]} />
          <stop offset="100%" stopColor={config.barGradient[2]} />
        </linearGradient>
        <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="30" y="20" width="200" height="360" rx="24" />
        </clipPath>
      </defs>

      <rect x="30" y="20" width="200" height="360" rx="24" fill={`url(#kraft-${uid})`} />
      <line x1="30" y1="100" x2="230" y2="100" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <line x1="30" y1="300" x2="230" y2="300" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <path d="M30 104 Q80 109 130 104 Q180 99 230 104" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
      <path d="M30 296 Q80 291 130 296 Q180 301 230 296" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
      <path d="M30 20 Q130 42 230 20 L230 46 Q130 62 30 46 Z" fill="rgba(0,0,0,0.2)" />
      <path d="M30 380 Q130 358 230 380 L230 354 Q130 338 30 354 Z" fill="rgba(0,0,0,0.2)" />
      <rect x="46" y="112" width="168" height="176" rx="12" fill="#FDF6EC" />
      <text x="130" y="148" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="700" fontSize="17" fill="#2C1A0E" letterSpacing="0.8">
        Nossa Snacks
      </text>
      <line x1="58" y1="155" x2="202" y2="155" stroke={config.accentColor} strokeWidth="1.5" />
      <rect x="58" y="163" width="144" height="70" rx="10" fill={`url(#bar-${uid})`} />

      {isCoco ? (
        <>
          <ellipse cx="92" cy="198" rx="11" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-12 92 198)" />
          <ellipse cx="130" cy="190" rx="9" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(8 130 190)" />
          <ellipse cx="168" cy="200" rx="10" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-6 168 200)" />
        </>
      ) : (
        <>
          <rect x="76" y="172" width="20" height="20" rx="3" fill="rgba(0,0,0,0.35)" transform="rotate(8 76 172)" />
          <rect x="116" y="178" width="18" height="18" rx="3" fill="rgba(0,0,0,0.3)" transform="rotate(-6 116 178)" />
          <rect x="154" y="170" width="16" height="16" rx="3" fill="rgba(0,0,0,0.35)" transform="rotate(10 154 170)" />
          <circle cx="103" cy="196" r="5" fill="rgba(192,57,43,0.85)" />
          <circle cx="140" cy="193" r="4.5" fill="rgba(192,57,43,0.8)" />
          <circle cx="170" cy="199" r="4" fill="rgba(192,57,43,0.75)" />
        </>
      )}

      <text x="130" y="253" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="600" fontSize="13" fill="#2C1A0E">
        {config.tagline}
      </text>
      <rect x="74" y="261" width="112" height="20" rx="10" fill={config.accentColor} />
      <text x="130" y="275" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="600" fontSize="10" fill="#fff" letterSpacing="0.5">
        100% Natural
      </text>
      <rect x="30" y="20" width="200" height="360" rx="24" fill={`url(#shine-${uid})`} clipPath={`url(#clip-${uid})`} />

    </svg>
  );
}
