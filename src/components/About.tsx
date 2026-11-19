"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Cake, GraduationCap, MapPin } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Marquee from "./ui/Marquee";
import { profile, tools } from "@/lib/data";
import { asset } from "@/lib/asset";

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
              {/* Stylized (posterized, site-palette) version of Edrian's photo. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/media/about/edrian.jpg")}
                alt={`Illustrated portrait of ${profile.name}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-ink-100/70">
                  {profile.role}
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
                years editing video and designing graphics
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
              title={`Hi, I'm ${profile.name}.`}
            />

            <Reveal delay={0.1} className="flex flex-col gap-5 text-base leading-relaxed text-ink-300 sm:text-lg">
              <div>
                <p>
                  I&apos;m a {profile.age}-year-old video editor and graphic
                  designer, and a {profile.education} graduate. For the last{" "}
                  {profile.years} years I&apos;ve been making video ads, UGC edits,
                  AI videos and static graphics for brands.
                </p>
                <p className="mt-5">
                  Most of my work is direct-response: e-commerce, health,
                  insurance, beauty and home services. I care about the first
                  three seconds, clear captions and an offer people can&apos;t
                  miss. I also design the static ads, so the video and the
                  graphics match.
                </p>
                <p className="mt-5">
                  I edit in Adobe Premiere Pro and CapCut, and design in Adobe
                  Photoshop. I work freelance with clients anywhere.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                {[
                  { icon: MapPin, label: "Based in", value: "Philippines · Freelance" },
                  { icon: GraduationCap, label: "Education", value: profile.education },
                  { icon: Cake, label: "Age", value: `${profile.age}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-ink-800 bg-ink-900/50 px-4 py-3"
                  >
                    <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                      <Icon size={13} className="text-flare-500" />
                      {label}
                    </dt>
                    <dd className="mt-1 text-ink-100">{value}</dd>
                  </div>
                ))}
              </dl>
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
