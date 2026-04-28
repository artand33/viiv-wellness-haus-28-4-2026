"use client";

import {
  createContext, useContext, useState, useCallback,
  useMemo, ReactNode, useEffect, ReactElement,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Context ────────────────────────────────────────────────────────────────────

type Ctx = { open: () => void; close: () => void };
const BookingModalContext = createContext<Ctx | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingProvider");
  return ctx;
}

// ── Services data (from viivwellnesshaus.com) ──────────────────────────────────

const SERVICE_CATEGORIES = [
  {
    category: "Neurotoxin Treatments",
    services: [
      "Botox® / Dysport® / Jeuveau® — Forehead",
      "Masseter Botox (Jaw Slimming)",
      "Lip Flip",
      "Gummy Smile Correction",
      "Nefertiti Neck Lift",
      "Hyperhidrosis Treatment",
    ],
  },
  {
    category: "Dermal Fillers",
    services: [
      "Lip Augmentation",
      "Cheek Sculpting",
      "Jawline Sculpting",
      "Under-Eye Correction",
      "Nose Contouring",
      "Profile Balancing Bundle",
    ],
  },
  {
    category: "Filler Dissolving",
    services: ["Hyaluronidase Treatment"],
  },
  {
    category: "Consultation Options",
    services: ["Free Consultation (30 min)", "Full Facial Assessment"],
  },
  {
    category: "Regenerative & Volume Restoration",
    services: ["EZ PRF", "PRF Gel", "Sculptra®", "PRF Under-Eyes"],
  },
  {
    category: "Skin Treatments",
    services: ["Chemical Peels", "SkinPen Microneedling", "Hair Restoration", "Skin Boosters"],
  },
  {
    category: "Laser Services",
    services: ["Laser Hair Removal", "Lumecca IPL", "Morpheus8®", "Helix CO2 / CoolPeel®"],
  },
  {
    category: "Wellness Services",
    services: [
      "Comprehensive Blood Work",
      "IV Vitamin Therapy & Medical Wellness",
      "Medical Weight Loss",
      "Peptides & HRT",
      "PRP Injections for Pain",
    ],
  },
];

const PROVIDERS = [
  { id: "lulu", name: "Lulu", title: "APRN-BC · Co-Founder" },
  { id: "yani", name: "Yani", title: "APRN-BC · Co-Founder" },
  { id: "none", name: "No Preference", title: "Any available provider" },
];

const DAY_NAMES  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_DAY   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const FULL_MONTH = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (dates.length < 14) {
    if (d.getDay() !== 0 && d.getDay() !== 1) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function getTimeSlots(date: Date): string[] {
  const isSat = date.getDay() === 6;
  const startH = isSat ? 11 : 10;
  const endH   = isSat ? 17 : 18;
  const slots: string[] = [];
  for (let h = startH; h < endH; h++) {
    for (const m of [0, 30]) {
      if (h === endH - 1 && m === 30) break;
      const hour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      slots.push(`${hour}:${m === 0 ? "00" : "30"} ${ampm}`);
    }
  }
  return slots;
}

// ── Step 1 — Service (category → service two-phase) ────────────────────────────

const CATEGORY_ICONS: Record<string, ReactElement> = {
  "Neurotoxin Treatments": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M19 2l3 3m0 0l-3 3m3-3H16m-2 2L5 15m0 0l-2 4 4-2m-2-2 9-9"/>
      <path strokeLinecap="round" strokeWidth={1.4} d="M3 21l3-3"/>
    </svg>
  ),
  "Dermal Fillers": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 6C8 6 5 9 5 12s3 6 7 6 7-3 7-6-3-6-7-6z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M8 12c0-1.1.9-2 2-2h4"/>
    </svg>
  ),
  "Filler Dissolving": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3v1m0 16v1M4.22 4.22l.7.7m14.14 14.14l.7.7M3 12h1m16 0h1M4.92 19.08l.7-.7M18.36 5.64l.7-.7"/>
      <circle cx="12" cy="12" r="4" strokeWidth={1.4}/>
    </svg>
  ),
  "Consultation Options": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
  ),
  "Regenerative & Volume Restoration": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  ),
  "Skin Treatments": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  ),
  "Laser Services": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  "Wellness Services": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
  ),
};

