import { CalendarArray } from '@/models/models';
import { MONTHS } from '@/constants/Months';
import { chunkArray } from './chunkArray';
import { getCurrentDate } from './getDate';
import { getDatesOfMonth } from './getDatesOfMonth';

export function createCalendar(): CalendarArray {
  const { year } = getCurrentDate();

  const calendar = MONTHS.map((_, monthIndex) => {
    // Вычисляем первое число конкретного месяца
    const firstDateOfMonth = new Date(Number(year), monthIndex, 1);
    const firstDayOfWeek = firstDateOfMonth.getDay(); // 0 (вс) - 6 (сб)
    // Если неделя начинается с понедельника, то преобразуем: воскресенье (0) → 6, понедельник (1) → 0, и т.д.
    const shift = (firstDayOfWeek + 6) % 7;

    const datesArray = getDatesOfMonth(Number(year), monthIndex);

    // Добавляем пустые ячейки в начало, чтобы сместить первый день месяца
    const calendarCells = [
      ...Array(shift).fill(null), // "пустые" ячейки
      ...datesArray,
    ];

    // Считаем, сколько ячеек в последней неделе
    const remainder = calendarCells.length % 7;

    // Если remainder не ноль, значит, последняя неделя короче 7 дней
    if (remainder !== 0) {
      // Добавляем недостающие ячейки, чтобы довести последнюю неделю до 7 дней
      const cellsToAdd = 7 - remainder;
      calendarCells.push(...Array(cellsToAdd).fill(null));
    }

    // Разбиваем по 7 элементов (дни недели)
    const weeks = chunkArray(calendarCells, 7);

    return weeks;
  });

  return calendar;
}
