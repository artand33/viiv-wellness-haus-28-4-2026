"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    caption: "Natural results, every time ✨",
    tag: "Skin Treatment",
    likes: "342",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
    caption: "Glowing from the inside out 🌿",
    tag: "Skincare",
    likes: "518",
  },
  {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80",
    caption: "Expert hands, natural beauty 💫",
    tag: "Treatment",
    likes: "271",
  },
  {
    src: "https://images.unsplash.com/photo-1581182800629-7d90925ad072?auto=format&fit=crop&w=600&q=80",
    caption: "Your skin, renewed ✨",
    tag: "Glow Up",
    likes: "489",
  },
  {
    src: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?auto=format&fit=crop&w=600&q=80",
    caption: "Confidence looks good on you 🖤",
    tag: "VIIV Life",
    likes: "623",
  },
  {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80",
    caption: "Wellness starts from within 🌿",
    tag: "Wellness",
    likes: "198",
  },
  {
    src: "https://images.unsplash.com/photo-1580564591877-3a6578d09f5d?auto=format&fit=crop&w=600&q=80",
    caption: "Facial harmony at its finest 💛",
    tag: "Facial",
    likes: "741",
  },
  {
    src: "https://images.unsplash.com/photo-1556229165-8aa0ceaa93a7?auto=format&fit=crop&w=600&q=80",
    caption: "Radiance redefined ✨",
    tag: "Beauty",
    likes: "392",
  },
];

function PostCard({ src, caption, tag, likes }: typeof posts[0]) {
  return (
    <div className="relative flex-shrink-0 w-64 h-64 group overflow-hidden cursor-pointer">
      <Image
        src={src}
        alt={caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="256px"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-400 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-4 text-white">
          <span className="flex items-center gap-1.5 font-sans text-xs">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {likes}
          </span>
        </div>
        <p className="font-sans text-[9px] tracking-[0.15em] text-white/80 text-center px-6">{caption}</p>
        <span className="font-sans text-[8px] tracking-[0.2em] text-white/50 uppercase">{tag}</span>
      </div>

      {/* Instagram icon top-right */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </div>
    </div>
  );
}

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const allPosts = [...posts, ...posts]; // duplicate for seamless loop

  return (
    <section className="relative bg-white py-24 overflow-hidden" ref={ref}>
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.30]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Header */}
      <div className="relative max-w-screen-xl mx-auto px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="font-sans text-[9px] tracking-[0.32em] text-sand uppercase mb-3">Social</p>
            <h2
              className="font-serif font-light text-charcoal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Follow Our Journey
            </h2>
          </div>

          <a
            href="https://www.instagram.com/viivwellnesshaus"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 inline-flex items-center gap-2 border border-charcoal px-6 py-3 font-sans text-[10px] tracking-[0.22em] text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @viivwellnesshaus ↗
          </a>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />

        <div className="overflow-hidden">
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee 36s linear infinite" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
          >
            {allPosts.map((post, i) => (
              <PostCard key={i} {...post} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Handle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative text-center font-sans text-[9px] tracking-[0.3em] text-sand/70 uppercase mt-10"
      >
        Hover to pause · Tap to explore
      </motion.p>
    </section>
  );
}
