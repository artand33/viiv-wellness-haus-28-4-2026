"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const pairs = [
  { label: "Masseter Botox",       cat: "Wrinkle Relaxers", before: "#D9D3CB", after: "#7A6858" },
  { label: "Lip Augmentation",     cat: "Dermal Fillers",   before: "#C4B9A8", after: "#6B5244" },
  { label: "Facial Harmonization", cat: "Full Treatment",   before: "#D0C8BF", after: "#8B7E74" },
];

function DragSlider({
  before,
  after,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-col-resize"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Before layer (full width, sits behind) */}
      <div className="absolute inset-0 w-full h-full">{before}</div>

      {/* After layer (clipped to left portion) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {after}
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-md z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal text-xs font-sans font-medium select-none">
          ⟷
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 font-sans text-[8px] tracking-[0.2em] text-charcoal/70 bg-white/50 px-2 py-1 uppercase pointer-events-none">
        BEFORE
      </span>
      <span className="absolute bottom-3 right-3 font-sans text-[8px] tracking-[0.2em] text-white/80 bg-black/25 px-2 py-1 uppercase pointer-events-none">
        AFTER
      </span>
    </div>
  );
}

export default function BeforeAfterPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-24 lg:py-32" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">
            Real Results
          </p>
          <h2
            className="font-serif font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Before &amp; After
          </h2>
          <p className="font-sans text-[10px] tracking-[0.15em] text-sand mt-4">
            Drag to reveal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {pairs.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.13 }}
              className="overflow-hidden"
            >
              <div className="aspect-square">
                <DragSlider
                  before={
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: p.before }}
                    />
                  }
                  after={
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: p.after }}
                    />
                  }
                />
              </div>
              <div className="bg-cream-light border border-bone border-t-0 p-5">
                <p className="font-serif text-lg font-light text-charcoal">{p.label}</p>
                <p className="font-sans text-[9px] tracking-[0.2em] text-sand uppercase mt-1">
                  {p.cat}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/before-after"
            className="font-sans text-[10px] tracking-[0.25em] text-stone hover:text-charcoal transition-colors border-b border-stone/50 hover:border-charcoal pb-0.5"
          >
            VIEW ALL RESULTS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
