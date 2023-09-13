import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChannelState } from "../../common.types";
import { RootState } from "../../store";

interface ChannelsState {
  data: ChannelState[] | [];
}

const initialState: ChannelsState = {
  data: [],
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<ChannelState[]>) {
      state.data = action.payload;
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export const selectChannels = (state: RootState) => state.channels.data;
export default channelsSlice.reducer;
