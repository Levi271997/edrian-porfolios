"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { asset } from "@/lib/asset";

const frame: Record<Project["orientation"], string> = {
  vertical: "aspect-[9/16] h-[min(82svh,calc((100vw-2rem)*16/9))]",
  square: "aspect-square h-[min(78svh,calc(100vw-2rem))]",
  landscape: "aspect-video w-[min(100vw-2rem,calc(78svh*16/9),72rem)]",
};

/**
 * Full-screen viewer for a project. Videos play with sound and controls;
 * graphics show at full size. Esc closes, ←/→ step through the list.
 */
export default function MediaLightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Project[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const item = open ? items[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink-950/90 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-ink-700 bg-ink-900/80 text-ink-100 transition-colors hover:bg-ink-800"
          >
            <X size={18} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-w-full flex-col items-center gap-4"
          >
            <div
              className={`relative max-w-full overflow-hidden rounded-2xl border border-ink-700 bg-black ${frame[item.orientation]}`}
            >
              {item.kind === "video" ? (
                <video
                  key={item.src}
                  src={asset(item.src)}
                  poster={asset(item.poster)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(item.src)}
                  alt={`${item.title} — ${item.client}`}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="max-w-xl text-center">
              <p className="text-lg font-semibold tracking-tight text-ink-100">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-ink-400">
                {item.client}
                {item.runtime && ` · ${item.runtime}`}
              </p>
            </div>
          </motion.div>

          {items.length > 1 && (
            <div
              className="mt-2 flex items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Previous"
                onClick={() => onIndex((index - 1 + items.length) % items.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-700 bg-ink-900/80 text-ink-100 transition-colors hover:bg-ink-800"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="min-w-16 text-center font-mono text-xs text-ink-400">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                aria-label="Next"
                onClick={() => onIndex((index + 1) % items.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-700 bg-ink-900/80 text-ink-100 transition-colors hover:bg-ink-800"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
