import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';

interface TrackerButtonProps {
  year: string;
  month: string;
  date: string;
  isCurrentDate: boolean;
  isMarked: boolean;
  habitId: string;
}

export default function TrackerButton({
  year,
  month,
  date,
  isCurrentDate,
  isMarked,
  habitId,
}: TrackerButtonProps) {
  const checkDate = useStore((state) => state.checkDate);
  const tutorialStep = useTutorStore((state) => state.tutorial.step);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);
  const updateStep = useTutorStore((state) => state.updateStep);

  const handlePress = () => {
    checkDate(habitId, year, month, date);

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
          {date}
        </Text>
      </View>
    </Pressable>
  );
}

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
