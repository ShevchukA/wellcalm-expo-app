import { Habit } from '@/models/models';
import { create } from 'zustand';

export interface Store {
  habits: Habit[];
  selectedHabit: Habit | null;
  isModalOpen: boolean;

  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  checkDate: (habitId: string, date: string) => void;
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

    checkDate: (habitId, date) =>
      set((state) => {
        return {
          habits: state.habits.map((habit) => {
            if (habit.id !== habitId) {
              return habit;
            }

            const updatedHabitDates = [...habit.dates];
            const index = habit.dates.findIndex((item) => item === date);
            if (index !== -1) {
              updatedHabitDates.splice(index, 1);
            } else {
              updatedHabitDates.push(date);
            }

            return { ...habit, dates: updatedHabitDates };
          }),
        };
      }),

    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    selectHabit: (habit) => set(() => ({ selectedHabit: habit })),
  };
});
