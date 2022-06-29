import { RootState } from '..';

export const selectListOfEntries = (state: RootState) => state.journalEntry.listOfEntries.data;
export const selectListOfEntriesLoaded = (state: RootState) => {
  const { journalEntry } = state;
  return journalEntry.listOfEntries.loaded;
};
