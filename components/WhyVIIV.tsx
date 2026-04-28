"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

const pillars = [
  {
    number: "01",
    title: "Europe-Trained Precision",
    body: "Lulu and Yani traveled to Europe to train under world-renowned injectors — a level of craft rarely found in Miami. The difference shows in the details.",
  },
  {
    number: "02",
    title: "Medical Professionals, Not Aestheticians",
    body: "Our providers are APRN-BC certified advanced practice nurses. Your face is in the hands of clinicians with real medical training — not just aesthetic certification.",
  },
  {
    number: "03",
    title: "Natural Results Is Our Standard",
    body: "No frozen faces. No overfilled lips. We enhance your features — always. The goal is for people to say you look great, not that you 'had work done.'",
  },
  {
    number: "04",
    title: "Your Plan, Built From Scratch",
    body: "We don't fit you into a treatment menu. We assess your anatomy, understand your goals, and design a plan that is yours alone — then execute it with precision.",
  },
];

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")";

export default function WhyVIIV() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { open } = useBookingModal();

  return (
    <section
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#1C120A" }}
      ref={ref}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: grain }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,127,58,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
          transform: "translate(20%, -30%)",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <p className="font-sans text-[9px] tracking-[0.35em] text-white/30 uppercase mb-5">
            Why Choose Us
          </p>
          <h2
            className="font-serif font-light text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            There are 50+ med spas
            <br />
            in Miami Beach.
            <br />
            <em style={{ fontStyle: "italic" }}>Here&apos;s what makes us different.</em>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              className="relative p-10 lg:p-14 group"
              style={{ backgroundColor: "#1C120A" }}
            >
              {/* Hover warm wash */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(193,127,58,0.07) 0%, transparent 70%)" }}
              />

              <span className="font-serif text-[2.5rem] font-light text-white/8 leading-none block mb-6 select-none">
                {p.number}
              </span>

              {/* Thin accent line */}
              <motion.div
                className="w-8 h-px bg-white/20 mb-6"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                style={{ transformOrigin: "left" }}
              />

              <h3 className="font-serif text-xl lg:text-2xl font-light text-white mb-4 leading-snug">
                {p.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-white/45">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-16 pt-16 border-t border-white/8"
        >
          <p className="font-serif text-xl font-light text-white/70">
            Experience the difference yourself.
          </p>
          <button
            onClick={open}
            className="flex-shrink-0 group inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-sans text-[10px] tracking-[0.25em] text-white hover:bg-white hover:text-charcoal transition-all duration-300"
          >
            BOOK FREE CONSULTATION
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
