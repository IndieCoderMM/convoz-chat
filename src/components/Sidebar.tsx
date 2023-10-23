import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

import { selectAuthStatus } from '../features/User/userSlice';
import { AuthStatus, NavLinks } from '../lib/constants';
import { auth } from '../lib/firebase';
import { useAppSelector } from '../lib/store';
import { cn } from '../lib/tailwind-utils';
import Tooltip from './Tooltip';
import UserButton from './UserButton';

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
    <aside className="w-18 fixed bottom-0 left-0 top-0 z-50 flex flex-shrink-0 flex-col items-center justify-between bg-dark-900">
      <div className="flex h-screen flex-col items-center py-8 text-white">
        <ul className="flex h-full w-full flex-col items-center justify-center gap-3">
          {NavLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} className="group relative px-2">
              <div
                className={cn(
                  "absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-secondary transition-all group-hover:h-8",
                  isActive(href) ? "h-6" : "h-0",
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
                {/* <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 scale-0 rounded-md bg-white px-2 py-1 font-medium text-dark-900 transition-all group-hover:scale-100">
                  {label}
                </span> */}
                <Icon size={30} />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex w-full flex-col items-center justify-center gap-2 border-t border-dark-300 pt-8">
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
          <li className="flex items-center justify-center rounded-full border border-gray-600 p-2">
            <button onClick={onSignOut}>
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
