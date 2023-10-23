import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from '../features/Channels/channelsSlice';
import userReducer from '../features/User/userSlice';

import type { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
