import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const getAllChannels = (state: RootState) => state.channels.data;

export const getChannelById = (state: RootState, channelId: string) => {
  return state.channels.data.find((channel) => channel.id === channelId);
};

export const getStaticChannels = (state: RootState) => {
  return state.channels.data.filter(
    (channel) => channel.type === "static" || channel.type === "announcement",
  );
};

export const getPublicChannels = (state: RootState) => {
  return state.channels.data.filter((channel) => channel.type === "public");
};

export const getJoinedChannels = (state: RootState, userId: string) => {
  return state.channels.data.filter(
    (channel) =>
      channel.type !== "static" &&
      channel.type !== "announcement" &&
      channel.members.includes(userId),
  );
};

export const getCreatedChannels = (state: RootState, userId: string) => {
  return state.channels.data.filter((channel) => channel.createdBy === userId);
};

export default channelsSlice.reducer;
