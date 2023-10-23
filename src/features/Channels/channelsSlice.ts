import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChannelInterface } from "../../common.types";
import { ChannelsStatus } from "../../lib/constants";
import { RootState } from "../../lib/store";

interface ChannelsState {
  data: ChannelInterface[] | [];
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
    setChannels(state, action: PayloadAction<ChannelInterface[]>) {
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
  [getChannels, (_state, id) => id],
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
  [getChannels, (_state, userId) => userId],
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
  [getChannels, (_state, userId) => userId],
  (channels, userId) => {
    return channels.data.filter((channel) => channel.createdBy === userId);
  },
);

export default channelsSlice.reducer;
