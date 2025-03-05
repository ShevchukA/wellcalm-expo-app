import { Habit } from './models';
import { getCurrentDate } from '@/utils/getDate';
const { year } = getCurrentDate();

export const tutorHabit: Habit = {
  id: 'tutorial',
  name: 'Learn to fly',
  dates: {},
};
