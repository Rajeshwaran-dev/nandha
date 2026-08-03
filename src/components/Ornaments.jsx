import { useId } from "react";

/* ---------------------------------------------------------------------------
   A small library of South-Indian-inspired gold ornaments.
   Everything is stroke/fill = currentColor so callers control the tone with
   a text-* class, and gradients get unique ids so instances never collide.
--------------------------------------------------------------------------- */

/** Vertical gold-leaf gradient, reusable inside any svg. */
export function GoldGradient({ id, vertical = true }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
      <stop offset="0%" stopColor="#FCF4DC" />
      <stop offset="30%" stopColor="#E8CE83" />
      <stop offset="58%" stopColor="#D4AF37" />
      <stop offset="82%" stopColor="#A9862A" />
      <stop offset="100%" stopColor="#8A6A1F" />
    </linearGradient>
  );
}

/* ------------------------------------------------------------------ corner */

/**
 * Ornate corner: double rule with spiral terminals, a mango-leaf paisley
 * and beaded dots. Rotate with `rotate` (0 / 90 / 180 / 270).
 */
export function CornerFlourish({ className = "", rotate = 0, size = 96 }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* outer rule */}
      <path d="M0 4h50" strokeWidth="1.5" />
      <path d="M4 0v50" strokeWidth="1.5" />
      {/* spiral terminals */}
      <path
        d="M50 4c7.5 0 11.5 3.8 11.5 9.4 0 5-3.6 8.4-8.4 8.4-4 0-6.8-2.6-6.8-6 0-3 2.2-5 4.8-4.4"
        strokeWidth="1.1"
      />
      <path
        d="M4 50c0 7.5 3.8 11.5 9.4 11.5 5 0 8.4-3.6 8.4-8.4 0-4-2.6-6.8-6-6.8-3 0-5 2.2-4.4 4.8"
        strokeWidth="1.1"
      />
      {/* inner arc */}
      <path d="M4 32C4 16.5 16.5 4 32 4" strokeWidth="0.75" opacity="0.5" />
      {/* mango-leaf paisley on the diagonal */}
      <path
        d="M18 18c13.5 2.8 21.5 11.5 24.5 25-13.5-2.8-21.5-11.5-24.5-25Z"
        fill="currentColor"
        stroke="none"
        opacity="0.22"
      />
      <path d="M18 18c13.5 2.8 21.5 11.5 24.5 25" strokeWidth="0.9" opacity="0.75" />
      <path d="M24 22c6 4 10 9 12.5 15" strokeWidth="0.6" opacity="0.45" />
      {/* beads */}
      <circle cx="11" cy="11" r="1.9" fill="currentColor" stroke="none" />
      <circle cx="56" cy="8.5" r="1.2" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="8.5" cy="56" r="1.2" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

