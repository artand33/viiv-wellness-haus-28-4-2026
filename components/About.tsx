"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

export default function About() {
  const { open } = useBookingModal();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-cream-light py-24 lg:py-36 overflow-hidden" ref={ref}>
      {/* Ambient warm glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,158,108,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative pb-14"
        >
          {/* Main image */}
          <div className="w-full aspect-[4/5] relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
              alt="Woman receiving a facial treatment at VIIV Wellness Haus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Inset smaller image */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute -bottom-4 right-[-1.5rem] w-[45%] aspect-[3/4] border-4 border-cream-light shadow-xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80"
              alt="Skincare close-up"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>
          {/* Tagline label */}
          <div className="absolute bottom-0 left-0 border-l-2 border-charcoal pl-4">
            <p className="font-sans text-[9px] tracking-[0.22em] text-stone uppercase leading-relaxed">
              Delivering Tailored and
              <br />
              Attentive Service
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        >
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-4">
            About VIIV Wellness Haus
          </p>
          <h2 className="font-serif font-light text-charcoal leading-tight mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            An All-Inclusive
            <br />
            Med Spa Experience
          </h2>
          <p className="font-sans text-sm leading-relaxed text-stone mb-5">
            Experience an all-inclusive Med Spa in Miami Beach, FL offering the
            latest techniques and advanced treatment modalities in cosmetic
            injectables, skincare treatments, and wellness therapies.
          </p>
          <p className="font-sans text-sm leading-relaxed text-stone mb-10">
            What distinguishes VIIV Wellness Haus is our steadfast dedication to
            customer care. We take immense pride in delivering tailored and
            attentive service to each of our clients.
          </p>
          <button
            onClick={open}
            className="group inline-flex items-center gap-3 border border-charcoal px-8 py-4 font-sans text-[10px] tracking-[0.25em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            BOOK APPOINTMENT
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
