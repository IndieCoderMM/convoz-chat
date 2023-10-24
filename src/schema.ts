import { z } from "zod";

const roles = ["admin", "user"] as const;
const channelTypes = ["public", "private", "static", "announcement"] as const;

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  bio: z.string().max(255).default(""),
  avatarId: z.number().int().positive(),
  role: z.enum(roles),
  createdAt: z.number().int().positive(),
  channels: z.array(z.string().uuid()),
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  channelId: z.string().uuid(),
  text: z.string().max(255),
  createdAt: z.number().int().positive(),
  author: UserSchema,
});

export const ChannelSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(100),
  description: z.string().max(255).default(""),
  createdAt: z.number().int().positive(),
  createdBy: z.string().uuid(),
  members: z.array(z.string().uuid()),
  type: z.enum(channelTypes),
  messages: z.array(MessageSchema),
});

export type User = z.infer<typeof UserSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Channel = z.infer<typeof ChannelSchema>;
