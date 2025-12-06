import { isBeforeToday } from '../date';

describe('Date utilities', () => {
  describe('isBeforeToday', () => {
    it('should return true for dates before today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString();

      expect(isBeforeToday(yesterdayISO)).toBe(true);
    });

    it('should return false for today', () => {
      const today = new Date();
      const todayISO = today.toISOString();

      expect(isBeforeToday(todayISO)).toBe(false);
    });

    it('should return false for dates after today', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowISO = tomorrow.toISOString();

      expect(isBeforeToday(tomorrowISO)).toBe(false);
    });

    it('should return false for invalid date strings', () => {
      expect(isBeforeToday('invalid-date')).toBe(false);
      expect(isBeforeToday('not-a-date')).toBe(false);
      expect(isBeforeToday('2023-13-45')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isBeforeToday('')).toBe(false);
    });

    it('should handle specific past dates correctly', () => {
      expect(isBeforeToday('2020-01-01T00:00:00.000Z')).toBe(true);
      expect(isBeforeToday('2021-12-25T12:30:45.000Z')).toBe(true);
    });

    it('should handle specific future dates correctly', () => {
      const futureYear = new Date().getFullYear() + 1;
      expect(isBeforeToday(`${futureYear}-01-01T00:00:00.000Z`)).toBe(false);
    });
  });
});
