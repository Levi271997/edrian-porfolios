"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Expand, Play } from "lucide-react";
import type { Project } from "@/lib/data";
import { asset } from "@/lib/asset";
import { useMediaQuery } from "@/lib/useMediaQuery";

const aspect: Record<Project["orientation"], string> = {
  vertical: "aspect-[9/16]",
  square: "aspect-square",
  landscape: "aspect-video",
};

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const [hovered, setHovered] = useState(false);
  const isVideo = project.kind === "video";
  // Only fetch the clip once someone actually hovers a card on desktop.
  const preview = isVideo && hovered && finePointer && !reduced;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.55,
        delay: Math.min((index % 12) * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective group mb-5 break-inside-avoid sm:mb-6"
    >
      <motion.button
        ref={ref}
        type="button"
        onClick={onOpen}
        onPointerMove={handleMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
        onFocus={() => setHovered(true)}
        onBlur={reset}
        aria-label={`${isVideo ? "Play" : "View"} ${project.title}`}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative block w-full overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900 text-left"
        data-cursor={isVideo ? "Play" : "View"}
      >
        <div className={`relative w-full overflow-hidden bg-ink-850 ${aspect[project.orientation]}`}>
          <motion.img
            src={asset(project.poster)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: hovered && !reduced ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {preview && (
            <video
              src={asset(project.src)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />

          <motion.div
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-ink-100 backdrop-blur-md"
            animate={{
              scale: hovered && !preview ? 1 : 0.7,
              opacity: hovered && !preview ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {isVideo ? <Play size={18} fill="currentColor" /> : <Expand size={18} />}
          </motion.div>

          {project.runtime && (
            <span className="absolute right-3 top-3 rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[10px] tracking-widest text-ink-100 backdrop-blur">
              {project.runtime}
            </span>
          )}

          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-ink-950/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-100 backdrop-blur">
            {project.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-base font-semibold tracking-tight text-ink-100 sm:text-lg">
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs text-ink-300 sm:text-sm">{project.client}</p>
            <motion.p
              initial={false}
              animate={{
                height: hovered ? "auto" : 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden text-xs leading-relaxed text-ink-300 sm:text-sm"
            >
              <span className="block pt-2">{project.blurb}</span>
            </motion.p>
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          animate={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(255,138,61,0.55)" : "inset 0 0 0 1px rgba(255,138,61,0)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.article>
  );
}
