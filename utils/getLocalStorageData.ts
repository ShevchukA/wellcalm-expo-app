export const getLocalStorageData = <T>(key: string): T | undefined => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
  } catch (error) {
    console.warn('Error reading localStorage key:', key, error);
    return undefined;
  }
};
