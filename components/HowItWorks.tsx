"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

const steps = [
  {
    number: "01",
    title: "Schedule Online",
    description:
      "Book in under two minutes. Choose your service, a preferred provider, and a time that works for you — all from your phone.",
    cta: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M16 2v4M8 2v4M3 10h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 15h2m0 0h2m-2 0v-2m0 2v2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Your Consultation",
    description:
      "Meet Lulu or Yani in a private, comfortable setting. They review your goals, skin, and history — no treatment happens without this step.",
    cta: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Expert Treatment",
    description:
      "Receive your personalised care in our private clinical suite. We use only advanced, clinically-proven techniques for results that look natural.",
    cta: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M18 2l4 4-1.5 1.5-4-4L18 2zM15.5 4.5l4 4M7 17l-4 4M13.5 7.5l-6.5 6.5 3 3 6.5-6.5-3-3zM6.5 14l-2 2 2 2"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Lasting Results",
    description:
      "See beautiful, natural-looking results — and stay supported with dedicated follow-up care and a plan for what comes next.",
    cta: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6L12 2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
          d="M12 6v2M12 16v2M6 12h2M16 12h2"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { open } = useBookingModal();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{ backgroundColor: "#1e1410" }}
      className="py-24 lg:py-32 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-sans text-[9px] tracking-[0.35em] text-white/30 uppercase mb-4">
            The Process
          </p>
          <h2
            className="font-serif font-light text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            How It Works
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: "easeOut" }}
              style={{ backgroundColor: "#1e1410" }}
              className="p-8 lg:p-10 flex flex-col"
            >
              {/* Step number */}
              <span className="font-serif text-[3.5rem] font-light leading-none text-white/6 mb-6 select-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="text-white/40 mb-6">{step.icon}</div>

              {/* Thin rule */}
              <div className="w-6 h-px bg-white/15 mb-6" />

              {/* Text */}
              <h3 className="font-serif text-xl font-light text-white mb-3 tracking-wide">
                {step.title}
              </h3>
              <p className="font-sans text-[11px] leading-relaxed text-white/40 flex-1">
                {step.description}
              </p>

              {/* CTA only on step 1 */}
              {step.cta && (
                <button
                  onClick={open}
                  className="group mt-8 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] text-white/55 hover:text-white transition-colors border-b border-white/18 hover:border-white/45 pb-px w-fit"
                >
                  SCHEDULE NOW
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                    ↗
                  </span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
