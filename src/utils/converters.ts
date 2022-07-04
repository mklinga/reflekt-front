import { JournalEntryType } from '../types/journalTypes';
import { getISODateString, parseStringToDate } from './date';

function journalEntryTypeDtoConverter(journalEntry: JournalEntryType) {
  const createdAt = journalEntry.createdAt === null
    ? null
    : parseStringToDate(journalEntry.createdAt).toISOString().replace('T', ' ');

  const updatedAt = journalEntry.updatedAt === null
    ? null
    : parseStringToDate(journalEntry.updatedAt).toISOString().replace('T', ' ');

  return {
    ...journalEntry,
    createdAt,
    updatedAt,
    entryDate: getISODateString(parseStringToDate(journalEntry.entryDate)),
  };
}
export const journalEntry = {
  toDto: journalEntryTypeDtoConverter,
};
