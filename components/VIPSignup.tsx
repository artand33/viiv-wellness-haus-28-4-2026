"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")";

const perks = [
  "Early access to new treatments",
  "Exclusive member-only offers",
  "Seasonal wellness edits",
];

export default function VIPSignup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    // TODO: connect to Mailchimp / Klaviyo / etc.
  }

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#18100D" }}
      ref={ref}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: grain }}
      />

      {/* Ambient glow — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(193,127,58,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-[9px] tracking-[0.38em] text-white/30 uppercase mb-5"
          >
            VIP Access
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-light text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Join the VIIV Inner Circle
          </motion.h2>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-12"
          >
            {perks.map((perk, i) => (
              <span key={i} className="flex items-center gap-2 font-sans text-[9px] tracking-[0.15em] text-white/40">
                <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                {perk}
              </span>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent border border-white/20 px-5 py-4 font-sans text-[11px] tracking-[0.1em] text-white placeholder:text-white/25 outline-none focus:border-white/50 transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-white px-8 py-4 font-sans text-[10px] tracking-[0.22em] text-charcoal hover:bg-white/85 transition-colors duration-200"
                  >
                    JOIN
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <svg width="16" height="16" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-serif text-xl font-light text-white">You&apos;re on the list.</p>
                  <p className="font-sans text-[10px] tracking-[0.15em] text-white/40">
                    Welcome to the VIIV Inner Circle.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <p className="font-sans text-[9px] tracking-[0.12em] text-red-400/80 mt-3">{error}</p>
            )}

            {/* Fine print */}
            {!submitted && (
              <p className="font-sans text-[8px] tracking-[0.12em] text-white/20 mt-5">
                We never spam. Unsubscribe anytime.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
