import { motion } from "framer-motion";
import { FiInstagram, FiFacebook, FiYoutube, FiMapPin, FiArrowUp } from "react-icons/fi";
import Section from "./Section";
import { Kalasam, Lotus, OrnateRule } from "./Ornaments";
import { wedding } from "../utils/weddingData";

const socials = [
  { Icon: FiInstagram, label: "Instagram", href: "#" },
  { Icon: FiFacebook, label: "Facebook", href: "#" },
  { Icon: FiYoutube, label: "YouTube", href: "#" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, delay },
});

export default function Footer({ sectionRef }) {
  const toTop = () =>
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Section id="footer" ref={sectionRef}>
      <div className="mx-auto max-w-2xl text-center">
        <motion.div {...fade(0)}>
          <Kalasam size={28} className="mx-auto opacity-85" />
        </motion.div>

        <motion.p
          {...fade(0.08)}
          className="mt-2 font-vibes text-[2.1rem] leading-tight text-gold-light sm:text-5xl"
        >
          With Love &amp; Gratitude
        </motion.p>

        <motion.div {...fade(0.14)}>
          <OrnateRule className="my-4" width={240} />
        </motion.div>

        <motion.p
          {...fade(0.2)}
          className="mx-auto max-w-xl text-pretty font-cormorant text-base leading-relaxed italic text-ivory/85 sm:text-lg"
        >
          &ldquo;Your presence at our wedding is the greatest gift of all. We are so grateful to
          have you as part of our lives.&rdquo;
        </motion.p>

        <motion.p {...fade(0.28)} className="mt-5 font-vibes text-[1.7rem] text-gold sm:text-3xl">
          &mdash; {wedding.groom.name} &amp; {wedding.bride.name} &hearts;
        </motion.p>

        {/* date plate */}
        <motion.div
          {...fade(0.34)}
          className="mx-auto mt-6 w-fit rounded-xl border border-gold/30 bg-black/25 px-6 py-4 backdrop-blur-sm"
        >
          <p className="font-cinzel text-base tracking-[0.1em] text-foil sm:text-xl">
            {wedding.dateRange}
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-2 font-poppins text-[9px] font-light tracking-[0.22em] text-gold-light/80 uppercase sm:text-[11px]">
            <FiMapPin size={11} /> {wedding.cities}
          </p>
          <div className="rule-gold my-2.5" />
          <p className="font-cinzel text-[9px] tracking-[0.3em] text-gold sm:text-[11px]">
            {wedding.hashtag}
          </p>
        </motion.div>

        {/* socials */}
        <motion.div {...fade(0.4)} className="mt-6 flex items-center justify-center gap-3.5">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 bg-black/30 text-gold-light/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/80 hover:bg-gold/12 hover:text-gold-pale"
            >
              <Icon size={15} />
            </a>
          ))}
        </motion.div>

        {/* compliments */}
        <motion.div {...fade(0.46)} className="mt-7">
          <Lotus size={13} className="mx-auto text-gold/55" />
          <p className="mt-2 font-vibes text-xl text-gold-light/90 sm:text-2xl">
            With Best Compliments From
          </p>
          <p className="mt-0.5 font-cinzel text-[11px] tracking-[0.24em] text-ivory/80 uppercase sm:text-xs">
            Family &amp; Friends
          </p>
        </motion.div>

        <motion.button
          {...fade(0.52)}
          onClick={toTop}
          className="btn-ghost mt-7"
          aria-label="Back to the top of the invitation"
        >
          <FiArrowUp size={12} /> Back to top
        </motion.button>

        <p className="mt-6 font-poppins text-[9px] font-light tracking-[0.2em] text-ivory/35">
          Crafted with love for {wedding.groom.name} &amp; {wedding.bride.name}
        </p>
      </div>
    </Section>
  );
}
