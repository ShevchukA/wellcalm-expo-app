export function getLongestStreakForMonth(
  dates: string[],
  year: number,
  month: number // index, 0 - January
): number {
  // Отфильтруем даты, которые относятся к нужному году и месяцу.
  const monthDays = dates
    .map((dateStr) => new Date(dateStr))
    .filter((date) => date.getFullYear() === year && date.getMonth() === month)
    .map((date) => date.getDate());

  // Удалим повторения и отсортируем по возрастанию
  const uniqueDays = Array.from(new Set(monthDays)).sort((a, b) => a - b);

  const streak = getStreak(uniqueDays);

  return streak;
}

function getStreak(uniqueDays: number[]) {
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
