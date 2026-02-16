"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold tracking-tight text-foreground md:text-7xl"
      >
        Nossa Snacks
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 max-w-xl text-lg text-muted md:text-xl"
      >
        {/* Replace with your tagline */}
        Em breve. Seja o primeiro a saber.
      </motion.p>

      <motion.a
        href="#waitlist"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 inline-block rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-colors hover:opacity-90"
      >
        Entrar na lista de espera
      </motion.a>
    </section>
  );
}
