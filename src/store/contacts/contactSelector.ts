import { RootState } from '..';

export const selectContacts = (state: RootState) => state.contact.contacts;

export const selectContactsLoaded = (state: RootState) => {
  const { contact } = state;
  return contact.loaded;
};

export const selectContactById = function select(state: RootState, id: string) {
  return state.contact.contacts.find((x) => x.id === id);
};
