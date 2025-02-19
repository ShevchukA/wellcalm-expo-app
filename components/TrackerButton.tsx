import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { useStore } from '@/store/store';

interface TrackerButtonProps {
  date: string;
  isCurrentDate: boolean;
  isMarked: boolean;
  habitId: string;
}

export default function TrackerButton({
  date,
  isCurrentDate,
  isMarked,
  habitId,
}: TrackerButtonProps) {
  //   const [isMarked, setIsMarked] = useState(false);
  const checkDate = useStore((state) => state.checkDate);

  const handlePress = () => {
    checkDate(habitId, date);
  };

  return (
    <Pressable style={styles.wrapper} onPress={handlePress}>
      <View style={[styles.button, isMarked && styles.marked]}>
        <Text style={[styles.date, isCurrentDate && styles.currentDate]}>
          {date.split('-')[2]}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    height: 38,
    width: 38,
    backgroundColor: Colors.lightGrey,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  marked: {
    backgroundColor: Colors.lightGreen,
  },
  date: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
    color: Colors.black,
  },
  currentDate: {
    color: Colors.tertiaryBlue,
  },
});
