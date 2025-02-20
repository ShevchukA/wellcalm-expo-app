import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageData = async <T>(
  key: string
): Promise<T | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.warn('Error reading localStorage key:', key, error);
    return null;
  }
};
