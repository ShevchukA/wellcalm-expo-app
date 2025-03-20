import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Habit } from '@/models/models';
import { MONTHS } from '@/constants/Months';
import { countDatesInYear } from '@/utils/countDays';
import { getDatesOfMonth } from '@/utils/getDatesOfMonth';

interface YearListProps {
  habit: Habit;
  year: string;
}

export default function YearList({ habit, year }: YearListProps) {
  // Считаем отмеченные дни за год
  const checkedDates = countDatesInYear(habit.dates, year);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{year}</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.yearContainer}>
            {MONTHS.map((month, monthIndex) => {
              const days = getDatesOfMonth(Number(year), monthIndex);
              return (
                <View key={month} style={styles.monthContainer}>
                  <Text style={styles.month}>{month}</Text>
                  <View style={styles.daysContainer}>
                    {days.map((day) => {
                      const isMarked = habit.dates?.[day];
                      return (
                        <View
                          key={day}
                          style={[styles.dot, isMarked && styles.markedDot]}
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.separator} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Total per year</Text>
            <Text style={styles.markedText}>{checkedDates} days</Text>
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
    paddingTop: 12,
    paddingBottom: 24,
  },
  yearContainer: { gap: 9 },
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
  markedDot: {
    backgroundColor: Colors.lightGreen,
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

  separator: {
    borderTopWidth: 1,
    borderColor: Colors.pink,
    marginTop: 24,
    marginBottom: 9,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
