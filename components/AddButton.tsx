import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import Tutor from '../assets/icons/cloud.svg';
import { useEffect } from 'react';
import { useTutorStore } from '@/store/tutorStore';

interface AddButtonProps {
  onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonProps) {
  const tutorial = useTutorStore((state) => state.tutorial);
  const isVisible = tutorial.step === 4 && !tutorial.steps.cardAdded;

  // Создаем shared value для управления прозрачностью
  const opacity = useSharedValue(0);

  // При изменении isVisible обновляем значение opacity с анимацией
  useEffect(() => {
    opacity.value = withDelay(
      300,
      withTiming(isVisible ? 1 : 0, { duration: 200 })
    );
  }, [isVisible, opacity]);

  // Используем анимированный стиль для контейнера Tooltip
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {isVisible && (
        <Animated.View style={[styles.tutorContainer, animatedStyle]}>
          <Tutor style={styles.tutor} />
          <Text style={styles.tutorText}>{'Tap to add\na new habit'}</Text>
        </Animated.View>
      )}

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Text style={styles.icon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    width: 66,
    height: 66,
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
  tutorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  tutor: {
    position: 'absolute',
    bottom: -10,
    left: -11.5,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tutorText: {
    position: 'absolute',
    bottom: 111,
    left: 66,
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    color: Colors.tertiaryBlue,
  },
});
