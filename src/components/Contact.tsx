"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";
import { profile, socials } from "@/lib/data";

const budgets = ["Under 2k", "2k – 5k", "5k – 15k", "15k and up"];
const needs = ["Video edit", "Motion", "Branding", "Print", "Not sure yet"];

type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [budget, setBudget] = useState(budgets[1]);
  const [need, setNeed] = useState(needs[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Demo only — wire this to a form backend or a Next.js route handler.
    setTimeout(() => setStatus("sent"), 1300);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[36rem] bg-[radial-gradient(ellipse_at_bottom,rgba(255,138,61,0.16),transparent_65%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Contact"
              title="Got something to cut or brand?"
              description="Tell me the goal and the deadline. You will get a reply within one business day, with a scope and a fixed price attached."
            />

            <div className="flex flex-col gap-4">
              <a
                href={"mailto:" + profile.email}
                className="group inline-flex w-fit items-center gap-3 text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl"
                data-cursor="Email"
              >
                <Mail size={22} className="text-flare-500" />
                <span className="relative">
                  {profile.email}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-flare-500 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>

              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -3 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 px-4 py-2 text-sm text-ink-300 transition-colors hover:border-flare-500/60 hover:text-ink-100"
                    >
                      {social.label}
                      <ArrowRight size={13} className="-rotate-45" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-5 rounded-3xl border border-ink-700 bg-ink-900/70 p-7 backdrop-blur-xl sm:p-9"
          >
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@studio.com" />

            <Chips label="What do you need?" options={needs} value={need} onChange={setNeed} />
            <Chips label="Budget range" options={budgets} value={budget} onChange={setBudget} />

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Project details
              </span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Deadline, deliverables, links to references..."
                className="resize-none rounded-xl border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-600 focus:border-flare-500"
              />
            </label>

            <MagneticButton
              type="submit"
              cursorLabel="Send"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-flare-500 px-7 py-4 text-sm font-semibold text-ink-950"
            >
              <span className="pointer-events-none flex items-center gap-2">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      Send the brief <ArrowRight size={15} />
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={15} className="animate-spin" /> Sending
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={15} /> Brief received
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </MagneticButton>

            <p className="text-center text-xs text-ink-600">
              Demo form — nothing is sent anywhere yet.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="rounded-xl border border-ink-700 bg-ink-950/60 px-4 py-3 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-600 focus:border-flare-500"
      />
    </label>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === value;
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              whileTap={{ scale: 0.94 }}
              aria-pressed={isActive}
              className={
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors " +
                (isActive
                  ? "border-flare-500 bg-flare-500/15 text-flare-400"
                  : "border-ink-700 text-ink-400 hover:text-ink-100")
              }
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
