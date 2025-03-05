import { Dates } from '@/models/models';

export function countDatesInMonth(
  dates: Dates,
  year: string, // 2025
  monthNumber: string // 05
): number {
  const markedDates = Object.keys(dates).filter((date) => {
    const [y, m] = date.split('-'); // y - год, m - месяц
    return y === year && m === monthNumber;
  });

  return markedDates.length;
}

export function countDatesInYear(dates: Dates, year: string): number {
  const markedDates = Object.keys(dates).filter((date) => {
    return year === date.split('-')[0];
  });

  return markedDates.length;
}
