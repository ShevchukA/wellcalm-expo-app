import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import IconPencil from '../assets/icons/pencil.svg';
import Tooltip from './Tooltip';
import TrackerButton from './TrackerButton';
import { getCurrentDate } from '@/utils/getDate';
import { getCurrentWeekDates } from '@/utils/getCurrentWeekDates';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';

interface HabitCardProps {
  habit: Habit;
  color: string;
}

export default function HabitCard({ habit, color }: HabitCardProps) {
  const selectHabit = useStore((state) => state.selectHabit);
  const toggleModal = useStore((state) => state.toggleModal);

  const tutorialStep = useTutorStore((state) => state.tutorial.step);

  const handleEdit = () => {
    selectHabit(habit);
    toggleModal();
  };

  const handleOpenCalendar = () => {
    selectHabit(habit);
    router.navigate('/month');
  };

  const { year, month, date, currentFullDate } = useMemo(
    () => getCurrentDate(),
    []
  );
  const currentWeekDates = useMemo(() => getCurrentWeekDates(), []);

  const isTutorCard = habit.id === 'tutorial';

  return (
    <View style={styles.cardWrapper}>
      {isTutorCard && (
        <View style={styles.tutorContainer}>
          <Text style={styles.tutorLabel}>how about new habit?</Text>
        </View>
      )}

      <View style={[styles.card]}>
        <Tooltip
          isVisible={tutorialStep === 2 && isTutorCard}
          text={'Swipe left\nto delete'}
          pointerDirection='top'
          position={{ left: 226, top: 120 }}
        >
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: color },
              isTutorCard && styles.tutorCard,
            ]}
          >
            <Text style={styles.title}>{habit.name}</Text>
            <Pressable style={styles.editButton} onPress={handleEdit}>
              <IconPencil />
            </Pressable>
          </View>
        </Tooltip>

        <View style={styles.trackerContainer}>
          <Tooltip
            isVisible={tutorialStep === 1 && isTutorCard}
            text={'Tap to open the full\ncalendar'}
            pointerDirection='top'
            position={{ left: 90, top: 66 }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.linkContainer,
                pressed && styles.linkContainerPressed,
              ]}
              onPress={handleOpenCalendar}
            >
              <Text style={styles.link}>
                {month} {year}
              </Text>
              <Text style={styles.icon}>{'>'}</Text>
            </Pressable>
          </Tooltip>

          <View style={styles.pickerContainer}>
            <DaysOfWeek />

            <Tooltip
              isVisible={tutorialStep === 0 && isTutorCard}
              text={'Tap to mark the day,\ntap to unmark'}
              pointerDirection='top'
              position={{ left: 26, top: 72 }}
            >
              <View style={styles.datesContainer}>
                {currentWeekDates.map((weekDate: string) => {
                  const weekDateNumber = weekDate.split('-')[2];
                  const weekDateMonth = weekDate.split('-')[1];
                  const weekDateYear = weekDate.split('-')[0];
                  const isMarked =
                    habit.dates?.[weekDateYear]?.[weekDateMonth]?.[
                      weekDateNumber
                    ];

                  return (
                    <TrackerButton
                      key={weekDate}
                      habitId={habit.id}
                      year={weekDateYear}
                      month={weekDateMonth}
                      date={weekDateNumber}
                      isMarked={isMarked}
                      isCurrentDate={weekDate === currentFullDate}
                    />
                  );
                })}
              </View>
            </Tooltip>
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
    position: 'relative',
  },
  card: {
    // borderRadius: 20,
    // overflow: 'hidden',
  },
  tutorCard: {
    borderTopLeftRadius: 0,
    marginTop: 20,
  },
  titleContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  tutorContainer: {
    height: 38,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#D9E2CF',
    position: 'absolute',
    paddingHorizontal: 16,
    top: -4,
    zIndex: -1,
  },
  tutorLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: '#5C5959',
  },
});
