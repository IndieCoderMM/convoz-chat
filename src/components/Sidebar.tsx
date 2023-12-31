import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

import { selectAuthStatus } from "../features/User/userSlice";
import { AuthStatus, NavLinks } from "../lib/constants";
import { auth } from "../lib/firebase";
import { useAppSelector } from "../lib/store";
import { cn } from "../lib/tailwind-utils";
import Tooltip from "./Tooltip";
import UserButton from "./UserButton";
import { Logo } from "../assets/img";

const Sidebar = () => {
  const { pathname } = useLocation();
  const authStatus = useAppSelector(selectAuthStatus);

  const isActive = (href: string) => {
    return (pathname.startsWith(href) && href !== "/") || pathname === href;
  };

  const onSignOut = async () => {
    await signOut(auth);

    toast.success("You have been signed out");
  };
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-16 flex-shrink-0 flex-col items-center justify-between bg-dark-900">
      <Link
        to="/landing"
        className="group flex w-full items-center justify-center p-1"
      >
        <img
          src={Logo}
          alt="Logo"
          className="h-12 w-12 rounded-md bg-primary transition group-hover:scale-105"
        />
      </Link>
      <div className="flex h-screen flex-col items-center py-8 text-white">
        <ul className="flex h-full w-full flex-col items-center justify-center gap-3">
          {NavLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} className="group relative px-2">
              <div
                className={cn(
                  "absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-secondary transition-all group-hover:h-8",
                  isActive(href) ? "h-6" : "h-2",
                )}
              />
              <Link
                to={href}
                className={cn(
                  "group relative flex h-12 w-12 items-center justify-center rounded-3xl bg-dark-700 p-1 text-secondary transition-all hover:rounded-2xl hover:bg-secondary hover:text-white",
                  isActive(href) && "rounded-2xl bg-secondary text-white",
                )}
              >
                <Tooltip
                  text={label}
                  position="right"
                  variant="light"
                  size="lg"
                />
                <Icon size={30} />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex w-full flex-col items-center justify-center gap-2 px-1 pt-8">
          <hr className="w-full border border-dark-400" />
          {authStatus === AuthStatus.SignedIn && (
            <li className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-dark-700">
              <UserButton />
              <Tooltip
                text="Profile"
                position="right"
                variant="light"
                size="lg"
              />
            </li>
          )}
        </ul>
        <button
          onClick={onSignOut}
          className="group relative mt-2 flex items-center justify-center rounded-full p-2 hover:text-red-600"
        >
          <span className="sr-only">Sign Out</span>
          <BiLogOutCircle size={30} />
          <Tooltip text="Sign Out" position="right" variant="light" size="lg" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
