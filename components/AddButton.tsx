import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { PressableProps } from 'react-native-gesture-handler';

interface AddButtonProps {
  onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.icon}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 76,
    height: 76,
    borderRadius: '50%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBlue,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 48,
    color: Colors.white,
  },
});
