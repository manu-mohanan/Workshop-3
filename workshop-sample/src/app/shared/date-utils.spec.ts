import { isFutureDate } from './date-utils';

describe('isFutureDate', () => {
  it('returns false for a date in the past', () => {
    expect(isFutureDate('1990-05-12')).toBe(false);
  });

  it('returns true for a date in the future', () => {
    const futureYear = new Date().getFullYear() + 1;
    expect(isFutureDate(`${futureYear}-01-01`)).toBe(true);
  });
});
