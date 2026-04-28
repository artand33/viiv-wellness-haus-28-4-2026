"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "VIIV completely transformed my confidence. Lulu and Yani are so attentive — they listened to every concern and delivered results beyond what I imagined.",
    service: "Dermal Fillers",
  },
  {
    name: "Maria G.",
    rating: 5,
    text: "I've been to many med spas in Miami and nothing compares. The level of care and expertise here is extraordinary. Natural results, every time.",
    service: "Botox · Lip Augmentation",
  },
  {
    name: "Ana R.",
    rating: 5,
    text: "The most professional experience I've ever had. They walked me through everything step by step, made me feel comfortable, and the results are stunning.",
    service: "Facial Harmonization",
  },
  {
    name: "Jessica L.",
    rating: 5,
    text: "I drove from Fort Lauderdale and it was absolutely worth it. Yani is an artist. My skin has never looked better and it still looks completely natural.",
    service: "Skin Booster · PRF",
  },
];

const col1 = [reviews[0], reviews[2]];
const col2 = [reviews[1], reviews[3]];

type Review = typeof reviews[0];

function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="bg-cream-light border border-bone p-7 flex flex-col gap-5 w-full">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} className="text-taupe-dark text-sm">★</span>
        ))}
      </div>
      <p className="font-sans text-sm leading-relaxed text-stone">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="border-t border-bone pt-4">
        <p className="font-serif text-lg font-light text-charcoal">{review.name}</p>
        <p className="font-sans text-[9px] tracking-[0.18em] text-sand uppercase mt-0.5">
          {review.service}
        </p>
      </div>
    </div>
  );
}

function ScrollingColumn({
  reviews,
  duration,
  className = "",
}: {
  reviews: Review[];
  duration: number;
  className?: string;
}) {
  const items = [...reviews, ...reviews];
  return (
    <div className={`flex-1 overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5"
      >
        {items.map((review, i) => (
          <div key={i} aria-hidden={i >= reviews.length ? "true" : undefined}>
            <TestimonialCard review={review} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="reviews" className="relative bg-cream py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Ambient glow — top left */}
      <div
        className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,158,108,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-screen-xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">
            Client Stories
          </p>
          <h2
            className="font-serif font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex gap-5 max-h-[500px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
          }}
        >
          <ScrollingColumn reviews={col1} duration={22} />
          <ScrollingColumn reviews={col2} duration={28} className="hidden md:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/search?q=VIIV+Wellness+Haus+Miami+Beach"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.25em] text-stone hover:text-charcoal transition-colors border-b border-stone/50 hover:border-charcoal pb-0.5"
          >
            READ ALL REVIEWS ON GOOGLE ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
