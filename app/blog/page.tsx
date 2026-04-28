"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    title: "Laser Hair Removal Technology in Coral Gables",
    excerpt: "Discover how the latest laser technology delivers permanent results for all skin types.",
    category: "Laser Treatments",
    date: "April 2026",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dermal Filler Treatments Near Wynwood: What You Need to Know",
    excerpt: "Everything you need to know before your first filler appointment in Miami.",
    category: "Dermal Fillers",
    date: "April 2026",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sculptra: The Collagen Stimulator for Miami's Youthful Skin",
    excerpt: "Learn how Sculptra works differently from traditional fillers for longer-lasting results.",
    category: "Regenerative",
    date: "March 2026",
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Why Choose Dysport Over Botox? Miami's Expert Guide",
    excerpt: "Our providers break down the differences to help you make the best choice.",
    category: "Injectables",
    date: "March 2026",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Top Benefits of Botox in Miami Beach and Brickell",
    excerpt: "Beyond wrinkles — discover the full range of therapeutic benefits of Botox.",
    category: "Injectables",
    date: "February 2026",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "How Many EZ PRF Gel Sessions Are Needed?",
    excerpt: "A guide to treatment frequency for optimal platelet-rich fibrin results.",
    category: "Regenerative",
    date: "February 2026",
    src: "https://images.unsplash.com/photo-1581182800629-7d90925ad072?auto=format&fit=crop&w=800&q=80",
  },
];

function PostCard({ post, delay }: { post: (typeof posts)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden mb-4 relative">
        <Image
          src={post.src}
          alt={post.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="bg-cream-light border border-bone p-6 group-hover:bg-cream transition-colors duration-300">
        <p className="font-sans text-[8px] tracking-[0.25em] text-sand uppercase mb-3">
          {post.category} · {post.date}
        </p>
        <h3 className="font-serif text-xl font-light text-charcoal leading-snug mb-3">{post.title}</h3>
        <p className="font-sans text-sm leading-relaxed text-stone mb-4">{post.excerpt}</p>
        <span className="font-sans text-[9px] tracking-[0.2em] text-stone border-b border-stone/40 pb-0.5 group-hover:text-charcoal group-hover:border-charcoal transition-colors">
          READ MORE
        </span>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div className="pt-24 bg-cream-light min-h-screen">
      <div className="py-20 px-8 text-center" style={{ backgroundColor: "#F5F0EB" }}>
        <p className="font-sans text-[9px] tracking-[0.35em] text-sand uppercase mb-4">Insights &amp; Education</p>
        <h1 className="font-serif font-light text-charcoal" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Blog
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <PostCard key={post.title} post={post} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}
