import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function Index() {
  const handleStart = () => {
    router.replace('/habits');
  };

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
    borderWidth: 1,
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
