"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useBookingModal } from "@/components/BookingModal";

const serviceItems = [
  { label: "Cosmetic Injectables", href: "/services#injectables" },
  { label: "Skin Treatments",      href: "/services#skin" },
  { label: "Laser & Energy",       href: "/services#laser" },
  { label: "Regenerative",         href: "/services#regenerative" },
  { label: "Wellness & IV",        href: "/services#wellness" },
  { label: "Intimate Beauty",      href: "/services#intimate" },
  { label: "Financing",            href: "/payment-plans" },
];

const navLinks = [
  { label: "ABOUT",   href: "/#about" },
  { label: "SERVICES",href: "/services", dropdown: serviceItems },
  { label: "RESULTS", href: "/before-after" },
  { label: "REVIEWS", href: "/#reviews" },
  { label: "BLOG",    href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { open } = useBookingModal();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // On inner pages always show glass — only go transparent on homepage at top
  const isGlass = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isGlass
          ? "border-b border-white/8 shadow-[0_4px_40px_rgba(0,0,0,0.35)]"
          : ""
      }`}
      style={{
        backgroundColor: isGlass ? "rgba(28,18,10,0.72)" : "transparent",
        backdropFilter: isGlass ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: isGlass ? "blur(20px) saturate(1.4)" : "none",
      }}
    >
      {/* Grain overlay — only visible when glass is active */}
      {isGlass && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: grain }}
        />
      )}

      <div
        className={`relative max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6 transition-all duration-500 ${
          isGlass ? "py-3.5" : "py-6"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="leading-none">
            <div className="font-serif text-[1.75rem] font-light tracking-[0.15em] text-white">
              VIIV
            </div>
            <div className="font-sans text-[7px] tracking-[0.38em] text-white/65 font-light mt-0.5">
              WELLNESS HAUS
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="font-sans text-[10px] tracking-[0.18em] text-white/85 hover:text-white transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
              >
                {link.label}
              </Link>

              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-3 border border-white/10 shadow-2xl py-2 min-w-[210px] overflow-hidden"
                    style={{
                      backgroundColor: "rgba(28,18,10,0.88)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-5 py-2.5 font-sans text-[10px] tracking-[0.12em] text-white/65 hover:text-white hover:bg-white/8 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Book CTA */}
        <button
          onClick={open}
          className="hidden xl:inline-flex items-center gap-2 border border-white/35 px-5 py-2 font-sans text-[10px] tracking-[0.22em] text-white/85 hover:bg-white/10 hover:text-white hover:border-white/60 transition-all duration-200 flex-shrink-0"
        >
          BOOK NOW ↗
        </button>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle navigation menu"
          className="xl:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="xl:hidden border-t border-white/10 overflow-hidden"
            style={{
              backgroundColor: "rgba(28,18,10,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="px-8 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-[11px] tracking-[0.2em] text-white/65 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-5">
                <button
                  onClick={() => { setMobileOpen(false); open(); }}
                  className="font-sans text-[11px] tracking-[0.2em] text-white/65 hover:text-white transition-colors"
                >
                  BOOK NOW ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
