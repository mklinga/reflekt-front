import { RootState } from '..';

export const selectUsername = (state: RootState) => state.user.username;

export const selectUserContactId = (state: RootState) => state.user.contactId;
