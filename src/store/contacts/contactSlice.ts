import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/contactTypes';

export interface ContactState {
  entries: Contact[],
  loaded: boolean
}

const initialState: ContactState = {
  entries: [],
  loaded: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContactEntries: (state, action: PayloadAction<Contact[]>) => {
      state.entries = action.payload;
    },
    setContactEntriesLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    // updateEntry: (state, action: PayloadAction<JournalEntryType>) => {
    //   const newEntry = action.payload;
    //   const oldIndex = state.entries.findIndex((entry) => entry.id === newEntry.id);
    //   if (oldIndex === -1) {
    //     state.entries = [newEntry].concat(state.entries);
    //   } else {
    //     state.entries[oldIndex] = newEntry;
    //   }
    // },
  },
});

export const {
  setContactEntries,
  setContactEntriesLoaded,
  // updateEntry,
} = contactSlice.actions;

export default contactSlice.reducer;
