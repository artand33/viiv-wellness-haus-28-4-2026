"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";

const services: Record<string, {
  title: string;
  subtitle: string;
  gradient: string;
  description: string;
  whoFor: string;
  expect: string;
  treatments: { name: string; desc: string; price: string; duration: string }[];
}> = {
  injectables: {
    title: "Cosmetic Injectables",
    subtitle: "Wrinkle relaxers, volumizers & sculpting",
    gradient: "linear-gradient(148deg, #8B7E74 0%, #6B5244 50%, #4a3328 100%)",
    description:
      "Our cosmetic injectable treatments use FDA-approved neurotoxins and hyaluronic acid fillers to address everything from fine lines to full facial harmonization. Each session is precisely tailored to your unique anatomy for results that look completely natural.",
    whoFor:
      "Adults who want to refresh their appearance, address early or established signs of aging, or enhance specific facial features — all without surgery or significant downtime.",
    expect:
      "Most injectable appointments take 30–60 minutes. Results from neurotoxins appear within 3–7 days and last 3–4 months. Filler results are immediate and can last 6 months to 2 years. Mild swelling or bruising may occur for 24–72 hours.",
    treatments: [
      { name: "Botox® / Dysport® / Jeuveau®", desc: "Precision neurotoxin placement to soften forehead lines, frown lines, and crow's feet while maintaining natural expression.", price: "Starts at $12/unit", duration: "20–30 min" },
      { name: "Masseter Botox", desc: "Slims the jawline and relieves teeth grinding by relaxing the masseter muscle — one of our most requested treatments.", price: "Starts at $12/unit", duration: "20 min" },
      { name: "Nefertiti Neck Lift", desc: "Neurotoxin injected along the jawline and neck bands to lift and define the lower face without surgery.", price: "Starts at $12/unit", duration: "20–30 min" },
      { name: "Lip Flip", desc: "A subtle curl of the upper lip using a small amount of neurotoxin — ideal for clients who want a natural pout without added volume.", price: "Starts at $150", duration: "15 min" },
      { name: "Gummy Smile Correction", desc: "Relaxes the muscle that elevates the upper lip too high, revealing a more balanced, confident smile.", price: "Starts at $150", duration: "15 min" },
      { name: "Hyperhidrosis Treatment", desc: "Neurotoxin injected into the underarms, hands, or feet to significantly reduce excessive sweating for up to 6–9 months.", price: "Starts at $12/unit", duration: "30 min" },
      { name: "Lip Augmentation", desc: "Hyaluronic acid filler placed with precision to add volume, define the cupid's bow, and create a soft, symmetrical pout.", price: "Starts at $800", duration: "30–45 min" },
      { name: "Cheek Sculpting", desc: "Strategic filler placement to restore volume loss, lift the mid-face, and create elegant cheekbone definition.", price: "Starts at $850", duration: "30–45 min" },
      { name: "Jawline Sculpting", desc: "A signature treatment that defines and sharpens the jawline using advanced filler techniques for a model-like contour.", price: "Starts at $3,250", duration: "45–60 min" },
      { name: "Under-Eye Correction", desc: "Tear trough filler to eliminate hollows and dark shadows under the eyes — one of the most transformative treatments we offer.", price: "Starts at $1,000", duration: "30–45 min" },
      { name: "Nose Contouring", desc: "Non-surgical rhinoplasty using filler to refine bumps, lift the tip, or improve symmetry without surgery or recovery.", price: "Starts at $1,300", duration: "30 min" },
      { name: "Profile Balancing Bundle", desc: "Our comprehensive facial harmonization package designed to address multiple areas in a single session for total facial balance.", price: "Starts at $2,500", duration: "90 min" },
    ],
  },
  skin: {
    title: "Skin Treatments",
    subtitle: "Advanced skincare & resurfacing",
    gradient: "linear-gradient(148deg, #C4B9A8 0%, #A89F93 50%, #8B7E74 100%)",
    description:
      "Our medical-grade skin treatments go beyond what traditional facials can achieve. From collagen induction therapy to clinical-strength chemical exfoliation, every protocol is designed to deliver real, measurable improvements in skin texture, tone, and radiance.",
    whoFor:
      "Anyone dealing with dullness, uneven skin tone, enlarged pores, fine lines, acne scarring, or simply wanting to maintain healthy, glowing skin.",
    expect:
      "Treatment time ranges from 30–90 minutes. Some treatments like peels and microneedling may cause temporary redness or flaking for 2–5 days. Results improve with repeated sessions.",
    treatments: [
      { name: "Microneedling", desc: "Creates micro-channels in the skin to stimulate collagen and elastin production, improving texture, scars, and firmness over time.", price: "Inquire for pricing", duration: "60 min" },
      { name: "Chemical Peels", desc: "Medical-grade exfoliation customized to your skin type and concerns — addressing hyperpigmentation, acne, sun damage, and uneven texture.", price: "Inquire for pricing", duration: "30–45 min" },
      { name: "Skin Booster", desc: "Injectable hydration using hyaluronic acid micro-droplets to deeply moisturize, plump, and restore luminosity from within.", price: "Inquire for pricing", duration: "45 min" },
      { name: "Filler Dissolving", desc: "Hyaluronidase enzyme injection to safely dissolve unwanted or overfilled hyaluronic acid filler.", price: "Inquire for pricing", duration: "30 min" },
    ],
  },
  laser: {
    title: "Laser & Energy",
    subtitle: "Advanced laser and energy-based treatments",
    gradient: "linear-gradient(148deg, #B8A898 0%, #9A8878 50%, #7A6858 100%)",
    description:
      "Our laser and energy-based treatments use clinically proven technology to address skin concerns at a deeper level than topical treatments alone. From fractional CO2 resurfacing to radiofrequency skin tightening, these modalities deliver transformative results.",
    whoFor:
      "Clients looking to address skin laxity, sun damage, texture irregularities, pigmentation, redness, or unwanted hair with advanced, long-lasting results.",
    expect:
      "Treatment time ranges from 30–90 minutes. Downtime varies from none (IPL, Optima) to 5–7 days (CO2 Laser). Our providers will walk you through full aftercare instructions prior to every session.",
    treatments: [
      { name: "Helix CO2 Laser (Cool Peel)", desc: "Fractional carbon dioxide laser resurfacing that dramatically improves skin texture, fine lines, and sun damage with minimal downtime compared to traditional CO2.", price: "Inquire for pricing", duration: "30–60 min" },
      { name: "Inmode Optima — Laser", desc: "A versatile laser platform addressing vascular lesions, pigmentation, and skin tone with precision and little to no downtime.", price: "Inquire for pricing", duration: "30–45 min" },
      { name: "Inmode Morpheus8", desc: "Radiofrequency microneedling that remodels fat and stimulates collagen deep in the skin — ideal for skin tightening, contouring, and texture improvement.", price: "Inquire for pricing", duration: "45–60 min" },
      { name: "Inmode IPL", desc: "Intense pulsed light to target sunspots, redness, rosacea, and uneven skin tone for a clearer, more even complexion.", price: "Inquire for pricing", duration: "30 min" },
    ],
  },
  regenerative: {
    title: "Regenerative",
    subtitle: "Platelet-rich therapies & bio-stimulators",
    gradient: "linear-gradient(148deg, #9A8F82 0%, #7A6F64 50%, #5C5248 100%)",
    description:
      "Regenerative treatments harness your body's own healing mechanisms to stimulate lasting collagen production and tissue renewal. These bio-stimulatory approaches produce results that continue to improve for months after treatment.",
    whoFor:
      "Clients who prefer natural, growth-factor-based treatments, those seeking long-term skin quality improvements, or anyone looking to complement injectable treatments with regenerative therapies.",
    expect:
      "Most regenerative treatments require a blood draw. The session typically takes 60–90 minutes. Results develop gradually over 4–12 weeks and continue to improve with multiple sessions.",
    treatments: [
      { name: "EZ PRF (Platelet-Rich Fibrin)", desc: "Your own platelet-rich fibrin is injected to stimulate collagen, improve skin quality, and promote tissue regeneration — entirely natural with no synthetic additives.", price: "Inquire for pricing", duration: "60–75 min" },
      { name: "EZ PRF Gel", desc: "A thicker, gel-form PRF used as a natural filler alternative to restore volume while simultaneously improving the quality of the skin.", price: "Inquire for pricing", duration: "60–75 min" },
      { name: "Sculptra (Collagen Stimulator)", desc: "Poly-L-lactic acid bio-stimulator that gradually rebuilds collagen over several months, restoring facial volume and improving skin thickness for results that last up to 2 years.", price: "Inquire for pricing", duration: "45–60 min" },
    ],
  },
  wellness: {
    title: "Wellness & IV",
    subtitle: "Holistic health and body treatments",
    gradient: "linear-gradient(148deg, #8FA8A0 0%, #6A8880 50%, #506860 100%)",
    description:
      "True beauty starts from within. Our wellness programs and IV therapy protocols are designed to optimize your health, energy, and vitality — complementing your aesthetic treatments with a foundation of inner wellbeing.",
    whoFor:
      "Clients seeking to boost energy, support weight management, recover faster, improve immunity, or simply feel their absolute best.",
    expect:
      "IV therapy sessions take 45–60 minutes and can be done during a lunch break. Weight loss consultations include a full assessment and personalized protocol. Most clients feel results within 24–48 hours of IV treatment.",
    treatments: [
      { name: "IV Therapy", desc: "Custom intravenous vitamin and mineral infusions tailored to your goals — from energy and hydration to immunity, beauty, and recovery.", price: "Inquire for pricing", duration: "45–60 min" },
      { name: "Weight Loss Program", desc: "A medically supervised, personalized weight management program including assessment, medication where appropriate, and ongoing support.", price: "Inquire for pricing", duration: "Ongoing" },
      { name: "Consultations", desc: "One-on-one wellness consultations to assess your health goals and create an integrated plan combining aesthetic and wellness treatments.", price: "Inquire for pricing", duration: "30–45 min" },
    ],
  },
  intimate: {
    title: "Intimate Beauty",
    subtitle: "Advanced intimate wellness care",
    gradient: "linear-gradient(148deg, #C8B0A8 0%, #A89088 50%, #887068 100%)",
    description:
      "Our intimate wellness treatments are performed in a private, judgement-free environment by experienced medical providers. These advanced procedures address functional and aesthetic concerns with sensitivity and expertise.",
    whoFor:
      "Adults seeking to address intimate aesthetic concerns or functional improvements in a safe, confidential, and medically supervised setting.",
    expect:
      "All intimate treatments begin with a thorough consultation to ensure you understand the procedure, expected outcomes, and aftercare. Your comfort and privacy are our absolute priority.",
    treatments: [
      { name: "Intimate Beauty Treatment", desc: "Advanced aesthetic treatment to enhance the appearance and confidence of intimate areas. Full details and personalized recommendations are provided during your private consultation.", price: "Inquire for pricing", duration: "Consult required" },
    ],
  },
};

