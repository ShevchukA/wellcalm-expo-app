import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import IconLightning from '../assets/icons/lightning.svg';
import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';

export function Toast() {
  const marginTop = useSharedValue(-100);
  const isVisible = useUiStore((state) => state.isToastVisible);
  const hideToast = useUiStore((state) => state.hideToast);
  const title = useUiStore((state) => state.toastTitle);
  const text = useUiStore((state) => state.toastText);

  useEffect(() => {
    if (isVisible) {
      marginTop.value = withSpring(100, {
        damping: 15,
        stiffness: 200,
      });
    } else {
      marginTop.value = withTiming(-100, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
  }));

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable style={styles.toast} onPress={hideToast}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <IconLightning style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 310,
    height: 68,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: Colors.secondaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    transform: [{ translateX: -160 }],
    left: '50%',
    zIndex: 100,
  },
  toast: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontFamily: 'Afacad-Bold',
    fontSize: 22,
    lineHeight: 22,
    color: Colors.white,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Afacad-Bold',
    fontSize: 14,
    lineHeight: 14,
    color: Colors.white,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 24,
  },
});
