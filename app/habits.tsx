import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';

import AddButton from '@/components/AddButton';
import { Colors } from '@/constants/Colors';
import DeleteAction from '@/components/DeleteAction';
import { Habit } from '@/models/models';
import HabitCard from '@/components/HabitCard';
import Modal from '@/components/Modal';
import SwipeableItem from 'react-native-swipeable-item';
import { Toast } from '@/components/Toast';
import Tooltip from '@/components/Tooltip';
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

    if (tutorial.step <= 4) {
      updateStep('cardAdded', true);
    }

    if (tutorial.step === 0) {
      nextTutorialStep();
      updateStep('cellMarked', true);
    }

    if (tutorial.step === 4) {
      nextTutorialStep();
    }
  };

  const listRef = useRef<any>(null);
  const prevHabitsLength = useRef<number>(habits.length);

  // При добавлении элемента, прокручиваем список в конец
  useEffect(() => {
    if (habits.length > prevHabitsLength.current && listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
    prevHabitsLength.current = habits.length;
  }, [habits]);

  const renderItem = useCallback((info: DragListRenderItemInfo<Habit>) => {
    const { item, onDragStart, onDragEnd, isActive } = info;
    return (
      <SwipeableItem
        key={item.id}
        item={item}
        snapPointsLeft={[66]}
        renderUnderlayLeft={() => <DeleteAction habitID={item.id} />}
      >
        <HabitCard
          onLongPress={onDragStart}
          onPressOut={onDragEnd}
          habit={item}
        />
      </SwipeableItem>
    );
  }, []);

  async function onReordered(fromIndex: number, toIndex: number) {
    const newHabits = [...habits];
    const removed = newHabits.splice(fromIndex, 1);

    newHabits.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    updateHabits(newHabits);
  }

  return (
    <View style={styles.screenLayout}>
      <Modal isVisible={isModalOpen} />

      <SafeAreaView style={styles.screenLayout}>
        <Toast />

        <View style={styles.header}>
          <Text style={styles.title}>YOUR HABITS</Text>
        </View>

        <View style={styles.scrollContainer}>
          <DragList
            style={
              {
                // flex: 1,
                // flexGrow: 1,
                // borderWidth: 1,
                // borderColor: 'red',
              }
            } // TODO
            contentContainerStyle={{
              flexGrow: 1,
            }} // TODO
            ref={listRef}
            data={habits}
            extraData={habits}
            keyExtractor={(habit) => habit.id}
            renderItem={renderItem}
            onReordered={onReordered}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.footer}>
          <Tooltip
            isVisible={tutorial.step === 4 && !tutorial.steps.cardAdded}
            text={'Tap to add\na new habit'}
            position={{ left: 40, bottom: 90 }}
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
