import { RootState } from '..';

export const selectListOfEntries = (state: RootState) => state.journalEntry.entries;

export const selectListOfEntriesLoaded = (state: RootState) => {
  const { journalEntry } = state;
  return journalEntry.loaded;
};

export const selectJournalEntryById = (state: RootState, id: string) => {
  const { entries } = state.journalEntry;
  return entries.find((entry) => entry.id === id);
};
