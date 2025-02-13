import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import IconPencil from '../assets/icons/pencil.svg';

interface HabitCardProps {
  title: string;
  color: string;
  data?: Array<number>;
}

export default function HabitCard({ title, color, data }: HabitCardProps) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={[styles.titleContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
          <Pressable style={styles.editButton}>
            <IconPencil />
          </Pressable>
        </View>
        <View style={styles.trackerContainer}>
          {/* {data.map((item) => (
            <Text key={item}>{item}</Text>
          ))} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 14,
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  card: {
    height: 194,
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 16,
  },
  title: {
    fontFamily: 'Jost-Regular',
    fontSize: 32,
    color: Colors.darkGrey,
  },
  editButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
