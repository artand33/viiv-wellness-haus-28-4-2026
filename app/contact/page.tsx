"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useBookingModal } from "@/components/BookingModal";

export default function ContactPage() {
  const { open } = useBookingModal();

  return (
    <div className="pt-24 bg-cream-light min-h-screen">
      {/* Header */}
      <div className="py-20 px-8 text-center" style={{ backgroundColor: "#F5F0EB" }}>
        <p className="font-sans text-[9px] tracking-[0.35em] text-sand uppercase mb-4">Get In Touch</p>
        <h1 className="font-serif font-light text-charcoal" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Contact Us
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full aspect-[4/3] mb-10 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="VIIV Wellness Haus clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-sans text-[9px] tracking-[0.32em] text-charcoal uppercase mb-3">Contact</h3>
                <p className="font-sans text-sm text-stone">Phone: <a href="tel:+17865506249" className="hover:text-charcoal transition-colors">(786) 550-6249</a></p>
                <p className="font-sans text-sm text-stone mt-1">Email: <a href="mailto:viivwellnesshaus@gmail.com" className="hover:text-charcoal transition-colors">viivwellnesshaus@gmail.com</a></p>
              </div>

              <div>
                <h3 className="font-sans text-[9px] tracking-[0.32em] text-charcoal uppercase mb-3">Visit Us</h3>
                <p className="font-sans text-sm text-stone">1874 West Ave, Suite 1</p>
                <p className="font-sans text-sm text-stone">Miami Beach, Florida 33139</p>
              </div>

              <div>
                <h3 className="font-sans text-[9px] tracking-[0.32em] text-charcoal uppercase mb-3">Opening Hours</h3>
                <div className="space-y-1.5 font-sans text-sm">
                  <p className="text-sand">Sunday &amp; Monday — Closed</p>
                  <p className="text-stone">Tuesday – Friday · 10:00 am – 6:00 pm</p>
                  <p className="text-stone">Saturday · 11:00 am – 5:00 pm</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Free Consultation */}
            <div className="bg-charcoal p-10">
              <p className="font-sans text-[8px] tracking-[0.28em] text-white/40 uppercase mb-3">Most popular first step</p>
              <h2 className="font-serif text-3xl font-light text-white mb-4">Free Consultation</h2>
              <p className="font-sans text-sm leading-relaxed text-white/60 mb-8">
                Not sure where to start? Book a complimentary 30-minute consultation with Lulu or Yani. No commitment, no pressure — just an honest conversation about your goals.
              </p>
              <button
                onClick={open}
                className="group w-full flex items-center justify-center gap-3 bg-white px-8 py-5 font-sans text-[10px] tracking-[0.28em] text-charcoal hover:bg-white/85 transition-colors duration-300"
              >
                BOOK FREE CONSULTATION
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
              <p className="font-sans text-[8px] tracking-[0.14em] text-white/30 text-center mt-3">
                Complimentary · 30 minutes · No obligation
              </p>
            </div>

            {/* Book Treatment */}
            <div className="bg-cream border border-bone p-10">
              <p className="font-sans text-[8px] tracking-[0.28em] text-sand uppercase mb-3">Ready to go</p>
              <h2 className="font-serif text-2xl font-light text-charcoal mb-4">Book a Treatment</h2>
              <p className="font-sans text-sm leading-relaxed text-stone mb-8">
                Already know what you want? Book directly and choose your service, provider, and preferred time.
              </p>
              <button
                onClick={open}
                className="group w-full flex items-center justify-center gap-3 border border-charcoal px-8 py-4 font-sans text-[10px] tracking-[0.28em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                BOOK NOW
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
              <p className="font-sans text-[8px] tracking-[0.18em] text-sand/70 text-center mt-3">
                Choose your service, provider &amp; time
              </p>
            </div>

            {/* Text */}
            <div className="bg-cream border border-bone p-8">
              <h2 className="font-serif text-xl font-light text-charcoal mb-3">Prefer to text?</h2>
              <p className="font-sans text-sm leading-relaxed text-stone mb-5">
                Send us a message and we&apos;ll get back to you promptly.
              </p>
              <a
                href="sms:+17865506249"
                className="group inline-flex items-center gap-3 border border-charcoal px-7 py-3.5 font-sans text-[10px] tracking-[0.22em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                TEXT (786) 550-6249
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
