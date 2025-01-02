import { create } from "zustand";

export const useTimerStore = create((set) => ({
  timers: [],
  addTimer: (timer) =>
    set((state) => ({
      timers: [
        ...state.timers,
        {
          ...timer,
          title: "",
          initialTime: { ...timer.time },
          isRunning: true,
        },
      ],
    })),
  updateTimer: (id, updates) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              // Si updates contient un objet time, on met à jour le temps
              // Sinon on met à jour les autres propriétés
              ...(updates.time ? { time: updates.time } : updates),
            }
          : timer
      ),
    })),
  toggle: (id) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      ),
    })),
  resetTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id
          ? { ...timer, time: { ...timer.initialTime }, isRunning: false }
          : timer
      ),
    })),
  removeTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    })),
}));
