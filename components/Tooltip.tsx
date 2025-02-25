import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ReactNode, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';

interface TooltipProps {
  text: string;
  pointerDirection: 'top' | 'down';
  isVisible: boolean;
  children: ReactNode;
  position: { left?: number; right?: number; top?: number; bottom?: number };
  //   wrapperStyle: any;
}
export default function Tooltip({
  text,
  pointerDirection,
  isVisible,
  children,
  position,
}: TooltipProps) {
  // Создаем shared value для управления прозрачностью
  const opacity = useSharedValue(0);

  // При изменении isVisible обновляем значение opacity с анимацией
  useEffect(() => {
    opacity.value = withDelay(
      600,
      withTiming(isVisible ? 1 : 0, { duration: 300 })
    );
  }, [isVisible, opacity]);

  // Используем анимированный стиль для контейнера Tooltip
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.wrapper]}>
      {children}

      {isVisible && (
        <Animated.View style={[styles.position, position, animatedStyle]}>
          <View style={styles.tooltip}>
            <View
              style={
                pointerDirection === 'top' ? styles.arrowTop : styles.arrowDown
              }
            />
            <View style={styles.container}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  position: {
    position: 'absolute',
    zIndex: 10,
  },
  tooltip: {
    flex: 0,
    position: 'relative',
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: Colors.tertiaryWhite,
  },
  text: {
    fontFamily: 'Afacad-Regular',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  arrowTop: {
    position: 'absolute',
    top: -24,
    left: 0,
    zIndex: -1,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 50,
    borderBottomWidth: 50,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.tertiaryWhite,
    borderRightColor: 'transparent',
  },
  arrowDown: {
    position: 'absolute',
    bottom: -24,
    left: 0,
    zIndex: -1,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: Colors.tertiaryWhite,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
