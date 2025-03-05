import { Dates } from '@/models/models';

export function getLongestStreakForYear(dates: Dates, year: string): number {
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

  // Фильтруем ключи, оставляем только даты указанного года и с отмеченным значением true
  const relevantDates = Object.keys(dates).filter((date) =>
    date.startsWith(year)
  );

  // Собираем порядковые номера дней, где значение true
  let dayNumbers: number[] = relevantDates.map((dateStr) => {
    // Предполагается формат "YYYY-MM-DD"
    const [, monthStr, dayStr] = dateStr.split('-');
    const month = parseInt(monthStr, 10); // месяц от 1 до 12
    const day = parseInt(dayStr, 10);
    // Сумма дней в предыдущих месяцах + текущий день
    const dayOfYear =
      monthLengths.slice(0, month - 1).reduce((acc, cur) => acc + cur, 0) + day;
    return dayOfYear;
  });

  if (dayNumbers.length === 0) return 0;

  dayNumbers.sort((a, b) => a - b);

  const streak = getStreak(dayNumbers);
  return streak;
}

export function getLongestStreakForMonth(
  dates: Dates,
  year: string,
  monthNumber: string // 05
): number {
  // Отфильтруем даты, которые относятся к нужному году и месяцу.
  const monthDates = Object.keys(dates).filter((date) =>
    date.startsWith(`${year}-${monthNumber}`)
  );

  const daysArray = monthDates.map((date) => Number(date.split('-')[2]));

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
