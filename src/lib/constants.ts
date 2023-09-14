import { FaHashtag, FaRegCompass, FaUserAlt, FaCog } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
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
    href: "/profile",
    label: "Profile",
    icon: FaUserAlt,
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
