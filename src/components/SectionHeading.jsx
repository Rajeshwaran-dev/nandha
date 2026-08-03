import { motion } from "framer-motion";
import { OrnateRule } from "./Ornaments";

/**
 * Consistent section header: small script eyebrow, engraved display title,
 * ornate rule. Keeps every section on the same rhythm.
 */
export default function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-vibes text-2xl text-gold-light/85 sm:text-3xl"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.08 }}
        className="mt-1 font-cinzel text-[1.75rem] leading-tight font-semibold tracking-[0.08em] text-foil text-foil-sheen sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.18 }}
        className="w-full"
      >
        <OrnateRule className="mt-4" width={280} />
      </motion.div>
    </div>
  );
}
