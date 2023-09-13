import { ChannelInterface, MessageInterface } from "../common.types";
import { channelsRef, messagesRef, usersRef } from "./firebase";
import { DocumentData, orderBy, query, where } from "firebase/firestore";

export const queryChannelsByUserId = (id: string) =>
  query(channelsRef, where("members", "array-contains", id));

export const queryAllUsers = () => query(usersRef);

export const queryMessagesByChannelId = (id: string) =>
  query(messagesRef, where("channelId", "==", id), orderBy("createdAt"));

export const queryUserById = (id: string) =>
  query(usersRef, where("id", "==", id));

export const mapDocumentDataToUser = (docData: DocumentData) => {
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
  docData: DocumentData,
): ChannelInterface => {
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
