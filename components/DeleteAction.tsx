import { Animated, Pressable } from 'react-native';

import BinIcon from '../assets/icons/trash-bin.svg';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useStore } from '@/store/store';
import { useTutorStore } from '@/store/tutorStore';

interface DeleteActionProps {
  habitID: string;
}

function DeleteAction({ habitID }: DeleteActionProps) {
  const deleteHabit = useStore((state) => state.deleteHabit);
  const tutorial = useTutorStore((state) => state.tutorial);
  const nextTutorialStep = useTutorStore((state) => state.nextStep);
  const updateStep = useTutorStore((state) => state.updateStep);

  const handleDelete = () => {
    deleteHabit(habitID);

    if (tutorial.step === 2) {
      nextTutorialStep();
    }

    if (!tutorial.steps.cardDeleted) {
      updateStep('cardDeleted', true);
    }
  };

  return (
    <Animated.View style={[styles.deleteActionContainer]}>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <BinIcon />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deleteActionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 26,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeleteAction;
