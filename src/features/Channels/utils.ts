import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { channelsRef } from "../../lib/firebase";
import { Channel, ChannelSchema } from "../../schema";

export const TempChannel = ChannelSchema.omit({
  id: true,
  members: true,
  messages: true,
  createdAt: true,
});

export const validateChannel = (channel: Channel) => {
  const result = ChannelSchema.safeParse(channel);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export const createChannel = async (channel: z.infer<typeof TempChannel>) => {
  const newChannel = validateChannel({
    ...channel,
    id: uuid(),
    members: [channel.createdBy],
    messages: [],
    createdAt: Date.now(),
  });

  const docRef = doc(channelsRef, newChannel.id);
  await setDoc(docRef, newChannel);
};
