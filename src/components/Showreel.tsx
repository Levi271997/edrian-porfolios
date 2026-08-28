"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Pause, Play, Volume2 } from "lucide-react";
import { stats } from "@/lib/data";
import Counter from "./ui/Counter";

export default function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1.6, -1.6]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.15]);

  return (
    <section id="showreel" className="relative scroll-mt-24 py-20 sm:py-28">
      <div ref={ref} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          style={{ scale, rotate }}
          className="grain relative overflow-hidden rounded-[2rem] border border-ink-700 bg-ink-900"
        >
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="absolute inset-0 bg-gradient-to-br from-flare-600 via-pulse-500 to-sky-500"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,138,61,0.35),transparent_60%)]" />

          <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-6 sm:aspect-[21/9]">
            <motion.button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group relative grid h-20 w-20 place-items-center rounded-full bg-ink-100 text-ink-950 sm:h-24 sm:w-24"
              aria-label={playing ? "Pause showreel" : "Play showreel"}
              data-cursor={playing ? "Pause" : "Play reel"}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-ink-100"
                animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-ink-100"
                animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.1,
                }}
              />
              <AnimatePresence mode="wait">
                {playing ? (
                  <motion.span
                    key="pause"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Pause size={26} fill="currentColor" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="play"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="ml-1"
                  >
                    <Play size={26} fill="currentColor" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <div className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
                Showreel 2026
              </p>
              <p className="mt-1 text-sm text-ink-100/70">
                02:14 — edits, motion and identity work
              </p>
            </div>

            <div className="flex items-end gap-1" aria-hidden>
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-ink-100/70"
                  style={{ height: 6 }}
                  animate={
                    playing ? { height: [6, 8 + ((i * 7) % 30), 6] } : { height: 6 }
                  }
                  transition={{
                    duration: 0.7 + (i % 5) * 0.14,
                    repeat: playing ? Infinity : 0,
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-4 border-t border-white/10 bg-ink-950/50 px-5 py-4 backdrop-blur">
            <Volume2 size={16} className="shrink-0 text-ink-300" />
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink-100/15">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-flare-500"
                animate={{ width: playing ? "100%" : "8%" }}
                transition={{
                  duration: playing ? 12 : 0.4,
                  ease: "linear",
                  repeat: playing ? Infinity : 0,
                }}
              />
            </div>
            <span className="shrink-0 font-mono text-xs text-ink-300">02:14</span>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink-800 pt-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-ink-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
