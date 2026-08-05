import { motion } from "framer-motion";
import Section from "./Section";
import GoldParticles from "./GoldParticles";
import { CornerFlourish, Lotus, OrnateRule, TempleLamp } from "./Ornaments";
import { wedding } from "../utils/weddingData";

/** Jasmine bloom drifting through the frame. */
function Petal({ style, delay, size = 22 }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="pointer-events-none absolute text-gold/35"
      style={style}
      initial={{ opacity: 0, y: -10, rotate: 0 }}
      animate={{ opacity: [0, 0.75, 0], y: [-10, 90], rotate: [0, 140] }}
      transition={{ duration: 13, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="20" cy="10" rx="5" ry="8.5" transform={`rotate(${a} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="4" fill="#F0DAA0" />
      </g>
    </motion.svg>
  );
}

export default function Blessings({ sectionRef }) {
  return (
    <Section id="blessings" ref={sectionRef} contentClassName="blessings-content">
      <GoldParticles count={16} />

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Petal
          key={i}
          delay={i * 2.1}
          size={16 + (i % 3) * 7}
          style={{ left: `${8 + i * 15}%`, top: `${10 + (i % 3) * 22}%` }}
        />
      ))}

      {/* flanking lamps, standing on the section floor */}
      <div className="pointer-events-none absolute bottom-0 left-6 hidden opacity-90 lg:block xl:left-20">
        <TempleLamp size={64} />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-6 hidden opacity-90 lg:block xl:right-20">
        <TempleLamp size={64} />
      </div>

      <div className="blessings-layout">
        <div className="blessings-parent-column blessings-parent-left">
          <img src="/parents-1.png" alt="Groom's parents" className="blessings-parent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.95, ease: [0.2, 0.7, 0.3, 1] }}
          className="blessings-card relative z-10 mx-auto max-w-3xl"
      >
        <div className="card-royal relative px-8 py-12 text-center sm:px-14 sm:py-16">
          <span className="pointer-events-none absolute left-3 top-3 text-gold/40">
            <CornerFlourish size={56} rotate={0} />
          </span>
          <span className="pointer-events-none absolute right-3 top-3 text-gold/40">
            <CornerFlourish size={56} rotate={90} />
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 text-gold/40">
            <CornerFlourish size={56} rotate={180} />
          </span>
          <span className="pointer-events-none absolute bottom-3 left-3 text-gold/40">
            <CornerFlourish size={56} rotate={270} />
          </span>

          <Lotus size={22} className="mx-auto text-gold/70" />

          <p className="mt-6 select-none font-cinzel text-5xl leading-none text-gold/40">&ldquo;</p>

          <p className="-mt-4 font-cormorant text-xl leading-relaxed italic text-ivory/95 sm:text-[1.7rem] sm:leading-relaxed">
            {wedding.blessing}
          </p>

          <OrnateRule className="my-8" width={240} />

          <p className="font-vibes text-[2rem] leading-tight text-gold-light sm:text-5xl">
            With Blessings from Both Families
          </p>

          {(wedding.groom.parents || wedding.bride.parents) && (
            <div className="mt-6 flex flex-col items-center gap-1.5 font-poppins text-[9px] font-light tracking-[0.2em] text-ivory/50 uppercase sm:text-[11px]">
              {wedding.groom.parents && <span>{wedding.groom.parents}</span>}
              {wedding.groom.parents && wedding.bride.parents && (
                <span className="h-px w-10 bg-gold/30" aria-hidden="true" />
              )}
              {wedding.bride.parents && <span>{wedding.bride.parents}</span>}
            </div>
          )}
          </div>
        </motion.div>

        <div className="blessings-parent-column blessings-parent-right">
          <img src="/parents-2.png" alt="Bride's parents" className="blessings-parent" />
        </div>
      </div>
    </Section>
  );
}