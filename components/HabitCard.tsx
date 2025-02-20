import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getCurrentDate, getCurrentMonthYear } from '@/utils/getDate';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import IconPencil from '../assets/icons/pencil.svg';
import TrackerButton from './TrackerButton';
import { getCurrentWeekDates } from '@/utils/getCurrentWeekDates';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useStore } from '@/store/store';

interface HabitCardProps {
  habit: Habit;
  color: string;
}

export default function HabitCard({ habit, color }: HabitCardProps) {
  const selectHabit = useStore((state) => state.selectHabit);
  const toggleModal = useStore((state) => state.toggleModal);

  const handleEdit = () => {
    selectHabit(habit);
    toggleModal();
  };

  const handleOpenCalendar = () => {
    selectHabit(habit);
    router.navigate('/month');
  };

  const currentDate = useMemo(() => getCurrentDate(), []);
  const currentMonth = useMemo(() => getCurrentMonthYear(), []);
  const currentWeekDates = useMemo(() => getCurrentWeekDates(), []);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={[styles.titleContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{habit.name}</Text>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <IconPencil />
          </Pressable>
        </View>
        <View style={styles.trackerContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.linkContainer,
              pressed && styles.linkContainerPressed,
            ]}
            onPress={handleOpenCalendar}
          >
            <Text style={styles.link}>{currentMonth}</Text>
            <Text style={styles.icon}>{'>'}</Text>
          </Pressable>

          <View style={styles.pickerContainer}>
            <DaysOfWeek />
            <View style={styles.datesContainer}>
              {currentWeekDates.map((date: string) => (
                <TrackerButton
                  key={date}
                  habitId={habit.id}
                  date={date}
                  isMarked={
                    habit.dates.find((item) => item === date) ? true : false
                  }
                  isCurrentDate={date === currentDate}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 16,
  },
  title: {
    fontFamily: 'Jost-Regular',
    fontSize: 32,
    color: Colors.darkGrey,
  },
  editButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  linkContainer: {
    height: 44,
    gap: 4,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 6,
  },
  linkContainerPressed: {
    opacity: 0.6,
  },
  link: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 20,
    color: Colors.black,
  },
  icon: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 17,
    color: Colors.tertiaryBlue,
  },
  pickerContainer: {},
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteActionContainer: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
