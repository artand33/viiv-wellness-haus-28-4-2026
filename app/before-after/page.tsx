"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

const treatments = [
  {
    label: "Lip Augmentation",
    category: "Lips",
    before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Lip Border Definition",
    category: "Lips",
    before: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Lip Volume & Shape",
    category: "Lips",
    before: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Facial Harmonization",
    category: "Face",
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Full Face Rejuvenation",
    category: "Face",
    before: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Skin Texture Renewal",
    category: "Face",
    before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Masseter Botox",
    category: "Jawline",
    before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Jaw Slimming",
    category: "Jawline",
    before: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Jawline Definition",
    category: "Jawline",
    before: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Cheek Sculpting",
    category: "Cheeks",
    before: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Cheek Volume Restore",
    category: "Cheeks",
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Cheek Lift",
    category: "Cheeks",
    before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Under-Eye Correction",
    category: "Eyes",
    before: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Tear Trough Filler",
    category: "Eyes",
    before: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Eye Area Rejuvenation",
    category: "Eyes",
    before: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Nose Contouring",
    category: "Nose",
    before: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Nose Bridge Refinement",
    category: "Nose",
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Non-Surgical Rhinoplasty",
    category: "Nose",
    before: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
    after:  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["All", "Lips", "Face", "Jawline", "Cheeks", "Eyes", "Nose"];

function Slider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square overflow-hidden cursor-col-resize select-none"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image — full color, always underneath */}
      <Image
        src={after}
        alt={`${label} after`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Before image — desaturated, clipped to left side */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${label} before`}
          fill
          className="object-cover object-top"
          style={{ filter: "grayscale(55%) brightness(0.88) contrast(0.95)" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-lg z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center select-none">
          <svg width="16" height="10" fill="none" viewBox="0 0 16 10">
            <path d="M1 5h14M5 1L1 5l4 4M11 1l4 4-4 4" stroke="#2C2520" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 font-sans text-[8px] tracking-[0.2em] text-white bg-black/40 px-2 py-1 uppercase pointer-events-none">
        BEFORE
      </span>
      <span className="absolute bottom-3 right-3 font-sans text-[8px] tracking-[0.2em] text-white bg-black/40 px-2 py-1 uppercase pointer-events-none">
        AFTER
      </span>
    </div>
  );
}

function Card({ t, index }: { t: typeof treatments[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="flex flex-col gap-3"
    >
      <Slider before={t.before} after={t.after} label={t.label} />
      <div className="px-1">
        <p className="font-sans text-[9px] tracking-[0.18em] text-sand uppercase mb-0.5">{t.category}</p>
        <p className="font-serif text-base font-light text-charcoal">{t.label}</p>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterPage() {
  const [active, setActive] = useState("All");
  const { open } = useBookingModal();

  const filtered = active === "All"
    ? treatments
    : treatments.filter((t) => t.category === active);

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Header */}
      <div className="py-20 px-8 text-center" style={{ backgroundColor: "#F5F0EB" }}>
        <p className="font-sans text-[9px] tracking-[0.35em] text-sand uppercase mb-4">Real Results</p>
        <h1
          className="font-serif font-light text-charcoal mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Before &amp; After
        </h1>
        <p className="font-sans text-sm text-stone max-w-md mx-auto leading-relaxed">
          Drag the slider on any photo to see the transformation.
        </p>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[60px] z-40 bg-white border-b border-bone">
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative flex-shrink-0 font-sans text-[10px] tracking-[0.22em] uppercase px-5 py-2 transition-colors duration-200 ${
                active === cat ? "text-white" : "text-stone hover:text-charcoal"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-charcoal"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto px-8 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((t, i) => (
              <Card key={t.label} t={t} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <p className="font-sans text-[9px] tracking-[0.25em] text-sand uppercase mb-6">
          Ready for your transformation?
        </p>
        <button
          onClick={open}
          className="group inline-flex items-center gap-3 bg-charcoal px-9 py-4 font-sans text-[10px] tracking-[0.28em] text-white hover:bg-charcoal/85 transition-all duration-300"
        >
          BOOK YOUR TREATMENT
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>
    </div>
  );
}
