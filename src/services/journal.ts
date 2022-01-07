import * as React from 'react';
import {
  JournalEntryDto, JournalListItemDto, JournalListItemType,
} from '../types/types';
import fetchJsonData from '../utils/fetch';
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
