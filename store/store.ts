import { Habit } from '@/models/models';
import { create } from 'zustand';
import { getAsyncStorageData } from '@/utils/getAsyncStorageData';
import { setAsyncStorageData } from '@/utils/setAsyncStorageData';

export interface Store {
  habits: Habit[];
  selectedHabitId: string | null;
  isModalOpen: boolean;

  loadHabitsFromAsyncStore: () => void;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  checkDate: (habitId: string, date: string) => void;
  selectHabit: (habit: Habit | null) => void;
  toggleModal: () => void;
}

// TODO: is it a good idea to operate with local store from my app store?
export const useStore = create<Store>((set) => {
  return {
    habits: [],
    selectedHabitId: null,
    isModalOpen: false,

    loadHabitsFromAsyncStore: async () => {
      const newHabits = await getAsyncStorageData('habits');
      if (newHabits) {
        set(() => ({ habits: newHabits as Habit[] }));
      }
    },

    addHabit: (newHabit) => {
      set((state) => {
        const newHabits = [...state.habits, newHabit];
        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      });
    },

    deleteHabit: (id) =>
      set((state) => {
        const newHabits = state.habits.filter((habit) => habit.id !== id);
        setAsyncStorageData('habits', newHabits);
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
        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

    checkDate: (habitId, date) =>
      set((state) => {
        const newHabits = state.habits.map((habit) => {
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
        });

        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    selectHabit: (habit) => set(() => ({ selectedHabitId: habit?.id })),
  };
});
