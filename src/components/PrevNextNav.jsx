import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function PrevNextNav({
  onPrev,
  onNext,
  onJump,
  showPrev,
  showNext,
  index,
  total,
  labels = [],
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      aria-label="Invitation sections"
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 sm:bottom-7"
    >
      <div
        className="flex items-center gap-1.5 rounded-full border border-gold/30 px-2 py-2 sm:gap-3 sm:px-3"
        style={{
          background: "rgba(14,3,5,0.72)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 12px 34px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,236,190,0.12)",
        }}
      >
        <button
          onClick={onPrev}
          disabled={!showPrev}
          aria-label="Previous section"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-all duration-300 hover:border-gold/85 hover:bg-gold/15 disabled:pointer-events-none disabled:opacity-25 sm:h-10 sm:w-10"
        >
          <FiArrowLeft size={15} />
        </button>

        <div className="flex items-center gap-1.5 px-1 sm:gap-2 sm:px-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onJump?.(i)}
              aria-label={labels[i] ? `Go to ${labels[i]}` : `Go to section ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className="group relative py-2"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-400 ${
                  i === index
                    ? "w-6 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                    : "w-1.5 bg-gold/30 group-hover:bg-gold/60"
                }`}
              />
              {labels[i] && (
                <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md border border-gold/30 bg-black/85 px-2 py-1 font-cinzel text-[9px] tracking-[0.16em] whitespace-nowrap text-gold-light uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
                  {labels[i]}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={!showNext}
          aria-label="Next section"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-all duration-300 hover:border-gold/85 hover:bg-gold/15 disabled:pointer-events-none disabled:opacity-25 sm:h-10 sm:w-10"
        >
          <FiArrowRight size={15} />
        </button>
      </div>
    </motion.nav>
  );
}
