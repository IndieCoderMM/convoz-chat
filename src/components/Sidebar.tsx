import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { BiLogOutCircle } from "react-icons/bi";
import toast from "react-hot-toast";

import UserButton from "./UserButton";
import { auth } from "../lib/firebase";
import { AuthStatus, NavLinks } from "../lib/constants";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { clearUser, selectAuthStatus } from "../features/User/userSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus);

  const onSignOut = async () => {
    signOut(auth);
    dispatch(clearUser());
    toast.success("You have been signed out");
  };
  return (
    <aside className="w-18 fixed bottom-0 left-0 top-0 z-50 flex flex-shrink-0 flex-col items-center justify-between bg-dark-900">
      <div className="flex h-screen flex-col items-center px-2 py-8 text-white">
        <ul className="flex h-full w-full flex-col items-center justify-center gap-3">
          {NavLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} className="">
              <Link
                to={href}
                className="group relative flex h-12 w-12 items-center justify-center rounded-3xl bg-dark-700 p-1 text-secondary transition-all hover:rounded-2xl hover:bg-secondary hover:text-white"
              >
                <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 scale-0 rounded-md bg-white px-2 py-1 font-medium text-dark-900 group-hover:scale-100">
                  {label}
                </span>
                <Icon size={30} />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex w-full flex-col items-center justify-center gap-2 border-t border-gray-300 pt-8">
          {authStatus === AuthStatus.SignedIn && (
            <li className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-700">
              <UserButton />
            </li>
          )}
          <li className="flex items-center justify-center rounded-full border border-gray-600 p-2">
            <button onClick={onSignOut} className="">
              <span className="sr-only">Sign Out</span>
              <BiLogOutCircle size={30} />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
