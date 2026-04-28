"use client";

import { motion } from "framer-motion";

const cherryFeatures = [
  "No hard credit checks, ever",
  "True 0% APR options available",
  "Interest-bearing plans with APRs as low as 5.99%",
  "Up to $50,000 approvals",
  "No hidden fees",
  "Instant decision — apply in seconds",
];

export default function PaymentPlansPage() {
  return (
    <div className="pt-24 bg-cream-light min-h-screen">
      {/* Header */}
      <div
        className="py-20 px-8 text-center"
        style={{ background: "linear-gradient(148deg, #18100d 0%, #3d2b22 100%)" }}
      >
        <p className="font-sans text-[9px] tracking-[0.35em] text-white/38 uppercase mb-4">Flexible Options</p>
        <h1 className="font-serif font-light text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Payment Plans
        </h1>
        <p className="font-sans text-sm text-white/55 max-w-md mx-auto">
          We believe everyone deserves access to expert aesthetic care.
        </p>
      </div>

      <div className="max-w-screen-lg mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Cherry branding placeholder */}
          <div>
            <div
              className="w-full aspect-[4/3] mb-8 flex items-center justify-center"
              style={{ background: "linear-gradient(148deg, #E8F0EE 0%, #C8D8D4 100%)" }}
            >
              <div className="text-center">
                <div className="font-sans text-2xl font-semibold text-charcoal mb-1">Cherry</div>
                <div className="font-sans text-sm text-stone">Treat now, pay later</div>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-stone">
              VIIV Wellness Haus partners with Cherry to offer flexible payment plans that
              make your treatments more accessible — without compromising on quality.
            </p>
          </div>

          {/* Features */}
          <div id="cherry" className="bg-cream border border-bone p-10">
            <h2 className="font-serif text-3xl font-light text-charcoal mb-2">Treat Now,</h2>
            <h2 className="font-serif text-3xl font-light text-charcoal mb-8">Pay Later</h2>

            <ul className="space-y-4 mb-10">
              {cherryFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-taupe-dark mt-0.5 flex-shrink-0">✓</span>
                  <span className="font-sans text-sm text-stone">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://patient.withcherry.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-center gap-3 bg-charcoal px-8 py-4 font-sans text-[10px] tracking-[0.28em] text-white hover:bg-stone transition-colors duration-300 mb-3"
            >
              SEE IF YOU QUALIFY ↗
            </a>
            <p className="font-sans text-[9px] tracking-[0.1em] text-sand text-center">
              Opens Cherry patient portal · No hard credit check
            </p>
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="font-sans text-sm text-stone mb-6">
            Ready to schedule your treatment?
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-charcoal px-9 py-4 font-sans text-[10px] tracking-[0.28em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            BOOK AN APPOINTMENT
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
