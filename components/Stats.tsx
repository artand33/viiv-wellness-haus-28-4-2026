"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);
  return count;
}

type StatItem =
  | { numeric: number; suffix: string; label: string }
  | { text: string; label: string };

const stats: StatItem[] = [
  { numeric: 500, suffix: "+", label: "Happy Clients" },
  { numeric: 8,   suffix: "+", label: "Years Experience" },
  { text: "4.9★",              label: "Google Rating" },
  { text: "Miami Beach",       label: "Florida" },
];

function NumericStat({
  numeric, suffix, label, inView, index,
}: {
  numeric: number; suffix: string; label: string; inView: boolean; index: number;
}) {
  const count = useCountUp(numeric, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col items-center py-8 px-6"
    >
      <span className="font-serif text-[2rem] font-light text-white leading-none tabular-nums">
        {count}{suffix}
      </span>
      <span className="font-sans text-[8px] tracking-[0.28em] text-white/40 mt-2 uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ backgroundColor: "#2C2520" }}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {stats.map((stat, i) =>
          "numeric" in stat ? (
            <NumericStat
              key={stat.label}
              numeric={stat.numeric}
              suffix={stat.suffix}
              label={stat.label}
              inView={inView}
              index={i}
            />
          ) : (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center py-8 px-6"
            >
              <span className="font-serif text-[2rem] font-light text-white leading-none">
                {stat.text}
              </span>
              <span className="font-sans text-[8px] tracking-[0.28em] text-white/40 mt-2 uppercase">
                {stat.label}
              </span>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}
