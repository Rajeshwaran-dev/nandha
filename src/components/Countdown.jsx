import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Lotus } from "./Ornaments";
import { wedding } from "../utils/weddingData";

function getTimeLeft() {
  const target = new Date(wedding.weddingDateISO).getTime();
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

function TimeCard({ value, label, index }) {
  const text = String(value).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="card-royal relative flex w-[4.6rem] flex-col items-center px-2 py-5 sm:w-28 sm:px-4 sm:py-7"
    >
      {/* top gleam */}
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />

      <div className="relative h-[2.4rem] overflow-hidden sm:h-[3.6rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={text}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.3, 0.8, 0.3, 1] }}
            className="font-cinzel text-[2rem] leading-none font-bold tabular-nums text-foil sm:text-[3.1rem]"
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>

      <span className="mt-3 h-px w-8 bg-gold/40 sm:w-10" />

      <p className="mt-2.5 font-poppins text-[8px] font-light tracking-[0.24em] text-gold-light/75 uppercase sm:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

function Bead() {
  return (
    <span className="hidden self-center sm:block" aria-hidden="true">
      <span className="block h-1.5 w-1.5 rotate-45 bg-gold/60" />
    </span>
  );
}

export default function Countdown({ sectionRef }) {
  const [time, setTime] = useState(getTimeLeft);
  const ceremony = wedding.events.find((e) => e.title === "Wedding") ?? wedding.events[0];

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <Section id="countdown" ref={sectionRef}>
      <SectionHeading eyebrow="The wait is almost over" title="Counting Down to Forever" />

      <div className="mt-12 flex items-stretch justify-center gap-2.5 sm:gap-4">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-stretch gap-2.5 sm:gap-4">
            {i > 0 && <Bead />}
            <TimeCard value={u.value} label={u.label} index={i} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mt-11 flex flex-col items-center gap-3"
      >
        <Lotus size={16} className="text-gold/60" />
        <p className="text-center font-cormorant text-lg italic text-ivory/70 sm:text-xl">
          {time.done
            ? `${wedding.groom.name} & ${wedding.bride.name} said "I do"`
            : `Until ${wedding.groom.name} & ${wedding.bride.name} say "I do"`}
        </p>
        <p className="font-cinzel text-[10px] tracking-[0.3em] text-gold-light/70 uppercase sm:text-xs">
          {wedding.dateRange}
          {ceremony?.venue ? ` · ${ceremony.venue}` : ""}
        </p>
      </motion.div>
    </Section>
  );
}
