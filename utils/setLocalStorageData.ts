export const setLocalStorageData = <T>(key: string, data: T) => {
  try {
    const item = JSON.stringify(data);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error('Error setting localStorage key:', key, error);
  }
};
