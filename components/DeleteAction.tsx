import Reanimated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import BinIcon from '../assets/icons/trash-bin.svg';
import { Pressable } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

interface DeleteActionProps {
  dragX: SharedValue<number>;
  onDelete: () => void;
}

function DeleteAction({ dragX, onDelete }: DeleteActionProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      dragX.value,
      [-66, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <Reanimated.View style={[styles.deleteActionContainer, animatedStyle]}>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <BinIcon />
      </Pressable>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  deleteActionContainer: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeleteAction;
