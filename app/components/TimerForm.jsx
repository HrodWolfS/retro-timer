"use client";
import { useState } from "react";
import { useTimerStore } from "../store/useTimerStore";
import "../styles/animations.css";
import "../styles/scanlines.css";

const TimerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const addTimer = useTimerStore((state) => state.addTimer);

  // Formatage pour ajouter un 0 devant les nombres < 10
  const formatValue = (value) => {
    return value.toString().padStart(2, "0");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === "" ? 0 : parseInt(value);
    const maxValues = { hours: 23, minutes: 59, seconds: 59 };
    const validValue = Math.min(Math.max(parsedValue, 0), maxValues[name]);

    setTime((prevTime) => ({
      ...prevTime,
      [name]: validValue,
    }));
  };

  const handleKeyDown = (e) => {
    const inputs = ["hours", "minutes", "seconds"];
    const currentIndex = inputs.indexOf(e.target.name);

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        handleSubmit(e);
        break;
      case "ArrowLeft":
        e.preventDefault();
        // Déplace vers l'input précédent
        if (currentIndex > 0) {
          document
            .querySelector(`input[name=${inputs[currentIndex - 1]}]`)
            .focus();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        // Déplace vers l'input suivant
        if (currentIndex < inputs.length - 1) {
          document
            .querySelector(`input[name=${inputs[currentIndex + 1]}]`)
            .focus();
        }
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hours, minutes, seconds } = time;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Veuillez entrer une durée valide");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newTimer = {
      id: Date.now(),
      time: {
        hours,
        minutes,
        seconds,
      },
      initialTime: {
        hours,
        minutes,
        seconds,
      },
      isRunning: false,
    };

    addTimer(newTimer);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="scanlines mb-2">
      <form
        className={`
      relative
      p-8 
      bg-[#2c2137]
      border-4 border-[#1a1528]
      before:content-['']
      before:absolute before:top-2 before:left-2
      before:right-2 before:bottom-2
      before:border-2 before:border-[#ef7d57]
      before:pointer-events-none
      ${isSubmitting ? "submit-flash" : ""}
    `}
        onSubmit={handleSubmit}
      >
        {/* Décoration des coins */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#b7d877]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#b7d877]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#b7d877]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#b7d877]" />
        {/* Fin de la décoration des coins */}
        <div className="relative flex items-center justify-center">
          <input
            className={`
      w-24 p-4
      bg-[#1a1528]
      border-4 border-[#4e8fb1]
      text-center text-4xl
      shadow-[4px_4px_0px_0px_#ef7d57]
      focus:outline-none
      focus:border-[#b7d877]
      focus:shadow-[2px_2px_0px_0px_#ef7d57]
      focus:translate-x-[2px]
      focus:translate-y-[2px]
      transition-all duration-100
    `}
            type="number"
            name="hours"
            min="0"
            max="23"
            value={formatValue(time.hours)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <span className="text-4xl ml-1 font-pixel text-[#ef7d57]">:</span>
          <input
            className={`
      w-24 p-4
      bg-[#1a1528]
      border-4 border-[#4e8fb1]
      text-center text-4xl
      shadow-[4px_4px_0px_0px_#ef7d57]
      focus:outline-none
      focus:border-[#b7d877]
      focus:shadow-[2px_2px_0px_0px_#ef7d57]
      focus:translate-x-[2px]
      focus:translate-y-[2px]
      transition-all duration-100
    `}
            type="number"
            name="minutes"
            min="0"
            max="59"
            value={formatValue(time.minutes)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <span className="text-4xl ml-1 font-pixel text-[#ef7d57]">:</span>
          <input
            className={`
      w-24 p-4
      bg-[#1a1528]
      border-4 border-[#4e8fb1]
      text-center text-4xl
      shadow-[4px_4px_0px_0px_#ef7d57]
      focus:outline-none
      focus:border-[#b7d877]
      focus:shadow-[2px_2px_0px_0px_#ef7d57]
      focus:translate-x-[2px]
      focus:translate-y-[2px]
      transition-all duration-100
    `}
            type="number"
            name="seconds"
            min="0"
            max="59"
            value={formatValue(time.seconds)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className="
    bg-blue-500
    border-b-8 border-r-8 border-b-blue-700 border-r-blue-700
    border-t-4 border-l-4 border-t-blue-300 border-l-blue-300 
    p-4 ml-4
    hover:translate-x-[4px]
    hover:translate-y-[4px]
    hover:border-b-4 hover:border-r-4
    hover:border-t-2 hover:border-l-2
    active:translate-x-[6px]
    active:translate-y-[6px]
    active:border-b-2 active:border-r-2
    active:border-t-1 active:border-l-1
    transition-all duration-100"
            type="submit"
          >
            Add Timer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimerForm;
