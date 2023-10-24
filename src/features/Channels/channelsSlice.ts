import { createSelector, createSlice } from "@reduxjs/toolkit";

import { ChannelsStatus } from "../../lib/constants";

import type { RootState } from "../../lib/store";
import type { Channel } from "../../schema";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChannelsState {
  data: Channel[] | [];
  status: ChannelsStatus;
}

const initialState: ChannelsState = {
  data: [],
  status: ChannelsStatus.Idle,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<Channel[]>) {
      state.data = action.payload;
      state.status = ChannelsStatus.Success;
    },
  },
});

export const { setChannels } = channelsSlice.actions;

const getChannels = (state: RootState) => state.channels;

export const getAllChannels = createSelector(getChannels, (channels) => {
  return channels.data;
});

export const getChannelById = createSelector(
  [getChannels, (_state, id: string) => id],
  (channels, id) => {
    return channels.data.find((channel) => channel.id === id);
  },
);

export const getStaticChannels = createSelector(getChannels, (channels) => {
  return channels.data.filter(
    (channel) => channel.type === "static" || channel.type === "announcement",
  );
});

export const getPublicChannels = createSelector(getChannels, (channels) => {
  return channels.data.filter((channel) => channel.type === "public");
});

export const getJoinedChannels = createSelector(
  [getChannels, (_state, userId: string) => userId],
  (channels, userId) => {
    return channels.data.filter(
      (channel) =>
        channel.type !== "static" &&
        channel.type !== "announcement" &&
        channel.members.includes(userId),
    );
  },
);

export const getCreatedChannels = createSelector(
  [getChannels, (_state, userId: string) => userId],
  (channels, userId) => {
    return channels.data.filter((channel) => channel.createdBy === userId);
  },
);

export default channelsSlice.reducer;
