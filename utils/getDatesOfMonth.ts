export function getDatesOfMonth(year: number, month: number): string[] {
  // определяем количество дней в месяце
  // month: 0 - январь, 1 - февраль и т.д.
  // "0" в третьем аргументе означает "нулевой день" следующего месяца
  // что возвращает нам последний день предыдущего месяца
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // формируем массив дат в формате "YYYY-MM-DD" с 1 до количества дней в месяце
  const datesArray = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1).toISOString().split('T')[0]
  );

  return datesArray;
}
