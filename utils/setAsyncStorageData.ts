import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageData = async <T>(key: string, data: T) => {
  try {
    const item = JSON.stringify(data);
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.error('Error setting localStorage key:', key, error);
  }
};
