import { isBefore, parseISO, startOfToday } from 'date-fns';

export function isBeforeToday(isoString: string): boolean {
  const date = parseISO(isoString);

  if (isNaN(date.getTime())) return false;

  const veredict = isBefore(date, startOfToday());

  return veredict;
}
