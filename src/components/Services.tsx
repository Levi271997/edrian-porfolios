"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "./ui/SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-96 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.14),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What I do"
          title="Video and graphics for ads that convert"
          description="One person for the edit and the static creative, so your video ads and graphics match and ship together."
        />

        <motion.div
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
          }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={reduced ? undefined : { y: -4 }}
                className="group relative flex flex-col gap-4 bg-ink-900 p-8 transition-colors duration-300 hover:bg-ink-850"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-flare-500 to-pulse-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.45 }}
                />

                <motion.span
                  className="grid h-12 w-12 place-items-center rounded-xl border border-ink-700 bg-ink-800 text-flare-400"
                  whileHover={reduced ? undefined : { rotate: -8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Icon size={20} strokeWidth={1.7} />
                </motion.span>

                <h3 className="text-lg font-semibold tracking-tight text-ink-100">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-300">{service.body}</p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-400 transition-colors group-hover:border-flare-500/40 group-hover:text-ink-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
