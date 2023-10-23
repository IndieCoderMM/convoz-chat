import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChannelInterface } from '../../common.types';
import { RootState } from '../../lib/store';

interface ChannelsState {
  data: ChannelInterface[] | [];
}

const initialState: ChannelsState = {
  data: [],
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels(state, action: PayloadAction<ChannelInterface[]>) {
      state.data = action.payload;
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export const selectChannels = (state: RootState) => state.channels.data;
export default channelsSlice.reducer;
