"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import MediaLightbox from "./MediaLightbox";
import { categories, projects, type Category } from "@/lib/data";

const PAGE = 12;

export default function Work() {
  const [active, setActive] = useState<Category>("All");
  const [visible, setVisible] = useState(PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      active === "All" ? projects : projects.filter((p) => p.category === active),
    [active],
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const count = (cat: Category) =>
    cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <section id="work" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Ads, UGC and AI video that stop the scroll"
            description="Video ads, UGC, AI-generated spots, long-form pieces and static graphics made for brands across e-commerce, health, insurance and beauty."
          />

          <LayoutGroup id="work-filters">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hide-scrollbar -mx-4 flex shrink-0 gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0"
              role="tablist"
              aria-label="Filter work by category"
            >
              {categories.map((cat) => {
                const isActive = cat === active;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActive(cat);
                      setVisible(PAGE);
                    }}
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
                    <span className="relative z-10">
                      {cat}
                      <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "text-ink-600" : "text-ink-400"}`}>
                        {count(cat)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>

        <div key={active} className="mt-14 columns-2 gap-5 sm:gap-6 md:columns-3 lg:columns-4">
          <AnimatePresence>
            {shown.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={() => setOpenIndex(i)}
              />
            ))}
          </AnimatePresence>
        </div>

        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE)}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-700 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-600 hover:bg-ink-900/60"
            >
              Show more
              <span className="font-mono text-xs text-ink-400">({remaining})</span>
              <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>

      <MediaLightbox
        items={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndex={setOpenIndex}
      />
    </section>
  );
}
