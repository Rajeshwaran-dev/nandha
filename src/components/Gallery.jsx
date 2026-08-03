import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "./Section";
import OrnateDivider from "./OrnateDivider";
import { wedding } from "../utils/weddingData";

const palette = ["#7c1017", "#9c1a1a", "#D4AF37", "#5a0c11", "#B7860B", "#3d0509"];

function GalleryTile({ id, seed }) {
  const c1 = palette[seed % palette.length];
  const c2 = palette[(seed + 2) % palette.length];
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill={`url(#g-${id})`} />
      <circle cx="150" cy="150" r="70" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
      <circle cx="150" cy="150" r="40" fill="#D4AF37" opacity="0.25" />
      <text
        x="150"
        y="158"
        textAnchor="middle"
        fontSize="20"
        fill="#F4D793"
        fontFamily="Cinzel, serif"
        opacity="0.8"
      >
        {String(id).padStart(2, "0")}
      </text>
    </svg>
  );
}

export default function Gallery({ sectionRef }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = wedding.gallery;

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <Section id="gallery" ref={sectionRef}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center font-cinzel text-3xl sm:text-5xl text-gradient-gold font-bold"
      >
        Our Moments
      </motion.h2>
      <OrnateDivider className="mt-5 mb-10" />

      <div className="columns-2 sm:columns-3 gap-4 [&>*]:mb-4">
        {items.map((item, idx) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
            className={`relative w-full block overflow-hidden rounded-xl border border-gold/30 shadow-gold group ${
              item.tall ? "aspect-[3/4]" : "aspect-square"
            }`}
          >
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
              <GalleryTile id={item.id} seed={item.id} />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-gold-light hover:text-gold"
              aria-label="Close"
            >
              <FiX size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 sm:left-10 text-gold-light hover:text-gold"
              aria-label="Previous image"
            >
              <FiChevronLeft size={32} />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold shadow-gold"
            >
              <GalleryTile id={items[activeIndex].id} seed={items[activeIndex].id} />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 sm:right-10 text-gold-light hover:text-gold"
              aria-label="Next image"
            >
              <FiChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
