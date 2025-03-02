import { Colors, HabitsColors } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AddButton from '@/components/AddButton';
import DeleteAction from '@/components/DeleteAction';
import HabitCard from '@/components/HabitCard';
import Modal from '@/components/Modal';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Toast } from '@/components/Toast';
import Tooltip from '@/components/Tooltip';
import { checkForAchievement } from '@/utils/checkForAchievement';
import { useEffect } from 'react';
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

  return (
    <View style={styles.screenLayout}>
      <Modal isVisible={isModalOpen} />

      <SafeAreaView style={styles.screenLayout}>
        <Toast />

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
