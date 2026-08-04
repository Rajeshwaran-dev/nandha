import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInvite } from "../context/InviteContext";
import GoldParticles from "./GoldParticles";
import { CornerFlourish, Lotus, TempleLamp } from "./Ornaments";
import { wedding } from "../utils/weddingData";

/* ---------------------------------------------------------------- carving */

/** Repeating rosette carved into the door panel. */
function Rosette({ className = "", size = 54 }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="30" cy="30" r="20" opacity="0.55" />
        <circle cx="30" cy="30" r="13" opacity="0.4" />
      </g>
      <g fill="currentColor" opacity="0.75">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="30"
            cy="13"
            rx="3.4"
            ry="7.5"
            transform={`rotate(${i * 45} 30 30)`}
            opacity="0.8"
          />
        ))}
        <circle cx="30" cy="30" r="4.4" />
      </g>
    </svg>
  );
}

function DoorPanel({ side, open }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className="absolute top-0 z-20 h-full w-1/2"
      style={{
        [isLeft ? "left" : "right"]: 0,
        transformOrigin: isLeft ? "left center" : "right center",
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: open ? (isLeft ? -108 : 108) : 0 }}
      transition={{ duration: 1.7, ease: [0.7, 0, 0.2, 1], delay: 0.28 }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(100deg,#3E070E 0%,#5A0C15 30%,#6E0E14 52%,#4A0A11 78%,#2E060B 100%)",
          boxShadow: isLeft
            ? "inset -22px 0 46px -12px rgba(0,0,0,0.75)"
            : "inset 22px 0 46px -12px rgba(0,0,0,0.75)",
        }}
      >
        {/* wood/silk grain */}
        <div className="absolute inset-0 layer-silk opacity-80" />
        <div className="absolute inset-0 layer-grain" />

        {/* carved frames */}
        <div className="absolute inset-3 rounded-[3px] border-2 border-gold/55 sm:inset-5" />
        <div className="absolute inset-6 rounded-[2px] border border-gold/30 sm:inset-9" />
        <div className="absolute inset-y-12 inset-x-10 hidden rounded-[2px] border border-gold/15 sm:block" />

        {/* recessed centre panel */}
        <div
          className="absolute inset-x-9 inset-y-16 hidden rounded-sm sm:block"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(212,175,55,0.12), inset 0 14px 34px rgba(0,0,0,0.45)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.25))",
          }}
        />

        {/* carved rosette column */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-14 text-gold/45 sm:gap-20">
          <Rosette size={46} />
          <Rosette size={62} className="opacity-90" />
          <Rosette size={46} />
        </div>

        {/* corner flourishes */}
        <span className="absolute left-4 top-4 text-gold/50 sm:left-6 sm:top-6">
          <CornerFlourish size={58} rotate={0} />
        </span>
        <span className="absolute right-4 top-4 text-gold/50 sm:right-6 sm:top-6">
          <CornerFlourish size={58} rotate={90} />
        </span>
        <span className="absolute bottom-4 right-4 text-gold/50 sm:bottom-6 sm:right-6">
          <CornerFlourish size={58} rotate={180} />
        </span>
        <span className="absolute bottom-4 left-4 text-gold/50 sm:bottom-6 sm:left-6">
          <CornerFlourish size={58} rotate={270} />
        </span>

        {/* brass studs down the meeting edge */}
        <div
          className={`absolute inset-y-14 flex flex-col justify-between ${
            isLeft ? "right-6 sm:right-8" : "left-6 sm:left-8"
          }`}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="block h-2 w-2 rounded-full"
              style={{
                background: "radial-gradient(circle at 32% 30%, #FBEFC6, #D4AF37 55%, #8A6A1F)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            />
          ))}
        </div>

        {/* jamb highlight along the centre seam */}
        <div
          className={`absolute inset-y-0 w-[3px] ${isLeft ? "right-0" : "left-0"}`}
          style={{
            background: "linear-gradient(180deg,transparent,rgba(212,175,55,0.65),transparent)",
          }}
        />

        {/* handle ring — sits below the seal so the two never collide */}
        <div
          className={`absolute top-[74%] -translate-y-1/2 ${
            isLeft ? "right-12 sm:right-16" : "left-12 sm:left-16"
          }`}
        >
          <div
            className="h-11 w-11 rounded-full border-[3px] sm:h-14 sm:w-14"
            style={{
              borderColor: "#C9A227",
              boxShadow:
                "0 0 18px rgba(212,175,55,0.45), inset 0 2px 4px rgba(255,246,228,0.45), 0 4px 10px rgba(0,0,0,0.55)",
            }}
          />
        </div>
      </div>

      {/* outward face shading as the door swings */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.55 : 0 }}
        transition={{ duration: 1.7, delay: 0.28 }}
      />
    </motion.div>
  );
}


