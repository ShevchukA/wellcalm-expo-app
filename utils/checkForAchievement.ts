import { Habit } from '@/models/models';
import { getCurrentDate } from './getDate';
import { getCurrentWeekDates } from './getCurrentWeekDates';
import { getStreak } from './getStreak';
import { useUiStore } from '@/store/uiStore';

const setToastTitle = useUiStore.getState().setToastTitle;

export const checkForAchievement = (habit: Habit) => {
  if (checkForWeekStreak(habit)) {
    setToastTitle('Week Streak Is Done!');
  }

  // TODO
  //   switch (streak) {
  //     case 3:
  //       setToastTitle('2 Days Streak');
  //       break;
  //     case 7:
  //       setToastTitle('Week Streak Is Done!');
  //       break;
  //     default:
  //       break;
  //   }
};

export const checkForWeekStreak = (habit: Habit) => {
  const weekDays = getCurrentWeekDates();
  const allMarked = weekDays.every((day) => {
    const [year, month, date] = day.split('-');
    return habit.dates?.[year]?.[month]?.[date];
  });

  return allMarked;
};

export const checkFor3DaysStreak = (habit: Habit) => {
  let count = 0;
  const { currentFullDate } = getCurrentDate(); // 'YYYY-MM-DD'
  const weekDays = getCurrentWeekDates(); // array of 'YYYY-MM-DD'
  const dateIndex = weekDays.findIndex((day) => day === currentFullDate);

  if (dateIndex < 2) {
    return false; // Проверяем только на третий день недели
  }

  const lastThreeDays = weekDays.slice(dateIndex - 2, dateIndex + 1);

  const allMarked = lastThreeDays.every((day) => {
    const [year, month, date] = day.split('-');
    return habit.dates?.[year]?.[month]?.[date];
  });

  return allMarked;
};

const checkForDayRoutine = (habits: Habit[]) => {
  let count = 0;
  const { year, month, date } = getCurrentDate();
  habits.forEach((habit) => {
    if (habit.dates?.[year]?.[month]?.[date]) {
      count++;
    }
  });

  if (count === habits.length) {
    setToastTitle('Day routine completed!');
  }
};
