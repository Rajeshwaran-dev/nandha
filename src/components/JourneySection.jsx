import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { Lotus } from "./Ornaments";
import { wedding } from "../utils/weddingData";

/* ------------------------------------------------------------------- car  */

/** Decorated wedding car — cream body, gold chrome, marigold garlands. */
function WeddingCar() {
  return (
    <svg
      width="230"
      height="120"
      viewBox="0 0 230 120"
      className="drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8EA" />
          <stop offset="45%" stopColor="#F0E2C6" />
          <stop offset="100%" stopColor="#C9B693" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5E1C24" />
          <stop offset="100%" stopColor="#2A080D" />
        </linearGradient>
        <radialGradient id="headBeam" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCF4DC" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6A1F" />
        </linearGradient>
      </defs>

      {/* headlight beam */}
      <path d="M206 66 L230 50 L230 86 Z" fill="url(#headBeam)" opacity="0.7" />

      {/* body */}
      <path
        d="M22 82c-8 0-13-5-13-13v-5c0-8 5-14 13-16l30-6 15-18c5-6 12-10 21-10h42c9 0 16 4 21 10l15 18 30 6c8 2 13 8 13 16v5c0 8-5 13-13 13H22Z"
        fill="url(#carBody)"
      />
      {/* belt-line chrome */}
      <path d="M14 60h198" stroke="url(#chrome)" strokeWidth="2" opacity="0.8" />
      {/* lower shadow */}
      <path
        d="M22 82c-8 0-13-5-13-13h204c0 8-5 13-13 13H22Z"
        fill="#000"
        opacity="0.12"
      />

      {/* glass */}
      <path d="M72 56 L86 28 H110 V56 Z" fill="url(#carGlass)" />
      <path d="M118 28 H142 L156 56 H118 Z" fill="url(#carGlass)" />
      <path d="M86 28 H110 V56" fill="none" stroke="url(#chrome)" strokeWidth="1.4" opacity="0.9" />
      <path d="M118 28 H142" fill="none" stroke="url(#chrome)" strokeWidth="1.4" opacity="0.9" />
      {/* glass sheen */}
      <path d="M90 52 L102 32 L106 32 L94 52 Z" fill="#FFF6E4" opacity="0.18" />

      {/* headlight + tail light */}
      <ellipse cx="203" cy="66" rx="7" ry="5.5" fill="#FFEDB8" />
      <ellipse cx="203" cy="66" rx="3.4" ry="2.6" fill="#FFF9E6" />
      <ellipse cx="16" cy="66" rx="5" ry="4.5" fill="#E2554A" opacity="0.9" />
      {/* bumpers */}
      <rect x="196" y="74" width="20" height="5" rx="2.5" fill="url(#chrome)" />
      <rect x="10" y="74" width="18" height="5" rx="2.5" fill="url(#chrome)" />

      {/* ------------------------------------------------ decorations ---- */}
      {/* roof garland ridge */}
      <g>
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 72 + i * 7;
          return (
            <circle
              key={i}
              cx={x}
              cy={26 - Math.sin((i / 12) * Math.PI) * 4}
              r={i % 2 ? 3.6 : 4.4}
              fill={i % 2 ? "#F2C14E" : "#E8862A"}
            />
          );
        })}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={76 + i * 14} cy={20 - Math.sin((i / 5) * Math.PI) * 3} r={2.2} fill="#FFF6E4" />
        ))}
      </g>

      {/* side swag garlands */}
      <g>
        {[
          { x0: 26, x1: 96 },
          { x0: 104, x1: 176 },
        ].map((s, k) =>
          Array.from({ length: 12 }).map((_, i) => {
            const t = i / 11;
            const x = s.x0 + (s.x1 - s.x0) * t;
            const y = 62 + Math.sin(t * Math.PI) * 11;
            return (
              <circle
                key={`${k}-${i}`}
                cx={x}
                cy={y}
                r={i % 2 ? 2.6 : 3.2}
                fill={i % 3 === 0 ? "#FFF6E4" : i % 2 ? "#F2C14E" : "#E8862A"}
                opacity="0.95"
              />
            );
          })
        )}
      </g>

      {/* bonnet flower cluster */}
      <g>
        <circle cx="182" cy="52" r="6" fill="#E8862A" />
        <circle cx="190" cy="49" r="5" fill="#F2C14E" />
        <circle cx="176" cy="47" r="4.5" fill="#F2C14E" />
        <circle cx="184" cy="44" r="3.4" fill="#FFF6E4" />
      </g>

      {/* trailing ribbons */}
      <g stroke="#F2C14E" strokeWidth="1.8" fill="none" opacity="0.85">
        <path d="M12 70c-8 3-14 1-20 5" />
        <path d="M12 74c-9 5-16 4-22 9" />
      </g>

      {/* wheels */}
      {[62, 170].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={84} r={16} fill="#1C1C1C" />
          <circle cx={cx} cy={84} r={9} fill="url(#chrome)" />
          <circle cx={cx} cy={84} r={3} fill="#3A2A10" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={cx - 0.9}
              y={76}
              width="1.8"
              height="8"
              fill="#8A6A1F"
              opacity="0.7"
              transform={`rotate(${i * 30} ${cx} 84)`}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------------- scene  */

function Palm({ className = "", size = 90, flip = false }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 80 120"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path d="M38 120c-1-34 1-58 4-74l5 1c-4 17-6 40-5 73h-4Z" fill="currentColor" />
      {[
        "M42 46c14-12 27-13 36-4-12-2-23 2-33 9l-3-5Z",
        "M42 46c12 4 20 14 22 27-9-9-18-15-25-21l3-6Z",
        "M40 46C26 34 13 33 4 42c12-2 23 2 33 9l3-5Z",
        "M40 46c-12 4-20 14-22 27 9-9 18-15 25-21l-3-6Z",
        "M41 44c2-15-3-27-14-32 6 10 8 21 9 32h5Z",
      ].map((d, i) => (
        <path key={i} d={d} fill="currentColor" opacity={0.9 - i * 0.05} />
      ))}
      <circle cx="41" cy="45" r="3.4" fill="currentColor" />
    </svg>
  );
}

