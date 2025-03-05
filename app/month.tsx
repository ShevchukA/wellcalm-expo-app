import { MONTHS, MONTHS_NUMBERS } from '@/constants/Months';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Calendar from '../components/Calendar';
import CarouselIndicator from '@/components/CarouselIndicator';
import { Colors } from '@/constants/Colors';
import PagerView from 'react-native-pager-view';
import { getCurrentDate } from '@/utils/getDate';
import { router } from 'expo-router';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';

export default function Month() {
  const selectHabit = useStore((state) => state.selectHabit);
  const selectedHabit = useStore((state) =>
    state.habits.find((habit) => habit.id === state.selectedHabitId)
  );
  const calendar = useStore((state) => state.calendar);

  const { month: currentMonth, year } = getCurrentDate();
  const currentMonthIndex = MONTHS.findIndex((month) => month === currentMonth);

  const tutorialStep = useTutorStore((state) => state.tutorial.step);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);

  const handleBack = () => {
    selectHabit(null);
    router.back();

    if (tutorialStep === 1) {
      nextTutorialStep();
    }
  };

  return (
    <View style={styles.screenLayout}>
      <SafeAreaView style={styles.screenLayout}>
        <View style={styles.header}>
          <Pressable style={styles.backButtonWrapper} onPress={handleBack}>
            <Text style={styles.icon}>{'<'}</Text>
          </Pressable>
          <Text style={styles.title}>{selectedHabit?.name}</Text>
        </View>

        {selectedHabit && currentMonthIndex !== -1 && (
          <PagerView
            style={styles.carouselContainer}
            initialPage={currentMonthIndex}
          >
            {MONTHS.map((month, i) => (
              <Calendar
                key={month}
                year={year}
                month={month}
                monthNumber={MONTHS_NUMBERS[i]}
                weeks={calendar[i]}
                habit={selectedHabit}
              />
            ))}
          </PagerView>
        )}

        <CarouselIndicator />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.mainWhite,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Jost-SemiBold',
    fontSize: 16,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  backButtonWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 16,
  },
  icon: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 20,
    color: Colors.tertiaryBlue,
  },
  carouselContainer: {
    // borderWidth: 1,
    // flex: 1,
    height: 554, // TODO ?
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 18,
  },
});
