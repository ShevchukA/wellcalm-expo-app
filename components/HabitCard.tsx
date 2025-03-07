import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo } from 'react';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import IconPencil from '../assets/icons/pencil.svg';
import Tooltip from './Tooltip';
import TrackerButton from './TrackerButton';
import { checkForAchievement } from '@/utils/checkForAchievement';
import { getCurrentDate } from '@/utils/getDate';
import { getCurrentWeekDates } from '@/utils/getCurrentWeekDates';
import { router } from 'expo-router';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';
import { useUiStore } from '@/store/uiStore';

interface HabitCardProps {
  habit: Habit;
  onLongPress: () => void;
  onPressOut: () => void;
  // onLongPress: () => void;
}

export default function HabitCard({
  habit,
  onLongPress,
  onPressOut,
}: HabitCardProps) {
  const selectHabit = useStore((state) => state.selectHabit);
  const toggleModal = useUiStore((state) => state.toggleModal);

  const tutorialStep = useTutorStore((state) => state.tutorial.step);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);

  useEffect(() => {
    checkForAchievement(habit);
  }, [habit]);

  const handleEdit = () => {
    selectHabit(habit.id);
    toggleModal();
  };

  const handleOpenCalendar = () => {
    selectHabit(habit.id);

    if (tutorialStep === 1) {
      nextTutorialStep();
    }

    router.navigate('/month');
  };

  const { year, month, currentISODate } = useMemo(() => getCurrentDate(), []);
  const currentWeekDates = useMemo(() => getCurrentWeekDates(), []);

  const isTutorCard = habit.id === 'tutorial';

  return (
    <Pressable
      style={styles.cardWrapper}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
    >
      {isTutorCard && (
        <View style={styles.tutorContainer}>
          <Text style={styles.tutorLabel}>how about new habit?</Text>
        </View>
      )}

      <View style={[styles.card]}>
        <Tooltip
          isVisible={tutorialStep === 3 && isTutorCard}
          text={'Swipe card left to delete'}
          position={{ left: 170, top: 176 }}
        >
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: habit.color },
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
            text={'Tap on the month\nto open full calendar'}
            position={{ left: 0, top: 50 }}
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
              position={{ left: 50, top: 46 }}
            >
              <View style={styles.datesContainer}>
                {currentWeekDates.map((weekDate: string) => {
                  return (
                    <TrackerButton
                      key={weekDate}
                      habitId={habit.id}
                      date={weekDate}
                      isMarked={habit.dates?.[weekDate]}
                      isCurrentDate={weekDate === currentISODate}
                    />
                  );
                })}
              </View>
            </Tooltip>
          </View>
        </View>
      </View>
    </Pressable>
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
