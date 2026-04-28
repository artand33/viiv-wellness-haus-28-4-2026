"use client";

import Link from "next/link";
import { useBookingModal } from "@/components/BookingModal";

export default function Footer() {
  const { open } = useBookingModal();
  return (
    <footer className="bg-cream-light border-t border-bone">
      {/* CTA Banner */}
      <div
        className="py-20 flex flex-col items-center text-center px-8"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(74,51,40,0.5) 0%, transparent 65%), " +
            "linear-gradient(140deg, #18100d 0%, #2a1d16 40%, #3d2b22 70%, #4a3328 100%)",
        }}
      >
        <p className="font-sans text-[9px] tracking-[0.35em] text-white/38 uppercase mb-5">Ready to Begin?</p>
        <h3 className="font-serif font-light text-white mb-7" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
          Book Your Consultation
        </h3>
        <button
          onClick={open}
          className="group inline-flex items-center gap-3 border border-white/38 px-9 py-4 font-sans text-[10px] tracking-[0.28em] text-white hover:bg-white hover:text-charcoal transition-all duration-300"
        >
          BOOK AN APPOINTMENT
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>

      {/* Info grid */}
      <div className="max-w-screen-xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-6">
            <div className="font-serif text-[1.8rem] font-light tracking-[0.12em] text-charcoal leading-none">VIIV</div>
            <div className="font-sans text-[7px] tracking-[0.38em] text-sand font-light mt-0.5">WELLNESS HAUS</div>
          </div>
          <p className="font-sans text-xs leading-relaxed text-stone max-w-[180px]">
            Miami Beach&apos;s premier destination for advanced cosmetic and wellness treatments.
          </p>
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.instagram.com/viivwellnesshaus"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] tracking-[0.2em] text-sand hover:text-stone transition-colors"
            >
              INSTAGRAM ↗
            </a>
            <a
              href="https://www.facebook.com/viivwellnesshaus"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] tracking-[0.2em] text-sand hover:text-stone transition-colors"
            >
              FACEBOOK ↗
            </a>
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-sans text-[9px] tracking-[0.32em] text-charcoal uppercase mb-6">Connect</h4>
          <ul className="space-y-3 font-sans text-sm text-stone">
            <li>1874 West Ave, Suite 1</li>
            <li>Miami Beach, Florida 33139</li>
            <li>
              <a href="tel:+17865506249" className="hover:text-charcoal transition-colors">(786) 550-6249</a>
            </li>
            <li>
              <a href="mailto:viivwellnesshaus@gmail.com" className="hover:text-charcoal transition-colors">
                viivwellnesshaus@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-sans text-[9px] tracking-[0.32em] text-charcoal uppercase mb-6">Visit Us</h4>
          <ul className="space-y-2.5 font-sans text-sm">
            <li className="text-sand">Sunday &amp; Monday — Closed</li>
            <li className="text-stone">Tuesday – Friday · 10:00 am – 6:00 pm</li>
            <li className="text-stone">Saturday · 11:00 am – 5:00 pm</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-sans text-[9px] tracking-[0.15em] text-sand">
          © 2026 VIIV Wellness Haus, LLC. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="font-sans text-[9px] tracking-[0.15em] text-sand hover:text-stone transition-colors">
            PRIVACY POLICY
          </Link>
          <Link href="/contact" className="font-sans text-[9px] tracking-[0.15em] text-sand hover:text-stone transition-colors">
            SITEMAP
          </Link>
        </div>
      </div>
    </footer>
  );
}
