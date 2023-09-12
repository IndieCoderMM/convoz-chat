export interface UserInterface {
  id: string;
  name: string;
  bio: string;
  avatarId: number;
  email: string;
  createdAt: number;
  channels: string[];
}

export interface ChannelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  createdBy: string;
  members: string[];
  type: "public" | "private" | "announcement";
  showWelcome: boolean;
}

export interface Message {
  id: string;
  channelId: string;
  text: string;
  createdAt: number;
  createdBy: string;
}
