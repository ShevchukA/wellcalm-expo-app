import { Colors, HabitsColors } from '@/constants/Colors';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AddButton from '@/components/AddButton';
import DeleteAction from '@/components/DeleteAction';
import { Habit } from '@/models/models';
import HabitCard from '@/components/HabitCard';
import Modal from '@/components/Modal';
import SwipeableItem from 'react-native-swipeable-item';
import { Toast } from '@/components/Toast';
import Tooltip from '@/components/Tooltip';
import { useCallback } from 'react';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';
import { useUiStore } from '@/store/uiStore';

export default function Habits() {
  const toggleModal = useUiStore((state) => state.toggleModal);
  const isModalOpen = useUiStore((state) => state.isModalOpen);
  const habits = useStore((state) => state.habits);
  const tutorial = useTutorStore((state) => state.tutorial);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);
  const updateStep = useTutorStore((state) => state.updateStep);
  const updateHabits = useStore((state) => state.updateHabits);

  const handleShowModal = () => {
    toggleModal();

    if (tutorial.step <= 3) {
      updateStep('cardAdded', true);
    }

    if (tutorial.step === 0) {
      nextTutorialStep();
      updateStep('cellMarked', true);
    }

    if (tutorial.step === 3) {
      nextTutorialStep();
    }
  };

  const renderItem = useCallback(
    ({ item, getIndex, drag }: RenderItemParams<Habit>) => {
      const index = getIndex() ?? 0;
      return (
        <SwipeableItem
          key={item.id}
          item={item}
          snapPointsLeft={[66]}
          renderUnderlayLeft={() => <DeleteAction habitID={item.id} />}
        >
          <HabitCard
            habit={item}
            color={HabitsColors[index % HabitsColors.length]}
            onLongPress={drag}
          />
        </SwipeableItem>
      );
    },
    []
  );

  return (
    <View style={styles.screenLayout}>
      <Modal isVisible={isModalOpen} />

      <SafeAreaView style={styles.screenLayout}>
        <Toast />

        <View style={styles.header}>
          <Text style={styles.title}>YOUR HABITS</Text>
        </View>

        <View style={styles.scrollContainer}>
          <DraggableFlatList
            style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: 'red' }} // TODO
            data={habits}
            extraData={habits}
            keyExtractor={(habit) => habit.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => updateHabits(data)}
            activationDistance={20} // to avoid conflict with swipe
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.footer}>
          <Tooltip
            isVisible={tutorial.step === 3 && !tutorial.steps.cardAdded}
            text={'Tap to add\nthe habit'}
            pointerDirection='down'
            position={{ left: 38, bottom: 104 }}
          >
            <AddButton onPress={handleShowModal} />
          </Tooltip>
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
    position: 'relative',
  },
  header: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Jost-SemiBold',
    fontSize: 16,
    color: Colors.black,
  },
  scrollContainer: {
    flex: 1,
    borderWidth: 1, // TODO
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
