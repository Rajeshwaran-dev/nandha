import { forwardRef } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import GoldParticles from "./GoldParticles";
import { CornerFlourish, Kalasam, Lotus, OrnateRule } from "./Ornaments";
import { wedding } from "../utils/weddingData";

/* ------------------------------------------------------------- silhouette */

/** A tiered South-Indian gopuram, generated so the proportions stay right. */
function Gopuram({ cx, baseY, width, height, tiers = 7, topRatio = 0.34 }) {
  const parts = [];
  const topW = width * topRatio;

  for (let i = 0; i < tiers; i++) {
    const t0 = i / tiers;
    const t1 = (i + 1) / tiers;
    const w0 = width - (width - topW) * t0;
    const w1 = width - (width - topW) * t1;
    const y0 = baseY - height * t0;
    const y1 = baseY - height * t1;

    parts.push(
      <polygon
        key={`t${i}`}
        points={`${cx - w0 / 2},${y0} ${cx + w0 / 2},${y0} ${cx + w1 / 2},${y1} ${cx - w1 / 2},${y1}`}
      />
    );
    // cornice slab between tiers
    parts.push(
      <rect
        key={`c${i}`}
        x={cx - w1 / 2 - width * 0.028}
        y={y1 - height * 0.026}
        width={w1 + width * 0.056}
        height={height * 0.03}
        rx={2}
      />
    );
  }

  const topY = baseY - height;
  const halfTop = topW / 2;

  return (
    <g>
      {parts}
      {/* barrel-vault crown */}
      <path
        d={`M${cx - halfTop} ${topY} h${topW} v${-height * 0.05}
            a${halfTop} ${height * 0.11} 0 0 0 ${-topW} 0 Z`}
      />
      {/* kalasam finials along the ridge */}
      {[-0.62, -0.31, 0, 0.31, 0.62].map((o, i) => {
        const kx = cx + halfTop * 2 * o * 0.5;
        const ky = topY - height * 0.155;
        const s = i === 2 ? 1 : 0.72;
        return (
          <g key={o} transform={`translate(${kx} ${ky}) scale(${s})`}>
            <rect x={-width * 0.022} y={0} width={width * 0.044} height={height * 0.03} rx={2} />
            <ellipse cx={0} cy={-height * 0.022} rx={width * 0.03} ry={height * 0.024} />
            <path
              d={`M0 ${-height * 0.095} c${width * 0.022} ${height * 0.03} ${width * 0.022} ${
                height * 0.05
              } 0 ${height * 0.055} c${-width * 0.022} ${-height * 0.005} ${-width * 0.022} ${
                -height * 0.025
              } 0 ${-height * 0.055} Z`}
            />
          </g>
        );
      })}
      {/* gateway arch cut into the base */}
      <path
        d={`M${cx - width * 0.11} ${baseY}
            v${-height * 0.17}
            a${width * 0.11} ${width * 0.11} 0 0 1 ${width * 0.22} 0
            v${height * 0.17} Z`}
        fill="#120406"
        opacity="0.85"
      />
    </g>
  );
}

