import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Drifting gold embers. A few larger, softer motes plus small hard sparkles
 * so the field has depth instead of reading as uniform dots.
 */
export default function GoldParticles({ count = 24, className = "" }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const sparkle = i % 3 === 0;
        return {
          id: i,
          left: Math.random() * 100,
          size: sparkle ? 1.5 + Math.random() * 1.5 : 3 + Math.random() * 4,
          rise: 320 + Math.random() * 420,
          duration: 11 + Math.random() * 12,
          delay: Math.random() * 12,
          drift: (Math.random() - 0.5) * 110,
          sparkle,
        };
      }),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            bottom: -12,
            background: p.sparkle
              ? "radial-gradient(circle, #FFF6E4 0%, rgba(240,218,160,0.7) 55%, transparent 100%)"
              : "radial-gradient(circle, rgba(255,236,190,0.9) 0%, rgba(212,175,55,0.42) 60%, transparent 100%)",
            boxShadow: p.sparkle
              ? "0 0 7px 1px rgba(255,246,228,0.65)"
              : "0 0 12px 3px rgba(212,175,55,0.35)",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -p.rise,
            x: [0, p.drift * 0.6, p.drift],
            opacity: [0, 1, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
