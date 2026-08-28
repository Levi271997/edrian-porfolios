"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import { categories, projects, type Category } from "@/lib/data";

export default function Work() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      active === "All" ? projects : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="work" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent cuts and campaigns"
            description="A slice of what shipped in the last two years — edits, motion systems, identities and print."
          />

          <LayoutGroup id="work-filters">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hide-scrollbar -mx-4 flex shrink-0 gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
              role="tablist"
              aria-label="Filter projects by category"
            >
              {categories.map((cat) => {
                const isActive = cat === active;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(cat)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-ink-950" : "text-ink-300 hover:text-ink-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-ink-100"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>

        <motion.div
          layout
          className="mt-14 grid auto-rows-min grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
