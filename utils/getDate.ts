export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const date = now.getDate().toString().padStart(2, '0');
  const currentFullDate = `${year}-${month}-${date}`;

  return { year, month, date, currentFullDate };
}
