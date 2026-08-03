import { useCallback, useEffect, useRef, useState } from "react";
import { InviteProvider, useInvite } from "./context/InviteContext";
import GateIntro from "./components/GateIntro";
import PrevNextNav from "./components/PrevNextNav";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import JourneySection from "./components/JourneySection";
import EventTimeline from "./components/EventTimeline";
import Countdown from "./components/Countdown";
import Blessings from "./components/Blessings";
import Footer from "./components/Footer";

/**
 * Order must match the rendered sections below. Gallery is currently disabled,
 * so it is absent here too — otherwise the nav would hold a dead slot.
 */
const SECTIONS = [
  { id: "hero", label: "Welcome" },
  { id: "couple", label: "The Couple" },
  { id: "journey", label: "Our Journey" },
  { id: "timeline", label: "Events" },
  { id: "countdown", label: "Countdown" },
  { id: "blessings", label: "Blessings" },
  { id: "footer", label: "Thank You" },
];

function InvitationContent() {
  const { gatesOpen } = useInvite();
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    sectionRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* Track the section occupying most of the viewport. */
  useEffect(() => {
    if (!gatesOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        });
        if (!best) return;
        const idx = sectionRefs.current.findIndex((el) => el === best.target);
        if (idx !== -1) setActiveIndex(idx);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [gatesOpen]);

  /* Keyboard paging — ignored while typing in a field. */
  useEffect(() => {
    if (!gatesOpen) return;

    const handleKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(SECTIONS.length - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, gatesOpen, scrollToIndex]);

  const setRef = (idx) => (el) => {
    sectionRefs.current[idx] = el;
  };

  return (
    <div className="relative">
      <GateIntro />

      {/* Native scroll snapping handles touch; no custom swipe handler needed. */}
      <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <Hero ref={setRef(0)} />
        <CoupleSection sectionRef={setRef(1)} />
        <JourneySection sectionRef={setRef(2)} />
        <EventTimeline sectionRef={setRef(3)} />
        <Countdown sectionRef={setRef(4)} />
        <Blessings sectionRef={setRef(5)} />
        <Footer sectionRef={setRef(6)} />
      </div>

      {gatesOpen && (
        <PrevNextNav
          index={activeIndex}
          total={SECTIONS.length}
          labels={SECTIONS.map((s) => s.label)}
          showPrev={activeIndex > 0}
          showNext={activeIndex < SECTIONS.length - 1}
          onPrev={() => scrollToIndex(activeIndex - 1)}
          onNext={() => scrollToIndex(activeIndex + 1)}
          onJump={scrollToIndex}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <InviteProvider>
      <InvitationContent />
    </InviteProvider>
  );
}
