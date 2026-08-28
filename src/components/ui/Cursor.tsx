"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/**
 * A soft trailing cursor. Grows and shows a label when hovering anything
 * carrying data-cursor="Label". Hidden on touch / coarse-pointer devices.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const enabled = useMediaQuery("(pointer: fine)");
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    if (!enabled || reduced) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!target) {
        setLabel(null);
        setActive(false);
        return;
      }
      const custom = target.getAttribute("data-cursor");
      setLabel(custom && custom.length > 0 ? custom : null);
      setActive(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-flare-400/70 bg-flare-400/10 backdrop-blur-[2px]"
        animate={{
          width: label ? 92 : active ? 46 : 22,
          height: label ? 92 : active ? 46 : 22,
          backgroundColor: label
            ? "rgba(255,138,61,0.92)"
            : "rgba(255,176,87,0.12)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="px-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-950"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
