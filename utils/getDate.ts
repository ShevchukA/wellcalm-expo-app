export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear().toString(); // 2025
  const month = now.toLocaleString('en-US', { month: 'long' }); // March
  const monthNumber = (now.getMonth() + 1).toString().padStart(2, '0'); // 03
  const date = now.getDate().toString().padStart(2, '0'); // 31
  const currentFullDate = `${year}-${month}-${date}`; // 2025-March-31
  const currentISODate = now.toISOString().split('T')[0]; // 2025-03-31

  return { year, month, monthNumber, date, currentFullDate, currentISODate };
}
