import { StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
      <Link href='/habits'>Back</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
