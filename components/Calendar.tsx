import { StyleSheet, Text, View } from 'react-native';
import { useMemo, useState } from 'react';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import TrackerButton from './TrackerButton';
import { chunkArray } from '@/utils/chunkArray';
import { getCurrentDate } from '@/utils/getCurrentDate';
import { getDatesOfMonth } from '@/utils/getDatesOfMonth';

interface CalendarProps {
  month: number;
  habit: Habit;
}

export function Calendar({ month, habit }: CalendarProps) {
  const [year, setYear] = useState(2025);

  const currentDate = useMemo(() => getCurrentDate(), []);

  const firstDate = new Date(year, month, 1); // первая дата месяца
  const firstDayOfWeek = firstDate.getDay(); // вернёт число от 0 (вс) до 6 (сб)
  const shift = (firstDayOfWeek + 6) % 7; // задаем смещение с учетом того, что 0 - понедельник

  const datesArray = getDatesOfMonth(year, month);

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

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>February 2025</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.trackerContainer}>
            <DaysOfWeek />
            {weeks.map((week, i) => (
              <View key={i} style={styles.week}>
                {week.map((date, i) => {
                  return date ? (
                    <TrackerButton
                      key={i}
                      habitId={habit.id}
                      date={date}
                      isCurrentDate={date === currentDate}
                      isMarked={
                        habit.dates.find((item) => item === date) ? true : false
                      }
                    />
                  ) : (
                    <View key={i} style={styles.calendarSpacer} />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 554,
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.pink,
  },
  title: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 20,
    color: Colors.black,
  },
  mainContainer: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  trackerContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    gap: 4,
  },
  week: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarSpacer: {
    width: 44,
    height: 44,
  },
});
