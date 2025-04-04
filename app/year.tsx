import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import CarouselIndicator from '@/components/CarouselIndicator';
import { Colors } from '@/constants/Colors';
import PagerView from 'react-native-pager-view';
import YearList from '@/components/YearList';
import { getCurrentDate } from '@/utils/getDate';
import { router } from 'expo-router';
import { useStore } from '@/store/store';

export default function Year() {
  const selectedHabit = useStore((state) =>
    state.habits.find((habit) => habit.id === state.selectedHabitId)
  );
  const { year } = getCurrentDate();

  const [years, setYears] = useState([year]);

  useEffect(() => {
    const habitYears =
      selectedHabit &&
      Array.from(
        new Set(
          Object.keys(selectedHabit.dates).map(
            (dateStr) => dateStr.split('-')[0]
          )
        )
      );
    if (habitYears && habitYears.length > 0) {
      setYears(habitYears);
    }
  }, [selectedHabit]);

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

        {selectedHabit && (
          <PagerView
            style={styles.carouselContainer}
            initialPage={years.length - 1}
          >
            {years.map((year) => (
              <ScrollView
                key={year}
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
              >
                <YearList year={year} habit={selectedHabit} />
              </ScrollView>
            ))}
          </PagerView>
        )}

        {selectedHabit && years.length > 1 && <CarouselIndicator />}
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 18,
  },
  scrollContainer: {
    // flex: 1, // doesn't work for pageview as a parent
    height: '100%',
    width: '100%',
  },
});
