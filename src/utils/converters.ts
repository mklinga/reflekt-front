import {
  JournalEntryType, JournalEntryDto, JournalListItemType, JournalListItemDto,
} from '../types/types';
import { parseStringToDate } from './date';

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

export const journalEntry = { fromDto: journalEntryDtoConverter };
export const journalListItem = { fromDto: journalListItemDtoConverter };