function Skyline() {
  return (
    <svg
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C1019" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2A060B" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="heroNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A080F" />
          <stop offset="70%" stopColor="#1E0509" />
          <stop offset="100%" stopColor="#120406" />
        </linearGradient>
        <linearGradient id="heroHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A0C13" stopOpacity="0" />
          <stop offset="100%" stopColor="#2A060B" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* far skyline */}
      <g fill="url(#heroFar)">
        <Gopuram cx={250} baseY={800} width={230} height={250} tiers={5} />
        <Gopuram cx={1370} baseY={800} width={250} height={280} tiers={5} />
        <rect x="0" y="700" width="1600" height="100" />
      </g>

      {/* atmospheric haze between layers */}
      <rect x="0" y="430" width="1600" height="370" fill="url(#heroHaze)" />

      {/* main tower */}
      <g fill="url(#heroNear)">
        <Gopuram cx={800} baseY={800} width={430} height={520} tiers={8} />
        {/* flanking mandapams */}
        <rect x="430" y="640" width="180" height="160" />
        <rect x="990" y="640" width="180" height="160" />
        <polygon points="430,640 520,585 610,640" />
        <polygon points="990,640 1080,585 1170,640" />
        <rect x="0" y="756" width="1600" height="44" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ hero  */

const Hero = forwardRef(function Hero(props, ref) {
  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-hidden bg-royal"
    >
      {/* slow breathing skyline */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Skyline />
      </motion.div>

      {/* mandala rings */}
      <div className="animate-spin-slow absolute -left-40 -top-40 h-96 w-96 mandala-ring opacity-25" />
      <div className="animate-spin-reverse absolute -bottom-52 -right-44 h-[30rem] w-[30rem] mandala-ring opacity-20" />

      <div className="pointer-events-none absolute inset-0 layer-grain" />
      <div className="pointer-events-none absolute inset-0 layer-vignette" />
      <GoldParticles count={26} />

      {/* scrim so the type always reads */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 42%, rgba(10,2,4,0.72) 0%, rgba(10,2,4,0.42) 45%, transparent 78%)",
        }}
      />

      {/* hairline frame */}
      <div className="pointer-events-none absolute inset-4 rounded-[10px] border border-gold/15 sm:inset-7" />
      <span className="pointer-events-none absolute left-6 top-6 text-gold/40 sm:left-9 sm:top-9">
        <CornerFlourish size={78} rotate={0} />
      </span>
      <span className="pointer-events-none absolute right-6 top-6 text-gold/40 sm:right-9 sm:top-9">
        <CornerFlourish size={78} rotate={90} />
      </span>
      <span className="pointer-events-none absolute bottom-6 right-6 text-gold/40 sm:bottom-9 sm:right-9">
        <CornerFlourish size={78} rotate={180} />
      </span>
      <span className="pointer-events-none absolute bottom-6 left-6 text-gold/40 sm:bottom-9 sm:left-9">
        <CornerFlourish size={78} rotate={270} />
      </span>

      {/* ---------------------------------------------------------- content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="text-gold-light/90"
        >
          <Kalasam size={30} className="mx-auto opacity-80" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-2 font-vibes text-2xl text-gold-light sm:text-4xl"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.2, 0.7, 0.3, 1] }}
          className="mt-3 flex flex-col items-center font-cinzel text-[2.15rem] leading-[1.08] font-bold tracking-[0.04em] text-foil text-foil-sheen sm:text-[3.4rem] md:text-[4.4rem]"
        >
          <span className="text-balance">{wedding.groom.name}</span>
          <span className="my-1 flex items-center gap-3 font-cormorant text-[1.05rem] font-light italic tracking-normal text-ivory/70 sm:my-1.5 sm:gap-5 sm:text-2xl">
            <span className="h-px w-8 bg-gold/45 sm:w-16" aria-hidden="true" />
            weds
            <span className="h-px w-8 bg-gold/45 sm:w-16" aria-hidden="true" />
          </span>
          <span className="text-balance">{wedding.bride.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="w-full"
        >
          <OrnateRule className="my-6" width={320} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.9 }}
          className="font-cormorant text-lg tracking-[0.24em] text-ivory uppercase sm:text-2xl"
        >
          {wedding.dateRange}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-2 font-poppins text-[11px] font-light tracking-[0.3em] text-gold-light/80 uppercase sm:text-sm"
        >
          {wedding.cities}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="mt-8 flex items-center gap-3 rounded-full border border-gold/35 bg-black/35 px-5 py-2 backdrop-blur-sm"
        >
          <Lotus size={13} className="text-gold/80" />
          <span className="font-cinzel text-[10px] tracking-[0.3em] text-gold-light sm:text-xs">
            {wedding.hashtag}
          </span>
          <Lotus size={13} className="rotate-180 text-gold/80" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-24 flex flex-col items-center text-gold-light/70 sm:bottom-28"
        animate={{ y: [0, 9, 0], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mb-1.5 font-cinzel text-[9px] tracking-[0.38em] uppercase">Scroll</span>
        <FiChevronDown size={18} />
      </motion.div>
    </section>
  );
});

export default Hero;
