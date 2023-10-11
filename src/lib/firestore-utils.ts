import {
  ChannelInterface,
  MessageInterface,
  UserInterface,
} from "../common.types";
import { channelsRef, messagesRef, usersRef } from "./firebase";
import { DocumentData, limit, orderBy, query, where } from "firebase/firestore";

export const queryChannelsByUserId = (id: string) =>
  query(channelsRef, where("members", "array-contains", id));

export const queryChannelById = (id: string) =>
  query(channelsRef, where("id", "==", id), limit(1));

export const queryAllUsers = () => query(usersRef);

export const queryWelcomeChannels = () =>
  query(channelsRef, where("showWelcome", "==", true));

export const queryPublicChannels = () =>
  query(channelsRef, where("type", "==", "public"));

export const queryMessagesByChannelId = (id: string) =>
  query(messagesRef, where("channelId", "==", id), orderBy("createdAt"));

export const queryUserById = (id: string) =>
  query(usersRef, where("id", "==", id), limit(1));

export const mapDocumentDataToUser = (docData: DocumentData): UserInterface => {
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

export const mapDocumentDataToChannel = (
  docData: DocumentData | undefined,
): ChannelInterface => {
  if (!docData) {
    return {
      id: "",
      name: "",
      description: "",
      createdAt: 0,
      createdBy: "",
      type: "",
      members: [],
      showWelcome: false,
    };
  }

  return {
    id: docData.id,
    name: docData.name,
    description: docData.description,
    createdAt: docData.createdAt,
    createdBy: docData.createdBy,
    type: docData.type,
    members: docData.members,
    showWelcome: docData.showWelcome || false,
  };
};

export const mapDocumentDataToMessage = (
  docData: DocumentData,
): MessageInterface => {
  return {
    id: docData.id,
    channelId: docData.channelId,
    text: docData.text,
    createdAt: docData.createdAt,
    createdBy: docData.createdBy,
  };
};