export default function JourneySection({ sectionRef }) {
  const route =
    wedding.groom.place && wedding.bride.place
      ? [wedding.groom.place.split(",")[0].trim(), wedding.bride.place.split(",")[0].trim()]
      : null;

  const sceneRef = useRef(null);
  const carRef = useRef(null);
  const cloudsRef = useRef([]);
  const tweenRef = useRef(null);

  useEffect(() => {
    let observer;
    const ctx = gsap.context(() => {
      cloudsRef.current.forEach((cloud, i) => {
        if (!cloud) return;
        gsap.to(cloud, {
          x: i % 2 === 0 ? 70 : -70,
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      tweenRef.current = gsap.fromTo(
        carRef.current,
        { x: "-16vw" },
        { x: "104vw", duration: 8, ease: "none", repeat: -1, repeatDelay: 0.8, paused: true }
      );

      observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? tweenRef.current.play() : tweenRef.current.pause()),
        { threshold: 0.25 }
      );
      if (sceneRef.current) observer.observe(sceneRef.current);
    }, sceneRef);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <Section id="journey" ref={sectionRef}>
      <SectionHeading eyebrow="Two hearts, one road" title="One Beautiful Journey" />

      {/* Route ribbon — shows the two home towns once both are filled in,
          otherwise falls back to the wedding city so it never reads as blank. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-8 flex items-center justify-center gap-3 font-cinzel text-[10px] tracking-[0.3em] text-gold-light/80 uppercase sm:gap-5 sm:text-xs"
      >
        {route ? (
          <>
            <span>{route[0]}</span>
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
            <Lotus size={13} className="text-gold" />
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
            <span>{route[1]}</span>
          </>
        ) : (
          <>
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
            <Lotus size={13} className="text-gold" />
            <span>{wedding.cities}</span>
            <Lotus size={13} className="text-gold" />
            <span className="h-px w-8 bg-gold/50 sm:w-16" />
          </>
        )}
      </motion.div>

      {/* ------------------------------------------------------- the scene */}
      <div
        ref={sceneRef}
        className="relative mt-8 h-60 w-full overflow-hidden rounded-2xl border border-gold/25 sm:h-72"
        style={{
          background: "linear-gradient(180deg,#3B0810 0%,#2A060C 45%,#1B0508 100%)",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.6), 0 24px 60px -26px rgba(0,0,0,0.8)",
        }}
      >
        {/* stars */}
        {Array.from({ length: 26 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold-light"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 42}%`,
              width: i % 4 === 0 ? 2.5 : 1.6,
              height: i % 4 === 0 ? 2.5 : 1.6,
            }}
            animate={{ opacity: [0.15, 0.75, 0.15] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4 }}
          />
        ))}

        {/* moon */}
        <div className="absolute right-10 top-7 h-10 w-10">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, #FFF6E4, #E8CE83 60%, #B8912C)",
              boxShadow: "0 0 26px rgba(240,218,160,0.55)",
            }}
          />
        </div>

        {/* drifting clouds */}
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            ref={(el) => (cloudsRef.current[i] = el)}
            className="absolute text-ivory/[0.07]"
            style={{ top: `${8 + i * 12}%`, left: `${10 + i * 28}%`, width: 96, height: 44 }}
            viewBox="0 0 120 50"
            fill="currentColor"
            aria-hidden="true"
          >
            <ellipse cx="34" cy="34" rx="30" ry="14" />
            <ellipse cx="64" cy="26" rx="26" ry="16" />
            <ellipse cx="92" cy="34" rx="22" ry="12" />
          </svg>
        ))}

        {/* far hills */}
        <svg
          className="absolute bottom-[74px] left-0 w-full text-maroon/50"
          height="90"
          viewBox="0 0 800 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 90 L110 26 L230 90 Z" fill="currentColor" opacity="0.55" />
          <path d="M180 90 L330 14 L480 90 Z" fill="currentColor" opacity="0.4" />
          <path d="M430 90 L580 32 L800 90 Z" fill="currentColor" opacity="0.55" />
        </svg>

        {/* near treeline */}
        <div className="absolute bottom-[68px] left-0 w-full text-maroon-deep">
          <Palm className="absolute bottom-0 left-[6%] text-[#22060B]" size={64} />
          <Palm className="absolute bottom-0 left-[16%] text-[#1C050A]" size={48} flip />
          <Palm className="absolute bottom-0 right-[10%] text-[#22060B]" size={70} flip />
          <Palm className="absolute bottom-0 right-[22%] text-[#1C050A]" size={46} />
        </div>

        {/* roadside glow */}
        <div
          className="absolute bottom-16 left-0 h-10 w-full"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.10))",
          }}
        />

        {/* road */}
        <div
          className="absolute bottom-0 left-0 h-16 w-full"
          style={{
            background: "linear-gradient(180deg,#2A2E38 0%,#1A1D24 55%,#101318 100%)",
            borderTop: "1px solid rgba(212,175,55,0.45)",
          }}
        >
          <div
            className="absolute top-1/2 h-[3px] w-full -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#F0DAA0 0px,#F0DAA0 26px,transparent 26px,transparent 58px)",
              opacity: 0.55,
            }}
          />
          <div
            className="absolute bottom-2 h-px w-full"
            style={{ background: "rgba(212,175,55,0.18)" }}
          />
        </div>

        {/* the car */}
        <div ref={carRef} className="absolute bottom-[38px] left-0 will-change-transform">
          <WeddingCar />
          {/* road reflection */}
          <div
            className="absolute -bottom-1 left-6 h-3 w-[190px] rounded-full blur-[3px]"
            style={{ background: "rgba(212,175,55,0.22)" }}
          />
        </div>

        {/* petals drifting across */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: `${8 + i * 13}%`,
              background: i % 2 ? "#F2C14E" : "#E8862A",
              opacity: 0.55,
            }}
            animate={{ y: [-20, 200], x: [0, i % 2 ? 30 : -30], opacity: [0, 0.6, 0] }}
            transition={{ duration: 9 + i, repeat: Infinity, delay: i * 1.3, ease: "linear" }}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 layer-grain" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mx-auto mt-9 max-w-xl text-center font-cormorant text-base italic leading-relaxed text-ivory/70 sm:text-lg"
      >
        Every road we&rsquo;ve travelled &mdash; separately and together &mdash; has led us here, to
        a beginning wrapped in flowers, laughter, and love.
      </motion.p>
    </Section>
  );
}
