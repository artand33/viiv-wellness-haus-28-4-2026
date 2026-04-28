"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "Am I a good candidate for cosmetic injectables?",
    a: "Most healthy adults who want to address wrinkles, volume loss, or facial asymmetry are good candidates. During your consultation, our providers review your medical history and aesthetic goals to create a plan that's right for you — no two plans are the same.",
  },
  {
    q: "How long do results typically last?",
    a: "Botox and Dysport typically last 3–4 months. Dermal fillers can last anywhere from 6 months to 2 years depending on the product and treatment area. Skin boosters and regenerative treatments often have cumulative effects that improve over time.",
  },
  {
    q: "Is there any downtime after treatments?",
    a: "Most of our treatments require little to no downtime. Injectables may cause mild redness or swelling for 24–48 hours. Laser and energy treatments may have a longer recovery window, which we'll discuss in detail before your appointment.",
  },
  {
    q: "Will the results look natural?",
    a: "Natural results are our entire philosophy. We use advanced techniques and precise dosing to enhance your features without altering who you are. Our goal is for people to say you look refreshed — not that you 'had work done.'",
  },
  {
    q: "How do I prepare for my first appointment?",
    a: "Arrive with a clean face and avoid blood thinners (aspirin, ibuprofen, alcohol) 24–48 hours before injectable treatments. Wear comfortable clothing and feel free to bring photos of results you admire — they help us understand your vision.",
  },
  {
    q: "Do you offer payment plans or financing?",
    a: "Yes. We partner with financing options that allow you to split the cost of treatments into manageable monthly payments. Visit our Payment Plans page for details, or ask our team at your consultation.",
  },
];

function Item({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: "easeOut" }}
      className="border-b border-bone last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-serif text-lg font-light text-charcoal group-hover:text-stone transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-sand"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm leading-relaxed text-stone pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-cream-light py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,158,108,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
          transform: "translate(30%, -30%)",
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
          className="mb-14"
        >
          <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">Questions</p>
          <h2
            className="font-serif font-light text-charcoal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Frequently Asked
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {faqs.map((item, i) => (
            <Item key={i} q={item.q} a={item.a} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
