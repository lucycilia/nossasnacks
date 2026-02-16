"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Flavor = "cranberry" | "coco";

const flavorConfig = {
  cranberry: {
    label: "Cranberry",
    barColor: "#8B1A1A",
    accentColor: "#C0392B",
    tagline: "Cranberry & Chocolate",
    barGradient: ["#6B1414", "#A52525", "#6B1414"],
  },
  coco: {
    label: "Coco",
    barColor: "#4A3728",
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── Background image + overlay ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,6,2,0.85) 0%, rgba(26,14,6,0.72) 50%, rgba(15,6,2,0.55) 100%)",
          }}
        />
      </div>

      {/* ── Flavor toggle — top right ─── */}
      <div className="relative z-10 flex justify-end px-6 pt-6">
        <div
          className="flex rounded-full overflow-hidden"
          style={{ border: "1.5px solid rgba(253,246,236,0.3)" }}
        >
          {(["cranberry", "coco"] as Flavor[]).map((f, i) => (
            <button
              key={f}
              onClick={() => setFlavor(f)}
              className="px-4 py-1.5 text-sm transition-all duration-300"
              style={{
                background: flavor === f ? "#C0392B" : "rgba(0,0,0,0.35)",
                color: flavor === f ? "#fff" : "rgba(253,246,236,0.65)",
                fontFamily: "Reigo, system-ui, sans-serif",
                fontWeight: flavor === f ? 600 : 300,
                borderRight: i === 0 ? "1px solid rgba(253,246,236,0.2)" : undefined,
              }}
            >
              {flavorConfig[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ─── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-8 gap-10 lg:gap-20 max-w-7xl mx-auto w-full">

        {/* Left: copy + form + badge */}
        <div className="flex-1 flex flex-col items-start max-w-lg relative">

          {/* Badge: seu snack do bem — top-left of this column */}
          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
            animate={{ opacity: 1, rotate: -10, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5, type: "spring" }}
            className="absolute -top-6 -left-8 z-20 hidden sm:block"
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
            className="mt-16 sm:mt-24 text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1]"
            style={{ color: "#FDF6EC", fontFamily: "Reigo, system-ui, sans-serif", fontWeight: 300 }}
          >
            Seu novo snack{" "}
            <span style={{ fontWeight: 700 }}>favorito.</span>
            <br />
            <span
              style={{
                fontWeight: 700,
                color: config.accentColor,
                transition: "color 0.5s ease",
              }}
            >
              Sem culpa.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-base sm:text-lg"
            style={{ color: "#C9A97A", fontWeight: 300 }}
          >
            Lançamento Julho 2026 &nbsp;•&nbsp; Primeiros 500 ganham desconto
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-8 w-full"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg"
                  style={{ color: "#C9A97A", fontWeight: 400 }}
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
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
                    style={{
                      background: "rgba(253,246,236,0.1)",
                      border: "1.5px solid rgba(253,246,236,0.3)",
                      color: "#FDF6EC",
                      backdropFilter: "blur(8px)",
                      fontFamily: "Reigo, system-ui, sans-serif",
                      fontWeight: 300,
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full px-7 py-3 text-sm font-semibold text-white whitespace-nowrap disabled:opacity-60"
                    style={{
                      background: config.accentColor,
                      fontFamily: "Reigo, system-ui, sans-serif",
                      fontWeight: 600,
                      transition: "background 0.4s ease",
                    }}
                  >
                    {status === "loading" ? "Enviando…" : "Eu quero!"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {status === "error" && (
              <p className="mt-2 text-sm" style={{ color: "#e87a6a" }}>{message}</p>
            )}

            <p
              className="mt-2 text-xs"
              style={{ color: "rgba(201,169,122,0.65)", fontStyle: "italic" }}
            >
              Sem spam. Só amor. 🤍
            </p>
          </motion.div>
        </div>

        {/* Right: snack bar + badge */}
        <div className="relative flex items-center justify-center w-full lg:w-auto">

          {/* Badge: Toooooda natural */}
          <motion.div
            initial={{ opacity: 0, rotate: 15, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 12, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="absolute -top-4 -right-2 lg:-right-6 z-20"
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
  const uid = flavor; // unique gradient id per flavor

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

      {/* Wrapper body */}
      <rect x="30" y="20" width="200" height="360" rx="24" fill={`url(#kraft-${uid})`} />

      {/* Crinkle texture lines */}
      <line x1="30" y1="100" x2="230" y2="100" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <line x1="30" y1="300" x2="230" y2="300" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <path d="M30 104 Q80 109 130 104 Q180 99 230 104" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
      <path d="M30 296 Q80 291 130 296 Q180 301 230 296" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />

      {/* Seal folds */}
      <path d="M30 20 Q130 42 230 20 L230 46 Q130 62 30 46 Z" fill="rgba(0,0,0,0.2)" />
      <path d="M30 380 Q130 358 230 380 L230 354 Q130 338 30 354 Z" fill="rgba(0,0,0,0.2)" />

      {/* Label area */}
      <rect x="46" y="112" width="168" height="176" rx="12" fill="#FDF6EC" />

      {/* Brand */}
      <text x="130" y="148" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="700" fontSize="17" fill="#2C1A0E" letterSpacing="0.8">
        Nossa Snacks
      </text>
      <line x1="58" y1="155" x2="202" y2="155" stroke={config.accentColor} strokeWidth="1.5" />

      {/* Bar illustration */}
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

      {/* Flavor name */}
      <text x="130" y="253" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="600" fontSize="13" fill="#2C1A0E">
        {config.tagline}
      </text>

      {/* Natural tag */}
      <rect x="74" y="261" width="112" height="20" rx="10" fill={config.accentColor} />
      <text x="130" y="275" textAnchor="middle" fontFamily="Reigo, system-ui, sans-serif" fontWeight="600" fontSize="10" fill="#fff" letterSpacing="0.5">
        100% Natural
      </text>

      {/* Shine */}
      <rect x="30" y="20" width="200" height="360" rx="24" fill={`url(#shine-${uid})`} clipPath={`url(#clip-${uid})`} />

      {/* Decorative dots */}
      {isCoco ? (
        <>
          <circle cx="16" cy="155" r="9" fill="rgba(212,168,83,0.65)" />
          <circle cx="246" cy="198" r="7" fill="rgba(212,168,83,0.55)" />
          <circle cx="20" cy="278" r="5" fill="rgba(212,168,83,0.45)" />
        </>
      ) : (
        <>
          <circle cx="14" cy="152" r="10" fill="rgba(192,57,43,0.72)" />
          <circle cx="248" cy="198" r="7" fill="rgba(192,57,43,0.62)" />
          <circle cx="18" cy="276" r="6" fill="rgba(192,57,43,0.52)" />
          <circle cx="242" cy="308" r="5" fill="rgba(192,57,43,0.45)" />
        </>
      )}
    </svg>
  );
}
