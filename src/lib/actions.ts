import { channelsRef } from "../lib/firebase";
import { query, where } from "firebase/firestore";

export const queryUserChannels = (auth: any) =>
  query(channelsRef, where("members", "array-contains", auth.currentUser?.uid));
