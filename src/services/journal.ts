import * as React from 'react';
import {
  FetchStatus,
  JournalEntryDto,
  JournalEntryType,
  JournalListItemDto,
  JournalListItemType,
  JournalNavigationData,
  NavigableJournalEntry,
} from '../types/types';
import { fetchJsonData, putJsonData, postJsonData } from '../utils/fetch';
import * as converters from '../utils/converters';
import * as querystring from '../utils/querystring';

export async function fetchJournalEntry(
  id: string,
  setData: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  setNavigationData: React.Dispatch<React.SetStateAction<JournalNavigationData>>,
) {
  const fetchUrl = `/api/journal/${id}`;
  const [data, status] = await fetchJsonData<NavigableJournalEntry>(fetchUrl);
  switch (status) {
    case 'SUCCESS':
      setData(converters.journalEntry.fromDto(data.data));
      setNavigationData(data.navigationData);
      break;
    default:
    // TODO: do something
  }
}

type SetAllEntriesData = React.Dispatch<React.SetStateAction<JournalListItemType[]>>;
export const fetchAllJournalEntries = async (setData: SetAllEntriesData) => {
  const endpoint = '/api/journal';
  const [data, status] = await fetchJsonData<JournalListItemDto[]>(endpoint);
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
