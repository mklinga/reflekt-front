import {
  JournalEntryType, JournalEntryDto, JournalListItemType, JournalListItemDto,
} from '../types/types';
import { getISODateString, parseStringToDate } from './date';

function journalEntryTypeDtoConverter(journalEntry: JournalEntryType): JournalEntryDto {
  return {
    ...journalEntry,
    createdAt: journalEntry.createdAt.toISOString().replace('T', ' '),
    updatedAt: journalEntry.updatedAt.toISOString().replace('T', ' '),
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
