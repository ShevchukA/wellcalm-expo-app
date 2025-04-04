import { Redirect, router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { useTutorStore } from '@/store/tutorStore';

export default function Index() {
  const tutorialStep = useTutorStore((state) => state.tutorial.step);

  const handleStart = () => {
    router.replace('/habits');
  };

  if (tutorialStep > 0) {
    return <Redirect href='/habits' />;
  }

  return (
    <View style={styles.screenLayout}>
      <SafeAreaView style={styles.screenLayout}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>WELLCALM</Text>
          <Text style={styles.title}>to the tracking mode</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button text='Start' appearance='primary' onPress={handleStart} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainBlue,
  },
  logoContainer: {
    width: 341,
    height: 341,
    paddingTop: 104,
  },
  logo: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 48,
    lineHeight: 48,
    textAlign: 'center',
    color: Colors.mainWhite,
  },
  title: {
    fontFamily: 'Afacad-Regular',
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.mainWhite,
    marginTop: -8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 110,
    alignItems: 'center',
  },
});
