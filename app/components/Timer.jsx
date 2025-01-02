import { useEffect, useRef, useState } from "react";
import { useTimerStore } from "../store/useTimerStore";

export const Timer = ({ timer }) => {
  const updateTimer = useTimerStore((state) => state.updateTimer);
  const toggle = useTimerStore((state) => state.toggle);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const removeTimer = useTimerStore((state) => state.removeTimer);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef(new Audio("/sounds/timer.mp3"));

  const formatNumber = (num) => String(num).padStart(2, "0");

  const calculateProgress = () => {
    const totalInitialSeconds =
      timer.initialTime.hours * 3600 +
      timer.initialTime.minutes * 60 +
      timer.initialTime.seconds;

    const currentSeconds =
      timer.time.hours * 3600 + timer.time.minutes * 60 + timer.time.seconds;

    return (currentSeconds / totalInitialSeconds) * 100;
  };

  useEffect(() => {
    if (!timer.isRunning) return;

    const interval = setInterval(() => {
      // Vérifions d'abord si on est déjà à 0
      if (
        timer.time.hours === 0 &&
        timer.time.minutes === 0 &&
        timer.time.seconds === 0
      ) {
        clearInterval(interval);
        setIsFinished(true);
        audioRef.current.play();
        setTimeout(() => {
          setIsFinished(false);
          toggle(timer.id);
        }, 4000);
        return;
      }

      const newTime = {
        hours: timer.time.hours,
        minutes: timer.time.minutes,
        seconds: timer.time.seconds - 1,
      };

      if (newTime.seconds < 0) {
        newTime.minutes -= 1;
        newTime.seconds = 59;
      }

      if (newTime.minutes < 0) {
        newTime.hours -= 1;
        newTime.minutes = 59;
      }

      updateTimer(timer.id, { time: newTime });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTimer, timer]);

  return (
    <div
      className={`
      relative p-6 my-4 mx-6
      bg-[#2c2137] 
      border-4 border-[#1a1528]
      shadow-[4px_4px_0px_0px_#1a1528]
      ${
        isFinished
          ? "animate-timer-flash animate-timer-shake animate-timer-color-shift animate-pixel-explosion"
          : ""
      }
    `}
    >
      {/* Le temps */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className="
      inline-block
      min-w-16 p-3
      bg-[#1a1528]
      border-2 border-[#4e8fb1]
      text-[#fbf5ef] text-4xl text-center
      shadow-[2px_2px_0px_0px_#4e8fb1]
    "
        >
          {formatNumber(timer.time.hours)}
        </span>
        <span className="text-4xl font-pixel text-[#ef7d57]">:</span>
        <span
          className="
      inline-block
      min-w-16 p-3
      bg-[#1a1528]
      border-2 border-[#4e8fb1]
      text-[#fbf5ef] text-4xl text-center
      shadow-[2px_2px_0px_0px_#4e8fb1]
    "
        >
          {formatNumber(timer.time.minutes)}
        </span>
        <span className="text-4xl font-pixel text-[#ef7d57]">:</span>
        <span
          className="
      inline-block
      min-w-16 p-3
      bg-[#1a1528]
      border-2 border-[#4e8fb1]
      text-[#fbf5ef] text-4xl text-center
      shadow-[2px_2px_0px_0px_#4e8fb1]
    "
        >
          {formatNumber(timer.time.seconds)}
        </span>
      </div>
      {/* Barre de progression avec étincelle */}
      <div className="absolute -top-12 right-0 w-full h-2 mt-4 bg-[#1a1528] border-2 border-[#4e8fb1] overflow-hidden">
        <div
          className="relative h-full bg-[#ef7d57] transition-all duration-1000"
          style={{ width: `${calculateProgress()}%` }}
        >
          {/* Étincelle pixelisée */}
          <div className="absolute right-0 top-0 animate-spark">
            <div
              className="
        w-2 h-2
        bg-[#fbf5ef]
        before:content-['']
        before:absolute
        before:w-2 before:h-2
        before:bg-[#ffeb3b]
        before:-top-1 before:-left-1
        after:content-['']
        after:absolute
        after:w-1 after:h-1
        after:bg-[#ff9800]
        after:-bottom-1 after:right-0
        
      "
            />
          </div>
        </div>
      </div>
      {/* Les boutons */}
      <button
        className="
      absolute -bottom-8 -left-9
      px-4 py-2
      bg-[#b7d877]
      text-[#1a1528] text-xl
      border-t-4 border-l-4 border-t-[#fbf5ef] border-l-[#fbf5ef]
      border-b-4 border-r-4 border-b-[#2c2137]  border-r-[#2c2137] 
      hover:translate-y-[2px]
      hover:border-b-2 hover:border-r-2
      active:translate-y-[4px]
      active:border-b-0 active:border-r-0
      transition-all duration-100
    "
        onClick={() => resetTimer(timer.id)}
      >
        Reset
      </button>

      <button
        className="
    absolute -bottom-4 right-1/2 transform translate-x-1/2
    p-3
    bg-[#2c2137]
    text-[#ef7d57]
    text-xl
    border-2 border-[#4e8fb1]
    hover:bg-[#ef7d57]
    hover:text-[#fbf5ef]
    transition-all duration-200
    flex items-center justify-center
    w-6 h-6
  "
        onClick={() => removeTimer(timer.id)}
      >
        ×
      </button>
      <button
        className="
      absolute -bottom-8 -right-9
      px-4 py-2
      bg-[#4e8fb1]
      text-[#fbf5ef] text-xl
      border-t-4 border-l-4 border-t-[#fbf5ef] border-l-[#fbf5ef]
      border-b-4 border-r-4 border-b-[#2c2137]  border-r-[#2c2137] 
      hover:translate-y-[2px]
      hover:border-b-2 hover:border-r-2
      active:translate-y-[4px]
      active:border-b-0 active:border-r-0
      transition-all duration-100
    "
        onClick={() => toggle(timer.id)}
      >
        {timer.isRunning ? "Pause" : "Play"}
      </button>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="
    absolute -top-5 
    left-1/2 transform -translate-x-1/2 
    p-1 
    bg-[#1a1528] 
    text-[#fbf5ef] text-center
    border-2 border-[#4e8fb1] 
    hover:border-[#ef7d57]
    focus:outline-none
    focus:border-[#ef7d57]
  "
        value={timer.title || ""}
        onChange={(e) => updateTimer(timer.id, { title: e.target.value })}
      />
    </div>
  );
};
