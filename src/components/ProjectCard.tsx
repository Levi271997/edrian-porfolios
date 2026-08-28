"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/lib/data";

const spanClass: Record<Project["span"], string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  normal: "",
};

const aspect: Record<Project["span"], string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4] sm:aspect-auto sm:h-full sm:min-h-[34rem]",
  normal: "aspect-[4/3]",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
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
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`perspective group ${spanClass[project.span]}`}
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900"
        data-cursor={project.runtime ? "Play" : "View"}
      >
        {/* poster */}
        <div className={`grain relative w-full overflow-hidden ${aspect[project.span]}`}>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
            animate={{ scale: hovered && !reduced ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

          {/* sweeping light */}
          <motion.div
            className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/20 blur-md"
            animate={{ x: hovered && !reduced ? "420%" : "0%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {project.runtime && (
            <>
              <motion.div
                className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-ink-100 backdrop-blur-md"
                animate={{
                  scale: hovered ? 1 : 0.7,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Play size={20} fill="currentColor" />
              </motion.div>
              <span className="absolute right-4 top-4 rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[10px] tracking-widest text-ink-100 backdrop-blur">
                {project.runtime}
              </span>
            </>
          )}

          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-ink-950/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-100 backdrop-blur">
            {project.category}
          </span>
        </div>

        {/* meta */}
        <div className="relative flex flex-col gap-2 p-6" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-ink-100">
                {project.title}
              </h3>
              <p className="mt-0.5 text-sm text-ink-400">
                {project.client} · {project.year}
              </p>
            </div>
            <motion.span
              className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-700 text-ink-300"
              animate={{
                rotate: hovered ? 45 : 0,
                backgroundColor: hovered ? "#ff8a3d" : "rgba(0,0,0,0)",
                color: hovered ? "#08080a" : "#a5a5bd",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </div>

          <motion.p
            initial={false}
            animate={{
              height: hovered ? "auto" : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden text-sm leading-relaxed text-ink-300"
          >
            {project.blurb}
          </motion.p>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-flare-500/0"
          animate={{ boxShadow: hovered ? "0 0 0 1px rgba(255,138,61,0.45)" : "0 0 0 1px rgba(255,138,61,0)" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.article>
  );
}
