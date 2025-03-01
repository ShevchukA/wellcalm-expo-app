import 'react-native-get-random-values'; // TODO куда лучше поместить? необходима для работы uuid

import {
  Modal as ModalView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SetStateAction, useEffect, useState } from 'react';

import Button from './Button';
import { Colors } from '@/constants/Colors';
import { Habit } from '@/models/models';
import { v4 as generateId } from 'uuid';
import { useStore } from '@/store/store';
import { useUiStore } from '@/store/uiStore';

interface ModalProps {
  isVisible: boolean;
}

export default function Modal({ isVisible }: ModalProps) {
  const toggleModal = useUiStore((state) => state.toggleModal);
  const addHabit = useStore((state) => state.addHabit);
  const editHabitName = useStore((state) => state.editHabitName);
  const selectHabit = useStore((state) => state.selectHabit);
  // TODO store selector for current habit
  const habits = useStore((state) => state.habits);
  const selectedHabitId = useStore((state) => state.selectedHabitId);
  const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

  const [name, setName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setName(selectedHabit?.name || '');
  }, [selectedHabit]);

  const handleInput = (text: SetStateAction<string>) => {
    setIsEmpty(false);
    setName(text);
  };

  const handleClose = () => {
    setName('');
    setIsEmpty(false);
    selectHabit(null);
    toggleModal();
  };

  const handleSave = () => {
    if (name.length === 0) {
      setIsEmpty(true);
      return;
    }

    if (selectedHabit) {
      editHabitName(selectedHabit.id, name);
    } else {
      const newHabit: Habit = {
        id: generateId(),
        name: name,
        dates: [],
      };

      addHabit(newHabit);
    }

    handleClose();
  };

  return (
    <ModalView
      animationType='fade'
      transparent={true}
      visible={isVisible} // necessary prop for correct animation and state management
      onRequestClose={handleClose}
    >
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      > */}
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, isEmpty && styles.inputError]}
            value={name}
            onChangeText={(text) => handleInput(text)}
            keyboardType='default'
          />
          <View style={styles.buttonsContainer}>
            <Button text='Cancel' appearance='negative' onPress={handleClose} />
            <Button text='Save' appearance='positive' onPress={handleSave} />
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </ModalView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#767F6B80',
  },
  modal: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 120,
  },
  label: {
    fontFamily: 'Afacad-Regular',
    fontSize: 22,
    lineHeight: 22,
    color: Colors.darkGrey,
  },
  input: {
    height: 59,
    borderRadius: 20,
    paddingLeft: 14,
    marginTop: 5,
    justifyContent: 'center',
    backgroundColor: Colors.tertiaryWhite,
    color: Colors.darkGrey,
    fontFamily: 'Jost-SemiBold',
    fontSize: 30,
  },
  inputError: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 43,
  },
});
