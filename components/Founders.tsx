"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Founders() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-cream-light py-24 lg:py-36 overflow-hidden" ref={ref}>
      {/* Ambient warm glow — bottom left */}
      <div
        className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,158,108,0.11) 0%, transparent 65%)",
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
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-4">Our Founders</p>
          <h2 className="font-serif font-light text-charcoal leading-tight mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Meet the
            <br />
            Founders
          </h2>
          <p className="font-sans text-sm leading-relaxed text-stone mb-5">
            VIIV Wellness Haus was founded by two accomplished medical professionals,
            Lulu and Yani, who share a 15-year bond and a passion for making an
            impact on the aesthetics world.
          </p>
          <p className="font-sans text-sm leading-relaxed text-stone mb-5">
            Driven by this common goal, they traveled to Europe to study under the
            guidance of world-renowned injectors and master their skills.
          </p>
          <p className="font-sans text-sm leading-relaxed text-stone mb-12">
            At VIIV Wellness Haus, Lulu and Yani take great pride in their
            patient-centered approach, consistently delivering results that exceed
            expectations.
          </p>

          {/* Founders */}
          <div className="flex gap-10 items-start">
            {[
              { name: "Lulu", title: "APRN-BC · Co-Founder" },
              { name: "Yani", title: "APRN-BC · Co-Founder" },
            ].map((f, i) => (
              <div key={f.name} className={`flex gap-10 ${i > 0 ? "border-l border-bone pl-10" : ""}`}>
                <div>
                  <p className="font-serif text-2xl font-light text-charcoal">{f.name}</p>
                  <p className="font-sans text-[9px] tracking-[0.2em] text-sand uppercase mt-1">{f.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-full aspect-[4/5] relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
              alt="VIIV Wellness Haus founders Lulu and Yani"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-36 h-36 border-4 border-cream-light shadow-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80"
              alt="Clinical suite at VIIV Wellness Haus"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
