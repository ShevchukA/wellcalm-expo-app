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
  updateHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  checkDate: (habitId: string, date: string) => void;
  selectHabit: (habitId: string | null) => void;
}

// TODO: is it a good idea to operate with local store from my app store?
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

    updateHabits: (habits: Habit[]) =>
      set((state) => {
        setAsyncStorageData('habits', habits);
        return { ...state, habits };
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

          // Получаем вложенные объекты, если они существуют, иначе создаём пустые
          const dates = habit.dates ?? {};

          let updatedDates = {};

          // Если для данной даты значение отсутствует или false, добавляем со значением true
          if (!dates[date]) {
            updatedDates = { ...dates, [date]: true };
          } else {
            // Если значение уже установлено, удаляем свойство
            const { [date]: removed, ...rest } = dates;
            updatedDates = rest;
          }

          return { ...habit, dates: updatedDates };
        });

        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

    selectHabit: (habitId) => set(() => ({ selectedHabitId: habitId })),
  };
});
