"use client";

import type { ReactNode } from "react";

export default function Marquee({
  items,
  speed = "normal",
  reverse = false,
  separator,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  speed?: "normal" | "slow";
  reverse?: boolean;
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`flex w-max shrink-0 items-center gap-8 pr-8 ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={`flex items-center gap-8 ${itemClassName}`}>
            {item}
            {separator ?? (
              <span className="text-flare-500/70">&#9679;</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
