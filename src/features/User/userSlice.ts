import { createSlice } from "@reduxjs/toolkit";

import { AuthStatus } from "../../lib/constants";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../schema";
import type { RootState } from "../../lib/store";

interface UserState {
  status: AuthStatus;
  data: User | null;
}

const initialState: UserState = {
  status: AuthStatus.Idle,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.status = AuthStatus.SignedIn;
    },
    updateAvatar: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.avatarId = action.payload;
      }
    },
    clearUser: (state) => {
      state.data = null;
      state.status = AuthStatus.SignedOut;
    },
  },
});

export const { setUser, clearUser, updateAvatar } = userSlice.actions;
export const selectAuthStatus = (state: RootState) => state.user.status;
export const selectUser = (state: RootState) => state.user.data;
export default userSlice.reducer;
