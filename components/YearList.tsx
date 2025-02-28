import { Pressable, StyleSheet, Text, View } from 'react-native';
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
import { router } from 'expo-router';

interface YearListProps {
  habit: Habit;
  year: number;
}

export default function YearList({ habit, year }: YearListProps) {
  const currentDate = getCurrentDate(); // "YYYY-MM-DD"

  //   // Считаем отмеченные дни за месяц
  //   const checkedDates = countDatesInMonth(habit.dates, year, month);
  //   const streak = getLongestStreakForMonth(habit.dates, year, month);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{year}</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.yearContainer}>
            {MONTHS.map((month, monthIndex) => {
              const days = getDatesOfMonth(year, monthIndex);
              return (
                <View key={month} style={styles.monthContainer}>
                  <Text style={styles.month}>{month}</Text>
                  <View style={styles.daysContainer}>
                    {days.map((day) => {
                      return <View key={day} style={[styles.dot]}></View>;
                    })}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.separator} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Total per year</Text>
            <Text style={styles.text}> days</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Best streak</Text>
            <Text style={styles.markedText}> days</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    gap: 4,
    paddingHorizontal: 16,
    backgroundColor: Colors.pink,
  },
  title: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 20,
    color: Colors.black,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  yearContainer: { gap: 12 },
  monthContainer: {
    gap: 4,
  },
  month: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 15,
    lineHeight: 22,
    color: Colors.black,
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: Colors.lightGrey,
  },
  // -----------
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
