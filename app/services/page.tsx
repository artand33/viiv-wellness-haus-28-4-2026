"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "injectables",
    title: "Cosmetic Injectables",
    subtitle: "Wrinkle relaxers, volumizers & sculpting",
    photo: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #8B7E74 0%, #6B5244 100%)",
    services: [
      { name: "Botox® / Dysport® / Jeuveau® — Forehead", price: "Starts at $12/unit" },
      { name: "Masseter Botox", price: "Starts at $12/unit" },
      { name: "Nefertiti Neck Lift", price: "Starts at $12/unit" },
      { name: "Lip Flip", price: "Starts at $150" },
      { name: "Gummy Smile Correction", price: "Starts at $150" },
      { name: "Hyperhidrosis Treatment", price: "Starts at $12/unit" },
      { name: "Lip Augmentation — Dermal Filler", price: "Starts at $800" },
      { name: "Cheek Sculpting", price: "Starts at $850" },
      { name: "Jawline Sculpting", price: "Starts at $3,250" },
      { name: "Under-Eye Correction", price: "Starts at $1,000" },
      { name: "Nose Contouring", price: "Starts at $1,300" },
      { name: "Profile Balancing Bundle", price: "Starts at $2,500" },
    ],
  },
  {
    id: "skin",
    title: "Skin Treatments",
    subtitle: "Advanced skincare & resurfacing",
    photo: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #C4B9A8 0%, #8B7E74 100%)",
    services: [
      { name: "Microneedling", price: "Inquire for pricing" },
      { name: "Chemical Peels", price: "Inquire for pricing" },
      { name: "Skin Booster", price: "Inquire for pricing" },
      { name: "Filler Dissolving", price: "Inquire for pricing" },
    ],
  },
  {
    id: "laser",
    title: "Laser & Energy",
    subtitle: "Advanced laser and energy-based treatments",
    photo: "https://images.unsplash.com/photo-1580564591877-3a6578d09f5d?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #B8A898 0%, #7A6858 100%)",
    services: [
      { name: "Helix CO2 Laser (Cool Peel)", price: "Inquire for pricing" },
      { name: "Inmode Optima — Laser", price: "Inquire for pricing" },
      { name: "Inmode Morpheus8", price: "Inquire for pricing" },
      { name: "Inmode IPL", price: "Inquire for pricing" },
    ],
  },
  {
    id: "regenerative",
    title: "Regenerative",
    subtitle: "Platelet-rich therapies & bio-stimulators",
    photo: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #9A8F82 0%, #5C5248 100%)",
    services: [
      { name: "EZ PRF (Platelets-Rich Fibrin)", price: "Inquire for pricing" },
      { name: "EZ PRF Gel", price: "Inquire for pricing" },
      { name: "Sculptra (Collagen Stimulator)", price: "Inquire for pricing" },
    ],
  },
  {
    id: "wellness",
    title: "Wellness & IV",
    subtitle: "Holistic health and body treatments",
    photo: "https://images.unsplash.com/photo-1556229165-8aa0ceaa93a7?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #8FA8A0 0%, #506860 100%)",
    services: [
      { name: "IV Therapy", price: "Inquire for pricing" },
      { name: "Weight Loss Program", price: "Inquire for pricing" },
      { name: "Consultations", price: "Inquire for pricing" },
    ],
  },
  {
    id: "intimate",
    title: "Intimate Beauty",
    subtitle: "Advanced intimate wellness care",
    photo: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(148deg, #C8B0A8 0%, #887068 100%)",
    services: [
      { name: "Intimate Beauty Treatment", price: "Inquire for pricing" },
    ],
  },
];

function Accordion({ name, price }: { name: string; price: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-bone">
      <button
        className="w-full flex items-center justify-between py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-sans text-sm text-stone group-hover:text-charcoal transition-colors">{name}</span>
        <span className={`font-sans text-xs text-sand transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 flex items-center justify-between">
              <span className="font-serif text-base font-light text-charcoal">{price}</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[9px] tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 pb-px"
              >
                BOOK NOW ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ cat }: { cat: (typeof categories)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id={cat.id} ref={ref} className="py-16 lg:py-20 border-b border-bone last:border-none">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <div className="relative aspect-[4/3] lg:aspect-[3/4] mb-6 overflow-hidden">
            <Image
              src={cat.photo}
              alt={cat.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-2">{cat.title}</h2>
          <p className="font-sans text-sm text-sand">{cat.subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-3"
        >
          <div className="border-t border-bone">
            {cat.services.map((s) => (
              <Accordion key={s.name} name={s.name} price={s.price} />
            ))}
          </div>
          <div className="mt-8">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-charcoal px-7 py-3.5 font-sans text-[10px] tracking-[0.22em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              BOOK {cat.title.toUpperCase()}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-24 bg-cream-light min-h-screen">
      {/* Header */}
      <div
        className="py-20 px-8 text-center"
        style={{
          background: "linear-gradient(148deg, #18100d 0%, #3d2b22 100%)",
        }}
      >
        <p className="font-sans text-[9px] tracking-[0.35em] text-white/38 uppercase mb-4">What We Offer</p>
        <h1 className="font-serif font-light text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Our Services
        </h1>
      </div>

      {/* Free consultation banner */}
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-bone bg-cream p-8">
          <div>
            <p className="font-sans text-[9px] tracking-[0.28em] text-sand uppercase mb-1">Not sure where to start?</p>
            <p className="font-serif text-xl font-light text-charcoal">Book a complimentary 30-minute consultation — we&apos;ll build your plan.</p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 group inline-flex items-center gap-2 bg-charcoal px-7 py-3.5 font-sans text-[10px] tracking-[0.22em] text-white hover:bg-stone transition-colors duration-300"
          >
            FREE CONSULTATION →
          </a>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        {categories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
