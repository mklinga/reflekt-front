import * as React from 'react';
import {
  JournalEntryDto, JournalEntryType, JournalListItemDto, JournalListItemType,
} from '../types/types';
import { fetchJsonData, putJsonData, postJsonData } from '../utils/fetch';
import * as converters from '../utils/converters';

export async function fetchJournalEntry(id: string, setData: Function) {
  const fetchUrl = `/api/journal/${id}`;
  const [data, status] = await fetchJsonData<JournalEntryDto>(fetchUrl);
  switch (status) {
    case 'SUCCESS':
      setData(converters.journalEntry.fromDto(data));
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

async function updateJournalEntry(entry: JournalEntryType) {
  const putUrl = `/api/journal/${entry.id}`;
  const dto = converters.journalEntry.toDto(entry);
  const [data, status] = await putJsonData<JournalEntryDto>(putUrl, dto);
  console.log(status, data);
}

async function createJournalEntry(entry: JournalEntryType) {
  const postUrl = '/api/journal/';
  const dto = converters.journalEntry.toDto(entry);
  const [data, status] = await postJsonData<JournalEntryDto>(postUrl, dto);
  console.log(status, data);
}

export async function saveJournalEntry(entry: JournalEntryType) {
  return (entry.id)
    ? updateJournalEntry(entry)
    : createJournalEntry(entry);
}
