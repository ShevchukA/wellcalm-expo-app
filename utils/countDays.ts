export function countDatesInMonth(
  dates: string[],
  year: number,
  month: number
): number {
  return dates.filter((dateStr) => {
    const [y, m] = dateStr.split('-'); // y - год, m - месяц
    // Преобразуем месяц в число и сравниваем с переданным значением индекса месяца.
    return Number(y) === year && Number(m) === month + 1;
  }).length;
}

export function countDatesInYear(dates: string[], year: number): number {
  return dates.filter((dateStr) => {
    const [y] = dateStr.split('-');
    return Number(y) === year;
  }).length;
}
