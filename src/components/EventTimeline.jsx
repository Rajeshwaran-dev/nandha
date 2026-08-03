import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, A11y } from "swiper/modules";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiCalendar, FiArrowUpRight } from "react-icons/fi";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { CornerFlourish, Lotus } from "./Ornaments";
import { wedding } from "../utils/weddingData";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ROMAN = ["I", "II", "III", "IV", "V"];

/** Prefer the couple's own Maps pin; fall back to a search for the venue. */
function mapsHref(event) {
  return (
    event.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`
  );
}

function DetailRow({ icon, children }) {
  return (
    <span className="flex items-center gap-2 text-[0.9rem] text-ivory/85">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
        {icon}
      </span>
      {children}
    </span>
  );
}

function EventCard({ event, index, showNumeral = true }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.7, 0.3, 1] }}
      className="card-royal group relative flex h-full flex-col overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:p-8"
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute left-2.5 top-2.5 text-gold/35 transition-colors duration-500 group-hover:text-gold/60">
        <CornerFlourish size={44} rotate={0} />
      </span>
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 text-gold/35 transition-colors duration-500 group-hover:text-gold/60">
        <CornerFlourish size={44} rotate={180} />
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-3.5 py-1 font-cinzel text-[10px] tracking-[0.22em] text-gold-light uppercase">
            <Lotus size={10} className="text-gold" />
            {event.tag}
          </span>
          {showNumeral && (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 font-cinzel text-[10px] tracking-tight text-gold/70">
              {ROMAN[index]}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-cinzel text-[1.9rem] leading-none font-bold tracking-[0.04em] text-foil sm:text-[2.15rem]">
          {event.title}
        </h3>

        <div className="rule-gold my-5" />

        <p className="font-cormorant text-lg leading-snug text-ivory">{event.venue}</p>
        {event.address && (
          <p className="mt-1 font-cormorant text-sm leading-snug text-ivory/60">{event.address}</p>
        )}
        <p className="mt-1 font-cormorant text-sm text-gold-light/75">{event.location}</p>

        <div className="mt-6 flex flex-col gap-3">
          <DetailRow icon={<FiCalendar size={13} />}>{event.date}</DetailRow>
          <DetailRow icon={<FiClock size={13} />}>{event.time}</DetailRow>
          <DetailRow icon={<FiMapPin size={13} />}>{event.location}</DetailRow>
        </div>

        <a
          href={mapsHref(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-8 w-fit"
        >
          View on Map <FiArrowUpRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

export default function EventTimeline({ sectionRef }) {
  const events = wedding.events;
  const single = events.length === 1;

  return (
    <Section id="timeline" ref={sectionRef} pattern={false}>
      <SectionHeading
        eyebrow={single ? "Save the date" : "Save these dates"}
        title={single ? "The Wedding" : "Wedding Events"}
      />

      {/* One event reads better as a single centred card than a one-item carousel. */}
      {single ? (
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-md">
            <EventCard event={events[0]} index={0} showNumeral={false} />
          </div>
        </div>
      ) : (
        <div className="mt-12 w-full">
          <Swiper
            modules={[Pagination, Navigation, Keyboard, A11y]}
            slidesPerView={1.08}
            spaceBetween={18}
            centeredSlides
            grabCursor
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            navigation={{ nextEl: ".ev-next", prevEl: ".ev-prev" }}
            breakpoints={{
              640: { slidesPerView: 1.6, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 26, centeredSlides: false },
            }}
            className="pb-14"
          >
            {events.map((ev, i) => (
              <SwiperSlide key={ev.title}>
                <EventCard event={ev} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-1 flex items-center justify-center gap-4 lg:hidden">
            <button className="ev-prev btn-ghost" aria-label="Previous event">
              &larr; Prev
            </button>
            <button className="ev-next btn-ghost" aria-label="Next event">
              Next &rarr;
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
