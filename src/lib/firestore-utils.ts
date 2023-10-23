import {
  type CollectionReference,
  doc,
  type DocumentData,
  getDoc,
  limit,
  query,
  where,
} from "firebase/firestore";

import { type ChannelInterface, type UserInterface } from "../common.types";
import { usersRef } from "./firebase";

export const getDocIfExists = async (ref: CollectionReference, id: string) => {
  const docRef = doc(ref, id);
  const docSnap = await getDoc(docRef);
  return {
    data: docSnap.data(),
    exists: docSnap.exists(),
  };
};

// export const queryJoinedChannels = (id: string) =>
//   query(channelsRef, where("members", "array-contains", id));

// export const queryChannelById = (id: string) =>
//   query(channelsRef, where("id", "==", id), limit(1));

// export const queryCreatedChannels = (id: string) =>
//   query(channelsRef, where("createdBy", "==", id));

// export const queryAllUsers = () => query(usersRef);

// export const queryStaticChannels = () =>
//   query(channelsRef, where("static", "==", true));

// export const queryPublicChannels = () =>
//   query(channelsRef, where("type", "==", "public"));

export const queryUserById = (id: string) =>
  query(usersRef, where("id", "==", id), limit(1));

export const mapDocToUser = (docData: DocumentData): UserInterface => {
  return {
    id: docData.id,
    name: docData.name,
    bio: docData.bio,
    role: docData.role,
    avatarId: docData.avatarId,
    email: docData.email,
    createdAt: docData.createdAt,
    channels: docData.channels,
  };
};

export const mapDocToChannel = (docData: DocumentData): ChannelInterface => {
  return {
    id: docData.id,
    name: docData.name,
    description: docData.description,
    createdAt: docData.createdAt,
    createdBy: docData.createdBy,
    type: docData.type,
    members: docData.members,
    messages: docData.messages,
  };
};
