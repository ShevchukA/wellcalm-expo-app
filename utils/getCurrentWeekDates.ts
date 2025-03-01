import { MONTHS } from '@/constants/Months';

export const getCurrentWeekDates = (): string[] => {
  const now = new Date();
  const currentDay = now.getDay(); // День недели (0 - воскресенье, 1 - понедельник и т.д.)
  const startOfWeek = new Date(now); // Копируем текущую дату

  // Найти начало недели (понедельник)
  const dayOffset = currentDay === 0 ? 6 : currentDay - 1; // Если воскресенье (0), то смещение 6
  startOfWeek.setDate(now.getDate() - dayOffset);

  // Собрать список всех дней недели
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);

    const year = weekDate.getFullYear();
    const monthName = MONTHS[weekDate.getMonth()];
    const day = weekDate.getDate().toString().padStart(2, '0'); // если нужен формат DD

    weekDates.push(`${year}-${monthName}-${day}`);
  }

  return weekDates;
};
