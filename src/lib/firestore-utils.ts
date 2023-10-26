import { doc, getDoc, limit, query, where } from "firebase/firestore";

import { usersRef } from "./firebase";

import type { CollectionReference, DocumentData } from "firebase/firestore";
import type { Channel, User } from "../schema";

export const getDocIfExists = async (ref: CollectionReference, id: string) => {
  const docRef = doc(ref, id);
  const docSnap = await getDoc(docRef);
  return {
    data: docSnap.data(),
    exists: docSnap.exists(),
  };
};

export const queryUserById = (id: string) =>
  query(usersRef, where("id", "==", id), limit(1));

export const mapDocToUser = (docData: DocumentData): User => {
  return {
    id: docData.id,
    name: docData.name,
    bio: docData.bio,
    role: docData.role,
    avatarId: docData.avatarId,
    email: docData.email,
    createdAt: docData.createdAt,
  };
};

export const mapDocToChannel = (docData: DocumentData): Channel => {
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
