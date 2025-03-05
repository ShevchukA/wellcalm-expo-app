import { Dates } from '@/models/models';

export function countDatesInMonth(
  dates: Dates,
  year: string, // 2025
  monthNumber: string // 05
): number {
  const markedDates = Object.keys(dates).filter((date) =>
    date.startsWith(`${year}-${monthNumber}`)
  );

  return markedDates.length;
}

export function countDatesInYear(dates: Dates, year: string): number {
  const markedDates = Object.keys(dates).filter((date) =>
    date.startsWith(year)
  );

  return markedDates.length;
}
