"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import Marquee from "./ui/Marquee";
import { profile, socials } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink-800">
      <div className="py-10">
        <Marquee
          items={["Let us make something", "Available for projects", "Say hello"]}
          speed="slow"
          className="text-[clamp(2.5rem,9vw,6rem)] font-semibold tracking-tight text-ink-800"
          separator={<span className="text-flare-600/50">/</span>}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink-100">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-ink-400">{profile.role}</p>
          <p className="mt-6 text-xs text-ink-600">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-sm text-ink-300 transition-colors hover:text-ink-100"
                >
                  {social.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-flare-500 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <motion.a
            href="#top"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-5 py-2.5 text-sm text-ink-300 transition-colors hover:border-flare-500/60 hover:text-ink-100"
            data-cursor="Back up"
          >
            Back to top
            <ArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
