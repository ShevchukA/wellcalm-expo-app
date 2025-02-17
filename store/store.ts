import { Habit } from '@/models/models';
import { create } from 'zustand';

export interface Store {
  habits: Habit[];
  selectedHabit: Habit | null;
  isModalOpen: boolean;

  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  selectHabit: (habit: Habit | null) => void;
  toggleModal: () => void;
}

export const useStore = create<Store>((set) => {
  return {
    habits: [],
    selectedHabit: null,
    isModalOpen: false,

    addHabit: (newHabit) =>
      set((state) => ({ habits: [...state.habits, newHabit] })),

    deleteHabit: (id) =>
      set((state) => {
        const newHabits = state.habits.filter((habit) => habit.id !== id);
        return { habits: newHabits };
      }),

    editHabitName: (id, newName) =>
      set((state) => {
        const index = state.habits.findIndex((habit) => habit.id === id);
        if (index === -1) {
          return state;
        }
        const newHabits = [...state.habits];
        newHabits[index] = { ...newHabits[index], name: newName };
        return { habits: newHabits };
      }),

    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    selectHabit: (habit) => set(() => ({ selectedHabit: habit })),
  };
});
