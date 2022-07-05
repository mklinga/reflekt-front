export function parseStringToDate(datetimeString: string): Date {
  if (datetimeString === null) {
    return null;
  }

  return new Date(Date.parse(datetimeString));
}

export function getISODateString(date: Date) {
  return date.toISOString().substring(0, 10);
}

export function dateStringToLocale(dateString: string) {
  const date: Date = parseStringToDate(dateString);
  if (date === null) {
    console.warn('Trying to convert null date', dateString);
    return '';
  }

  return date.toLocaleDateString(undefined, { dateStyle: 'full' });
}
