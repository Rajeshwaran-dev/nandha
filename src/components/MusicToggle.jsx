import { motion } from "framer-motion";
import { FiVolumeX } from "react-icons/fi";
import { useInvite } from "../context/InviteContext";

const BARS = [0, 1, 2, 3];

export default function MusicToggle({ className = "" }) {
  const { musicOn, toggleMusic } = useInvite();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onClick={toggleMusic}
      aria-label={musicOn ? "Mute background music" : "Play background music"}
      aria-pressed={musicOn}
      className={`fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-all duration-300 hover:scale-105 hover:border-gold/85 hover:bg-gold/12 sm:right-6 sm:top-6 sm:h-12 sm:w-12 ${className}`}
      style={{
        background: "rgba(14,3,5,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,236,190,0.14)",
      }}
    >
      {musicOn ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full bg-gold-light"
              animate={{ height: ["25%", "100%", "45%", "85%", "25%"] }}
              transition={{
                duration: 1.1 + i * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              style={{ height: "40%" }}
            />
          ))}
        </span>
      ) : (
        <FiVolumeX size={17} />
      )}
    </motion.button>
  );
}
