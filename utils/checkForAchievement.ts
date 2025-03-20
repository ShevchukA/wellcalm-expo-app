import { Habit } from '@/models/models';
import { getCurrentDate } from './getDate';
import { getCurrentWeekDates } from './getCurrentWeekDates';
import { useStore } from '@/store/store';
import { useUiStore } from '@/store/uiStore';

const setToastTitle = useUiStore.getState().setToastTitle;
const addAchievement = useUiStore.getState().addAchievement;

export const checkForAchievement = (habitId: string) => {
  const achievements = useUiStore.getState().achievements;
  const habits = useStore.getState().habits;

  const habit = habits.find((habit) => habit.id === habitId);

  if (!habits || !habit) {
    return;
  }

  if (checkForWeekStreak(habit) && !achievements[habitId]?.['weekStreak']) {
    setToastTitle('Week Streak Is Done!');
    addAchievement(habitId, 'weekStreak');
  }

  if (
    checkForDayRoutine(habits) &&
    !achievements?.['habits']?.['dayRoutineComplete']
  ) {
    setToastTitle('Day Routine Completed!');
    addAchievement('habits', 'dayRoutineComplete');
  }
};

export const checkForWeekStreak = (habit: Habit) => {
  const weekDates = getCurrentWeekDates();
  const allMarked = weekDates.every((date) => {
    return habit.dates?.[date];
  });

  return allMarked;
};

const checkForDayRoutine = (habits: Habit[]) => {
  const { currentISODate } = getCurrentDate();
  const isComplete = habits.every((habit) => habit.dates?.[currentISODate]);
  return isComplete;
};
