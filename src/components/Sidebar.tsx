import { NavLinks } from "../lib/constants";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch } from "../lib/hooks";
import { clearUser } from "../features/User/userSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const onSignOut = async () => {
    signOut(auth);
    dispatch(clearUser());
    console.log("Signed Out", auth);
  };
  return (
    <aside className="bg-dark-900">
      <div className="flex h-screen flex-col items-center px-2 py-8 text-white">
        <ul className="flex h-full w-full flex-col items-center justify-center gap-3">
          {NavLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} className="">
              <Link
                to={href}
                className="group relative flex h-12 w-12 items-center justify-center rounded-3xl bg-dark-700 p-1 text-secondary transition-all hover:rounded-2xl hover:bg-secondary hover:text-white"
              >
                <span className="absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 scale-0 rounded-md bg-white px-2 py-1 font-medium text-dark-900 group-hover:scale-100">
                  {label}
                </span>
                <Icon size={30} />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex w-full flex-col items-center justify-center gap-8 border-t border-gray-300 pt-8">
          <li className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-700">
            <UserButton />
          </li>
          <li className="flex items-center justify-center rounded-full border border-gray-600 p-2">
            <button onClick={onSignOut} className="">
              <span className="sr-only">Sign Out</span>
              <FaSignOutAlt size={30} />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
