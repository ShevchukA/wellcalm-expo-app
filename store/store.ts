import { Habit } from '@/models/models';
import { create } from 'zustand';
import { getAsyncStorageData } from '@/utils/getAsyncStorageData';
import { setAsyncStorageData } from '@/utils/setAsyncStorageData';
import { tutorHabit } from '@/models/tutorHabit';

export interface Store {
  habits: Habit[];
  selectedHabitId: string | null;
  isModalOpen: boolean;

  loadHabitsFromAsyncStore: () => void;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  editHabitName: (id: string, newName: string) => void;
  checkDate: (
    habitId: string,
    year: string,
    month: string,
    date: string
  ) => void;
  selectHabit: (habit: Habit | null) => void;
  toggleModal: () => void;
}

// TODO: is it a good idea to operate with local store from my app store?
export const useStore = create<Store>((set) => {
  return {
    habits: [tutorHabit],
    selectedHabitId: null,
    isModalOpen: false,

    loadHabitsFromAsyncStore: async () => {
      const newHabits = await getAsyncStorageData<Habit[]>('habits');
      if (newHabits) {
        set(() => ({ habits: newHabits }));
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

    checkDate: (habitId, year, month, date) =>
      set((state) => {
        const newHabits = state.habits.map((habit) => {
          if (habit.id !== habitId) {
            return habit;
          }

          // Получаем вложенные объекты, если они существуют, иначе создаём пустые
          const yearObj = habit.dates[year] ?? {};
          const monthObj = yearObj[month] ?? {};

          let updatedMonth: { [date: string]: boolean };

          // Если для данной даты значение отсутствует или false, добавляем со значением true
          if (!monthObj[date]) {
            updatedMonth = { ...monthObj, [date]: true };
          } else {
            // Если значение уже установлено, удаляем свойство
            const { [date]: removed, ...rest } = monthObj;
            updatedMonth = rest;
          }

          const updatedYear = { ...yearObj, [month]: updatedMonth };
          const updatedDates = { ...habit.dates, [year]: updatedYear };

          return { ...habit, dates: updatedDates };
        });

        setAsyncStorageData('habits', newHabits);
        return { habits: newHabits };
      }),

    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    selectHabit: (habit) => set(() => ({ selectedHabitId: habit?.id })),
  };
});
