/* eslint-disable import/prefer-default-export */
export function parseStringToDate(datetimeString: string): Date {
  return new Date(Date.parse(datetimeString));
}

export function getISODateString(date: Date) {
  return date.toISOString().substring(0, 10);
}
