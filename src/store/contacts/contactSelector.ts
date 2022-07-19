import { RootState } from '..';

export const selectContactEntries = (state: RootState) => state.contact.entries;

export const selectContactEntriesLoaded = (state: RootState) => {
  const { contact } = state;
  return contact.loaded;
};
