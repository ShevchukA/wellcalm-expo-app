export function getCurrentMonthYear(): string {
  const now = new Date();
  return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  // example: 'June 2025'
}
