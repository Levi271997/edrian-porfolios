"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animates a headline in word by word, each word rising out of a clipped row.
 */
export default function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.075,
  as = "h1",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: reduced
                ? { opacity: 0 }
                : { y: "110%", opacity: 0, rotate: 4 },
              visible: {
                y: "0%",
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