/** The supplied image is split at the rope, then its two sides pull apart. */
function TugOfWar({ opening }) {
  const halves = [
    { side: "left", className: "left-0", x: "-72vw", rotate: -3 },
    { side: "right", className: "right-0", x: "72vw", rotate: 3 },
  ];

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-auto w-[min(88vw,1000px)] -translate-x-1/2 -translate-y-1/2"
      style={{ aspectRatio: "1024 / 767" }}
      aria-hidden="true"
      animate={opening ? { x: [0, -2, 3, -4, 4, -3, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.52, ease: [0.36, 0.07, 0.19, 0.97] }}
    >
      {halves.map(({ side, className, x, rotate }) => (
        <motion.div
          key={side}
          className={`absolute top-0 h-full w-1/2 overflow-hidden ${className}`}
          initial={{ x: 0, rotate: 0, opacity: 1 }}
          animate={opening ? { x, rotate, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.38, delay: 0.52, ease: [0.65, 0, 0.25, 1] }}
        >
          <img
            src="/preloader.png"
            alt=""
            draggable="false"
            className={`absolute top-0 h-full max-w-none select-none ${
              side === "left" ? "left-0 w-[200%]" : "right-0 w-[200%]"
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
/* ------------------------------------------------------------------ gate  */

export default function GateIntro() {
  const { gatesOpen, setGatesOpen } = useInvite();
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => setGatesOpen(true), 1900);
  };

  return (
    <AnimatePresence>
      {!gatesOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-royal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: "2200px" }}
        >
          {/* ---- what waits behind the doors ---- */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              className="absolute h-[46vmin] w-[46vmin] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(212,175,55,0.08) 45%, transparent 72%)",
              }}
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.07, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Lotus className="mb-4 text-gold/70" size={22} />
            <p className="font-vibes text-3xl text-gold-light sm:text-5xl">
              You are cordially invited
            </p>
            <h1 className="mt-3 max-w-[22ch] text-balance font-cinzel text-xl font-semibold tracking-[0.12em] text-foil uppercase sm:text-3xl">
              {wedding.groom.name} &amp; {wedding.bride.name}
            </h1>
            <p className="mt-4 font-cormorant text-sm tracking-[0.3em] text-ivory/70 uppercase sm:text-base">
              {wedding.dateRange}
            </p>
          </div>

          <GoldParticles count={18} />

          {/* ---- the doors ---- */}
          <DoorPanel side="left" open={opening} />
          <DoorPanel side="right" open={opening} />

          <TugOfWar opening={opening} />

          {/* ---- opening control ---- */}
          <AnimatePresence>
            {!opening && (
              <motion.div
                className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 translate-y-[5.6rem] sm:translate-y-[7.5rem]"
                exit={{ y: 18, opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22, ease: "easeIn" }}
              >
                <motion.button
                  onClick={handleOpen}
                  aria-label="Open the invitation"
                  className="group relative inline-flex items-center justify-center rounded-full border border-gold/60 bg-maroon-dark/90 px-6 py-3 font-cinzel text-[10px] tracking-[0.34em] text-gold-light uppercase shadow-[0_0_24px_rgba(212,175,55,0.32),inset_0_1px_rgba(255,235,180,0.18)] backdrop-blur-sm transition hover:scale-105 hover:border-gold hover:bg-maroon-deep sm:px-8 sm:text-xs"
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="absolute inset-0 -z-10 rounded-full border border-gold/45 animate-ping opacity-30" />
                  Tap to open
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ---- lamps flanking the threshold ---- */}
          <div className="pointer-events-none absolute bottom-0 left-4 z-30 hidden opacity-90 sm:left-10 md:block">
            <TempleLamp size={54} />
          </div>
          <div className="pointer-events-none absolute bottom-0 right-4 z-30 hidden opacity-90 sm:right-10 md:block">
            <TempleLamp size={54} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