function StepService({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // If a service is already selected, pre-open its category
  useEffect(() => {
    if (selected && !activeCategory) {
      const cat = SERVICE_CATEGORIES.find((c) => c.services.includes(selected));
      if (cat) setActiveCategory(cat.category);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase B — services within a category
  if (activeCategory) {
    const cat = SERVICE_CATEGORIES.find((c) => c.category === activeCategory)!;
    return (
      <div>
        <button
          onClick={() => setActiveCategory(null)}
          className="flex items-center gap-2 font-sans text-[10px] tracking-[0.18em] text-stone/50 hover:text-stone transition-colors mb-5"
        >
          ← All Categories
        </button>
        <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">
          {cat.category}
        </p>
        <div className="space-y-2">
          {cat.services.map((svc) => (
            <button
              key={svc}
              onClick={() => onSelect(svc)}
              className={`w-full text-left px-5 py-3.5 font-sans text-[12px] tracking-[0.04em] transition-all duration-150 flex items-center justify-between gap-3 ${
                selected === svc
                  ? "bg-charcoal text-white"
                  : "bg-cream border border-bone hover:border-taupe text-stone hover:text-charcoal"
              }`}
            >
              <span>{svc}</span>
              {selected === svc && (
                <svg width="12" height="9" fill="none" viewBox="0 0 12 9" className="shrink-0">
                  <path d="M1 4l3.5 3.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Phase A — category grid
  return (
    <div className="grid grid-cols-2 gap-2">
      {SERVICE_CATEGORIES.map((cat) => {
        const hasSelection = cat.services.includes(selected);
        return (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`group text-left p-3.5 flex flex-col gap-2 transition-all duration-150 ${
              hasSelection
                ? "bg-charcoal"
                : "bg-cream border border-bone hover:border-taupe"
            }`}
          >
            <span className={`transition-colors [&>svg]:w-4 [&>svg]:h-4 ${hasSelection ? "text-white/60" : "text-sand group-hover:text-stone"}`}>
              {CATEGORY_ICONS[cat.category]}
            </span>
            <div>
              <p className={`font-serif text-sm font-light leading-snug ${hasSelection ? "text-white" : "text-charcoal"}`}>
                {cat.category}
              </p>
              {hasSelection && (
                <p className="font-sans text-[8px] tracking-[0.12em] text-white/50 mt-0.5 truncate">
                  {selected}
                </p>
              )}
              {!hasSelection && (
                <p className="font-sans text-[8px] tracking-[0.12em] mt-0.5 text-sand/60">
                  {cat.services.length} services
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Step 2 — Provider ──────────────────────────────────────────────────────────

function StepProvider({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`w-full text-left px-5 py-4 flex items-center justify-between gap-4 transition-all duration-150 ${
            selected === p.id
              ? "bg-charcoal"
              : "bg-cream border border-bone hover:border-taupe"
          }`}
        >
          <div>
            <p className={`font-serif text-xl font-light ${selected === p.id ? "text-white" : "text-charcoal"}`}>
              {p.name}
            </p>
            <p className={`font-sans text-[9px] tracking-[0.18em] uppercase mt-0.5 ${selected === p.id ? "text-white/45" : "text-sand"}`}>
              {p.title}
            </p>
          </div>
          {selected === p.id && (
            <svg width="12" height="9" fill="none" viewBox="0 0 12 9" className="shrink-0">
              <path d="M1 4l3.5 3.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Step 3 — Date & Time ───────────────────────────────────────────────────────

function StepDateTime({
  selectedDate, selectedTime, onDate, onTime,
}: {
  selectedDate: Date | null; selectedTime: string;
  onDate: (d: Date) => void; onTime: (t: string) => void;
}) {
  const dates = useMemo(() => getAvailableDates(), []);
  const slots = useMemo(() => selectedDate ? getTimeSlots(selectedDate) : [], [selectedDate]);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-sans text-[9px] tracking-[0.28em] text-sand uppercase mb-3">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => {
            const sel = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toDateString()}
                onClick={() => { onDate(d); onTime(""); }}
                className={`shrink-0 flex flex-col items-center px-3 py-3 min-w-[52px] transition-all duration-150 ${
                  sel ? "bg-charcoal text-white" : "bg-cream border border-bone hover:border-taupe text-charcoal"
                }`}
              >
                <span className={`font-sans text-[8px] tracking-[0.14em] uppercase ${sel ? "text-white/50" : "text-sand"}`}>
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span className="font-serif text-lg font-light leading-none my-1">{d.getDate()}</span>
                <span className={`font-sans text-[8px] ${sel ? "text-white/50" : "text-sand"}`}>
                  {MONTH_NAMES[d.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <p className="font-sans text-[9px] tracking-[0.28em] text-sand uppercase mb-3">Select Time</p>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => onTime(slot)}
                className={`py-2.5 font-sans text-[11px] tracking-[0.06em] transition-all duration-150 ${
                  selectedTime === slot
                    ? "bg-charcoal text-white"
                    : "bg-cream border border-bone hover:border-taupe text-stone hover:text-charcoal"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Step 4 — Details ───────────────────────────────────────────────────────────

type FormState = {
  firstName: string; lastName: string;
  email: string; phone: string;
  returning: boolean; notes: string;
};

function StepDetails({ form, onChange }: {
  form: FormState;
  onChange: (key: keyof FormState, value: string | boolean) => void;
}) {
  const base = "w-full bg-cream border border-bone px-4 py-3 font-sans text-[11px] tracking-[0.04em] text-charcoal placeholder:text-sand/50 outline-none focus:border-taupe-dark transition-colors duration-200";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-1.5">First Name</label>
          <input type="text" placeholder="Maria" value={form.firstName}
            onChange={(e) => onChange("firstName", e.target.value)} className={base} />
        </div>
        <div>
          <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-1.5">Last Name</label>
          <input type="text" placeholder="Garcia" value={form.lastName}
            onChange={(e) => onChange("lastName", e.target.value)} className={base} />
        </div>
      </div>
      <div>
        <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-1.5">Email</label>
        <input type="email" placeholder="maria@email.com" value={form.email}
          onChange={(e) => onChange("email", e.target.value)} className={base} />
      </div>
      <div>
        <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-1.5">Phone</label>
        <input type="tel" placeholder="(305) 000-0000" value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)} className={base} />
      </div>
      <div>
        <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-2">Patient type</label>
        <div className="flex gap-3">
          {([false, true] as const).map((val) => (
            <button key={String(val)} onClick={() => onChange("returning", val)}
              className={`flex-1 py-2.5 font-sans text-[10px] tracking-[0.12em] transition-all duration-150 ${
                form.returning === val
                  ? "bg-charcoal text-white"
                  : "bg-cream border border-bone hover:border-taupe text-stone"
              }`}
            >
              {val ? "Returning Patient" : "New Patient"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase block mb-1.5">
          Notes <span className="normal-case text-sand/50">(optional)</span>
        </label>
        <textarea rows={2} placeholder="Any specific concerns or requests..."
          value={form.notes} onChange={(e) => onChange("notes", e.target.value)}
          className={`${base} resize-none`} />
      </div>
    </div>
  );
}

// ── Step 5 — Confirm ───────────────────────────────────────────────────────────

function StepConfirm({ service, provider, date, time, form }: {
  service: string; provider: string; date: Date | null;
  time: string; form: { firstName: string; lastName: string };
}) {
  const providerLabel = PROVIDERS.find((p) => p.id === provider)?.name ?? "";
  const dateStr = date
    ? `${FULL_DAY[date.getDay()]}, ${FULL_MONTH[date.getMonth()]} ${date.getDate()}`
    : "";

  return (
    <div className="space-y-5">
      <p className="font-sans text-[11px] text-stone/65 leading-relaxed">
        Review your details below. Once confirmed, our team will reach out within 24 hours to finalize your appointment.
      </p>
      <div className="bg-cream border border-bone divide-y divide-bone">
        {[
          { label: "Service",  value: service },
          { label: "Provider", value: providerLabel === "No Preference" ? "Any available provider" : providerLabel },
          { label: "Date",     value: dateStr },
          { label: "Time",     value: time },
          { label: "Name",     value: `${form.firstName} ${form.lastName}` },
        ].map(({ label, value }) => (
          <div key={label} className="px-5 py-3.5 flex justify-between gap-4">
            <span className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase shrink-0">{label}</span>
            <span className="font-sans text-[11px] text-charcoal text-right">{value}</span>
          </div>
        ))}
      </div>
      <p className="font-sans text-[9px] text-sand/60 text-center leading-relaxed">
        By confirming you agree to our cancellation policy.<br/>A confirmation will be sent to your email.
      </p>
    </div>
  );
}

// ── Success ────────────────────────────────────────────────────────────────────

function Success({ name, close }: { name: string; close: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-4 gap-6">
      <div className="w-14 h-14 rounded-full border border-charcoal/20 flex items-center justify-center">
        <svg width="22" height="17" fill="none" viewBox="0 0 22 17">
          <path d="M1 8.5l6.5 6.5L21 1" stroke="#2C2520" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h3 className="font-serif text-2xl font-light text-charcoal mb-2">You&apos;re all set{name ? `, ${name}` : ""}.</h3>
        <p className="font-sans text-[11px] text-stone/55 leading-relaxed max-w-xs mx-auto">
          We&apos;ve received your request. Our team will confirm your appointment within 24 hours via email or text.
        </p>
      </div>
      <div className="w-full h-px bg-bone" />
      <div className="space-y-1 text-center">
        <p className="font-sans text-[9px] tracking-[0.22em] text-sand uppercase">Questions? Call or text us</p>
        <a href="tel:+17865506249" className="font-serif text-xl font-light text-charcoal hover:text-stone transition-colors">
          (786) 550-6249
        </a>
      </div>
      <button onClick={close}
        className="font-sans text-[10px] tracking-[0.18em] text-stone/40 hover:text-stone transition-colors border-b border-stone/20 pb-px">
        Close
      </button>
    </div>
  );
}

// ── Provider ───────────────────────────────────────────────────────────────────

const STEP_TITLES = [
  "Choose a Service",
  "Choose a Provider",
  "Date & Time",
  "Your Details",
  "Review & Confirm",
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen,  setIsOpen]  = useState(false);
  const [step,    setStep]    = useState(1);
  const [success, setSuccess] = useState(false);

  const [service,  setService]  = useState("");
  const [provider, setProvider] = useState("");
  const [date,     setDate]     = useState<Date | null>(null);
  const [time,     setTime]     = useState("");
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "", returning: false, notes: "",
  });

  const resetAndClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1); setSuccess(false);
      setService(""); setProvider(""); setDate(null); setTime("");
      setForm({ firstName: "", lastName: "", email: "", phone: "", returning: false, notes: "" });
    }, 300);
  }, []);

  const canNext = useMemo(() => {
    if (step === 1) return !!service;
    if (step === 2) return !!provider;
    if (step === 3) return !!date && !!time;
    if (step === 4) return !!(form.firstName && form.lastName && form.email && form.phone);
    return true;
  }, [step, service, provider, date, time, form]);

  return (
    <BookingModalContext.Provider value={{ open: () => setIsOpen(true), close: resetAndClose }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm"
              onClick={resetAndClose}
            />

            <motion.div key="modal"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[90] flex items-center justify-center px-5 py-8 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-[580px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

                {/* Dark header */}
                <div className="relative px-8 pt-7 pb-6 shrink-0"
                  style={{ background: "linear-gradient(140deg, #18100d 0%, #2a1d16 60%, #3d2b22 100%)" }}>
                  <button onClick={resetAndClose} aria-label="Close"
                    className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {success ? (
                    <p className="font-sans text-[9px] tracking-[0.38em] text-white/30 uppercase">Appointment Requested</p>
                  ) : (
                    <>
                      <p className="font-sans text-[9px] tracking-[0.38em] text-white/30 uppercase mb-3">
                        Step {step} of 5
                      </p>
                      <h2 className="font-serif font-light text-white leading-tight mb-5"
                        style={{ fontSize: "1.65rem" }}>
                        {STEP_TITLES[step - 1]}
                      </h2>
                      {/* Progress segments */}
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <div key={s} className="h-px flex-1 transition-all duration-300"
                            style={{ backgroundColor: s <= step ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.10)" }} />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Scrollable body */}
                <div className="bg-cream-light px-8 py-5 overflow-y-auto flex-1">
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div key="success"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Success name={form.firstName} close={resetAndClose} />
                      </motion.div>
                    ) : (
                      <motion.div key={step}
                        initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.18 }}>
                        {step === 1 && <StepService selected={service} onSelect={setService} />}
                        {step === 2 && <StepProvider selected={provider} onSelect={setProvider} />}
                        {step === 3 && (
                          <StepDateTime selectedDate={date} selectedTime={time}
                            onDate={setDate} onTime={setTime} />
                        )}
                        {step === 4 && (
                          <StepDetails form={form}
                            onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))} />
                        )}
                        {step === 5 && (
                          <StepConfirm service={service} provider={provider}
                            date={date} time={time} form={form} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {!success && (
                  <div className="bg-cream-light border-t border-bone px-8 py-5 flex justify-between items-center shrink-0">
                    <button
                      onClick={() => step > 1 ? setStep(step - 1) : resetAndClose()}
                      className="font-sans text-[10px] tracking-[0.16em] text-stone/45 hover:text-stone transition-colors">
                      ← Back
                    </button>
                    <button onClick={() => { if (step < 5) setStep(step + 1); else setSuccess(true); }}
                      disabled={!canNext}
                      className={`inline-flex items-center gap-2 px-7 py-3.5 font-sans text-[10px] tracking-[0.24em] transition-all duration-200 ${
                        canNext
                          ? "bg-charcoal text-white hover:bg-charcoal/85"
                          : "bg-bone text-sand cursor-not-allowed"
                      }`}>
                      {step === 5 ? "CONFIRM APPOINTMENT" : "NEXT →"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </BookingModalContext.Provider>
  );
}
