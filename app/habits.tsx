import { Colors, HabitsColors } from '@/constants/Colors';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import AddButton from '@/components/AddButton';
import HabitCard from '@/components/HabitCard';

export default function Habits() {
  const handleAdd = () => {
    console.log('ADD');
  };

  return (
    <View style={styles.screenLayout}>
      <SafeAreaView style={styles.screenLayout}>
        <View style={styles.header}>
          <Text style={styles.title}>YOUR HABITS</Text>
        </View>
        <ScrollView style={styles.scrollContainer} alwaysBounceVertical={false}>
          <HabitCard title='Изучение русского' color={HabitsColors[0]} />
          <HabitCard title='Study russian' color={HabitsColors[1]} />
          <HabitCard title='test' color={HabitsColors[2]} />
          <HabitCard title='test' color={HabitsColors[3]} />
          <View style={styles.spacer}></View>
        </ScrollView>
        <View style={styles.footer}>
          <AddButton onPress={handleAdd} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'AlbertSans-SemiBold',
    fontSize: 16,
    color: Colors.black,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    height: 106,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },
  spacer: {
    height: 14,
  },
});
