import { Colors, HabitsColors } from '@/constants/Colors';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddButton from '@/components/AddButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HabitCard from '@/components/HabitCard';
import Modal from '@/components/Modal';
import { useStore } from '@/store/store';

export default function Habits() {
  const toggleModal = useStore((state) => state.toggleModal);
  const isModalOpen = useStore((state) => state.isModalOpen);
  const habits = useStore((state) => state.habits);

  const handleShowModal = () => {
    toggleModal();
  };

  return (
    <View style={styles.screenLayout}>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.screenLayout}>
          <Modal isVisible={isModalOpen} />
          <View style={styles.header}>
            <Text style={styles.title}>YOUR HABITS</Text>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            {habits.map((habit, i) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                color={HabitsColors[i % HabitsColors.length]}
              />
            ))}
            <View style={styles.spacer}></View>
          </ScrollView>

          <View style={styles.footer}>
            <AddButton onPress={handleShowModal} />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
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
