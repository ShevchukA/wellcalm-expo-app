export function getCurrentMonth(): string {
  const now = new Date();
  return now.toLocaleString('en-US', { month: 'long' });
  // example: 'June'
}
