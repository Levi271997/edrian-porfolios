"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionHeading from "./ui/SectionHeading";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no surprises"
          description="The same simple process for a 7-second bumper or a full batch of ads. You always know what happens next."
        />

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* rail */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 h-full w-px bg-ink-800 sm:left-[27px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute left-[15px] top-2 h-full w-px origin-top bg-gradient-to-b from-flare-400 via-flare-500 to-pulse-500 sm:left-[27px]"
          />

          <ol className="flex flex-col gap-14">
            {processSteps.map((item, i) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <motion.span
                  className="absolute -left-10 top-1 grid h-8 w-8 place-items-center rounded-full border border-ink-700 bg-ink-950 font-mono text-[11px] text-ink-300 sm:-left-16"
                  whileInView={{
                    borderColor: "rgba(255,138,61,0.7)",
                    color: "#ffb057",
                  }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.step}
                </motion.span>

                <h3 className="text-2xl font-semibold tracking-tight text-ink-100 transition-colors group-hover:text-flare-400 sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-300">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
