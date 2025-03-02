import { Dates } from '@/models/models';
import { MONTHS } from '@/constants/Months';

export function getLongestStreakForYear(dates: Dates, year: string): number {
  const yearData = dates[year];
  if (!yearData) return 0;

  // Определяем, является ли год високосным
  const numericYear = parseInt(year, 10);
  const isLeapYear =
    (numericYear % 4 === 0 && numericYear % 100 !== 0) ||
    numericYear % 400 === 0;

  // Количество дней в каждом месяце (месяцы заданы от 1 до 12)
  const monthLengths = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  // Собираем порядковые номера дней, где значение true
  let dayNumbers: number[] = [];

  for (const month in yearData) {
    const monthIndex = MONTHS.findIndex((monthName) => monthName === month);
    Object.entries(yearData[month]).forEach(([dayStr, value]) => {
      if (value) {
        const day = parseInt(dayStr, 10);
        // Вычисляем порядковый номер: сумма дней всех предыдущих месяцев + day
        const dayOfYear =
          monthLengths.slice(0, monthIndex).reduce((acc, cur) => acc + cur, 0) +
          day;
        dayNumbers.push(dayOfYear);
      }
    });
  }

  if (dayNumbers.length === 0) return 0;

  dayNumbers.sort((a, b) => a - b);

  const streak = getStreak(dayNumbers);
  return streak;
}

export function getLongestStreakForMonth(
  dates: Dates,
  year: string,
  month: string
): number {
  // Отфильтруем даты, которые относятся к нужному году и месяцу.
  const monthDays = dates?.[year]?.[month] ?? {};

  const daysArray = Object.keys(monthDays).map((day) => Number(day));

  // Отсортируем по возрастанию
  const sortedDays = daysArray.sort((a, b) => a - b);

  const streak = getStreak(sortedDays);

  return streak;
}

export function getStreak(uniqueDays: number[]) {
  let longestStreak = 0;
  let currentStreak = 0;

  uniqueDays.forEach((day, index) => {
    // Если это первый элемент или текущий день подряд после предыдущего
    if (index === 0 || day === uniqueDays[index - 1] + 1) {
      currentStreak++;
    } else {
      // Иначе обновляем максимальный стрик и начинаем новый
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  });

  // На случай, если серия идёт до конца массива
  longestStreak = Math.max(longestStreak, currentStreak);

  return longestStreak;
}
