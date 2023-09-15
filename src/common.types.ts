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

export type ChannelType = "public" | "private" | "announcement" | string;

export interface ChannelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  createdBy: string;
  members: string[];
  type: ChannelType;
  showWelcome: boolean;
  path?: string;
}

export interface MessageInterface {
  id: string;
  channelId: string;
  text: string;
  createdAt: number;
  createdBy: string;
}

export interface ChannelState extends ChannelInterface {
  messages: MessageInterface[];
}
