export function isFutureDate(isoDate: string): boolean {
  return new Date(isoDate) > new Date();
}
