import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/contactTypes';

export interface ContactState {
  contacts: Contact[],
  loaded: boolean
}

const initialState: ContactState = {
  contacts: [],
  loaded: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setContactsLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const newContact = action.payload;
      const oldIndex = state.contacts.findIndex((entry) => entry.id === newContact.id);
      if (oldIndex === -1) {
        state.contacts = [newContact].concat(state.contacts);
      } else {
        state.contacts[oldIndex] = newContact;
      }
    },
  },
});

export const {
  setContacts,
  setContactsLoaded,
  updateContact,
} = contactSlice.actions;

export default contactSlice.reducer;
