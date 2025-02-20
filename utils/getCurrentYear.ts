export function getCurrentYear(): string {
  const now = new Date();
  return now.toLocaleString('en-US', { year: 'numeric' });
  // example: '2025'
}
