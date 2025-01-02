"use client";

import { useTimerStore } from "../store/useTimerStore";
import { Timer } from "./Timer";

export const TimerList = () => {
  const timers = useTimerStore((state) => state.timers);

  return (
    <div className="relative p-8 max-w-6xl mx-auto scanlines">
      {/* Fond décoratif pixelisé */}
      <div
        className="
          absolute inset-0
        bg-[#465998]
          border-4 border-[#1a1528]
          -z-1
          "
      ></div>

      {/* Grille de timers */}
      <div
        className="
        flex flex-wrap justify-center gap-8
        p-4
        "
      >
        {timers.map((timer) => (
          <div
            key={timer.id}
            className="
          relative
          animate-fadeIn
          hover:transform hover:scale-105
          transition-all duration-200
        "
          >
            <Timer timer={timer} />
          </div>
        ))}
      </div>

      {/* Décorations des coins */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#ef7d57]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#ef7d57]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#ef7d57]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#ef7d57]" />
    </div>
  );
};
