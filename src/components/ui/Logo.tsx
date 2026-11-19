"use client";

import { useId } from "react";
import { motion } from "motion/react";

/**
 * Edrian Multimedia mark: an "E" whose middle bar is a play button —
 * the design side and the video side in one glyph.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId();
  const gradient = `logo-gradient-${id}`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-flare-400)" />
          <stop offset="55%" stopColor="var(--color-flare-500)" />
          <stop offset="100%" stopColor="var(--color-pulse-500)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradient})`} />
      <g fill="var(--color-ink-950)">
        <rect x="8.5" y="8" width="4" height="16" rx="1.2" />
        <rect x="8.5" y="8" width="14" height="4" rx="1.2" />
        <rect x="8.5" y="20" width="14" height="4" rx="1.2" />
        <path d="M15 13.4v5.2a.8.8 0 0 0 1.2.7l4.4-2.6a.8.8 0 0 0 0-1.4l-4.4-2.6a.8.8 0 0 0-1.2.7Z" />
      </g>
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <motion.span
        className="block"
        whileHover={{ rotate: -8, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 320, damping: 16 }}
      >
        <LogoMark />
      </motion.span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-tight text-ink-100">
          Edrian
        </span>
        <span className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.32em] text-flare-400">
          Multimedia
        </span>
      </span>
    </span>
  );
}
