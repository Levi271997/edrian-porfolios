"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-3 sm:px-6"
      >
        <motion.nav
          animate={{
            backgroundColor: scrolled ? "rgba(13,13,17,0.72)" : "rgba(13,13,17,0)",
            borderColor: scrolled ? "rgba(52,52,74,0.6)" : "rgba(52,52,74,0)",
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 backdrop-blur-xl sm:px-6"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            data-cursor="Top"
          >
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-flare-400 to-pulse-500">
              <span className="font-display text-sm font-bold text-ink-950">E</span>
              <motion.span
                className="absolute inset-0 bg-ink-950"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-100">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block px-3.5 py-2 text-sm text-ink-300 transition-colors hover:text-ink-100"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-flare-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden rounded-full bg-ink-100 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-flare-400 sm:block"
              data-cursor="Say hi"
            >
              Start a project
            </motion.a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-700 text-ink-100 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="flex h-full flex-col items-center justify-center gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-3xl font-semibold tracking-tight text-ink-100"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
