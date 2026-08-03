import { forwardRef } from "react";
import { CornerSet } from "./Ornaments";

/**
 * Full-bleed snap section with the shared royal backdrop:
 * gradient → silk weave → kolam lattice → grain → vignette.
 */
const Section = forwardRef(function Section(
  { id, className = "", children, pattern = true, corners = true, contentClassName = "" },
  ref
) {
  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex min-h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-hidden bg-royal ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 layer-silk" />
      {pattern && <div className="pointer-events-none absolute inset-0 layer-kolam opacity-60" />}
      <div className="pointer-events-none absolute inset-0 layer-grain" />
      <div className="pointer-events-none absolute inset-0 layer-vignette" />

      {/* hairline frame + ornate corners */}
      <div className="pointer-events-none absolute inset-3 rounded-[10px] border border-gold/12 sm:inset-5" />
      {corners && <CornerSet inset={26} size={72} className="hidden text-gold/35 sm:block" />}

      {/* pb leaves room for the fixed section nav so content never collides */}
      <div
        className={`relative z-10 w-full max-w-6xl px-6 pt-16 pb-28 sm:px-10 sm:pt-24 sm:pb-36 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
});

export default Section;
