import { Link, router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const handleStart = () => {
    router.replace('/habits');
  };

  return (
    <View style={styles.screenLayout}>
      <SafeAreaView style={styles.screenLayout}>
        <Text style={styles.logo}>WELLCALM</Text>
        <Text style={styles.title}>to the tracking mode</Text>
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
  logo: {
    fontFamily: 'Afacad-Semibold',
    fontSize: 48,
    lineHeight: 48,
    color: Colors.mainWhite,
  },
  title: {
    fontFamily: 'Afacad-Regular',
    fontSize: 24,
    lineHeight: 24,
    color: Colors.mainWhite,
    marginTop: -8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 110,
    alignItems: 'center',
  },
});
