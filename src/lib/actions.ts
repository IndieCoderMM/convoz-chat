import { ChannelInterface } from "../common.types";
import { channelsRef, usersRef } from "../lib/firebase";
import { DocumentData, query, where } from "firebase/firestore";

export const queryChannelsByUserId = (id: string) =>
  query(channelsRef, where("members", "array-contains", id));

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
  };
};

export const queryUserById = (id: string) =>
  query(usersRef, where("id", "==", id));

export const mapDocumentDataToUser = (docData: DocumentData) => {
  return {
    id: docData.id,
    name: docData.name,
    bio: docData.bio,
    avatarId: docData.avatarId,
    email: docData.email,
    createdAt: docData.createdAt,
    channels: docData.channels,
  };
};
