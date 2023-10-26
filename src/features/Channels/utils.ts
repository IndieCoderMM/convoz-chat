import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { type z } from "zod";

import { channelsRef } from "../../lib/firebase";
import { type Channel, ChannelSchema } from "../../schema";

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

export const editChannel = async (channel: Channel) => {
  const newChannel = validateChannel(channel);

  const docRef = doc(channelsRef, newChannel.id);
  await updateDoc(docRef, newChannel);
};

export const deleteChannel = async (id: string) => {
  const docRef = doc(channelsRef, id);
  await deleteDoc(docRef);
};

export const joinChannel = async (channel: Channel, userId: string) => {
  if (channel.members.includes(userId)) {
    throw new Error("You are already a member of this channel.");
  }

  const newChannel = validateChannel({
    ...channel,
    members: [...channel.members, userId],
  });

  const docRef = doc(channelsRef, newChannel.id);
  await updateDoc(docRef, newChannel);
};

export const leaveChannel = async (channel: Channel, userId: string) => {
  if (channel.createdBy === userId) {
    throw new Error("You can't leave your own channel.");
  }

  if (channel.type === "static" || channel.type === "announcement") {
    throw new Error("All members must be in this channel.");
  }

  const newChannel = validateChannel({
    ...channel,
    members: channel.members.filter((id) => id !== userId),
  });

  const docRef = doc(channelsRef, newChannel.id);
  await updateDoc(docRef, newChannel);
};
