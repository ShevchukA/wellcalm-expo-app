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
import DeleteAction from '@/components/DeleteAction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HabitCard from '@/components/HabitCard';
import Modal from '@/components/Modal';
import { SwipeListView } from 'react-native-swipe-list-view';
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
      <SafeAreaView style={styles.screenLayout}>
        <Modal isVisible={isModalOpen} />
        <View style={styles.header}>
          <Text style={styles.title}>YOUR HABITS</Text>
        </View>
        <SwipeListView
          data={habits}
          keyExtractor={(habit) => habit.id}
          renderItem={(data) => (
            <HabitCard
              habit={data.item}
              color={HabitsColors[data.index % HabitsColors.length]}
            />
          )}
          renderHiddenItem={(data) => <DeleteAction habitID={data.item.id} />}
          rightOpenValue={-66}
          alwaysBounceVertical={false}
        />

        {/* <ScrollView style={styles.scrollContainer} alwaysBounceVertical={false}>
          {habits.map((habit, i) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              color={HabitsColors[i % HabitsColors.length]}
            />
          ))} 
          <View style={styles.spacer}></View>
        </ScrollView>*/}

        <View style={styles.footer}>
          <AddButton onPress={handleShowModal} />
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
