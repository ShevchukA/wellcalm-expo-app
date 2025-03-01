// export function getCurrentDate() {
//   const now = new Date();
//   const date = now.toISOString().split('T')[0];

//   return date; // "YYYY-MM-DD"
// }

// export function getCurrentMonth(): string {
//   const now = new Date();
//   return now.toLocaleString('en-US', { month: 'long' });
//   // example: 'June'
// }

// export function getCurrentYear(): string {
//   const now = new Date();
//   return now.toLocaleString('en-US', { year: 'numeric' });
//   // example: '2025'
// }

// export function getCurrentMonthYear(): string {
//   const now = new Date();
//   return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
//   // example: 'June 2025'
// }

// TODO

export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const date = now.getDate().toString().padStart(2, '0');
  const currentFullDate = `${year}-${month}-${date}`;

  return { year, month, date, currentFullDate };
}
