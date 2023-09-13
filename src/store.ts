import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User/userSlice";
import channelsReducer from "./features/Channels/channelsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
