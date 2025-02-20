import { StyleSheet, Text, View } from 'react-native';
import { getCurrentDate, getCurrentYear } from '@/utils/getDate';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import { MONTHS } from '@/constants/Months';
import TrackerButton from './TrackerButton';
import { chunkArray } from '@/utils/chunkArray';
import { countDatesInMonth } from '@/utils/countDays';
import { getDatesOfMonth } from '@/utils/getDatesOfMonth';
import { getLongestStreakForMonth } from '@/utils/getStreak';

interface CalendarProps {
  habit: Habit;
  // year: number;
  month: number; // index, 0 - January
}

export default function Calendar({ month, habit }: CalendarProps) {
  const currentDate = getCurrentDate(); // "YYYY-MM-DD"
  const year = Number(getCurrentYear());

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

  // Считаем отмеченные дни за месяц
  const checkedDates = countDatesInMonth(habit.dates, year, month);
  const streak = getLongestStreakForMonth(habit.dates, year, month);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{year}</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{MONTHS[month]}</Text>

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

          <View style={styles.separator} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Total per month</Text>
            <Text style={styles.text}>{checkedDates} days</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Best streak</Text>
            <Text style={styles.markedText}>{streak} days</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 554, // TODO ?
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
  text: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
    color: Colors.black,
  },
  markedText: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 20,
    color: Colors.tertiaryBlue,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  trackerContainer: {
    marginTop: 6,
    gap: 4,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarSpacer: {
    width: 44,
    height: 44,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: Colors.pink,
    marginVertical: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
