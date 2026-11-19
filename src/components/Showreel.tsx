"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import { showreel, stats } from "@/lib/data";
import { asset } from "@/lib/asset";
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
          // Hold the frame still once the video is playing.
          style={playing ? undefined : { scale, rotate }}
          className="grain relative overflow-hidden rounded-[2rem] border border-ink-700 bg-ink-900"
        >
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="absolute inset-0 bg-gradient-to-br from-flare-600 via-pulse-500 to-sky-500"
          />

          <div className="relative aspect-video">
            {playing ? (
              <video
                src={asset(showreel.src)}
                poster={asset(showreel.poster)}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full bg-black object-contain"
              />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(showreel.poster)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-ink-950/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,138,61,0.35),transparent_60%)]" />

                <div className="relative flex h-full flex-col items-center justify-center gap-5 px-4 sm:gap-6">
                  <motion.button
                    type="button"
                    onClick={() => setPlaying(true)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative grid h-16 w-16 place-items-center rounded-full bg-ink-100 text-ink-950 sm:h-24 sm:w-24"
                    aria-label={`Play ${showreel.title}`}
                    data-cursor="Play reel"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full border border-ink-100"
                      animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full border border-ink-100"
                      animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
                    />
                    <Play size={26} fill="currentColor" className="ml-1" />
                  </motion.button>

                  <div className="text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-flare-400">
                      Featured · {showreel.client}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
                      {showreel.title}
                    </p>
                    <p className="mt-1 hidden text-sm text-ink-100/70 sm:block">
                      {showreel.runtime} — {showreel.blurb}
                    </p>
                  </div>
                </div>
              </>
            )}
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
