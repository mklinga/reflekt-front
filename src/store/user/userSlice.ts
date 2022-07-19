import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login';

export interface UserState {
  username: string;
  contactId: string;
}

const initialState: UserState = {
  username: undefined,
  contactId: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<LoginResponse>) => {
      state.username = action.payload.username;
      state.contactId = action.payload.contactId;
    },
  },
});

export const { setLoginStatus } = userSlice.actions;

export default userSlice.reducer;
