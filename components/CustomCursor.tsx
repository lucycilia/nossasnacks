"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 90;

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-SIZE * 2);
  const rawY = useMotionValue(-SIZE * 2);

  // Spring config: lower stiffness / higher damping = more lag/easing
  const x = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    // Only active on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX - SIZE / 2);
      rawY.set(e.clientY - SIZE / 2);
    }

    function onEnter(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (el.closest("[data-custom-cursor]")) {
        setVisible(true);
      }
    }

    function onLeave(e: MouseEvent) {
      const el = e.relatedTarget as HTMLElement | null;
      if (!el || !el.closest("[data-custom-cursor]")) {
        setVisible(false);
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        background: "#ffffff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        x,
        y,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.4,
      }}
      transition={{ opacity: { duration: 0.18 }, scale: { duration: 0.18 } }}
    />
  );
}
