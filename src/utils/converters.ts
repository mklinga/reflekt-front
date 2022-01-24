import {
  JournalEntryType, JournalEntryDto, JournalListItemType, JournalListItemDto,
} from '../types/types';
import { getISODateString, parseStringToDate } from './date';

function journalEntryTypeDtoConverter(journalEntry: JournalEntryType): JournalEntryDto {
  const createdAt = journalEntry.createdAt === null
    ? null
    : journalEntry.createdAt.toISOString().replace('T', ' ');

  const updatedAt = journalEntry.updatedAt === null
    ? null
    : journalEntry.updatedAt.toISOString().replace('T', ' ');

  return {
    ...journalEntry,
    createdAt,
    updatedAt,
    entryDate: getISODateString(journalEntry.entryDate),
  };
}
function journalEntryDtoConverter(journalEntry: JournalEntryDto): JournalEntryType {
  return {
    ...journalEntry,
    createdAt: parseStringToDate(journalEntry.createdAt),
    updatedAt: parseStringToDate(journalEntry.updatedAt),
    entryDate: parseStringToDate(journalEntry.entryDate),
  };
}

function journalListItemDtoConverter(journalListItem: JournalListItemDto): JournalListItemType {
  return {
    ...journalListItem,
    entryDate: parseStringToDate(journalListItem.entryDate),
  };
}

export const journalEntry = {
  fromDto: journalEntryDtoConverter,
  toDto: journalEntryTypeDtoConverter,
};
export const journalListItem = { fromDto: journalListItemDtoConverter };
