"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function Counter({
  to,
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduced) {
      node.textContent = `${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, to, suffix, duration, reduced]);

  return <span ref={ref}>0{suffix}</span>;
}
