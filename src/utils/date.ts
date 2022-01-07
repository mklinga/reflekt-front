export function parseStringToDate (datetimeString: string): Date {
    return new Date(Date.parse(datetimeString));
}
