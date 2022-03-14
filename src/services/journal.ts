import * as React from 'react';
import {
  FetchStatus,
  JournalEntryDto, JournalEntryType, JournalListItemDto, JournalListItemType, NavigableJournalEntry,
} from '../types/types';
import { fetchJsonData, putJsonData, postJsonData } from '../utils/fetch';
import * as converters from '../utils/converters';

export async function fetchJournalEntry(
  id: string,
  setData: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  const fetchUrl = `/api/journal/${id}`;
  const [data, status] = await fetchJsonData<NavigableJournalEntry>(fetchUrl);
  switch (status) {
    case 'SUCCESS':
      setData(converters.journalEntry.fromDto(data.data));
      break;
    default:
    // TODO: do something
  }
}

type SetAllEntriesData = React.Dispatch<React.SetStateAction<JournalListItemType[]>>;
export const fetchAllJournalEntries = async (setData: SetAllEntriesData) => {
  const [data, status] = await fetchJsonData<JournalListItemDto[]>('/api/journal');
  switch (status) {
    case 'SUCCESS':
      setData(data.map(converters.journalListItem.fromDto));
      break;
    default:
    // TODO: do something
  }
};

type EntrySaverType = [JournalEntryDto, FetchStatus];
async function updateJournalEntry(entry: JournalEntryType): Promise<EntrySaverType> {
  const putUrl = `/api/journal/${entry.id}`;
  const dto = converters.journalEntry.toDto(entry);
  return putJsonData<JournalEntryDto>(putUrl, dto);
}

async function createJournalEntry(entry: JournalEntryType): Promise<EntrySaverType> {
  const postUrl = '/api/journal/';
  const dto = converters.journalEntry.toDto(entry);
  return postJsonData<JournalEntryDto>(postUrl, dto);
}

export async function saveJournalEntry(entry: JournalEntryType): Promise<JournalEntryType> {
  const [data, status] = await ((entry.id) ? updateJournalEntry(entry) : createJournalEntry(entry));
  if (status === 'ERROR') {
    throw new Error('Save/update failed!');
  }

  return converters.journalEntry.fromDto(data);
}
