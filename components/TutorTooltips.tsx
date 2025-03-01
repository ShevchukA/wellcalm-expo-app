import { StyleSheet, Text, View } from 'react-native';

import Tooltip from './Tooltip';
import { useTutorStore } from '@/store/tutorStore';

export function TutorTooltips() {
  const tutorialStep = useTutorStore((state) => state.tutorial.step);

  return (
    <>
      <View style={styles.tutorContainer}>
        <Text style={styles.tutorLabel}>how about new habit?</Text>
      </View>

      <View style={styles.tooltipWrapper}>
        <Tooltip
          isVisible={tutorialStep === 0}
          text={'Tap to mark the day,\ntap to unmark'}
          pointerDirection='top'
          position={{ left: 36, top: 220 }}
        >
          <View style={styles.tooltipContainer} />
        </Tooltip>
      </View>

      <View style={styles.tooltipWrapper}>
        <Tooltip
          isVisible={tutorialStep === 1}
          text={'Tap to open the full\ncalendar'}
          pointerDirection='top'
          position={{ left: 80, top: 140 }}
        >
          <View style={styles.tooltipContainer} />
        </Tooltip>
      </View>

      <View style={styles.tooltipWrapper}>
        <Tooltip
          isVisible={tutorialStep === 3}
          text={'Swipe left\nto delete'}
          pointerDirection='top'
          position={{ left: 226, top: 120 }}
        >
          <View style={styles.tooltipContainer} />
        </Tooltip>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  tooltipWrapper: {
    position: 'absolute',
    inset: 0,
    // zIndex: 1,
  },
  tooltipContainer: {
    flex: 1,
  },
});
