"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Button/link that leans toward the pointer while hovered.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
  cursorLabel,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  cursorLabel?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    className,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    style: { x: sx, y: sy },
    whileHover: reduced ? undefined : { scale: 1.04 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 340, damping: 22 },
    "data-cursor": cursorLabel ?? "",
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
