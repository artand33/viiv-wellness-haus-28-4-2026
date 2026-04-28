"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Cosmetic Injectables",
    subtitle: "Botox · Dysport · Fillers",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    href: "/services#injectables",
  },
  {
    title: "Skin Treatments",
    subtitle: "Facials · Microneedling · Peels",
    src: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80",
    href: "/services#skin",
  },
  {
    title: "Regenerative",
    subtitle: "EZ PRF · PRF Gel · Sculptra",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    href: "/services#regenerative",
  },
  {
    title: "Laser & Energy",
    subtitle: "CO2 · Morpheus8 · IPL",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    href: "/services#laser",
  },
  {
    title: "Wellness & IV",
    subtitle: "IV Therapy · Weight Loss",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    href: "/services#wellness",
  },
  {
    title: "Intimate Beauty",
    subtitle: "Advanced Intimate Care",
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    href: "/services#intimate",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-cream py-20 lg:py-28 overflow-hidden">
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-14">
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">
            Our Expertise
          </p>
          <h2
            className="font-serif font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Treatment Services
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
        >
          {services.map((svc) => (
            <motion.div key={svc.title} variants={card}>
              <Link href={svc.href} className="group block relative overflow-hidden aspect-[3/4]">
                {/* Photo */}
                <Image
                  src={svc.src}
                  alt={svc.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Permanent dark gradient from bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

                {/* Hover dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7">
                  <p className="font-sans text-[8px] tracking-[0.22em] text-white/60 mb-1.5 uppercase">
                    {svc.subtitle}
                  </p>
                  <h3 className="font-serif text-lg lg:text-xl font-light text-white tracking-wide">
                    {svc.title}
                  </h3>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/0 group-hover:border-white/55 flex items-center justify-center transition-all duration-300">
                  <span className="text-white/0 group-hover:text-white/85 text-xs transition-all duration-300">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="font-sans text-[10px] tracking-[0.25em] text-stone hover:text-charcoal transition-colors border-b border-stone/50 hover:border-charcoal pb-0.5"
          >
            VIEW ALL SERVICES
          </Link>
        </div>
      </div>
    </section>
  );
}
