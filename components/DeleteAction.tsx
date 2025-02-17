import { Animated, Pressable } from 'react-native';

import BinIcon from '../assets/icons/trash-bin.svg';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useStore } from '@/store/store';

interface DeleteActionProps {
  habitID: string;
}

function DeleteAction({ habitID }: DeleteActionProps) {
  const deleteHabit = useStore((state) => state.deleteHabit);

  const handleDelete = () => {
    deleteHabit(habitID);
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
