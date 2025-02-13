import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import AddButton from '@/components/AddButton';
import { Colors } from '@/constants/Colors';

export default function Habits() {
  const handleAdd = () => {
    console.log('ADD');
  };

  return (
    <View style={styles.screenLayout}>
      <SafeAreaView style={styles.screenLayout}>
        <View style={styles.header}>
          <Text style={styles.title}>YOUR HABITS</Text>
        </View>
        <ScrollView style={styles.scrollContainer} alwaysBounceVertical={false}>
          <Text>Your Habits</Text>
        </ScrollView>
        <View style={styles.footer}>
          <AddButton onPress={handleAdd} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.mainWhite,
  },
  header: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'AlbertSans-SemiBold',
    fontSize: 16,
    color: Colors.black,
  },
  scrollContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  footer: {
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
