import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { JournalEntryType } from '../../types/types';

export interface JournalEntryState {
  listOfEntries: {
    data: JournalEntryType[],
    loaded: boolean
  }
}

const initialState: JournalEntryState = {
  listOfEntries: {
    data: [],
    loaded: false,
  },
};

export const journalEntrySlice = createSlice({
  name: 'journalEntry',
  initialState,
  reducers: {
    setListOfEntriesData: (state, action: PayloadAction<JournalEntryType[]>) => {
      state.listOfEntries = {
        ...state.listOfEntries,
        data: action.payload,
      };
    },
    setListOfEntriesLoaded: (state, action: PayloadAction<boolean>) => {
      state.listOfEntries = {
        ...state.listOfEntries,
        loaded: action.payload,
      };
    },
  },
});

export const { setListOfEntriesData, setListOfEntriesLoaded } = journalEntrySlice.actions;

export default journalEntrySlice.reducer;
