"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Marquee from "./ui/Marquee";
import { profile, tools } from "@/lib/data";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div ref={ref} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* portrait stack */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              style={{ y, rotate }}
              className="grain relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-700 bg-gradient-to-br from-flare-600 via-rose-600 to-pulse-500"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.35),transparent_55%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-100/70">
                  Portrait / 2026
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-ink-100">
                  {profile.name}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-ink-700 bg-ink-900/90 px-5 py-4 backdrop-blur-xl sm:-right-8"
            >
              <p className="text-3xl font-semibold text-gradient">{profile.years}+</p>
              <p className="mt-0.5 max-w-[9rem] text-xs leading-snug text-ink-400">
                years on timelines and artboards
              </p>
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -left-6 -top-6 h-24 w-24 rounded-full border border-dashed border-flare-500/50 animate-spin-slow sm:-left-10"
            />
          </div>

          {/* copy */}
          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <SectionHeading
              eyebrow="About"
              title="A one-person post house."
            />

            <Reveal delay={0.1} className="flex flex-col gap-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              <div>
                <p>
                  I started in a college edit bay cutting gig footage for local
                  bands, then spent {profile.years} years splitting time between
                  post-production and the design side of the same campaigns.
                </p>
                <p className="mt-5">
                  That overlap is the point. When the person grading your film also
                  drew the wordmark on the end card, the whole thing lands as one
                  idea instead of three vendors arguing about hex codes.
                </p>
                <p className="mt-5">
                  I work with a small number of clients at a time — studios, record
                  labels, and founders who care about craft and hate long threads.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-center gap-2 text-sm text-ink-400">
                <MapPin size={15} className="text-flare-500" />
                {profile.location}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-20">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-ink-400">
            Tools of the trade
          </p>
          <div className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <Marquee
              items={tools}
              speed="slow"
              className="text-base font-medium text-ink-300"
              separator={<span className="h-1 w-1 rounded-full bg-ink-600" />}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
