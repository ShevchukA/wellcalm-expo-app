import { CalendarArray, Habit } from '@/models/models';

import { create } from 'zustand';
import { createCalendar } from '@/utils/createCalendar';
import { getAsyncStorageData } from '@/utils/getAsyncStorageData';
import { setAsyncStorageData } from '@/utils/setAsyncStorageData';
import { tutorHabit } from '@/models/tutorHabit';

export interface Store {
  calendar: CalendarArray;
  habits: Habit[];
  selectedHabitId: string | null;
  loadHabitsFromAsyncStore: () => void;
  updateHabits: (newHabits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  checkDate: (habitId: string, date: string) => void;
  selectHabit: (habitId: string | null) => void;
}

export const useStore = create<Store>((set) => {
  return {
    calendar: createCalendar(),
    habits: [tutorHabit],
    selectedHabitId: null,

    loadHabitsFromAsyncStore: async () => {
      const newHabits = await getAsyncStorageData<Habit[]>('habits');
      if (newHabits) {
        set(() => ({ habits: newHabits }));
      }
    },

    updateHabits: (newHabits: Habit[]) =>
      set(() => {
        // TODO: use middleware to persist or useStore.subscribe
        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

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

          const updatedDates = { ...(habit.dates ?? {}) };

          // Если для данной даты значение отсутствует или false, добавляем со значением true,
          // иначе удаляем свойство
          if (!updatedDates[date]) {
            updatedDates[date] = true;
          } else {
            delete updatedDates[date];
          }

          return { ...habit, dates: updatedDates };
        });

        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

    selectHabit: (habitId) => set(() => ({ selectedHabitId: habitId })),
  };
});
