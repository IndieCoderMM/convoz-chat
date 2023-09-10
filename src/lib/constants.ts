import { FaHashtag, FaRegCompass, FaUserAlt, FaCog } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";

export const NavLinks = [
  {
    href: "/",
    label: "Home",
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
