export const getCurrentDate = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];

  return date;
};
