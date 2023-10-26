import { z } from "zod";

const roles = ["admin", "user"] as const;
const channelTypes = ["public", "private", "static", "announcement"] as const;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  bio: z.string().max(255).default(""),
  avatarId: z.number().int().default(0),
  role: z.enum(roles),
  createdAt: z.number().int().positive(),
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
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Channel name must be at least 3 characters long.",
    })
    .max(50, {
      message: "Channel name must be at most 50 characters long.",
    }),
  description: z
    .string()
    .trim()
    .min(10, {
      message: "Channel description must be at least 10 characters long.",
    })
    .max(255, {
      message: "Channel description must be at most 255 characters long.",
    }),
  type: z.enum(channelTypes),
  createdBy: z.string(),
  members: z.array(z.string()),
  createdAt: z.number().int().positive(),
  messages: z.array(MessageSchema),
});

export type User = z.infer<typeof UserSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Channel = z.infer<typeof ChannelSchema>;
export type ChannelType = (typeof channelTypes)[number];
