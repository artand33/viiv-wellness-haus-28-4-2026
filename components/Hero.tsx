"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E\")";

export default function Hero() {
  const { open } = useBookingModal();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[680px] overflow-hidden flex flex-col justify-end"
    >
      {/* ── Background image (swap <Image> for <video> when client provides footage) ── */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 scale-110 will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80"
          alt="Elegant aesthetic treatment at VIIV Wellness Haus"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* ── Overlay: heavier left (text legibility), fades right (image breathes) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(108deg, rgba(16,9,5,0.82) 0%, rgba(16,9,5,0.62) 42%, rgba(16,9,5,0.28) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(16,9,5,0.55) 0%, transparent 100%)",
        }}
      />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: grain }}
      />

      {/* ── Content — vertically centered, only headline + credentials + subline + CTAs ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-20 w-full pb-24 lg:pb-28"
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-white leading-[1.05] mb-5"
          style={{ fontSize: "clamp(3.4rem, 8.5vw, 8rem)" }}
        >
          The Art of
          <br />
          <em className="italic" style={{ fontStyle: "italic" }}>Natural</em>
          <br />
          Results
        </motion.h1>

        {/* Credentials badge — proof, right under the promise */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="block w-5 h-px bg-white/30" />
          <span className="font-sans text-[10px] tracking-[0.28em] text-white/55 uppercase">
            Lulu &amp; Yani · APRN-BC · European-Trained Injectors
          </span>
        </motion.div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="font-sans text-[12px] tracking-[0.06em] text-white/50 mb-11 max-w-[340px] leading-relaxed"
        >
          Two board-certified nurse practitioners, trained under world-renowned
          injectors in Europe — bringing clinical precision to Miami Beach.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center gap-7"
        >
          <button
            onClick={open}
            className="group inline-flex items-center gap-3 bg-white px-9 py-4 font-sans text-[10px] tracking-[0.28em] text-charcoal hover:bg-white/90 transition-all duration-300"
          >
            BOOK APPOINTMENT
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
          <button
            onClick={open}
            className="font-sans text-[10px] tracking-[0.22em] text-white/45 hover:text-white/75 transition-colors border-b border-white/18 hover:border-white/45 pb-px"
          >
            FREE CONSULTATION
          </button>
        </motion.div>
      </motion.div>

      {/* ── Trust strip — pinned to bottom so it never affects vertical centering ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.35 }}
        className="absolute bottom-10 left-0 right-0 z-10 max-w-screen-2xl mx-auto px-8 lg:px-20"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {[
            "Trained in Europe",
            "APRN-BC Certified",
            "4.9★ Google Rating",
            "500+ Happy Clients",
          ].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/15 text-[10px]">|</span>}
              <span className="font-sans text-[9px] tracking-[0.22em] text-white/35 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-9 right-8 lg:right-20 flex flex-col items-center gap-2.5"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          className="w-px h-9 bg-gradient-to-b from-white/28 to-transparent"
        />
        <span className="font-sans text-[8px] tracking-[0.38em] text-white/22">SCROLL</span>
      </motion.div>
    </section>
  );
}
