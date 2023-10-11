import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../common.types";
import { RootState } from "../../store";
import { AuthStatus } from "../../lib/constants";

interface UserState {
  status: AuthStatus;
  data: UserInterface | null;
}

const initialState: UserState = {
  status: AuthStatus.Idle,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface>) => {
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
