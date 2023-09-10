export interface Channel {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  createdBy: string;
  members: string[];
  type: "public" | "private";
}

export interface Message {
  id: string;
  channelId: string;
  text: string;
  createdAt: number;
  createdBy: string;
}
