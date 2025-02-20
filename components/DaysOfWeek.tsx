import { StyleSheet, Text, View } from 'react-native';

import { WEEK_DAYS } from '@/constants/WeekDays';

export default function DaysOfWeek() {
  return (
    <View style={styles.daysContainer}>
      {WEEK_DAYS.map((day) => (
        <Text key={day} style={styles.weekDay}>
          {day}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDay: {
    width: 44,
    fontFamily: 'Afacad-SemiBold',
    fontSize: 13,
    color: '#3C3C434D',
    textAlign: 'center',
  },
});
