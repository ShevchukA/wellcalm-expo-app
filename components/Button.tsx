import { Href, Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';

interface ButtonProps {
  text: string;
  appearance?: 'primary' | 'positive' | 'negative';
  onPress?: () => void;
}

export default function Button({
  text,
  appearance = 'primary',
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[appearance],
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, appearance === 'primary' && styles.textPrimary]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 143,
    height: 59,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: Colors.mainWhite,
  },
  positive: {
    backgroundColor: Colors.green,
  },
  negative: {
    backgroundColor: Colors.red,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: 'Afacad-Bold',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.white,
  },
  textPrimary: {
    color: Colors.grey,
  },
});