function TreatmentCard({ t, i, inView }: { t: { name: string; desc: string; price: string; duration: string }; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
      className="border border-bone p-7 hover:border-taupe transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-xl font-light text-charcoal">{t.name}</h3>
        <span className="font-sans text-[9px] tracking-[0.18em] text-sand whitespace-nowrap mt-1">{t.duration}</span>
      </div>
      <p className="font-sans text-sm leading-relaxed text-stone mb-4">{t.desc}</p>
      <div className="flex items-center justify-between">
        <span className="font-serif text-base text-charcoal">{t.price}</span>
        <a
          href="#"
          className="font-sans text-[9px] tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 hover:border-charcoal pb-px"
        >
          BOOK ↗
        </a>
      </div>
    </motion.div>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = services[params.slug];
  if (!data) notFound();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="pt-24 bg-cream-light min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-8 overflow-hidden" style={{ background: data.gradient }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-[9px] tracking-[0.25em] text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            ← ALL SERVICES
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-[9px] tracking-[0.32em] text-white/45 uppercase mb-4"
          >
            {data.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif font-light text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            {data.title}
          </motion.h1>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] text-sand uppercase mb-3">Overview</p>
            <p className="font-sans text-sm leading-relaxed text-stone">{data.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] text-sand uppercase mb-3">Who It&apos;s For</p>
            <p className="font-sans text-sm leading-relaxed text-stone">{data.whoFor}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] text-sand uppercase mb-3">What to Expect</p>
            <p className="font-sans text-sm leading-relaxed text-stone">{data.expect}</p>
          </motion.div>
        </div>

        {/* Treatment cards */}
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-8"
          >
            Treatments
          </motion.p>
          <div className="grid md:grid-cols-2 gap-5">
            {data.treatments.map((t, i) => (
              <TreatmentCard key={t.name} t={t} i={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-bone flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl font-light text-charcoal mb-1">Ready to begin?</h3>
            <p className="font-sans text-sm text-stone">Book a consultation — we&apos;ll build a plan around you.</p>
          </div>
          <a
            href="#"
            className="group flex-shrink-0 inline-flex items-center gap-3 bg-charcoal px-8 py-4 font-sans text-[10px] tracking-[0.25em] text-white hover:bg-stone transition-colors duration-300"
          >
            BOOK NOW
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
