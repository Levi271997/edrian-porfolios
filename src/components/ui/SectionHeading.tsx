"use client";

import { motion } from "motion/react";
import SplitText from "./SplitText";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare-500 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-flare-500" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-400">
          {eyebrow}
        </span>
      </motion.div>

      <SplitText
        as="h2"
        text={title}
        className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink-100 sm:text-5xl md:text-6xl"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className={`max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
