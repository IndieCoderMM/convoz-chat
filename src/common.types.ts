export interface UserInterface {
  id: string;
  name: string;
  bio: string;
  avatarId: number;
  email: string;
  createdAt: number;
  channels: string[];
  role: "admin" | "user";
}

export type ChannelType =
  | "public"
  | "private"
  | "static"
  | "announcement"
  | string;

export interface ChannelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  createdBy: string;
  members: string[];
  type: ChannelType;
  messages: MessageInterface[];
}

export interface MessageInterface {
  id: string;
  channelId: string;
  text: string;
  createdAt: number;
  createdBy: string;
}
