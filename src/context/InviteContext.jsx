import { createContext, useContext, useState, useRef, useCallback } from "react";

const InviteContext = createContext(null);

export function InviteProvider({ children }) {
  const [gatesOpen, setGatesOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = useCallback(() => {
    setMusicOn((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (next) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return next;
    });
  }, []);

  return (
    <InviteContext.Provider
      value={{ gatesOpen, setGatesOpen, musicOn, setMusicOn, toggleMusic, audioRef }}
    >
      {children}
    </InviteContext.Provider>
  );
}

export function useInvite() {
  const ctx = useContext(InviteContext);
  if (!ctx) throw new Error("useInvite must be used within InviteProvider");
  return ctx;
}
