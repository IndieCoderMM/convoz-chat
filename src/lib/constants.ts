import { FaHashtag, FaRegCompass, FaCog } from "react-icons/fa";
import {
  HiOutlineChat,
  HiHashtag,
  HiLockClosed,
  HiSpeakerphone,
} from "react-icons/hi";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import {
  gamer,
  gamerGirl,
  hacker,
  geek,
  king,
  viking,
  steampunk,
  otaku,
  bandit,
} from "../assets/avatars";
import { ChannelType } from "../common.types";

export const NavLinks = [
  {
    href: "/explore",
    label: "Explore",
    icon: FaRegCompass,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: HiOutlineChat,
  },

  {
    href: "/channels",
    label: "Channels",
    icon: FaHashtag,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: FaCog,
  },
];

export const ChannelIcons = {
  public: HiHashtag,
  private: HiLockClosed,
  announcement: HiSpeakerphone,
  static: HiMiniChatBubbleLeftRight,
} as {
  [key in ChannelType]: React.ComponentType<{ size: number }>;
};

export const avatars = [
  bandit,
  gamer,
  gamerGirl,
  hacker,
  geek,
  king,
  viking,
  steampunk,
  otaku,
];

export enum AuthStatus {
  SignedIn = "signedIn",
  SignedOut = "signedOut",
  Idle = "idle",
}
