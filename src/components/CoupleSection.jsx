import { motion } from "framer-motion";
import Section from "./Section";
import GoldParticles from "./GoldParticles";
import { Kalasam, Lotus, OrnateRule } from "./Ornaments";
import { wedding } from "../utils/weddingData";

/* --------------------------------------------------------------- portrait */

/**
 * The couple standing in front of a lit temple-arch niche.
 * The artwork deliberately overflows the arch on the sides and at the feet so
 * they read as standing *in* the frame rather than pasted inside a box.
 *
 * Width is capped against viewport height as well as breakpoint, so the whole
 * section still fits on short laptop windows without the arch being clipped.
 */
function CouplePortrait() {
  const softMask = "linear-gradient(180deg,#000 0%,#000 93%,rgba(0,0,0,0) 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.05, ease: [0.2, 0.7, 0.3, 1] }}
      className="relative mx-auto w-[13.5rem] sm:w-[16rem] md:w-[18rem] lg:w-[20rem]"
      style={{ maxWidth: "calc(44vh * 0.71)" }}
    >
      {/* rotating mandala + breathing halo, centred on the arch */}
      <div className="pointer-events-none absolute left-1/2 top-[36%] aspect-square w-[132%] -translate-x-1/2 -translate-y-1/2 mandala-ring animate-spin-slow opacity-[0.18]" />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] aspect-square w-[142%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-halo"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.24) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)",
        }}
      />

      {/* the niche the couple stands in */}
      <div
        className="arch-top absolute left-1/2 top-0 h-[88%] w-[88%] -translate-x-1/2 overflow-hidden border-2 border-gold/60"
        style={{
          background: "linear-gradient(180deg,#540B14 0%,#360811 52%,#1B0508 100%)",
          boxShadow:
            "0 0 38px rgba(212,175,55,0.22), 0 26px 60px -20px rgba(0,0,0,0.85), inset 0 0 52px rgba(0,0,0,0.6)",
        }}
      >
        <div className="arch-top pointer-events-none absolute inset-[7px] border border-gold/25" />
        <div className="pointer-events-none absolute inset-0 layer-grain" />
        <div className="pointer-events-none absolute inset-0 layer-kolam opacity-40" />
        {/* warm pool of light behind them */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 100%, rgba(212,175,55,0.20) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* finial crowning the arch */}
      <Kalasam
        size={24}
        className="absolute left-1/2 -top-10 z-20 -translate-x-1/2 drop-shadow-[0_4px_12px_rgba(212,175,55,0.55)]"
      />

      {/* embers drifting up around them */}
      <GoldParticles count={9} className="z-20" />

      {/* ground glow — sits behind the artwork so it haloes their feet */}
      <motion.div
        className="pointer-events-none absolute bottom-[3%] left-1/2 h-5 w-[74%] -translate-x-1/2 rounded-[50%]"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.42) 0%, transparent 70%)",
        }}
        animate={{ scaleX: [1, 0.93, 1], opacity: [0.9, 0.65, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* the couple */}
      <motion.img
        src="/nandha.png"
        alt={`Caricature of ${wedding.groom.name} and ${wedding.bride.name}`}
        width={723}
        height={1024}
        loading="eager"
        decoding="async"
        draggable={false}
        className="relative z-10 w-full select-none"
        style={{
          filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.6))",
          maskImage: softMask,
          WebkitMaskImage: softMask,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* plinth */}
      <div className="absolute bottom-[1.5%] left-1/2 z-20 h-px w-[86%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <Lotus size={14} className="mx-auto mt-2 text-gold/55" />
    </motion.div>
  );
}

/* ----------------------------------------------------------------- people */

function PersonBlock({ label, person, side }) {
  const isBride = side === "bride";
  return (
    <motion.div
      initial={{ opacity: 0, x: isBride ? 36 : -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
      className={`flex flex-col items-center text-center ${
        isBride ? "md:items-start md:text-left" : "md:items-end md:text-right"
      }`}
    >
      <p className="font-vibes text-xl text-gold-light/85 sm:text-3xl">{label}</p>

      {/* sized so two-word names still sit on one line at lg */}
      <h3 className="mt-0.5 text-balance font-cinzel text-[1.5rem] leading-tight font-bold tracking-[0.05em] text-foil sm:text-[2rem] lg:text-[2.3rem]">
        {person.name}
      </h3>

      <span className="my-2 h-px w-14 bg-gradient-to-r from-transparent via-gold/70 to-transparent sm:my-3 sm:w-24" />

      {/* parents / place are optional — render nothing rather than an empty gap */}
      {person.parents && (
        <p className="max-w-[19rem] text-pretty font-cormorant text-[0.8rem] leading-snug text-ivory/85 sm:text-[1.05rem]">
          {person.parents}
        </p>
      )}
      {person.place && (
        <p className="mt-1 font-cormorant text-[0.8rem] text-gold-light/80 sm:text-[1.05rem]">
          {person.place}
        </p>
      )}

      <p className="mt-2 max-w-[19rem] text-pretty font-cormorant text-[0.75rem] italic text-ivory/55 sm:mt-3 sm:text-[0.95rem]">
        {person.quote}
      </p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- section */

export default function CoupleSection({ sectionRef }) {
  return (
    <Section id="couple" ref={sectionRef}>
      {/* Mobile stacks the portrait above a two-up couple row; md+ puts the
          portrait between them. Order classes drive the swap. */}
      <div className="grid grid-cols-2 items-start gap-x-4 gap-y-7 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 lg:gap-12">
        <div className="order-1 col-span-2 md:order-2 md:col-span-1">
          <CouplePortrait />
        </div>
        <div className="order-2 md:order-1">
          <PersonBlock label="The Groom" person={wedding.groom} side="groom" />
        </div>
        <div className="order-3">
          <PersonBlock label="The Bride" person={wedding.bride} side="bride" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-8 flex flex-col items-center sm:mt-10 md:mt-12"
      >
        <h2 className="font-vibes text-[1.9rem] text-gold-light sm:text-5xl">Together Forever</h2>
        <OrnateRule className="mt-2 sm:mt-3" width={260} />
      </motion.div>
    </Section>
  );
}
