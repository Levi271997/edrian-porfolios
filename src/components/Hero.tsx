"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, Play } from "lucide-react";
import SplitText from "./ui/SplitText";
import MagneticButton from "./ui/MagneticButton";
import Marquee from "./ui/Marquee";
import { marqueeWords, profile } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      {/* animated backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ scale }}
          className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-flare-600/25 blur-[130px] animate-float"
        />
        <motion.div
          style={{ scale }}
          className="absolute -right-32 top-[18%] h-[38rem] w-[38rem] rounded-full bg-pulse-500/25 blur-[140px] animate-float [animation-delay:-4s]"
        />
        <div className="absolute bottom-[-20%] left-1/3 h-[30rem] w-[30rem] rounded-full bg-mint-400/10 blur-[150px] animate-float [animation-delay:-7s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,150,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,150,0.06)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      </div>

      <motion.div
        style={reduced ? undefined : { y: smoothY, opacity }}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900/60 px-4 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
          </span>
          <span className="text-xs font-medium tracking-wide text-ink-300">
            Available for projects — Q4 2026
          </span>
        </motion.div>

        <h1 className="max-w-5xl">
          <SplitText
            as="span"
            text="I edit video"
            className="block text-[clamp(2.75rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-ink-100"
          />
          <SplitText
            as="span"
            text="and design brands."
            delay={0.18}
            className="block text-[clamp(2.75rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-gradient"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-300"
        >
          {profile.tagline} {profile.years} years cutting film and building
          identity systems for studios, labels and founders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#work"
            cursorLabel="See work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-flare-500 px-7 py-4 text-sm font-semibold text-ink-950 shadow-[0_0_40px_-8px_rgba(255,138,61,0.6)]"
          >
            View selected work
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </MagneticButton>

          <MagneticButton
            href="#showreel"
            cursorLabel="Play"
            className="group inline-flex items-center gap-3 rounded-full border border-ink-700 px-6 py-4 text-sm font-semibold text-ink-100 backdrop-blur transition-colors hover:border-ink-600 hover:bg-ink-900/60"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-100 text-ink-950 transition-transform duration-300 group-hover:scale-110">
              <Play size={13} fill="currentColor" />
            </span>
            Watch the showreel
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.15 }}
        className="mt-20 border-y border-ink-800 bg-ink-900/40 py-4 backdrop-blur"
      >
        <Marquee
          items={marqueeWords}
          className="text-sm font-medium uppercase tracking-[0.2em] text-ink-400"
        />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-400">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ink-700">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-flare-500"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
