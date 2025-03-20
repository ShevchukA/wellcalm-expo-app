import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { checkForAchievement } from '@/utils/checkForAchievement';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';
import {memo} from "react";

interface TrackerButtonProps {
  date: string; // YYYY-MM-DD
  isCurrentDate: boolean;
  isMarked: boolean;
  habitId: string;
}

const TrackerButton = ({
  date,
  isCurrentDate,
  isMarked,
  habitId,
}: TrackerButtonProps) => {
  const checkDate = useStore((state) => state.checkDate);
  const tutorialStep = useTutorStore((state) => state.tutorial.step);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);
  const updateStep = useTutorStore((state) => state.updateStep);

  const handlePress = () => {
    checkDate(habitId, date);

    if (habitId !== 'tutorial') {
      checkForAchievement(habitId);
    }

    if (tutorialStep === 0) {
      nextTutorialStep();
      updateStep('cellMarked', true);
    }
  };

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <View style={[styles.button, isMarked && styles.marked]}>
        <Text
          style={[
            styles.date,
            isCurrentDate && styles.currentDate,
            isMarked && isCurrentDate && styles.currentMarkedDate,
          ]}
        >
          {date.split('-')[2]}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(TrackerButton)

const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    height: 38,
    width: 38,
    backgroundColor: Colors.lightGrey,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  marked: {
    backgroundColor: Colors.lightGreen,
  },
  date: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
    color: Colors.black,
  },
  currentDate: {
    color: Colors.tertiaryBlue,
  },
  currentMarkedDate: { color: Colors.white },
});
