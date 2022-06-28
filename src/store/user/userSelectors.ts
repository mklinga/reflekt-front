import { RootState } from '..';

export const selectUsername = (state: RootState) => state.user.username;
