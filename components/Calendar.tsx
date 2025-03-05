import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import TrackerButton from './TrackerButton';
import { countDatesInMonth } from '@/utils/countDays';
import { getCurrentDate } from '@/utils/getDate';
import { getLongestStreakForMonth } from '@/utils/getStreak';
import { router } from 'expo-router';

interface CalendarProps {
  habit: Habit;
  year: string;
  month: string;
  monthNumber: string;
  weeks: (string | null)[][];
}

export default function Calendar({
  year,
  month,
  monthNumber,
  weeks,
  habit,
}: CalendarProps) {
  const { currentISODate } = getCurrentDate();

  // Считаем отмеченные дни за месяц
  const checkedDates = countDatesInMonth(habit.dates, year, monthNumber);
  const streak = getLongestStreakForMonth(habit.dates, year, monthNumber);

  const handlePress = () => {
    router.navigate('/year');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Pressable
          style={({ pressed }) => [
            styles.titleContainer,
            pressed && styles.pressed,
          ]}
          onPress={handlePress}
        >
          <Text style={styles.title}>{year}</Text>
          <Text style={styles.icon}>{'>'}</Text>
        </Pressable>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{month}</Text>

          <View style={styles.trackerContainer}>
            <DaysOfWeek />
            {weeks.map((week, i) => (
              <View key={i} style={styles.week}>
                {week.map((date, i) => {
                  if (date) {
                    return (
                      <TrackerButton
                        key={i}
                        habitId={habit.id}
                        date={date}
                        isCurrentDate={date === currentISODate}
                        isMarked={habit.dates?.[date]}
                      />
                    );
                  } else {
                    return <View key={i} style={styles.calendarSpacer} />;
                  }
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
    gap: 4,
    paddingHorizontal: 16,
    backgroundColor: Colors.pink,
  },
  title: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 20,
    color: Colors.black,
  },
  icon: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 20,
    color: Colors.tertiaryBlue,
  },
  pressed: {
    opacity: 0.7,
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
