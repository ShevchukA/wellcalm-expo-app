import { Dates } from '@/models/models';

export function countDatesInMonth(
  dates: Dates,
  year: string,
  month: string
): number {
  const countingMonth = dates?.[year]?.[month] ?? {};
  return Object.keys(countingMonth).length;
}

export function countDatesInYear(dates: Dates, year: string): number {
  const countingYear = dates?.[year] ?? {};
  let count = 0;

  for (const month in countingYear) {
    count += Object.keys(countingYear[month]).length;
  }

  return count;
}
