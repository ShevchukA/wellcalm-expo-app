import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Calendar as CalendarList } from '../components/Calendar';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useStore } from '@/store/store';

export default function Calendar() {
  // TODO store selector for current habit
  const habits = useStore((state) => state.habits);
  const selectedHabitId = useStore((state) => state.selectedHabitId);
  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

  const handleBack = () => {
    router.back();
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

        <View style={styles.carouselContainer}>
          {selectedHabit && <CalendarList month={1} habit={selectedHabit} />}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: 'space-between',
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 14,
  },
});
