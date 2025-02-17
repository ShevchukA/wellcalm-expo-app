import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Habit } from '@/models/models';
import IconPencil from '../assets/icons/pencil.svg';
import { useStore } from '@/store/store';

interface HabitCardProps {
  habit: Habit;
  color: string;
}

export default function HabitCard({ habit, color }: HabitCardProps) {
  const selectHabit = useStore((state) => state.selectHabit);
  const toggleModal = useStore((state) => state.toggleModal);

  const handleEdit = () => {
    selectHabit(habit);
    toggleModal();
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={[styles.titleContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{habit.name}</Text>
          <Pressable style={styles.editButton} onPress={handleEdit}>
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
    marginHorizontal: 16,
    marginVertical: 8,
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
  deleteActionContainer: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
