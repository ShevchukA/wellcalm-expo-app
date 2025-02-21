import { StyleSheet, View } from 'react-native';

export default function CarouselIndicator() {
  const slides = [1, 2, 3];
  return (
    <View style={styles.container}>
      {slides.map((slide) => (
        <View
          key={slide}
          style={[styles.dot, (styles as any)[`dot--${slide}`]]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 18,
    backgroundColor: '#E0E9DE',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  'dot--1': {
    backgroundColor: '#646A63',
  },
  'dot--2': {
    backgroundColor: '#969D95',
  },
  'dot--3': {
    backgroundColor: '#B7C0B5',
  },
});
