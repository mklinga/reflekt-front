import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { JournalEntryType } from '../../types/journalTypes';

export type EntryLoadStatus = 'not-loaded' | 'partial' | 'full';

export interface JournalEntryState {
  entries: JournalEntryType[],
  loaded: EntryLoadStatus;
}

const initialState: JournalEntryState = {
  entries: [],
  loaded: 'not-loaded',
};

export const journalEntrySlice = createSlice({
  name: 'journalEntry',
  initialState,
  reducers: {
    setListOfEntriesData: (state, action: PayloadAction<JournalEntryType[]>) => {
      state.entries = action.payload;
    },
    setListOfEntriesLoaded: (state, action: PayloadAction<EntryLoadStatus>) => {
      state.loaded = action.payload;
    },
    updateEntry: (state, action: PayloadAction<JournalEntryType>) => {
      const newEntry = action.payload;
      const oldIndex = state.entries.findIndex((entry) => entry.id === newEntry.id);
      if (oldIndex === -1) {
        state.entries = [newEntry].concat(state.entries);
      } else {
        state.entries[oldIndex] = newEntry;
      }
    },
  },
});

export const {
  setListOfEntriesData,
  setListOfEntriesLoaded,
  updateEntry,
} = journalEntrySlice.actions;

export default journalEntrySlice.reducer;