/** All four corners of a container, absolutely positioned. */
export function CornerSet({ inset = 20, size = 84, className = "text-gold/40" }) {
  const spots = [
    { key: "tl", rotate: 0, style: { top: inset, left: inset } },
    { key: "tr", rotate: 90, style: { top: inset, right: inset } },
    { key: "br", rotate: 180, style: { bottom: inset, right: inset } },
    { key: "bl", rotate: 270, style: { bottom: inset, left: inset } },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {spots.map((s) => (
        <span key={s.key} className="absolute leading-none" style={s.style}>
          <CornerFlourish size={size} rotate={s.rotate} />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ lotus  */

/** Five-petal lotus fan. */
export function Lotus({ className = "", size = 26 }) {
  return (
    <svg viewBox="0 0 60 44" width={size * 1.4} height={size} className={className} aria-hidden="true">
      <g transform="translate(30,34)" fill="currentColor">
        {[-56, -28, 0, 28, 56].map((a, i) => (
          <path
            key={a}
            d="M0 -26C5.5 -16 5.5 -6 0 2C-5.5 -6 -5.5 -16 0 -26Z"
            transform={`rotate(${a})`}
            opacity={i === 2 ? 1 : 0.72}
          />
        ))}
        <ellipse cx="0" cy="3" rx="7" ry="3.4" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- divider  */

/**
 * Section divider: tapered rules, beads, and a centred lotus.
 * `tone` lets a caller dial the strength down inside dense layouts.
 */
export function OrnateRule({ className = "", width = 300 }) {
  const gid = useId();
  return (
    <div className={`flex w-full justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 300 44"
        width={width}
        className="max-w-full text-gold"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${gid}-l`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`${gid}-r`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* left */}
        <path d="M6 22h96" stroke={`url(#${gid}-l)`} strokeWidth="1.1" />
        <path d="M40 22c10-7 22-7 32 0-10 7-22 7-32 0Z" fill="#D4AF37" opacity="0.16" />
        <circle cx="110" cy="22" r="2.2" fill="#D4AF37" opacity="0.85" />
        <circle cx="120" cy="22" r="1.4" fill="#D4AF37" opacity="0.55" />

        {/* centre lotus */}
        <g transform="translate(150,33)" fill="#D4AF37">
          {[-56, -28, 0, 28, 56].map((a, i) => (
            <path
              key={a}
              d="M0 -24C5 -15 5 -6 0 1C-5 -6 -5 -15 0 -24Z"
              transform={`rotate(${a})`}
              opacity={i === 2 ? 1 : 0.7}
            />
          ))}
          <ellipse cx="0" cy="2.5" rx="6.5" ry="3" />
        </g>

        {/* right */}
        <circle cx="180" cy="22" r="2.2" fill="#D4AF37" opacity="0.85" />
        <circle cx="170" cy="22" r="1.4" fill="#D4AF37" opacity="0.55" />
        <path d="M188 22h106" stroke={`url(#${gid}-r)`} strokeWidth="1.1" />
        <path d="M228 22c10-7 22-7 32 0-10 7-22 7-32 0Z" fill="#D4AF37" opacity="0.16" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ kalasam */

/** The pot-and-bud finial that crowns a temple arch. */
export function Kalasam({ className = "", size = 44 }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 60 96"
      width={size}
      height={size * 1.6}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <GoldGradient id={gid} />
      </defs>
      <g fill={`url(#${gid})`}>
        {/* bud */}
        <path d="M30 2c4.5 7 6.5 13 6.5 18 0 4.6-3 7.6-6.5 7.6s-6.5-3-6.5-7.6c0-5 2-11 6.5-18Z" />
        {/* neck rings */}
        <rect x="25" y="28" width="10" height="4" rx="1.6" />
        <rect x="23" y="33" width="14" height="3.4" rx="1.6" opacity="0.9" />
        {/* mango leaves */}
        <path d="M28 38c-9 1-15 6-17 14 9-1 15-6 17-14Z" opacity="0.85" />
        <path d="M32 38c9 1 15 6 17 14-9-1-15-6-17-14Z" opacity="0.85" />
        {/* pot */}
        <path d="M20 40h20c7 4 11 11 11 19 0 12-9 21-21 21S9 71 9 59c0-8 4-15 11-19Z" />
        {/* base */}
        <rect x="14" y="82" width="32" height="5" rx="2.2" />
        <rect x="10" y="88" width="40" height="5" rx="2.2" opacity="0.85" />
      </g>
      {/* pot highlight */}
      <ellipse cx="23" cy="56" rx="4" ry="7" fill="#FFF6E4" opacity="0.28" />
    </svg>
  );
}

/* ------------------------------------------------------------------ lamp   */

/** Kuthuvilakku — the standing brass lamp, with a live flame. */
export function TempleLamp({ className = "", size = 70 }) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 80 180"
      width={size}
      height={size * 2.25}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <GoldGradient id={gid} />
        <radialGradient id={`${gid}-f`} cx="50%" cy="65%" r="55%">
          <stop offset="0%" stopColor="#FFF9E3" />
          <stop offset="45%" stopColor="#FFD37A" />
          <stop offset="100%" stopColor="#F08A2B" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* flame glow */}
      <ellipse cx="40" cy="24" rx="22" ry="26" fill={`url(#${gid}-f)`} opacity="0.45" />
      {/* flame */}
      <path
        className="animate-flame"
        d="M40 4c5 8 8.5 14 8.5 19.5 0 5.4-3.8 9-8.5 9s-8.5-3.6-8.5-9C31.5 18 35 12 40 4Z"
        fill={`url(#${gid}-f)`}
      />

      <g fill={`url(#${gid})`}>
        {/* oil bowl */}
        <path d="M18 36h44c0 9-8 15-22 15s-22-6-22-15Z" />
        <path d="M14 34h52v3.5H14z" />
        {/* stem */}
        <rect x="36" y="50" width="8" height="78" rx="3" />
        <ellipse cx="40" cy="66" rx="11" ry="4.5" opacity="0.9" />
        <ellipse cx="40" cy="88" rx="9" ry="4" opacity="0.85" />
        <ellipse cx="40" cy="110" rx="11" ry="4.5" opacity="0.9" />
        {/* base */}
        <path d="M40 126c14 0 26 12 28 26H12c2-14 14-26 28-26Z" />
        <rect x="6" y="152" width="68" height="7" rx="3.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ seal   */

/** Beaded wax-seal medallion. Children render inside the disc. */
export function SealMedallion({ size = 150, className = "", children }) {
  const gid = useId();
  const beads = 32;
  const r = 44;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <GoldGradient id={gid} />
        <radialGradient id={`${gid}-disc`} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#FBEFC6" />
          <stop offset="42%" stopColor="#E0BE5A" />
          <stop offset="78%" stopColor="#B8912C" />
          <stop offset="100%" stopColor="#8A6A1F" />
        </radialGradient>
      </defs>

      {/* beaded rim */}
      {Array.from({ length: beads }).map((_, i) => {
        const a = (i / beads) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={60 + Math.cos(a) * (r + 8)}
            cy={60 + Math.sin(a) * (r + 8)}
            r={2.4}
            fill={`url(#${gid})`}
          />
        );
      })}

      <circle cx="60" cy="60" r={r + 2} fill="none" stroke="#8A6A1F" strokeWidth="1" opacity="0.7" />
      <circle cx="60" cy="60" r={r} fill={`url(#${gid}-disc)`} />
      <circle cx="60" cy="60" r={r - 6} fill="none" stroke="#7A5C18" strokeWidth="0.9" opacity="0.55" />
      {/* rim shine */}
      <path
        d="M60 18a42 42 0 0 0-32 15"
        stroke="#FFF6E4"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- peacock  */

/** Stylised peacock-feather eye — used sparingly as a corner accent. */
export function FeatherEye({ className = "", size = 40 }) {
  return (
    <svg viewBox="0 0 40 56" width={size} height={size * 1.4} className={className} aria-hidden="true">
      <path
        d="M20 0c9 0 15 7 15 15 0 10-8 16-15 26C13 31 5 25 5 15 5 7 11 0 20 0Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M20 0c9 0 15 7 15 15 0 10-8 16-15 26C13 31 5 25 5 15 5 7 11 0 20 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <ellipse cx="20" cy="15" rx="6.5" ry="8" fill="currentColor" opacity="0.5" />
      <ellipse cx="20" cy="15" rx="3" ry="4" fill="currentColor" />
      <path d="M20 41v14" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ arch   */

/**
 * Temple arch outline used as a decorative frame.
 * Draws only the outline so content shows through.
 */
export function ArchOutline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      fill="none"
      stroke="currentColor"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M6 274V104C6 50 48 6 100 6s94 44 94 98v170"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M16 274V106C16 57 54 16 100 16s84 41 84 90v168"
        strokeWidth="1"
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
