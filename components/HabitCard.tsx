import { Pressable, StyleSheet, Text, View } from 'react-native';
import { memo, useMemo } from 'react';

import { Colors } from '@/constants/Colors';
import DaysOfWeek from './DaysOfWeek';
import { Habit } from '@/models/models';
import IconPencil from '../assets/icons/pencil.svg';
import Tooltip from './Tooltip';
import TrackerButton from './TrackerButton';
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
  isDragging?: boolean;
}

const HabitCard = ({
  habit,
  onLongPress,
  onPressOut,
  isDragging = false,
}: HabitCardProps) => {
  const selectHabit = useStore((state) => state.selectHabit);
  const toggleModal = useUiStore((state) => state.toggleModal);

  const tutorialStep = useTutorStore((state) => state.tutorial.step);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);

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
      style={[styles.cardWrapper, isDragging && styles.cardWrapperDragging]}
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
          position={{ left: 170, top: 120 }}
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
              position={{ left: 66, top: 50 }}
            >
              <View style={styles.datesContainer}>
                {currentWeekDates.map((weekDate: string, i) => {
                  // определяем состояние соседних ячеек, чтобы сделать заливку между соседними
                  const isCurrentMarked = habit.dates?.[currentWeekDates[i]];
                  const isPreviousMarked =
                    habit.dates?.[currentWeekDates[i - 1]];
                  const isNextMarked = habit.dates?.[currentWeekDates[i + 1]];

                  return (
                    <View style={styles.trackerButtonWrapper} key={weekDate}>
                      {isCurrentMarked && (
                        <View
                          style={[
                            styles.fillingDefault,
                            getFillingStyle(isPreviousMarked, isNextMarked),
                          ]}
                        />
                      )}
                      <TrackerButton
                        habitId={habit.id}
                        date={weekDate}
                        isMarked={isCurrentMarked}
                        isCurrentDate={weekDate === currentISODate}
                      />
                    </View>
                  );
                })}
              </View>
            </Tooltip>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default HabitCard;
// export default memo(HabitCard);

const getFillingStyle = (isPreviousMarked: boolean, isNextMarked: boolean) => {
  if (isPreviousMarked && isNextMarked) {
    return styles.fillingFull;
  }
  if (isNextMarked) {
    return styles.fillingNext;
  }
  if (isPreviousMarked) {
    return styles.fillingPrevious;
  }
  return styles.fillingDefault;
};

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
  cardWrapperDragging: {
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
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
  trackerButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  fillingDefault: {
    position: 'absolute',
    backgroundColor: Colors.lightGreen,
    top: 3,
    height: 38,
  },
  fillingNext: {
    width: '50%',
    right: 0,
  },
  fillingPrevious: {
    width: '50%',
    left: 0,
  },
  fillingFull: {
    width: '100%',
    left: 0,
    right: 0,
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
