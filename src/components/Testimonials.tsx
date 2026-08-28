"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const paginate = useCallback((dir: number) => {
    setState(([current]) => [
      (current + dir + testimonials.length) % testimonials.length,
      dir,
    ]);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => paginate(1), 6500);
    return () => clearInterval(id);
  }, [paused, reduced, paginate]);

  const active = testimonials[index];

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kind words"
          title="What clients say after delivery"
          align="center"
        />

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <Quote
            aria-hidden
            className="mx-auto mb-8 text-flare-500/40"
            size={44}
            strokeWidth={1.4}
          />

          <div className="relative min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-center"
              >
                <p className="text-xl font-medium leading-relaxed text-ink-100 sm:text-2xl">
                  {active.quote}
                </p>
                <footer className="mt-7">
                  <p className="font-semibold text-ink-100">{active.name}</p>
                  <p className="mt-0.5 text-sm text-ink-400">{active.title}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <motion.button
              type="button"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-flare-500 hover:text-flare-400"
            >
              <ArrowLeft size={16} />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className="group relative h-2 w-8 overflow-hidden rounded-full bg-ink-700"
                >
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-flare-500"
                    initial={false}
                    animate={{ scaleX: i === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </button>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-flare-500 hover:text-flare-400"
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
